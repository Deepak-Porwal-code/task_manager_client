import { useTasks } from "@/context/taskContext";
import { edit, star, trash } from "@/utils/Icons";
import { Task } from "@/utils/types";
import { formatTime } from "@/utils/utilities";
import React from "react";
import { motion } from "framer-motion";
import { item } from "@/utils/animations";

interface TaskItemProps {
  task: Task;
}

function TaskItem({ task }: TaskItemProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "text-green-500";
      case "medium":
        return "text-yellow-500";
      case "high":
        return "text-red-500";
      default:
        return "text-red-500";
    }
  };

  const { getTask, openModalForEdit, deleteTask, modalMode } = useTasks();

  return (
    <motion.div
      className="h-[16rem] px-5 py-4 flex flex-col gap-4 shadow-lg 
      bg-gradient-to-br from-white/80 to-blue-50/80 backdrop-blur-sm 
      rounded-xl border border-white/40 
      hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fadeIn
      before:absolute before:inset-0 before:bg-white/10 before:backdrop-blur-sm before:rounded-xl before:z-[-1]
      relative overflow-hidden group"
      variants={item}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-[-1]"></div>
      
      {/* Animated corner accent */}
      <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-xl group-hover:scale-150 transition-all duration-700"></div>
      
      <div className="animate-fadeInUp relative z-10">
        <h4 className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300">{task.title}</h4>
        <p className="text-gray-700 mt-1 line-clamp-3 group-hover:text-gray-800 transition-colors duration-300">{task.description}</p>
      </div>
      <div className="mt-auto flex justify-between items-center relative z-10">
        <p className="text-sm text-gray-500 animate-fadeIn group-hover:text-gray-700 transition-colors duration-300">{formatTime(task.createdAt)}</p>
        <p className={`text-sm font-bold ${getPriorityColor(task.priority)} px-3 py-1 rounded-full bg-white/50 backdrop-blur-sm shadow-sm animate-scaleIn group-hover:shadow-md transition-all duration-300`}>
          {task.priority}
        </p>
        <div>
          <div className="flex items-center gap-4 text-[1.2rem]">
            <button
              className={`${
                task.completed ? "text-yellow-400" : "text-gray-400"
              } transform transition-all duration-300 hover:scale-125 hover:rotate-12 focus:outline-none`}
            >
              {star}
            </button>
            <button
              className="text-blue-500 transform transition-all duration-300 hover:scale-125 hover:text-blue-600 hover:rotate-12 focus:outline-none"
              onClick={() => {
                getTask(task._id);
                openModalForEdit(task);
              }}
            >
              {edit}
            </button>
            <button
              className="text-red-500 transform transition-all duration-300 hover:scale-125 hover:text-red-600 hover:rotate-12 focus:outline-none"
              onClick={() => {
                deleteTask(task._id);
              }}
            >
              {trash}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default TaskItem;
