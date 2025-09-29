"use client";
import { useTasks } from "@/context/taskContext";
import useRedirect from "@/hooks/useUserRedirect";

import { Task } from "@/utils/types";
import { filteredTasks } from "@/utils/utilities";
import TaskItem from "../Components/TaskItem/TaskItem";
import Filters from "../Components/Filters/Filters";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { container, item } from "@/utils/animations";

export default function Home() {
  useRedirect("/login");

  const { openModalForAdd, priority, completedTasks, setPriority } = useTasks();

  const filtered = filteredTasks(completedTasks, priority);

  useEffect(() => {
    setPriority("all");
  }, []);

  return (
    <main className="m-6 h-full">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Completed Tasks</h1>
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
          bg-gradient-to-br from-white to-gray-50 hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 
          hover:border-blue-200 hover:text-blue-600 transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-1"
          onClick={openModalForAdd}
          variants={item}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Add New Task
        </motion.button>
      </motion.div>
    </main>
  );
}
