import {
  Settings,
  Home,
  LogOut,
  User,
  Search,
  Send,
  MoreVertical,
  Menu,
  ArrowLeft,
  Plus,
  Bell,
  X,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
// import { io } from "socket.io-client";
import { useAuth } from "../../../contex/AuthContext";
import { socket } from "../../../socket/socket.js";
import { API_BASE_URL } from "./config/Api.routes.js";
import { subscribeToPushNotifications } from "../../utils/pushNotification.js";

// console.log(loggedInUser);

function UserHome() {
  const navigate = useNavigate();
  const { loggedInUser } = useAuth();

  // use to save chats
  const [chats, setChats] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  // const [conversations, setConversations] = useState(null);

  // store the text currenlty the user sending
  const [text, setText] = useState("");

  // Store the image to a variable
  const [image, setImage] = useState(null);

  // storing file
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      console.log(file);
    }
  };

  // store message array
  const [messages, setMessages] = useState([]);

  // Added only for responsive mobile navigation.
  const [mobileChatView, setMobileChatView] = useState("list");

  const openMobileChat = (chat) => {
    setSelectedUser(chat);
    setMobileChatView("chat");
  };

  const showMobileUserList = () => {
    setMobileChatView("list");
  };
  // isSidebarOpen
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // menu bar for logged in user
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // menu bar for selcted user
  const [isMenuOpenOfSelectedUser, setIsMenuOpenOfSelectedUser] =
    useState(false);
  // storing selected user profile
  const [selectedUserProfile, setSelectedUserProfile] = useState(null);

  
  const getSelectedUserProfile = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/profile/getProfile/${selectedUser._id}`,
        {
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();

      console.log("API Response:", data);

      // API response:
      // {
      //   success: true,
      //   users: [...]
      // }

      if (data.success && Array.isArray(data.userProfile)) {
        setSelectedUserProfile(data.userProfile);
      } else {
        setSelectedUserProfile([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setSelectedUserProfile([]);
    }
  };

  // get users just After logged In

  const getCurrentUser = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/message/users`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();

      console.log("API Response:", data);

      // API response:
      // {
      //   success: true,
      //   users: [...]
      // }

      if (data.success && Array.isArray(data.users)) {
        setChats(data.users);
      } else {
        setChats([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setChats([]);
    }
  };

  // getting the conversation between the logged in user and selected user

  const getConversationOfSelectedUser = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/message/receivedMessage/${selectedUser._id}`,
        {
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      // console.log("Response before json conversion", response);

      const data = await response.json();
      if (!data.success) {
        return;
      }

      console.log("API Response:", data);
      setMessages(data.messages);
    } catch (error) {
      console.error("Error fetching users:", error);
      setMessages([]);
    }
  };

  // setting message
  const handleSetMessage = (e) => {
    setText(e.target.value);
  };

  // sending current messages (text) to selected user.
  const sendMessage = async () => {
    // console.log("Text:", text);
    // console.log("Selected User:", selectedUser?._id);
    // console.log("Selected Image:", image);
    // console.log("Image Name:", image?.name);
    // console.log("Image Size:", image?.size);
    // 1. Validate message
    if ((!text.trim() && !image) || !selectedUser?._id) {
      return;
    }

    // 2. Create FormData
    const formData = new FormData();

    // 3. Append message text
    formData.append("text", text.trim());

    // 4. Append receiver ID
    formData.append("receiverId", selectedUser._id);

    // 5. Append image only if selected
    if (image) {
      formData.append("image", image);
    }

    try {
      // 6. Send request
      const response = await fetch(`${API_BASE_URL}/api/v1/message/send`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      // 7. Check response
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      // 8. Convert response to JSON
      const data = await response.json();

      console.log("Send Message Response:", data);

      // 9. Update message state
      if (data.success) {
        // Replace data.message if your backend uses another property
        const newMessage = data.message;

        if (newMessage?._id) {
          setMessages((prevMessages) => {
            const alreadyExists = prevMessages.some(
              (msg) => msg?._id === newMessage._id,
            );

            if (alreadyExists) {
              return prevMessages;
            }

            return [...prevMessages, newMessage];
          });
        }

        // 10. Clear input states
        setText("");
        setImage(null);
      }
    } catch (error) {
      console.error("Error while sending message:", error);
    }
  };

  const logOut = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/auth/logout`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();

      console.log("API Response:", data);
      alert(data.message);

      navigate("/login");
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // useEffect that runs just after logges user found
  // and assigned the User to a socket id
  useEffect(() => {
    if (!loggedInUser?._id) {
      console.log("Waiting for logged-in user...");
      return;
    }

    // sending the logged in user _id to backend
    // so that socket can connect through it
    socket.io.opts.query = {
      userId: loggedInUser._id.toString(),
    };

    const onConnect = () => {
      console.log("Socket connected:", socket.id);
      console.log("Connected user:", loggedInUser._id);
    };

    const onDisconnect = (reason) => {
      console.log("Socket disconnected:", reason);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    socket.connect();

    // crean up function
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.disconnect();
    };
  }, [loggedInUser?._id]);

  // useEffect runs and fetched the current send message and shows it to chat window.
  useEffect(() => {
    const handleNewMessage = (message) => {
      console.log("REAL-TIME EVENT RECEIVED:", message);

      setMessages((prevMessages) => {
        const alreadyExists = prevMessages.some(
          (item) => item._id === message._id,
        );

        if (alreadyExists) {
          return prevMessages;
        }

        return [...prevMessages, message];
      });
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, []);

  // for getting users
  useEffect(() => {
    getCurrentUser();
  }, []);

  // getting the conversation between the logged in user and selected user
  useEffect(() => {
    if (!selectedUser?._id) return;

    setMessages([]);
   
    getConversationOfSelectedUser();
  }, [selectedUser]);

  // check the notification ush feature

  async function handleEnableNotifications() {
    try {
      const subscription = await subscribeToPushNotifications();

      console.log("Push subscription created:", subscription);

      alert("Browser notifications enabled successfully!");
    } catch (error) {
      console.error("Push subscription failed:", error);

      alert(error.message);
    }
  }

  console.log("Selected User:", selectedUser);
  console.log("Selected User Profile:", selectedUserProfile);
  console.log("Messages:", messages);

  return (
    <div
      className={`relative h-dvh min-h-0 bg-slate-100 p-0 flex gap-0 overflow-hidden
        sm:h-screen sm:p-2 sm:gap-2 md:gap-3
        ${mobileChatView === "chat" ? "mobile-chat-active" : "mobile-list-active"}
        ${isSidebarOpen ? "hidden" : "bg-red-300"}`}
    >
      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      {/* Mobile Menu Button */}

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 sm:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* =====================================================
          CHAT LIST
      ===================================================== */}
      <section
        className={`w-full sm:w-72
          ${mobileChatView === "chat" ? "hidden sm:flex" : "flex"}
          absolute inset-0 z-30 rounded-none
          sm:static sm:inset-auto sm:z-auto sm:rounded-xl lg:rounded-2xl
          md:w-80 lg:w-80 shrink-0 bg-white shadow-sm flex flex-col overflow-hidden`}
      >
        {/* Header */}
        <div className="p-3 pt-14 sm:p-5 border-b border-slate-200">
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-slate-800">
                Messages
              </h1>

              <p className="hidden sm:block text-sm text-slate-400">
                Your conversations
              </p>
            </div>
            {/* Actions for LoggedIn user Profile*/}
            <div className="relative flex items-center gap-0.5 sm:gap-2 shrink-0">
              {/* Menu Button for LoggedIn user Profile */}
              <button
                type="button"
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="
                  w-9 h-9 sm:w-10 sm:h-10
                  rounded-lg
                  hover:bg-slate-100
                  text-slate-500
                  flex items-center justify-center
                  transition
                "
              >
                <Menu size={20} />
              </button>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <>
                  {/* Close dropdown when clicking outside */}
                  <button
                    type="button"
                    aria-label="Close menu"
                    onClick={() => setIsMenuOpen(false)}
                    className="fixed inset-0 z-40 cursor-default"
                  />

                  {/* Dropdown Content */}
                  <div
                    className="
                      absolute right-0 top-full mt-2
                      z-50
                      w-56 sm:w-64
                      max-w-[calc(100vw-1.5rem)]
                      rounded-2xl
                      border border-slate-200
                      bg-slate-900
                      p-2
                      shadow-xl
                    "
                  >
                    {/* Profile */}
                    <NavLink
                      to="/profile"
                      onClick={() => setIsMenuOpen(false)}
                      className="
                      flex items-center gap-3
                      rounded-xl px-3 py-3
                      text-white
                      hover:bg-slate-800
                      transition
                        "
                    >
                      <User size={20} className="text-blue-400" />
                      <span className="text-sm font-medium">Profile</span>
                    </NavLink>

                    {/* Home */}
                    <NavLink
                      to="/home"
                      onClick={() => setIsMenuOpen(false)}
                      className="
                        flex items-center gap-3
                        rounded-xl px-3 py-3
                        text-white
                        hover:bg-slate-800
                        transition
                      "
                    >
                      <Home size={20} className="text-blue-400" />
                      <span className="text-sm font-medium">Home</span>
                    </NavLink>

                    {/* Settings */}
                    <button
                      type="button"
                      onClick={() => setIsMenuOpen(false)}
                      className="
                        flex w-full items-center gap-3
                        rounded-xl px-3 py-3
                        text-slate-300
                        hover:bg-slate-800 hover:text-white
                        transition
                      "
                    >
                      <Settings size={20} />
                      <span className="text-sm font-medium">Settings</span>
                    </button>

                    {/* Divider */}
                    <div className="my-1 border-t border-slate-700" />

                    {/* Notifications */}
                    <button
                      type="button"
                      onClick={() => {
                        setIsMenuOpen(false);
                        handleEnableNotifications();
                      }}
                      className="
                        flex w-full items-center gap-3
                        rounded-xl px-3 py-3
                        text-amber-400
                        hover:bg-slate-800
                        transition
                      "
                    >
                      <Bell size={20} />
                      <span className="text-sm font-medium">Notifications</span>
                    </button>

                    {/* Logout */}
                    <button
                      type="button"
                      onClick={() => {
                        setIsMenuOpen(false);
                        logOut();
                      }}
                      className="
                        flex w-full items-center gap-3
                        rounded-xl px-3 py-3
                        text-red-400
                        hover:bg-red-500/10
                        transition
                      "
                    >
                      <LogOut size={20} />
                      <span className="text-sm font-medium">Logout</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Search */}
          <div
            className="
              flex items-center gap-2
              bg-slate-100
              rounded-xl
              px-3 py-2.5
              focus-within:ring-2
              focus-within:ring-blue-500
            "
          >
            <Search size={17} className="text-slate-400 shrink-0" />

            <input
              type="text"
              placeholder="Search..."
              className="
                w-full
                bg-transparent
                outline-none
                text-sm
                text-slate-700
                placeholder:text-slate-400
              "
            />
          </div>
        </div>

        {/* =================================================
            USERS / CHAT LIST
        ================================================= */}

        <div className="flex-1 min-h-0 overflow-y-auto">
          {chats.length === 0 ? (
            <div className="h-full flex items-center justify-center p-5">
              <p className="text-sm text-slate-400 text-center">
                No users found
              </p>
            </div>
          ) : (
            chats.map((chat, index) => {
              // Safely get user information
              const name = chat?.name || "Unknown User";

              const username = chat?.username || chat?.email || "No username";

              const avatarLetter = name.charAt(0).toUpperCase();

              return (
                <div
                  key={chat?._id || index}
                  className={`
                    flex items-center gap-2 sm:gap-3
                    px-3 sm:px-4
                    py-3 sm:py-4
                    cursor-pointer
                    border-b border-slate-100
                    hover:bg-slate-50
                    transition
                    
                    

                    ${
                      index === 0
                        ? "bg-blue-50 border-l-4 border-l-blue-600"
                        : ""
                    }
                  `}
                  onClick={() => openMobileChat(chat)}
                >
                  {/* Avatar */}
                  <div className="relative shrink-0">
                    <div
                      className="
                        w-9 h-9
                        sm:w-11 sm:h-11
                        rounded-full
                        bg-blue-100
                        text-blue-600
                        flex items-center justify-center
                        font-semibold
                        text-sm
                      "
                    >
                      {avatarLetter}
                    </div>

                    {/* Online indicator */}
                    {index < 3 && (
                      <span
                        className="
                          absolute bottom-0 right-0
                          w-2.5 h-2.5
                          sm:w-3 sm:h-3
                          bg-green-500
                          border-2 border-white
                          rounded-full
                        "
                      />
                    )}
                  </div>

                  {/* User Information */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center gap-2">
                      <h3
                        className="
                          font-semibold
                          text-xs sm:text-sm
                          text-slate-800
                          truncate
                        "
                      >
                        {name}
                      </h3>

                      <span
                        className="
                          text-[9px]
                          sm:text-[11px]
                          text-slate-400
                          shrink-0
                        "
                      >
                        {index < 3 ? "Online" : ""}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <p
                        className="
                          text-[10px]
                          sm:text-xs
                          text-slate-400
                          truncate
                          mt-1
                        "
                      >
                        {username}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
      {/* =====================================================
          CHAT WINDOW
      ===================================================== */}
      {selectedUser ? (
        <main
          className={`${
            mobileChatView === "chat" ? "flex" : "hidden sm:flex"
          } absolute inset-0 z-20 w-full h-full sm:static sm:inset-auto sm:z-auto sm:flex-1 sm:w-auto sm:h-auto min-w-0 rounded-none sm:rounded-xl lg:rounded-2xl bg-white shadow-sm flex flex-col overflow-hidden`}
        >
          {/* Header */}
          <header
            className="
            h-16 sm:h-20
            px-3 sm:px-5 lg:px-6
            border-b border-slate-200
            flex items-center justify-between
          "
          >
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              {/* Added mobile back button; desktop layout remains unchanged. */}
              <button
                type="button"
                aria-label="Back to conversations"
                className="mr-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 sm:hidden"
                onClick={showMobileUserList}
              >
                <ArrowLeft size={21} />
              </button>
              {/* Avatar */}
              <div className="relative shrink-0">
                {selectedUser ? (
                  <div
                    className="
                  w-9 h-9
                  sm:w-11 sm:h-11
                  rounded-full
                  bg-blue-100
                  text-blue-600
                  flex items-center justify-center
                  font-semibold
                "
                  >
                    {selectedUser.name.charAt(0)}
                  </div>
                ) : (
                  ""
                )}

                {/* <span
                className="
                  absolute bottom-0 right-0
                  w-2.5 h-2.5
                  sm:w-3 sm:h-3
                  bg-green-500
                  border-2 border-white
                  rounded-full
                "
              /> */}
              </div>

              {/* User */}
              <div className="min-w-0">
                {selectedUser ? (
                  <h2
                    className="
                  font-semibold
                  text-sm sm:text-base
                  text-slate-800
                  truncate
                "
                  >
                    {selectedUser.name}
                  </h2>
                ) : (
                  ""
                )}
              </div>
            </div>

            {/* Actions for selected user profile */}
            <div className="relative flex items-center gap-0.5 sm:gap-2 shrink-0">
              {/* Menu Button for selected user profile */}
              <button
                type="button"
                aria-label="Toggle menu"
                aria-expanded={isMenuOpenOfSelectedUser}
                onClick={() => setIsMenuOpenOfSelectedUser((prev) => !prev)}
                className="
                  w-9 h-9 sm:w-10 sm:h-10
                  rounded-lg
                  hover:bg-slate-100
                  text-slate-500
                  flex items-center justify-center
                  transition
                "
              >
                <Menu size={20} />
              </button>

              {/* Dropdown Menu */}
              {isMenuOpenOfSelectedUser && (
                <>
                  {/* Close dropdown when clicking outside */}
                  <button
                    type="button"
                    aria-label="Close menu"
                    onClick={() => setIsMenuOpenOfSelectedUser(false)}
                    className="fixed inset-0 z-40 cursor-default"
                  />

                  {/* Dropdown Content */}
                  <div
                    className="
                      absolute right-0 top-full mt-2
                      z-50
                      w-56 sm:w-64
                      max-w-[calc(100vw-1.5rem)]
                      rounded-2xl
                      border border-slate-200
                      bg-slate-900
                      p-2
                      shadow-xl
                    "
                  >
                    {/* Profile */}
                    <NavLink
                      to={`/selectedUserProfile/${selectedUser._id}`}
                      onClick={() =>{setIsMenuOpenOfSelectedUser(false)
                        // handleSelectedUserProfile();
                      } }
                      
                      className="
                      flex items-center gap-3
                      rounded-xl px-3 py-3
                      text-white
                      hover:bg-slate-800
                      transition
                        "
                    >
                      <User size={20} className="text-blue-400" />
                      <span className="text-sm font-medium">Profile</span>
                    </NavLink>

                    {/* Home */}
                    <NavLink
                      to="/home"
                      onClick={() => setIsMenuOpenOfSelectedUser(false)}
                      className="
                        flex items-center gap-3
                        rounded-xl px-3 py-3
                        text-white
                        hover:bg-slate-800
                        transition
                      "
                    >
                      <Home size={20} className="text-blue-400" />
                      <span className="text-sm font-medium">Home</span>
                    </NavLink>

                    {/* Settings */}
                    <button
                      type="button"
                      onClick={() => setIsMenuOpenOfSelectedUser(false)}
                      className="
                        flex w-full items-center gap-3
                        rounded-xl px-3 py-3
                        text-slate-300
                        hover:bg-slate-800 hover:text-white
                        transition
                      "
                    >
                      <Settings size={20} />
                      <span className="text-sm font-medium">Settings</span>
                    </button>

                    {/* Divider */}
                    <div className="my-1 border-t border-slate-700" />

                    {/* Notifications */}
                    <button
                      type="button"
                      onClick={() => {
                        setIsMenuOpenOfSelectedUser(false);
                        handleEnableNotifications();
                      }}
                      className="
                        flex w-full items-center gap-3
                        rounded-xl px-3 py-3
                        text-amber-400
                        hover:bg-slate-800
                        transition
                      "
                    >
                      <Bell size={20} />
                      <span className="text-sm font-medium">Notifications</span>
                    </button>

                    {/* Logout */}
                    <button
                      type="button"
                      onClick={() => {
                        setIsMenuOpenOfSelectedUser(false);
                        logOut();
                      }}
                      className="
                        flex w-full items-center gap-3
                        rounded-xl px-3 py-3
                        text-red-400
                        hover:bg-red-500/10
                        transition
                      "
                    >
                      <LogOut size={20} />
                      <span className="text-sm font-medium">Logout</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </header>

          {/* =================================================
            MESSAGES
        ================================================= */}

          <div
            className="
            flex-1
            min-h-0
            overflow-y-auto
            p-3 sm:p-5 lg:p-6
            bg-slate-50
          "
          >
            {messages.length > 0 ? (
              [...messages]
                .filter(Boolean)
                .sort(
                  (a, b) =>
                    new Date(a.createdAt).getTime() -
                    new Date(b.createdAt).getTime(),
                )
                .map((message) => {
                  const isReceived = message.senderId == selectedUser._id;

                  return (
                    <div
                      key={message._id}
                      className={`flex ${
                        isReceived ? "justify-start" : "justify-end"
                      }`}
                    >
                      <span
                        className={`py-1 px-2 rounded mt-4 max-w-80 shadow-md ${
                          isReceived ? "bg-amber-100" : "bg-gray-200"
                        }`}
                      >
                        {/* Display text only when available */}
                        {message.text && (
                          <p className="wrap-break-word whitespace-pre-wrap">
                            {message.text}
                          </p>
                        )}

                        {/* Display image only when available */}
                        {message.image && (
                          <img
                            src={message.image}
                            alt="Shared image"
                            className="mt-2 max-h-64 max-w-full rounded-lg object-contain"
                          />
                        )}

                        <p className="text-xs text-end text-blue-500">
                          {new Date(message.createdAt).toLocaleTimeString(
                            "en-IN",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            },
                          )}
                        </p>
                      </span>
                    </div>
                  );
                })
            ) : (
              <div className="flex h-full flex-col items-center justify-center">
                <p>No conversation yet</p>
              </div>
            )}
          </div>

          {/* =================================================
            MESSAGE INPUT
        ================================================= */}

          <div
            className="
            p-2 sm:p-3 lg:p-4
            border-t border-slate-200
            bg-white
          "
          >
            <div className="flex items-center gap-2 sm:gap-3">
              {image ? (
                <h5 className="text-red-600 py-0.5 px-0.5">Image Selcted</h5>
              ) : (
                <div>
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    hidden
                    onChange={handleImageChange}
                  />

                  <label
                    htmlFor="image-upload"
                    className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer hover:bg-gray-200 transition"
                  >
                    <Plus size={24} />
                  </label>
                </div>
              )}

              <input
                type="text"
                placeholder="Write a message..."
                className="
                flex-1
                min-w-0
                bg-slate-100
                rounded-xl
                px-3 sm:px-4
                py-2.5 sm:py-3
                text-xs sm:text-sm
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "
                value={text}
                onChange={handleSetMessage}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
              />

              <button
                type="button"
                className="
                w-10 h-10
                sm:w-12 sm:h-12
                shrink-0
                rounded-xl
                bg-blue-600
                text-white
                flex items-center justify-center
                hover:bg-blue-700
                transition
                shadow-sm
              "
                onClick={sendMessage}
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </main>
      ) : (
        <div
          className="
          flex-1
          min-w-0
          bg-white
          rounded-xl sm:rounded-2xl
          shadow-sm
          flex flex-col
          overflow-hidden
          items-center
          justify-center
        "
        >
          <p className=" py-3 px-4 bg-gray-200 rounded shadow-lg">
            {" "}
            Selecte Any user To Communicate
          </p>
        </div>
      )}
    </div>
  );
}

export default UserHome;
