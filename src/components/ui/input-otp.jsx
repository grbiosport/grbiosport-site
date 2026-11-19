import * as React from "react"
import { Minus } from "lucide-react"
import { cn } from "@/lib/utils"

const InputOTPContext = React.createContext({ slots: [] })

const InputOTP = React.forwardRef(({ className, containerClassName, maxLength = 6, value = "", onChange, children, ...props }, ref) => {
  const slots = Array.from({ length: maxLength }, (_, i) => ({
    char: value[i] || "",
    hasFakeCaret: false,
    isActive: i === value.length
  }))

  return (
    <InputOTPContext.Provider value={{ slots }}>
      <div className={cn("relative flex items-center gap-2", containerClassName)}>
        <input
          ref={ref}
          type="text"
          inputMode="numeric"
          maxLength={maxLength}
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          className={cn("absolute inset-0 opacity-0 cursor-pointer z-10 w-full h-full", className)}
          {...props}
        />
        {children}
      </div>
    </InputOTPContext.Provider>
  )
})
InputOTP.displayName = "InputOTP"

const InputOTPGroup = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center", className)} {...props} />
))
InputOTPGroup.displayName = "InputOTPGroup"

const InputOTPSlot = React.forwardRef(({ index, className, ...props }, ref) => {
  const { slots } = React.useContext(InputOTPContext)
  const slot = slots[index] || { char: "", isActive: false }

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-9 w-9 items-center justify-center border-y border-r border-input text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        slot.isActive && "z-10 ring-1 ring-ring",
        className
      )}
      {...props}
    >
      {slot.char}
    </div>
  )
})
InputOTPSlot.displayName = "InputOTPSlot"

const InputOTPSeparator = React.forwardRef(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <Minus />
  </div>
))
InputOTPSeparator.displayName = "InputOTPSeparator"

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
