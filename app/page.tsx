"use client";
import { useTasks } from "@/context/taskContext";
import useRedirect from "@/hooks/useUserRedirect";
import Filters from "./Components/Filters/Filters";
import TaskItem from "./Components/TaskItem/TaskItem";
import { Task } from "@/utils/types";
import { filteredTasks } from "@/utils/utilities";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { container, item } from "@/utils/animations";

export default function Home() {
  useRedirect("/login");

  const { tasks, openModalForAdd, priority, setPriority } = useTasks();

  const filtered = filteredTasks(tasks, priority);

  useEffect(() => {
    setPriority("all");
  }, []);

  return (
    <main className="m-6 h-full">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">All Tasks</h1>
        <Filters />
      </div>

      <motion.div
        className="pb-[2rem] mt-6 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[1.5rem]"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {filtered.map((task: Task, i: number) => (
          <TaskItem key={i} task={task} />
        ))}
        <motion.button
          className="h-[16rem] w-full py-2 rounded-xl text-lg font-medium text-gray-600 border-dashed border-2 border-gray-300
          bg-gradient-to-br from-white/80 to-blue-50/80 backdrop-blur-sm hover:bg-gradient-to-br hover:from-blue-100/80 hover:to-purple-100/80 
          hover:border-blue-200 hover:text-blue-600 transition-all duration-300 shadow-sm hover:shadow-lg transform hover:-translate-y-2
          relative overflow-hidden group"
          onClick={openModalForAdd}
          variants={item}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <div className="absolute -top-10 -right-10 w-20 h-20 bg-blue-400/20 rounded-full blur-xl group-hover:scale-150 transition-all duration-700"></div>
          <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-purple-400/20 rounded-full blur-xl group-hover:scale-150 transition-all duration-700"></div>
          
          <span className="relative z-10 flex items-center justify-center gap-2">
            <span className="inline-block w-5 h-5 bg-blue-500/80 rounded-full group-hover:scale-110 transition-all duration-300"></span>
            Add New Task
          </span>
        </motion.button>
      </motion.div>
    </main>
  );
}
