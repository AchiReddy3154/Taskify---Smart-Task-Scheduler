"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Clock, CheckCircle2, Circle, Edit3, Trash2 } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTask, type Task } from "@/contexts/TaskContext"
import { useState } from "react"

interface TaskCardProps {
  task: Task
  index: number
}

export default function TaskCard({ task, index }: TaskCardProps) {
  const { toggleTask, deleteTask, setEditingTask } = useTask()
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case "High":
        return {
          bg: "bg-gradient-to-r from-red-500/20 to-pink-500/20",
          text: "text-red-400",
          border: "border-red-500/30",
          glow: "shadow-red-500/25",
        }
      case "Medium":
        return {
          bg: "bg-gradient-to-r from-yellow-500/20 to-orange-500/20",
          text: "text-yellow-400",
          border: "border-yellow-500/30",
          glow: "shadow-yellow-500/25",
        }
      case "Low":
        return {
          bg: "bg-gradient-to-r from-green-500/20 to-emerald-500/20",
          text: "text-green-400",
          border: "border-green-500/30",
          glow: "shadow-green-500/25",
        }
      default:
        return {
          bg: "bg-gradient-to-r from-gray-500/20 to-slate-500/20",
          text: "text-gray-400",
          border: "border-gray-500/30",
          glow: "shadow-gray-500/25",
        }
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const formatTime = (timeString: string) => {
    if (!timeString) return ""
    const [hours, minutes] = timeString.split(":")
    const hour = Number.parseInt(hours)
    const ampm = hour >= 12 ? "PM" : "AM"
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }

  const priorityConfig = getPriorityConfig(task.priority)

  const handleEdit = () => {
    setEditingTask(task)
  }

  const handleDelete = () => {
    if (showDeleteConfirm) {
      deleteTask(task.id)
      setShowDeleteConfirm(false)
    } else {
      setShowDeleteConfirm(true)
      setTimeout(() => setShowDeleteConfirm(false), 3000)
    }
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.9 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        type: "spring",
        bounce: 0.3,
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group"
    >
      <Card className="backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 border-gray-200/50 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 flex-1">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => toggleTask(task.id)}
                className="text-gray-400 hover:text-blue-500 transition-colors"
              >
                <AnimatePresence mode="wait">
                  {task.completed ? (
                    <motion.div
                      key="completed"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                      transition={{ type: "spring", bounce: 0.6 }}
                    >
                      <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                    </motion.div>
                  ) : (
                    <motion.div key="incomplete" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                      <Circle className="h-6 w-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              <div className="flex-1 min-w-0">
                <h3
                  className={`font-bold text-lg leading-tight ${
                    task.completed ? "text-gray-500 dark:text-gray-400 line-through" : "text-gray-900 dark:text-white"
                  }`}
                >
                  {task.title}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge
                    className={`${priorityConfig.bg} ${priorityConfig.text} ${priorityConfig.border} border shadow-sm ${priorityConfig.glow} text-xs font-semibold`}
                  >
                    {task.priority}
                  </Badge>
                  <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                    {task.category}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleEdit}
                className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
              >
                <Edit3 className="h-4 w-4" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleDelete}
                className={`p-2 transition-all duration-200 rounded-lg ${
                  showDeleteConfirm
                    ? "text-red-600 bg-red-100 dark:bg-red-900/20"
                    : "text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                }`}
              >
                <Trash2 className="h-4 w-4" />
              </motion.button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <p
            className={`text-sm mb-4 line-clamp-2 ${
              task.completed ? "text-gray-400 dark:text-gray-500" : "text-gray-600 dark:text-gray-300"
            }`}
          >
            {task.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(task.dueDate)}</span>
            </div>

            {task.dueTime && (
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Clock className="h-4 w-4" />
                <span>{formatTime(task.dueTime)}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
