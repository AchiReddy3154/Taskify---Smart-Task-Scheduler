"use client"

import { useEffect } from "react"

interface KeyboardShortcuts {
  [key: string]: () => void
}

export function useKeyboardShortcuts(shortcuts: KeyboardShortcuts) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in inputs
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement
      ) {
        return
      }

      const key = event.code
      const shortcut = shortcuts[key]

      if (shortcut && (event.metaKey || event.ctrlKey || key === "Escape" || key === "KeyN")) {
        event.preventDefault()
        shortcut()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [shortcuts])
}
