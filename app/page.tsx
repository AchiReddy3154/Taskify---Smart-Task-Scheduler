"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TaskProvider, useTask } from "@/contexts/TaskContext"
import { ToastProvider } from "@/contexts/ToastContext"
import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import TaskBoard from "@/components/TaskBoard"
import TaskModal from "@/components/TaskModal"
import ToastContainer from "@/components/ToastContainer"
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts"
import TaskNotifications from "@/components/TaskNotifications"

interface Task {
  id: string
  title: string
  description: string
  dueDate: string
  dueTime: string
  priority: "High" | "Medium" | "Low"
  completed: boolean
  createdAt: Date
  category: string
}

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Complete project proposal",
    description: "Finalize the Q4 project proposal and submit to management for review and approval",
    dueDate: "2024-01-15",
    dueTime: "14:00",
    priority: "High",
    completed: false,
    createdAt: new Date("2024-01-10"),
    category: "Work",
  },
  {
    id: "2",
    title: "Team meeting preparation",
    description: "Prepare agenda and materials for weekly team sync meeting",
    dueDate: "2024-01-12",
    dueTime: "09:00",
    priority: "Medium",
    completed: false,
    createdAt: new Date("2024-01-09"),
    category: "Meetings",
  },
  {
    id: "3",
    title: "Code review session",
    description: "Review pull requests from team members and provide feedback",
    dueDate: "2024-01-11",
    dueTime: "16:30",
    priority: "High",
    completed: true,
    createdAt: new Date("2024-01-08"),
    category: "Development",
  },
  {
    id: "4",
    title: "Update API documentation",
    description: "Update API documentation with latest changes and new endpoints",
    dueDate: "2024-01-20",
    dueTime: "11:00",
    priority: "Low",
    completed: false,
    createdAt: new Date("2024-01-07"),
    category: "Documentation",
  },
  {
    id: "5",
    title: "Client presentation",
    description: "Present quarterly results to key stakeholders and clients",
    dueDate: "2024-01-18",
    dueTime: "15:00",
    priority: "High",
    completed: false,
    createdAt: new Date("2024-01-06"),
    category: "Presentations",
  },
]

export default function SmartTaskScheduler() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode)
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode))
  }, [isDarkMode])

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode")
    if (savedDarkMode) {
      setIsDarkMode(JSON.parse(savedDarkMode))
    }
  }, [])

  const handleNewTask = useCallback(() => {
    setIsModalOpen(true)
  }, [])

  useKeyboardShortcuts({
    KeyN: handleNewTask,
    Escape: () => setIsModalOpen(false),
  })

  return (
    <ToastProvider>
      <TaskProvider>
        <TaskNotifications />
        <div className={`min-h-screen transition-all duration-500 ${isDarkMode ? "dark" : ""}`}>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950">
            <Navbar
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
              onNewTask={handleNewTask}
              onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            />

            <div className="flex">
              <AnimatePresence>
                {isSidebarOpen && (
                  <motion.div
                    initial={{ x: -320, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -320, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <Sidebar />
                  </motion.div>
                )}
              </AnimatePresence>

              <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-0" : "ml-0"}`}>
                <TaskBoard onNewTask={handleNewTask} />
              </main>
            </div>

            <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <ToastContainer />
          </div>
        </div>
      </TaskProvider>
    </ToastProvider>
  )
}
