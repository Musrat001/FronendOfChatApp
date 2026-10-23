
const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY;
const BACKEND_URL = import.meta.env.VITE_API_URL;

function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);

    const base64 = (base64String + padding)
        .replace(/-/g, "+")
        .replace(/_/g, "/");

    const rawData = window.atob(base64);

    return Uint8Array.from(
        [...rawData].map((char) => char.charCodeAt(0))
    );
}

export async function subscribeToPushNotifications() {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
        throw new Error("Push notifications are not supported by this browser.");
    }

    if (!VAPID_PUBLIC_KEY || !BACKEND_URL) {
        throw new Error("Push notification environment variables are missing.");
    }

    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
        throw new Error("Notification permission was not granted.");
    }

    const registration = await navigator.serviceWorker.ready;

    let subscription = await registration.pushManager.getSubscription();

    if (!subscription) {
        subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
        });
    }

    const response = await fetch(
        `${BACKEND_URL}/api/v1/push/subscribe`,
        {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(subscription),
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Failed to save push subscription.");
    }

    return result;
}

