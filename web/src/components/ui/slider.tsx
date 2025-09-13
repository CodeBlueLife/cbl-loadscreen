import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-gray-500/30">
      <SliderPrimitive.Range
        className="absolute h-full rounded-full"
        style={{
          background: `linear-gradient(to right, #60A5FA 0%, #60A5FA 100%)`,
        }}
      />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className="block h-3 w-3 rounded-full bg-[#60A5FA] shadow-md transition-transform duration-100
             hover:scale-125 hover:shadow-[0_0_8px_#60A5FA] focus:outline-none focus:ring-0 focus:shadow-[0_0_12px_#60A5FA]"
    />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
