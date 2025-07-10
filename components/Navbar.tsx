"use client"

import { motion } from "framer-motion"
import { Calendar, Moon, Sun, Plus, Menu, Bell, Mic, MicOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useVoiceInput } from "@/hooks/useVoiceInput"

interface NavbarProps {
  isDarkMode: boolean
  setIsDarkMode: (value: boolean) => void
  onNewTask: () => void
  onToggleSidebar: () => void
}

export default function Navbar({ isDarkMode, setIsDarkMode, onNewTask, onToggleSidebar }: NavbarProps) {
  const { isListening, startListening, stopListening } = useVoiceInput()

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-700/50"
    >
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </motion.button>

            <motion.div className="flex items-center gap-4" whileHover={{ scale: 1.02 }}>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Taskify - Smart Task Scheduler
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Stay productive and organized</p>
              </div>
            </motion.div>
          </div>

          <div className="flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={isListening ? stopListening : startListening}
                className={`p-2 rounded-xl transition-all duration-200 ${
                  isListening
                    ? "bg-red-100 dark:bg-red-900/20 text-red-600 animate-pulse"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
                }`}
              >
                {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                className="relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
              >
                <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
              >
                <motion.div
                  key={isDarkMode ? "moon" : "sun"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDarkMode ? (
                    <Sun className="h-5 w-5 text-yellow-500" />
                  ) : (
                    <Moon className="h-5 w-5 text-blue-600" />
                  )}
                </motion.div>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={onNewTask}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hidden sm:flex"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Task
              </Button>
            </motion.div>

            {/* Remove the Avatar with 'AI' fallback for a cleaner, non-AI branded UI */}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
