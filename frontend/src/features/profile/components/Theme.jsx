import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const themes = [
  { name: "Light", className: "theme-light" },
  { name: "Dark", className: "theme-dark" },
  { name: "Dark Blue", className: "theme-dark-blue" },
  { name: "Dark Purple", className: "theme-dark-purple" },
];

const accentColors = [
  "#3b82f6", // blue
  "#10b981", // green
  "#f59e0b", // amber
  "#ef4444", // red
  "#8b5cf6", // violet
  "#ec4899", // pink
];

export default function Theme() {
  const [selectedTheme, setSelectedTheme] = useState("theme-dark");
  const [customAccent, setCustomAccent] = useState("");

  const handleThemeChange = (themeClass) => {
    setSelectedTheme(themeClass);
    document.body.className = themeClass; // Replace all theme classes on body
  };

  const handleAccentChange = (color) => {
    setCustomAccent(color);
    document.documentElement.style.setProperty("--primary", color);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-6 text-white">
      <h2 className="text-2xl font-semibold">Appearance & Theme</h2>
      <p className="text-neutral-400 mb-6">
        Switch between color modes and customize the accent color.
      </p>

      <Card className="bg-neutral-900 border border-neutral-800">
        <CardHeader>
          <CardTitle className="text-base text-white">Theme Mode</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-3">
          {themes.map((theme) => (
            <Button
              key={theme.name}
              variant={selectedTheme === theme.className ? "default" : "outline"}
              className={cn(
                "justify-start bg-neutral-800 text-white hover:bg-neutral-700",
                selectedTheme === theme.className && "border-blue-500"
              )}
              onClick={() => handleThemeChange(theme.className)}
            >
              {theme.name}
            </Button>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-neutral-900 border border-neutral-800">
        <CardHeader>
          <CardTitle className="text-base text-white">Accent Color</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3 mb-4">
            {accentColors.map((color) => (
              <button
                key={color}
                className={cn(
                  "w-8 h-8 rounded-full border-2 border-white/20 focus:outline-none",
                  customAccent === color && "ring-2 ring-white"
                )}
                style={{ backgroundColor: color }}
                onClick={() => handleAccentChange(color)}
              />
            ))}
          </div>
          <Label htmlFor="custom-accent" className="text-neutral-400">Custom Color</Label>
          <input
            id="custom-accent"
            type="color"
            value={customAccent}
            onChange={(e) => handleAccentChange(e.target.value)}
            className="mt-2 h-10 w-full rounded-md border border-neutral-700 bg-neutral-800"
          />
        </CardContent>
      </Card>
    </div>
  );
}
