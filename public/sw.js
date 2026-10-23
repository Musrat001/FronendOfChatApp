self.addEventListener("push", (event) => {
    let data = {};

    if (event.data) {
        try {
            data = event.data.json();
        } catch (error) {
            data = {
                title: "New Message",
                body: event.data.text(),
            };
        }
    }

    const title = data.title || "New Message";

    const options = {
        body: data.body || "You have received a new message.",
        icon: "/favicon.svg",
        badge: "/icons.svg",
        data: {
            url: data.url || "/",
            conversationId: data.conversationId || null,
        },
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

self.addEventListener("notificationclick", (event) => {
    event.notification.close();

    const targetUrl = new URL(
        event.notification.data?.url || "/",
        self.location.origin
    ).href;

    event.waitUntil(
        self.clients.matchAll({
            type: "window",
            includeUncontrolled: true,
        }).then((clients) => {
            for (const client of clients) {
                if (client.url.startsWith(self.location.origin)) {
                    client.focus();
                    return client.navigate(targetUrl);
                }
            }

            return self.clients.openWindow(targetUrl);
        })
    );
});

