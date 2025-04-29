
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { ColorPickerInput } from "@/components/theme/color-picker-input";

// Predefined color themes
const colorThemes = {
  default: {
    primary: "#3b82f6", // Blue
    accent: "#F3F4F6", // Light Gray
    brand: "#2563eb", // Darker Blue
  },
  purple: {
    primary: "#8B5CF6", // Purple
    accent: "#EDE9FE", // Light Purple
    brand: "#7C3AED", // Darker Purple
  },
  green: {
    primary: "#10B981", // Green
    accent: "#ECFDF5", // Light Green
    brand: "#059669", // Darker Green
  },
  orange: {
    primary: "#F97316", // Orange
    accent: "#FFF7ED", // Light Orange
    brand: "#EA580C", // Darker Orange
  },
};

export function ColorCustomizer() {
  const [colors, setColors] = useState({
    primary: localStorage.getItem('theme-color-primary') || colorThemes.default.primary,
    accent: localStorage.getItem('theme-color-accent') || colorThemes.default.accent,
    brand: localStorage.getItem('theme-color-brand') || colorThemes.default.brand,
  });

  // Apply the colors to the CSS variables
  useEffect(() => {
    const root = document.documentElement;
    
    // Convert hex to hsl for Tailwind CSS variables
    const hexToHSL = (hex: string) => {
      // For simplicity, just storing the hex directly in this example
      // In a real implementation, you'd convert hex to HSL
      return hex;
    };
    
    // Apply directly to our custom properties
    root.style.setProperty('--color-primary', colors.primary);
    root.style.setProperty('--color-accent', colors.accent);
    root.style.setProperty('--color-brand', colors.brand);
    
    // Store in localStorage
    localStorage.setItem('theme-color-primary', colors.primary);
    localStorage.setItem('theme-color-accent', colors.accent);
    localStorage.setItem('theme-color-brand', colors.brand);
  }, [colors]);

  const handleColorChange = (colorName: keyof typeof colors, value: string) => {
    setColors(prevColors => ({
      ...prevColors,
      [colorName]: value
    }));
  };

  const applyThemePreset = (themeName: keyof typeof colorThemes) => {
    setColors(colorThemes[themeName]);
    toast({
      title: "Theme Applied",
      description: `The ${themeName} theme has been applied.`
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Color Theme Presets</h3>
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline"
            onClick={() => applyThemePreset('default')}
            className="flex-1"
          >
            <div className="w-4 h-4 rounded-full mr-2 bg-[#3b82f6]" />
            Default
          </Button>
          <Button 
            variant="outline"
            onClick={() => applyThemePreset('purple')}
            className="flex-1"
          >
            <div className="w-4 h-4 rounded-full mr-2 bg-[#8B5CF6]" />
            Purple
          </Button>
          <Button 
            variant="outline"
            onClick={() => applyThemePreset('green')}
            className="flex-1"
          >
            <div className="w-4 h-4 rounded-full mr-2 bg-[#10B981]" />
            Green
          </Button>
          <Button 
            variant="outline"
            onClick={() => applyThemePreset('orange')}
            className="flex-1"
          >
            <div className="w-4 h-4 rounded-full mr-2 bg-[#F97316]" />
            Orange
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Custom Colors</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="primaryColor">Primary Color</Label>
            <ColorPickerInput
              id="primaryColor"
              value={colors.primary}
              onChange={(value) => handleColorChange('primary', value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="accentColor">Accent Color</Label>
            <ColorPickerInput
              id="accentColor"
              value={colors.accent}
              onChange={(value) => handleColorChange('accent', value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="brandColor">Brand Color</Label>
            <ColorPickerInput
              id="brandColor"
              value={colors.brand}
              onChange={(value) => handleColorChange('brand', value)}
            />
          </div>
        </div>
      </div>

      <div className="rounded-md bg-card p-4 border">
        <h4 className="text-sm font-medium mb-2">Preview</h4>
        <div className="flex space-x-2">
          <div className="w-10 h-10 rounded" style={{backgroundColor: colors.primary}}></div>
          <div className="w-10 h-10 rounded" style={{backgroundColor: colors.accent}}></div>
          <div className="w-10 h-10 rounded" style={{backgroundColor: colors.brand}}></div>
        </div>
      </div>
    </div>
  );
}
