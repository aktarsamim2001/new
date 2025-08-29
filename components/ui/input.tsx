import * as React from "react"
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 flex h-12 w-full min-w-0 rounded-md bg-gray-100 px-3 py-1 text-lg outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-lg",
        "border-0", // default no border
        "focus-visible:border-[2.5px] focus-visible:border-pink-500", // focus e pink border
        "transition-all duration-300 ease-in-out", // smooth transition
        "aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
