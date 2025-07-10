"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useToast } from "./ToastContext"

export interface Task {
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

export type FilterType = "All" | "Today" | "Upcoming" | "Completed"

interface TaskContextType {
  tasks: Task[]
  filter: FilterType
  setFilter: (filter: FilterType) => void
  addTask: (task: Omit<Task, "id" | "createdAt">) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
  toggleTask: (id: string) => void
  getFilteredTasks: () => Task[]
  editingTask: Task | null
  setEditingTask: (task: Task | null) => void
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

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
]

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [filter, setFilter] = useState<FilterType>("All")
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const { showToast } = useToast()

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks")
    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks).map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt),
      }))
      setTasks(parsedTasks)
    } else {
      setTasks(initialTasks)
    }
  }, [])

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks))
    }
  }, [tasks])

  const addTask = (taskData: Omit<Task, "id" | "createdAt">) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date(),
    }
    setTasks((prev) => [...prev, newTask])
    showToast("Task created successfully!", "success")
  }

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, ...updates } : task)))
    showToast("Task updated successfully!", "success")
  }

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
    showToast("Task deleted successfully!", "success")
  }

  const toggleTask = (id: string) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
    const task = tasks.find((t) => t.id === id)
    if (task) {
      showToast(`Task ${task.completed ? "marked as incomplete" : "completed"}!`, "success")
    }
  }

  const getFilteredTasks = () => {
    const today = new Date().toISOString().split("T")[0]

    switch (filter) {
      case "Today":
        return tasks.filter((task) => task.dueDate === today && !task.completed)
      case "Upcoming":
        return tasks.filter((task) => task.dueDate > today && !task.completed)
      case "Completed":
        return tasks.filter((task) => task.completed)
      default:
        return tasks
    }
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        filter,
        setFilter,
        addTask,
        updateTask,
        deleteTask,
        toggleTask,
        getFilteredTasks,
        editingTask,
        setEditingTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export function useTask() {
  const context = useContext(TaskContext)
  if (context === undefined) {
    throw new Error("useTask must be used within a TaskProvider")
  }
  return context
}
