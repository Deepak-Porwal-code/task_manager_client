"use client";
import { useTasks } from "@/context/taskContext";
import { useUserContext } from "@/context/userContext";
import useDetectOutside from "@/hooks/useDetectOutside";
import { badge, check, github, mail } from "@/utils/Icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

function ProfileModal() {
  const ref = React.useRef(null);

  const { closeModal } = useTasks();
  const { user, updateUser, handlerUserInput, userState, changePassword, logoutUser } =
    useUserContext();
  const router = useRouter();

  useDetectOutside({
    ref,
    callback: () => {
      closeModal();
    },
  });

  const { name, email, photo } = user;
  const isLoggedIn = !!user._id;

  //state
  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");

  const handlePassword = (type: string) => (e: any) => {
    if (type === "old") {
      setOldPassword(e.target.value);
    } else {
      setNewPassword(e.target.value);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm overflow-y-auto py-6 px-4 animate-fadeIn">
      <div
        ref={ref}
        className="relative py-5 px-6 max-w-[520px] w-full flex flex-col gap-3 bg-white rounded-xl shadow-lg border border-gray-100 animate-scaleIn"
      >
        <div className="absolute left-0 top-0 w-full h-[80px] bg-gradient-to-r from-indigo-100 to-purple-100 rounded-t-xl"></div>

        <div className="mt-4 relative flex justify-between">
          <div className="relative inline-block group">
            <Image
              src={photo}
              alt="profile"
              width={80}
              height={80}
              className="rounded-full border-4 border-white shadow-md transition-all duration-300 group-hover:shadow-lg transform group-hover:scale-105"
            />
            <div className="absolute bottom-0 right-1 shadow-sm">
              <span className="text-lg text-blue-500">{badge}</span>
              <span className="absolute z-20 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-xs text-white">
                {check}
              </span>
            </div>
          </div>
          <div className="self-end flex items-center gap-2 animate-fadeInUp">
            <button className="flex items-center gap-2 border border-gray-200 rounded-md py-1 px-3 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-800 hover:text-white hover:border-transparent transition-all duration-300 transform hover:scale-105">
              {github} Github
            </button>
            <button className="flex items-center gap-2 border border-gray-200 rounded-md py-1 px-3 text-xs font-medium text-gray-700 shadow-sm hover:bg-blue-500 hover:text-white hover:border-transparent transition-all duration-300 transform hover:scale-105">
              {check} Verified
            </button>
          </div>
        </div>
        <div className="animate-fadeInUp">
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">{name}</h1>
          <p className="text-sm text-gray-500">{email}</p>
        </div>

        <form
          action=""
          className="mt-4 pt-2 flex flex-col gap-4 border-t border-gray-200 animate-fadeInUp"
          onSubmit={(e) => {
            e.preventDefault();
            updateUser(e, {
              name: userState.name,
              email: userState.email,
            });
          }}
        >
          <div className="pt-2 grid grid-cols-[150px_1fr] items-center">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={name}
              onChange={(e) => handlerUserInput("name")(e)}
              className="py-2 px-4 font-medium rounded-lg border border-gray-200 shadow-sm focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 focus:outline-none transition-all duration-200"
            />
          </div>

          <div className="pt-4 grid grid-cols-[150px_1fr] items-center border-t border-gray-200">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="relative w-full group">
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={(e) => handlerUserInput("email")(e)}
                className="w-full py-2 pl-10 pr-4 font-medium rounded-lg border border-gray-200 shadow-sm focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 focus:outline-none transition-all duration-200"
              />
              <span className="absolute left-0 top-0 bottom-0 flex items-center px-3 text-gray-400 group-hover:text-indigo-500 transition-colors duration-200">
                {mail}
              </span>
            </div>
          </div>

          <div className="pt-4 grid grid-cols-2 gap-6 border-t border-gray-200">
            <div className="flex flex-col gap-2">
              <label htmlFor="oldPassWord" className="text-sm font-medium text-gray-700">
                Old Password
              </label>
              <input
                type="password"
                id="oldPassword"
                value={oldPassword}
                onChange={handlePassword("old")}
                className="py-2 px-4 font-medium rounded-lg border border-gray-200 shadow-sm focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 focus:outline-none transition-all duration-200"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="newPassword" className="text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={handlePassword("new")}
                className="py-2 px-4 font-medium rounded-lg border border-gray-200 shadow-sm focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 focus:outline-none transition-all duration-200"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="py-2 px-5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium rounded-lg shadow-md
                hover:from-indigo-600 hover:to-purple-600 transform transition-all duration-300 hover:scale-105 hover:shadow-lg
                focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-opacity-50"
              onClick={() => changePassword(oldPassword, newPassword)}
            >
              Change Password
            </button>
          </div>

          <div className="flex justify-between gap-4 border-t border-gray-200 pt-2">
            {isLoggedIn ? (
              <button
                type="button"
                onClick={() => logoutUser()}
                className="mt-3 py-2 px-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-medium rounded-lg shadow-md
                  hover:from-red-600 hover:to-pink-600 transform transition-all duration-300 hover:scale-105 hover:shadow-lg
                  focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-opacity-50 animate-pulse"
              >
                Logout
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  closeModal();
                  router.push('/login');
                }}
                className="mt-3 py-2 px-5 bg-gradient-to-r from-blue-500 to-teal-400 text-white text-sm font-medium rounded-lg shadow-md
                  hover:from-blue-600 hover:to-teal-500 transform transition-all duration-300 hover:scale-105 hover:shadow-lg
                  focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
              >
                Login
              </button>
            )}
            
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => closeModal()}
                className="mt-3 py-2 px-5 bg-transparent text-gray-700 text-sm font-medium rounded-lg border border-gray-200 shadow-sm
                  hover:bg-gray-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
              >
                Cancel
              </button>
              {isLoggedIn && (
                <button
                  type="submit"
                  className="mt-3 py-2 px-5 bg-gradient-to-r from-blue-500 to-teal-400 text-white text-sm font-medium rounded-lg shadow-md
                    hover:from-blue-600 hover:to-teal-500 transform transition-all duration-300 hover:scale-105 hover:shadow-lg
                    focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
                >
                  Save Changes
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileModal;
