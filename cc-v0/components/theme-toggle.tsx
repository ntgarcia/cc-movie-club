'use client'

import * as React from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Sun, Moon, Monitor } from 'lucide-react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Only render UI after component is mounted to prevent hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent flash during hydration
  if (!mounted) {
    return (
      <div className="inline-flex items-center rounded-md border bg-background p-0.5">
        <Button variant="ghost" size="icon" className="h-7 w-7">
          <Sun className="h-4 w-4" />
          <span className="sr-only">Theme</span>
        </Button>
      </div>
    )
  }

  return (
    <div className="inline-flex items-center rounded-md border bg-background p-0.5">
      <Button
        variant="ghost"
        size="icon"
        className={`h-7 w-7 ${theme === 'light' ? 'bg-muted' : ''}`}
        onClick={() => setTheme("light")}
      >
        <Sun className="h-4 w-4" />
        <span className="sr-only">Light theme</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={`h-7 w-7 ${theme === 'dark' ? 'bg-muted' : ''}`}
        onClick={() => setTheme("dark")}
      >
        <Moon className="h-4 w-4" />
        <span className="sr-only">Dark theme</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={`h-7 w-7 ${theme === 'system' ? 'bg-muted' : ''}`}
        onClick={() => setTheme("system")}
      >
        <Monitor className="h-4 w-4" />
        <span className="sr-only">System theme</span>
      </Button>
    </div>
  )
}