import {
  Settings,
  Home,
  Bell,
  LogOut,
  MessageCircle,
  User,
  Search,
  Send,
  MoreVertical,
  Phone,
  Video,
  ArrowLeft,
} from "lucide-react";
import { NavLink } from "react-router-dom";
function UserHome() {
  const chats = [
    {
      name: "Aman Khan",
      message: "Hey, are you available?",
      time: "2:40 PM",
      unread: 2,
    },
    {
      name: "Rahul Sharma",
      message: "Let's meet tomorrow.",
      time: "1:25 PM",
      unread: 0,
    },
    {
      name: "Sarah",
      message: "Thanks for your help!",
      time: "12:10 PM",
      unread: 1,
    },
    {
      name: "Adil",
      message: "Did you complete the project?",
      time: "11:45 AM",
      unread: 0,
    },
    {
      name: "John",
      message: "See you soon.",
      time: "10:30 AM",
      unread: 0,
    },
    {
      name: "Priya",
      message: "That's awesome!",
      time: "Yesterday",
      unread: 3,
    },
    {
      name: "Priya",
      message: "That's awesome!",
      time: "Yesterday",
      unread: 3,
    },
    {
      name: "Priya",
      message: "That's awesome!",
      time: "Yesterday",
      unread: 3,
    },
    {
      name: "Priya",
      message: "That's awesome!",
      time: "Yesterday",
      unread: 3,
    },
    {
      name: "Priya",
      message: "That's awesome!",
      time: "Yesterday",
      unread: 3,
    },
    {
      name: "Priya",
      message: "That's awesome!",
      time: "Yesterday",
      unread: 3,
    },
    {
      name: "Priya",
      message: "That's awesome!",
      time: "Yesterday",
      unread: 3,
    },
    {
      name: "Priya",
      message: "That's awesome!",
      time: "Yesterday",
      unread: 3,
    },
  ];

  return (
    <div className="h-screen bg-slate-100 p-2 sm:p-3 flex gap-2 sm:gap-3 overflow-hidden">

      {/* ================= SIDEBAR ================= */}

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
          <button
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
           <NavLink to={"/profile"}>
             <User size={18} />
           </NavLink>
          </button>


          {/* Navigation */}
          <nav className="flex flex-col gap-2 sm:gap-4">

            <button
              className="
                w-9 h-9 sm:w-11 sm:h-11 lg:w-12 lg:h-12
                rounded-lg sm:rounded-xl
                bg-blue-600
                text-white
                flex items-center justify-center
              "
            >
              <Home size={19} />
            </button>

            <button
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
              <MessageCircle size={19} />
            </button>

            <button
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
              <Bell size={19} />
            </button>

            <button
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
          className="
            w-9 h-9 sm:w-11 sm:h-11 lg:w-12 lg:h-12
            rounded-lg sm:rounded-xl
            text-slate-400
            hover:bg-red-500/20
            hover:text-red-400
            flex items-center justify-center
            transition
          "
        >
          <LogOut size={19} />
        </button>

      </aside>


      {/* ================= CHAT LIST ================= */}

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

            <button
              className="
                w-8 h-8 sm:w-9 sm:h-9
                rounded-lg
                bg-slate-100
                flex items-center justify-center
                hover:bg-blue-50
                hover:text-blue-600
                transition
              "
            >
              <MoreVertical size={17} />
            </button>

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

            <Search
              size={17}
              className="text-slate-400 shrink-0"
            />

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


        {/* Chat List */}
        <div className="flex-1 min-h-0 overflow-y-auto">

          {chats.map((chat, index) => (

            <div
              key={index}
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
                  {chat.name.charAt(0)}
                </div>

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


              {/* Information */}
              <div className="flex-1 min-w-0">

                <div className="flex justify-between items-center gap-2">

                  <h3 className="font-semibold text-xs sm:text-sm text-slate-800 truncate">
                    {chat.name}
                  </h3>

                  <span className="text-[9px] sm:text-[11px] text-slate-400 shrink-0">
                    {chat.time}
                  </span>

                </div>

                <div className="flex items-center justify-between">

                  <p className="text-[10px] sm:text-xs text-slate-400 truncate mt-1">
                    {chat.message}
                  </p>

                  {chat.unread > 0 && (
                    <span
                      className="
                        ml-1
                        min-w-4 h-4 sm:min-w-5 sm:h-5
                        px-1
                        rounded-full
                        bg-blue-600
                        text-white
                        text-[9px]
                        flex items-center justify-center
                      "
                    >
                      {chat.unread}
                    </span>
                  )}

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>


      {/* ================= CHAT WINDOW ================= */}

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

            {/* Back button - useful on small screens */}
            <button
              className="
                lg:hidden
                w-8 h-8
                rounded-lg
                hover:bg-slate-100
                flex items-center justify-center
              "
            >
              <ArrowLeft size={18} />
            </button>

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

              <span
                className="
                  absolute bottom-0 right-0
                  w-2.5 h-2.5 sm:w-3 sm:h-3
                  bg-green-500
                  border-2 border-white
                  rounded-full
                "
              />

            </div>


            <div className="min-w-0">

              <h2 className="font-semibold text-sm sm:text-base text-slate-800 truncate">
                Aman Khan
              </h2>

              <p className="text-[10px] sm:text-xs text-green-500">
                Online
              </p>

            </div>

          </div>


          {/* Actions */}
          <div className="flex items-center gap-0.5 sm:gap-2 shrink-0">

            <button
              className="
                w-8 h-8 sm:w-10 sm:h-10
                rounded-lg
                hover:bg-slate-100
                text-slate-500
                hover:text-blue-600
                flex items-center justify-center
                transition
              "
            >
              <Phone size={17} />
            </button>

            <button
              className="
                w-8 h-8 sm:w-10 sm:h-10
                rounded-lg
                hover:bg-slate-100
                text-slate-500
                hover:text-blue-600
                flex items-center justify-center
                transition
              "
            >
              <Video size={18} />
            </button>

            <button
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


        {/* ================= MESSAGES ================= */}

        <div
          className="
            flex-1
            min-h-0
            overflow-y-auto
            p-3 sm:p-5 lg:p-6
            bg-slate-50
          "
        >

          {/* Received */}
          <div className="flex mb-3 sm:mb-4">

            <div
              className="
                max-w-[75%]
                sm:max-w-md
                bg-white
                border border-slate-200
                px-3 sm:px-4
                py-2.5 sm:py-3
                rounded-2xl rounded-tl-sm
                shadow-sm
              "
            >

              <p className="text-xs sm:text-sm text-slate-700">
                Hey! How are you doing?
              </p>

              <span className="text-[9px] sm:text-[10px] text-slate-400 block mt-1">
                02:35 PM
              </span>

            </div>

          </div>


          {/* Sent */}
          <div className="flex justify-end mb-3 sm:mb-4">

            <div
              className="
                max-w-[75%]
                sm:max-w-md
                bg-blue-600
                text-white
                px-3 sm:px-4
                py-2.5 sm:py-3
                rounded-2xl rounded-tr-sm
                shadow-sm
              "
            >

              <p className="text-xs sm:text-sm">
                I'm doing great! What about you?
              </p>

              <span className="text-[9px] sm:text-[10px] text-blue-100 block mt-1 text-right">
                02:36 PM
              </span>

            </div>

          </div>


          {/* Received */}
          <div className="flex mb-3 sm:mb-4">

            <div
              className="
                max-w-[75%]
                sm:max-w-md
                bg-white
                border border-slate-200
                px-3 sm:px-4
                py-2.5 sm:py-3
                rounded-2xl rounded-tl-sm
                shadow-sm
              "
            >

              <p className="text-xs sm:text-sm text-slate-700">
                I'm good too. Are you working on the ChatApp?
              </p>

              <span className="text-[9px] sm:text-[10px] text-slate-400 block mt-1">
                02:39 PM
              </span>

            </div>

          </div>


          {/* Sent */}
          <div className="flex justify-end mb-3 sm:mb-4">

            <div
              className="
                max-w-[75%]
                sm:max-w-md
                bg-blue-600
                text-white
                px-3 sm:px-4
                py-2.5 sm:py-3
                rounded-2xl rounded-tr-sm
                shadow-sm
              "
            >

              <p className="text-xs sm:text-sm">
                Yes! I'm building the UI right now.
              </p>

              <span className="text-[9px] sm:text-[10px] text-blue-100 block mt-1 text-right">
                02:40 PM
              </span>

            </div>

          </div>

        </div>


        {/* ================= MESSAGE INPUT ================= */}

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
            />

            <button
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