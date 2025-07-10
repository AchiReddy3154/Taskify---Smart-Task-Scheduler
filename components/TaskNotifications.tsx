import { useEffect } from "react"
import { useTask } from "@/contexts/TaskContext"

export default function TaskNotifications() {
  const { tasks } = useTask()

  // Request notification permission on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!('Notification' in window)) return;
    Notification.requestPermission();
  }, [])

  // Schedule notifications for future tasks
  useEffect(() => {
    if (!('Notification' in window) || Notification.permission !== 'granted') return;
    const now = new Date();
    const timers: NodeJS.Timeout[] = [];
    tasks?.forEach(task => {
      if (!task.dueDate || task.completed) return;
      const due = new Date(task.dueDate + (task.dueTime ? 'T' + task.dueTime : 'T09:00'));
      if (isNaN(due.getTime()) || due <= now) return;
      const timeout = due.getTime() - now.getTime();
      timers.push(setTimeout(() => {
        new Notification(task.title, {
          body: `Due: ${due.toLocaleString()}\nPriority: ${task.priority}`,
          icon: '/favicon.svg',
        });
      }, timeout));
    });
    return () => timers.forEach(clearTimeout);
  }, [tasks]);

  return null;
} 