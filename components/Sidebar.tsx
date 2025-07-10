"use client"

import { motion } from "framer-motion"
import { Filter, TrendingUp, CheckCircle, Clock, Calendar } from "lucide-react"
import { useTask, type FilterType } from "@/contexts/TaskContext"

export default function Sidebar() {
  const { tasks, filter, setFilter } = useTask()

  const filterButtons = [
    {
      name: "All" as FilterType,
      count: tasks.length,
      icon: Calendar,
      color: "from-blue-500 to-purple-500",
    },
    {
      name: "Today" as FilterType,
      count: tasks.filter((t) => t.dueDate === new Date().toISOString().split("T")[0] && !t.completed).length,
      icon: Clock,
      color: "from-orange-500 to-red-500",
    },
    {
      name: "Upcoming" as FilterType,
      count: tasks.filter((t) => t.dueDate > new Date().toISOString().split("T")[0] && !t.completed).length,
      icon: TrendingUp,
      color: "from-green-500 to-emerald-500",
    },
    {
      name: "Completed" as FilterType,
      count: tasks.filter((t) => t.completed).length,
      icon: CheckCircle,
      color: "from-emerald-500 to-teal-500",
    },
  ]

  return (
    <motion.aside
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-80 backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 border-r border-gray-200/50 dark:border-gray-700/50 min-h-[calc(100vh-89px)] sticky top-[89px]"
    >
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
            <Filter className="h-5 w-5 text-white" />
          </div>
          <h2 className="font-bold text-xl text-gray-900 dark:text-white">Filters</h2>
        </div>

        <div className="space-y-3">
          {filterButtons.map((filterOption, index) => {
            const IconComponent = filterOption.icon
            return (
              <motion.button
                key={filterOption.name}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setFilter(filterOption.name)}
                className={`w-full group relative overflow-hidden rounded-xl p-4 transition-all duration-300 ${
                  filter === filterOption.name
                    ? `bg-gradient-to-r ${filterOption.color} text-white shadow-lg shadow-blue-500/25`
                    : "bg-gray-50/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-gray-100/70 dark:hover:bg-gray-700/70"
                }`}
              >
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-3">
                    <IconComponent className="h-5 w-5" />
                    <span className="font-semibold">{filterOption.name}</span>
                  </div>
                  <motion.span
                    className={`px-2 py-1 rounded-full text-xs font-bold ${
                      filter === filterOption.name
                        ? "bg-white/20 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                    }`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {filterOption.count}
                  </motion.span>
                </div>
                {filter === filterOption.name && (
                  <motion.div
                    layoutId="activeFilter"
                    className={`absolute inset-0 bg-gradient-to-r ${filterOption.color} rounded-xl`}
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            )
          })}
        </div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20"
        >
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Quick Stats</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Total Tasks</span>
              <span className="font-semibold text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                {tasks.length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Completed</span>
              <span className="font-semibold text-emerald-600 bg-emerald-100 dark:bg-emerald-900/20 px-2 py-1 rounded-full">
                {tasks.filter((t) => t.completed).length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Pending</span>
              <span className="font-semibold text-orange-600 bg-orange-100 dark:bg-orange-900/20 px-2 py-1 rounded-full">
                {tasks.filter((t) => !t.completed).length}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3">
              <div
                className="bg-gradient-to-r from-emerald-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${tasks.length > 0 ? (tasks.filter((t) => t.completed).length / tasks.length) * 100 : 0}%`,
                }}
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6 p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20"
        >
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Keyboard Shortcuts</h3>
          <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex justify-between">
              <span>New Task</span>
              <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">N</kbd>
            </div>
            <div className="flex justify-between">
              <span>Close Modal</span>
              <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">Esc</kbd>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.aside>
  )
}
