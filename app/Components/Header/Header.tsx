"use client";
import { useTasks } from "@/context/taskContext";
import { useUserContext } from "@/context/userContext";
import { github, moon, profile } from "@/utils/Icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";

function Header() {
  const { user } = useUserContext();
  const { openModalForAdd, openProfileModal, activeTasks } = useTasks();

  const router = useRouter();

  const { name } = user;

  const userId = user._id;

  return (
    <header className="px-6 my-2 w-full flex items-center justify-between bg-gradient-to-r from-indigo-50/90 to-purple-50/90 backdrop-blur-md rounded-xl shadow-md transition-all duration-300 hover:shadow-lg animate-fadeIn border border-white/50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-400/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-5 right-20 w-20 h-20 bg-purple-400/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-0 left-1/3 w-32 h-10 bg-teal-400/10 rounded-full blur-xl animate-pulse"></div>
      </div>
      
      <div className="transform transition-all duration-500 hover:translate-x-2 relative z-10">
        <h1 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <span role="img" aria-label="wave" className="animate-wave inline-block">
            👋
          </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500 animate-shimmer">
            {userId ? `Welcome, ${name}!` : "Welcome to Taskfyer"}
          </span>
        </h1>
        <p className="text-sm text-gray-600 mt-1 animate-fadeIn">
          {userId ? (
            <>
              You have{" "}
              <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 animate-pulse">
                {activeTasks.length}
              </span>
              &nbsp;active tasks
            </>
          ) : (
            "Please login or register to view your tasks"
          )}
        </p>
      </div>
      <div className="h-[50px] flex items-center gap-[10.4rem]">
        <button
          className="px-8 py-3 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-[50px] font-medium
          hover:from-blue-600 hover:to-teal-500 transform transition-all duration-300 hover:scale-105 hover:shadow-lg
          focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
          onClick={() => {
            if (userId) {
              openModalForAdd();
            } else {
              router.push("/login");
            }
          }}
        >
          {userId ? "Add a new Task" : "Login / Register"}
        </button>

        <div className="flex gap-4 items-center animate-slideInRight">
          <Link
            href="https://github.com/Maclinz/taskfyer"
            passHref
            target="_blank"
            rel="noopener noreferrer"
            className="h-[40px] w-[40px] flex items-center justify-center rounded-full bg-white text-gray-700 shadow-sm
            hover:bg-gradient-to-r hover:from-gray-800 hover:to-gray-700 hover:text-white 
            transform transition-all duration-300 hover:scale-110 hover:rotate-6"
          >
            {github}
          </Link>
          <DarkModeToggle />
          <button
            onClick={() => {
              // Navigate to profile or open profile modal
              if (userId) {
                openProfileModal(); // Open the profile modal
              } else {
                router.push("/login");
              }
            }}
            className="h-[40px] w-[40px] flex items-center justify-center rounded-full bg-white text-gray-700 shadow-sm
            hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-400 hover:text-white
            transform transition-all duration-300 hover:scale-110 hover:-rotate-6"
          >
            {profile}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
