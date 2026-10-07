import {
  Settings,
  Home,
  LogOut,
  User,
  Search,
  Send,
  MoreVertical,
  ArrowLeft,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function UserHome() {
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [conversations, setConversations] = useState(null);
  const [text, setText] = useState("");

  // get user
  const getCurrentUser = async () => {
    try {
      const response = await fetch(
        "http://localhost:9838/api/v1/message/users",
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

  // get selected user conversation
  const getConversationOfSelectedUser = async () => {
    try {
      const response = await fetch(
        `http://localhost:9838/api/v1/message/receivedMessage/${selectedUser._id}`,
        {
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();

      console.log("API Response:", data);

      setConversations(data.messages);
    } catch (error) {
      console.error("Error fetching users:", error);
      setConversations(null);
    }
  };

  // setting message

  const handleSetMessage = (e) => {
    setText(e.target.value);
  };

  // sending message

  const sendMessage = async (e) => {
    console.log("text: ", text);
    console.log("receiverId", selectedUser._id);

    const messageObj = {
      text: text,
      receiverId: selectedUser._id,
    };

    try {
      const responce = await fetch(
        `http://localhost:9838/api/v1/message/send`,
        {
          method: "POST",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify(messageObj),
          credentials: "include",
        },
      );
      setText("");
    } catch (error) {
      console.log("Error wile sending message", error);
      setText(null);
    }
  };

  const logOut = async () => {
    try {
      const response = await fetch(`http://localhost:9838/api/v1/auth/logout`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();

      console.log("API Response:", data);
      alert(data.message)

      navigate("/login");
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // for getting users
  useEffect(() => {
    getCurrentUser();
  }, []);

  //  for getting seledted user Conversation

  useEffect(() => {
    if (!selectedUser?._id) return;

    getConversationOfSelectedUser();
  }, [selectedUser]);

  // sending message

  useEffect(() => {
    if (!text) return;
    sendMessage();
  }, []);

  console.log("Selected User:", selectedUser);
  console.log("Chats", conversations);

  return (
    <div className="h-screen bg-slate-100 p-2 sm:p-3 flex gap-2 sm:gap-3 overflow-hidden">
      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside
        className="
          w-14 sm:w-16 lg:w-20
          shrink-0
          bg-slate-900
          rounded-xl sm:rounded-2xl
          flex flex-col items-center justify-between
          py-3 sm:py-5
          shadow-lg
        "
      >
        {/* Profile + Navigation */}
        <div className="flex flex-col items-center gap-5 sm:gap-8">
          {/* Profile */}
          <NavLink
            to="/profile"
            className="
              w-9 h-9 sm:w-11 sm:h-11 lg:w-12 lg:h-12
              rounded-full
              bg-blue-600
              flex items-center justify-center
              text-white
              hover:bg-blue-700
              transition
            "
          >
            <User size={18} />
          </NavLink>

          {/* Navigation */}
          <nav className="flex flex-col gap-2 sm:gap-4">
            <NavLink
              to="/"
              className="
                w-9 h-9 sm:w-11 sm:h-11 lg:w-12 lg:h-12
                rounded-lg sm:rounded-xl
                bg-blue-600
                text-white
                flex items-center justify-center
              "
            >
              <Home size={19} />
            </NavLink>

            <button
              type="button"
              className="
                w-9 h-9 sm:w-11 sm:h-11 lg:w-12 lg:h-12
                rounded-lg sm:rounded-xl
                text-slate-400
                hover:bg-slate-800
                hover:text-white
                flex items-center justify-center
                transition
              "
            >
              <Settings size={19} />
            </button>
          </nav>
        </div>

        {/* Logout */}
        <button
          type="button"
          className="
            w-9 h-9 sm:w-11 sm:h-11 lg:w-12 lg:h-12
            rounded-lg sm:rounded-xl
            text-slate-400
            hover:bg-red-500/20
            hover:text-red-400
            flex items-center justify-center
            transition
          "
          onClick={logOut}
        >
          <LogOut size={19} />
        </button>
      </aside>

      {/* =====================================================
          CHAT LIST
      ===================================================== */}

      <section
        className="
          w-60
          sm:w-72
          md:w-80
          lg:w-80
          shrink-0
          bg-white
          rounded-xl sm:rounded-2xl
          shadow-sm
          flex flex-col
          overflow-hidden
        "
      >
        {/* Header */}
        <div className="p-3 sm:p-5 border-b border-slate-200">
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-slate-800">
                Messages
              </h1>

              <p className="hidden sm:block text-sm text-slate-400">
                Your conversations
              </p>
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
                  onClick={() => setSelectedUser(chat)}
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

      <main
        className="
          flex-1
          min-w-0
          bg-white
          rounded-xl sm:rounded-2xl
          shadow-sm
          flex flex-col
          overflow-hidden
        "
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
            {/* Back button */}

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
                "
              >
                A
              </div>

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

          {/* Actions */}
          <div className="flex items-center gap-0.5 sm:gap-2 shrink-0">
            <button
              type="button"
              className="
                w-8 h-8 sm:w-10 sm:h-10
                rounded-lg
                hover:bg-slate-100
                text-slate-500
                flex items-center justify-center
                transition
              "
            >
              <MoreVertical size={18} />
            </button>
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
          {conversations ? conversations.map((e) => <p> {e}</p>) : ""}
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
    </div>
  );
}

export default UserHome;
