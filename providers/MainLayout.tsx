"use client";
import Modal from "@/app/Components/Modal/Modal";
import ProfileModal from "@/app/Components/Profile/ProfileModal";
import { useTasks } from "@/context/taskContext";
import React from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  const { isEditing, profileModal } = useTasks();
  return (
    <div className="main-layout flex-1 bg-gradient-to-br from-white/80 to-blue-50/80 backdrop-blur-md border border-white/40 rounded-[1.5rem] overflow-auto shadow-lg relative before:absolute before:inset-0 before:bg-white/10 before:backdrop-blur-sm before:rounded-[1.5rem] before:z-[-1]">
      {/* Animated background patterns */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_10%_20%,rgba(59,130,246,0.1)_0%,transparent_50%)] animate-shimmer"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,rgba(168,85,247,0.1)_0%,transparent_50%)] animate-shimmer" style={{animationDelay: '1s'}}></div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-gradient-to-br from-blue-300/20 to-blue-500/20 blur-xl animate-float pointer-events-none"></div>
      <div className="absolute top-1/3 left-1/4 w-24 h-24 rounded-full bg-gradient-to-br from-purple-300/20 to-purple-500/20 blur-xl animate-float pointer-events-none" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-1/4 right-1/3 w-40 h-40 rounded-full bg-gradient-to-br from-pink-300/20 to-pink-500/20 blur-xl animate-float pointer-events-none" style={{animationDelay: '4s'}}></div>
      
      {isEditing && <Modal />}
      {profileModal && <ProfileModal />}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

export default MainLayout;
