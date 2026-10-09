import {
  Settings,
  Home,
  LogOut,
  User,
  Search,
  Send,
  MoreVertical,
  ArrowLeft,
  Menu,
  X,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function UserHome() {

  const url = "https://backendofchatapp-vpla.onrender.com"
  
  // const localurlGetUser = "http://localhost:9838/api/v1/message/users"
  // http://localhost:9838/api/v1/message/receivedMessage/
  // "http://localhost:9838/api/v1/message/send"
  // "http://localhost:9838/api/v1/auth/logout"
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const getCurrentUser = async () => {
    try {
      const response = await fetch(
        `${url}/api/v1/message/users`
        ,
        { credentials: "include" },
      );
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

      const data = await response.json();
      setChats(data.success && Array.isArray(data.users) ? data.users : []);
    } catch (error) {
      console.error("Error fetching users:", error);
      setChats([]);
    }
  };

  const getConversationOfSelectedUser = async () => {
    if (!selectedUser?._id) return;

    try {
      const response = await fetch(
        `${url}//api/v1/message/receivedMessage/${selectedUser._id}`
        ,
        { credentials: "include" },
      );
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

      const data = await response.json();
      console.log("API res of getChat: ", data);
      
      setMessages(Array.isArray(data.messages) ? data.messages : []);
    } catch (error) {
      console.error("Error fetching conversation:", error);
      setMessages([]);
    }
  };

  const handleSetMessage = (e) => setText(e.target.value);

  const sendMessage = async (e) => {
    e?.preventDefault();
    const trimmedText = text.trim();
    if (!trimmedText || !selectedUser?._id) return;

    try {
      const response = await fetch(
        `${url}/api/v1/message/send`
        ,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: trimmedText,
            receiverId: selectedUser._id,
          }),
          credentials: "include",
        },
      );

      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      setText("");
      await getConversationOfSelectedUser();
    } catch (error) {
      console.error("Error while sending message:", error);
    }
  };

  const logOut = async () => {
    try {
      const response = await fetch(
        `${url}/v1/auth/logout`
        , 
        {
        credentials: "include",
      });
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (selectedUser?._id) getConversationOfSelectedUser();
    else setMessages([]);
  }, [selectedUser]);

  const filteredChats = chats.filter((chat) => {
    const name = chat?.name || "";
    const username = chat?.username || chat?.email || "";
    return `${name} ${username}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  });

  const NavItems = ({ mobile = false }) => (
    <>
      <NavLink
        to="/profile"
        aria-label="Profile"
        title="Profile"
        className={({ isActive }) =>
          `${mobile ? "flex-1 flex-col gap-1 py-2" : "h-11 w-11"} rounded-xl flex items-center justify-center transition ${
            isActive
              ? "bg-blue-600 text-white"
              : "text-slate-400 hover:bg-slate-800 hover:text-white"
          }`
        }
      >
        <User size={20} />
        {mobile && <span className="text-[10px]">Profile</span>}
      </NavLink>
      <NavLink
        to="/"
        aria-label="Home"
        title="Home"
        className={({ isActive }) =>
          `${mobile ? "flex-1 flex-col gap-1 py-2" : "h-11 w-11"} rounded-xl flex items-center justify-center transition ${
            isActive
              ? "bg-blue-600 text-white"
              : "text-slate-400 hover:bg-slate-800 hover:text-white"
          }`
        }
      >
        <Home size={20} />
        {mobile && <span className="text-[10px]">Home</span>}
      </NavLink>
      <button
        type="button"
        aria-label="Settings"
        title="Settings"
        className={`${
          mobile ? "flex-1 flex-col gap-1 py-2" : "h-11 w-11"
        } rounded-xl flex items-center justify-center text-slate-400 transition hover:bg-slate-800 hover:text-white`}
      >
        <Settings size={20} />
        {mobile && <span className="text-[10px]">Settings</span>}
      </button>
      <button
        type="button"
        onClick={logOut}
        aria-label="Log out"
        title="Log out"
        className={`${
          mobile ? "flex-1 flex-col gap-1 py-2" : "h-11 w-11"
        } rounded-xl flex items-center justify-center text-slate-400 transition hover:bg-red-500/20 hover:text-red-400`}
      >
        <LogOut size={20} />
        {mobile && <span className="text-[10px]">Logout</span>}
      </button>
    </>
  );

  console.log("Selected User", selectedUser);
  console.log("messages", messages);
  
  

  return (
    <div className="h-[100dvh] min-h-0 overflow-hidden bg-slate-100 p-0 sm:p-3 flex gap-3">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-16 lg:w-20 shrink-0 rounded-2xl bg-slate-900 py-5 shadow-lg flex-col items-center justify-between">
        <div className="flex flex-col items-center gap-5">
          <NavItems />
        </div>
      </aside>

      {/* Conversation list: on mobile it is the main screen until a chat is selected */}
      <section
        className={`${
          selectedUser ? "hidden md:flex" : "flex"
        } w-full md:w-64 lg:w-80 md:shrink-0 min-w-0 bg-white md:rounded-2xl shadow-sm flex-col overflow-hidden`}
      >
        <div className="p-4 sm:p-5 border-b border-slate-200">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold text-slate-800">Messages</h1>
              <p className="hidden sm:block text-sm text-slate-400 mt-1">
                Your conversations
              </p>
            </div>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setIsMobileNavOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={isMobileNavOpen}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-slate-700 transition hover:bg-slate-100 md:hidden"
            >
              <Menu size={24} />
            </button>
          </div>
          <label className="flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-3 focus-within:ring-2 focus-within:ring-blue-500">
            <Search size={18} className="shrink-0 text-slate-400" />
            <input
              type="search"
              placeholder="Search people..."
              aria-label="Search people"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="min-w-0 w-full bg-transparent text-base sm:text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />
          </label>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto pb-20 md:pb-0">
          {filteredChats.length === 0 ? (
            <div className="flex h-full items-center justify-center p-5">
              <p className="text-sm text-slate-400 text-center">
                {searchTerm ? "No matching users found" : "No users found"}
              </p>
            </div>
          ) : (
            filteredChats.map((chat) => {
              const name = chat?.name || "Unknown User";
              const username = chat?.username || chat?.email || "No username";
              const isSelected = selectedUser?._id === chat?._id;

              return (
                <button
                  type="button"
                  key={chat?._id}
                  onClick={() => setSelectedUser(chat)}
                  className={`w-full flex items-center gap-3 px-4 py-3 sm:py-4 text-left border-b border-slate-100 transition hover:bg-slate-50 ${
                    isSelected
                      ? "bg-blue-50 md:border-l-4 md:border-l-blue-600"
                      : ""
                  }`}
                >
                  <div className="relative shrink-0">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
                      {name.charAt(0).toUpperCase()}
                    </div>
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="truncate text-sm font-semibold text-slate-800">
                        {name}
                      </h3>
                      <span className="shrink-0 text-[10px] text-slate-400">
                        Online
                      </span>
                    </div>
                    <p className="mt-1 truncate text-xs text-slate-400">
                      {username}
                    </p>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </section>

      {/* Chat panel */}
      {selectedUser ? (
        <main className="flex min-w-0 flex-1 flex-col overflow-hidden bg-white shadow-sm md:rounded-2xl">
          <header className="flex min-h-[68px] items-center justify-between gap-2 border-b border-slate-200 px-3 sm:px-5">
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
              {/* Back button is shown only on phones */}
              <button
                type="button"
                onClick={() => setIsMobileNavOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={isMobileNavOpen}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 md:hidden"
              >
                <Menu size={22} />
              </button>
              <button
                type="button"
                onClick={() => setSelectedUser(null)}
                aria-label="Back to conversations"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 md:hidden"
              >
                <ArrowLeft size={21} />
              </button>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700 sm:h-11 sm:w-11">
                {(selectedUser.name || "U").charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <h2 className="truncate text-sm font-semibold text-slate-800 sm:text-base">
                  {selectedUser.name || "Unknown User"}
                </h2>
                <p className="text-xs text-green-600">Online</p>
              </div>
            </div>
            <button
              type="button"
              aria-label="More chat options"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100"
            >
              <MoreVertical size={20} />
            </button>
          </header>

          <div className="flex-1 min-h-0 space-y-3 overflow-y-auto bg-slate-50 px-3 py-4 sm:px-5 lg:px-6">
            {messages.length === 0 ? (
              <div className="flex h-full items-center justify-center">
                <p className="rounded-xl bg-white px-4 py-3 text-center text-sm text-slate-400 shadow-sm">
                  No conversation yet. Say hello!
                </p>
              </div>
            ) : (
              messages.map((message) => {
                const isReceived = message.senderId === selectedUser._id;
                return (
                  <div
                    key={message._id}
                    className={`flex w-full ${isReceived ? "justify-start" : "justify-end"}`}
                  >
                    <p
                      className={`max-w-[85%] break-words rounded-2xl px-3 py-2 text-sm leading-relaxed sm:max-w-[70%] ${
                        isReceived
                          ? "rounded-bl-md bg-white text-slate-800 shadow-sm"
                          : "rounded-br-md bg-blue-600 text-white"
                      }`}
                    >
                      {message.text}
                    </p>
                  </div>
                );
              })
            )}
          </div>

          <form
            onSubmit={sendMessage}
            className="border-t border-slate-200 bg-white p-3 sm:p-4"
          >
            <div className="mx-auto flex max-w-5xl items-center gap-2 sm:gap-3">
              <input
                type="text"
                placeholder="Write a message..."
                aria-label="Write a message"
                value={text}
                onChange={handleSetMessage}
                className="min-w-0 flex-1 rounded-xl bg-slate-100 px-4 py-3 text-base text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
              />
              <button
                type="submit"
                aria-label="Send message"
                disabled={!text.trim()}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send size={19} />
              </button>
            </div>
          </form>
        </main>
      ) : (
        <main className="hidden min-w-0 flex-1 flex-col items-center justify-center overflow-hidden bg-white shadow-sm md:flex md:rounded-2xl">
          <div className="rounded-2xl bg-blue-50 px-6 py-5 text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <Send size={24} />
            </div>
            <h2 className="font-semibold text-slate-800">Your messages</h2>
            <p className="mt-1 text-sm text-slate-500">
              Select a conversation to start chatting.
            </p>
          </div>
        </main>
      )}

      {/* Mobile side navigation drawer */}
      {isMobileNavOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          {/* Backdrop closes the drawer */}
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setIsMobileNavOpen(false)}
            className="absolute inset-0 bg-slate-950/50"
          />

          <nav
            aria-label="Mobile navigation"
            className="absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col bg-slate-900 px-4 py-5 shadow-2xl"
          >
            <div className="mb-8 flex items-center justify-between">
              <span className="text-lg font-semibold text-white">
                Navigation
              </span>
              <button
                type="button"
                onClick={() => setIsMobileNavOpen(false)}
                aria-label="Close navigation menu"
                className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white"
              >
                <X size={22} />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <NavLink
                to="/profile"
                onClick={() => setIsMobileNavOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >
                <User size={20} />
                <span>Profile</span>
              </NavLink>

              <NavLink
                to="/"
                onClick={() => setIsMobileNavOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >
                <Home size={20} />
                <span>Home</span>
              </NavLink>

              <button
                type="button"
                onClick={() => setIsMobileNavOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-left text-slate-300 transition hover:bg-slate-800 hover:text-white"
              >
                <Settings size={20} />
                <span>Settings</span>
              </button>

              <button
                type="button"
                onClick={logOut}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-left text-slate-300 transition hover:bg-red-500/20 hover:text-red-400"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}

export default UserHome;
