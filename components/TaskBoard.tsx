"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Plus, Circle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTask } from "@/contexts/TaskContext"
import TaskCard from "./TaskCard"

interface TaskBoardProps {
  onNewTask: () => void
}

export default function TaskBoard({ onNewTask }: TaskBoardProps) {
  const { getFilteredTasks, filter } = useTask()
  const filteredTasks = getFilteredTasks()

  return (
    <div className="p-6">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{filter} Tasks</h2>
          <p className="text-gray-600 dark:text-gray-400">
            {filteredTasks.length} {filteredTasks.length === 1 ? "task" : "tasks"} found
          </p>
        </div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="sm:hidden">
          <Button
            onClick={onNewTask}
            size="icon"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 rounded-xl"
          >
            <Plus className="h-5 w-5" />
          </Button>
        </motion.div>
      </motion.div>

      {/* Task Grid */}
      <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredTasks.map((task, index) => (
            <TaskCard key={task.id} task={task} index={index} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredTasks.length === 0 && (
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 3,
            }}
            className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center"
          >
            <Circle className="h-12 w-12 text-white" />
          </motion.div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">No tasks found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
            {filter === "All"
              ? "Ready to boost your productivity? Create your first task and get started!"
              : `No ${filter.toLowerCase()} tasks at the moment. Great job staying organized!`}
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={onNewTask}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Task
            </Button>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
