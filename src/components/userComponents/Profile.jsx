import React from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit3,
  Settings,
  Shield,
  Bell,
  LogOut,
  Camera,
  MessageCircle,
} from "lucide-react";

function Profile() {
  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 py-6 sm:px-6 lg:px-10">
      {/* Main Container */}
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">My Profile</h1>

            <p className="mt-1 text-sm text-slate-400">
              Manage your ChapApp profile
            </p>
          </div>
          {/* 
          <button
            className="
              flex items-center gap-2 rounded-xl
              border border-slate-700
              bg-slate-900 px-4 py-2
              text-sm text-slate-300
              transition
              hover:border-indigo-500
              hover:bg-indigo-500/10
              hover:text-indigo-400
            "
          >
            <Settings size={18} />
            <span className="hidden sm:block">Settings</span>
          </button> */}
        </div>

        {/* Profile Card */}
        <div
          className="
            overflow-hidden rounded-3xl
            border border-slate-800
            bg-slate-900/70
            shadow-2xl shadow-black/20
            backdrop-blur-xl
          "
        >
          {/* Cover */}
          <div
            className="
              relative h-32
              bg-linear-to-r
              from-indigo-600
              via-purple-600
              to-pink-600
              sm:h-40
            "
          >
            <div className="absolute inset-0 bg-black/20" />
          </div>

          {/* Profile Content */}
          <div className="px-5 pb-6 sm:px-8">
            {/* Avatar */}
            <div className="relative -mt-14 mb-4 w-fit sm:-mt-16">
              <div
                className="
                  flex h-28 w-28
                  items-center justify-center
                  overflow-hidden rounded-full
                  border-4 border-slate-900
                  bg-indigo-600
                  text-4xl font-bold
                  shadow-xl
                  sm:h-32 sm:w-32
                "
              >
                K
              </div>

              {/* Camera Button */}
              <button
                className="
                  absolute bottom-1 right-1
                  flex h-9 w-9
                  items-center justify-center
                  rounded-full
                  border-4 border-slate-900
                  bg-indigo-600
                  text-white
                  transition
                  hover:bg-indigo-500
                "
              >
                <Camera size={15} />
              </button>
            </div>

            {/* Name + Edit */}
            <div
              className="
                flex flex-col gap-4
                sm:flex-row sm:items-start
                sm:justify-between
              "
            >
              <div>
                <h2 className="text-2xl font-bold">Kamran</h2>

                <p className="text-sm text-indigo-400">@kamran</p>

                <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
                  Developer, learner and tech enthusiast. Building things and
                  connecting with people.
                </p>
              </div>

              <button
                className="
                  flex w-full items-center justify-center
                  gap-2 rounded-xl
                  bg-indigo-600 px-5 py-3
                  text-sm font-medium
                  transition
                  hover:bg-indigo-500
                  sm:w-auto
                "
              >
                <Edit3 size={17} />
                Edit Profile
              </button>
            </div>

            {/* Stats
            <div
              className="
                mt-7 grid
                grid-cols-3
                divide-x divide-slate-800
                rounded-2xl
                border border-slate-800
                bg-slate-950/50
              "
            >
              <div className="py-4 text-center">
                <p className="text-xl font-bold">128</p>
                <p className="mt-1 text-xs text-slate-500">Friends</p>
              </div>

              <div className="py-4 text-center">
                <p className="text-xl font-bold">54</p>
                <p className="mt-1 text-xs text-slate-500">Chats</p>
              </div>

              <div className="py-4 text-center">
                <p className="text-xl font-bold">32</p>
                <p className="mt-1 text-xs text-slate-500">Groups</p>
              </div>
            </div>*/}
          </div>
        </div>

        {/* Information Grid */}
        <div
          className="
            mt-6 grid
            grid-cols-1
            gap-6
            lg:grid-cols-2
          "
        >
          {/* Personal Information */}
          <div
            className="
              rounded-3xl
              border border-slate-800
              bg-slate-900/70
              p-5
              backdrop-blur-xl
              sm:p-6
            "
          >
            <div className="mb-6 flex items-center gap-3">
              <div
                className="
                  flex h-10 w-10
                  items-center justify-center
                  rounded-xl
                  bg-indigo-500/10
                  text-indigo-400
                "
              >
                <User size={20} />
              </div>

              <div>
                <h3 className="font-semibold">Personal Information</h3>

                <p className="text-xs text-slate-500">Your account details</p>
              </div>
            </div>

            <div className="space-y-5">
              <InfoItem
                icon={<Mail size={18} />}
                title="Email"
                value="kamran@example.com"
              />

              <InfoItem
                icon={<Phone size={18} />}
                title="Phone"
                value="+91 98765 43210"
              />

              <InfoItem
                icon={<MapPin size={18} />}
                title="Location"
                value="New Delhi, India"
              />

              <InfoItem
                icon={<Calendar size={18} />}
                title="Joined"
                value="September 2026"
              />
            </div>
          </div>

          {/* Account Settings */}
          {/* <div
            className="
              rounded-3xl
              border border-slate-800
              bg-slate-900/70
              p-5
              backdrop-blur-xl
              sm:p-6
            "
          > */}
            {/* <div className="mb-6 flex items-center gap-3">
              <div
                className="
                  flex h-10 w-10
                  items-center justify-center
                  rounded-xl
                  bg-purple-500/10
                  text-purple-400
                "
              >
                <Settings size={20} />
              </div>

              <div>
                <h3 className="font-semibold">Account</h3>

                <p className="text-xs text-slate-500">Manage your account</p>
              </div>
            </div> */}

            {/* <div className="space-y-2">
              <SettingItem
                icon={<Bell size={19} />}
                title="Notifications"
                description="Manage notifications"
              />

              <SettingItem
                icon={<Shield size={19} />}
                title="Privacy & Security"
                description="Control your privacy"
              />

              <SettingItem
                icon={<MessageCircle size={19} />}
                title="Chat Settings"
                description="Customize your chats"
              />

              <SettingItem
                icon={<LogOut size={19} />}
                title="Logout"
                description="Sign out of your account"
                danger
              />
            </div> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}

/* Information Item */
function InfoItem({ icon, title, value }) {
  return (
    <div className="flex items-center gap-4">
      <div
        className="
          flex h-10 w-10 shrink-0
          items-center justify-center
          rounded-xl
          bg-slate-800
          text-slate-400
        "
      >
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs text-slate-500">{title}</p>

        <p className="truncate text-sm text-slate-200">{value}</p>
      </div>
    </div>
  );
}

// /* Setting Item */
// function SettingItem({ icon, title, description, danger = false }) {
//   return (
//     <button
//       className={`
//         group flex w-full
//         items-center gap-4
//         rounded-2xl
//         p-3
//         text-left
//         transition
//         ${danger ? "hover:bg-red-500/10" : "hover:bg-slate-800/70"}
//       `}
//     >
//       <div
//         className={`
//           flex h-10 w-10 shrink-0
//           items-center justify-center
//           rounded-xl
//           ${
//             danger
//               ? "bg-red-500/10 text-red-400"
//               : "bg-slate-800 text-slate-400 group-hover:text-indigo-400"
//           }
//         `}
//       >
//         {icon}
//       </div>

//       <div>
//         <p
//           className={`
//             text-sm font-medium
//             ${danger ? "text-red-400" : "text-slate-200"}
//           `}
//         >
//           {title}
//         </p>

//         <p className="mt-1 text-xs text-slate-500">{description}</p>
//       </div>
//     </button>
//   );
// }

export default Profile;
