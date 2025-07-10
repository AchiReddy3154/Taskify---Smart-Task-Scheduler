"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Sparkles, Loader2, Mic, MicOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useTask } from "@/contexts/TaskContext"
import { useToast } from "@/contexts/ToastContext"
import { useVoiceInput } from "@/hooks/useVoiceInput"

interface TaskModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function TaskModal({ isOpen, onClose }: TaskModalProps) {
  const { addTask, updateTask, editingTask, setEditingTask } = useTask()
  const { showToast } = useToast()
  const { isListening, startListening, stopListening, transcript } = useVoiceInput()

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    dueTime: "",
    priority: "Medium" as "High" | "Medium" | "Low",
    category: "Work",
  })

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title,
        description: editingTask.description,
        dueDate: editingTask.dueDate,
        dueTime: editingTask.dueTime,
        priority: editingTask.priority,
        category: editingTask.category,
      })
    } else {
      setFormData({
        title: "",
        description: "",
        dueDate: "",
        dueTime: "",
        priority: "Medium",
        category: "Work",
      })
    }
  }, [editingTask, isOpen])

  useEffect(() => {
    if (transcript) {
      // setAiInput(transcript) // This line is removed
    }
  }, [transcript])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.dueDate) {
      showToast("Please fill in required fields", "error")
      return
    }

    if (editingTask) {
      updateTask(editingTask.id, formData)
      setEditingTask(null)
    } else {
      addTask({ ...formData, completed: false })
    }

    handleClose()
  }

  const handleClose = () => {
    setFormData({
      title: "",
      description: "",
      dueDate: "",
      dueTime: "",
      priority: "Medium",
      category: "Work",
    })
    // setAiInput("") // This line is removed
    setEditingTask(null)
    onClose()
  }

  // Remove aiInput, isAiLoading, and related useEffects
  // Remove handleSmartInput function

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", bounce: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {editingTask ? "Edit Task" : "Create New Task"}
                </h3>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleClose}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200"
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Remove AI Smart Fill Section */}

              {/* Form Fields */}
              <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
                <Label htmlFor="title" className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                  Task Title *
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter a descriptive task title..."
                  className="h-12 text-lg border-2 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 rounded-xl transition-all duration-200"
                  required
                />
              </motion.div>

              <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                <Label
                  htmlFor="description"
                  className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block"
                >
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Add more details about this task..."
                  className="min-h-[100px] border-2 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 rounded-xl transition-all duration-200 resize-none"
                  rows={4}
                />
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
                  <Label
                    htmlFor="dueDate"
                    className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block"
                  >
                    Due Date *
                  </Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    className="h-12 border-2 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 rounded-xl transition-all duration-200"
                    required
                  />
                </motion.div>

                <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
                  <Label
                    htmlFor="dueTime"
                    className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block"
                  >
                    Due Time
                  </Label>
                  <Input
                    id="dueTime"
                    type="time"
                    value={formData.dueTime}
                    onChange={(e) => setFormData({ ...formData, dueTime: e.target.value })}
                    className="h-12 border-2 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 rounded-xl transition-all duration-200"
                  />
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
                  <Label
                    htmlFor="priority"
                    className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block"
                  >
                    Priority Level
                  </Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value: "High" | "Medium" | "Low") => setFormData({ ...formData, priority: value })}
                  >
                    <SelectTrigger className="h-12 border-2 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High" className="text-red-600">
                        🔴 High Priority
                      </SelectItem>
                      <SelectItem value="Medium" className="text-yellow-600">
                        🟡 Medium Priority
                      </SelectItem>
                      <SelectItem value="Low" className="text-green-600">
                        🟢 Low Priority
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>

                <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
                  <Label
                    htmlFor="category"
                    className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block"
                  >
                    Category
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger className="h-12 border-2 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Work">💼 Work</SelectItem>
                      <SelectItem value="Personal">👤 Personal</SelectItem>
                      <SelectItem value="Meetings">🤝 Meetings</SelectItem>
                      <SelectItem value="Development">💻 Development</SelectItem>
                      <SelectItem value="Documentation">📝 Documentation</SelectItem>
                      <SelectItem value="Presentations">📊 Presentations</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>
              </div>

              <div className="flex gap-4 pt-4">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClose}
                    className="w-full h-12 border-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 bg-transparent"
                  >
                    Cancel
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg rounded-xl transition-all duration-200"
                  >
                    {editingTask ? "Update Task" : "Create Task"}
                  </Button>
                </motion.div>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
