
import * as React from "react";
import { Input } from "@/components/ui/input";
import { PopoverTrigger, PopoverContent, Popover } from "@/components/ui/popover";

interface ColorPickerInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
}

export function ColorPickerInput({ id, value, onChange }: ColorPickerInputProps) {
  return (
    <div className="flex gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <div
            className="w-10 h-10 rounded-md border cursor-pointer"
            style={{ backgroundColor: value }}
          />
        </PopoverTrigger>
        <PopoverContent className="w-auto p-3">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            id={`${id}-picker`}
            className="w-32 h-32 cursor-pointer"
          />
        </PopoverContent>
      </Popover>
      <Input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1"
      />
    </div>
  );
}
