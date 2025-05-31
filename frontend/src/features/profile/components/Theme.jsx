import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const themes = [
  { name: "Default", className: "" },
  { name: "Dark", className: "theme-dark" },
  { name: "Light", className: "theme-light" },
  { name: "Black", className: "theme-black" },
  { name: "Dark Blue", className: "theme-dark-blue" },
  { name: "Dark Purple", className: "theme-dark-purple" },
];

export default function Theme() {
  const [selectedTheme, setSelectedTheme] = useState("theme-dark");

const handleThemeChange = (themeClass) => {
  // Remove all theme classes first
  document.documentElement.classList.remove(...themes.map((t) => t.className).filter(Boolean));

  // Only add class if it’s not the default (empty string)
  if (themeClass) {
    document.documentElement.classList.add(themeClass);
  }

  setSelectedTheme(themeClass);
  localStorage.setItem("theme", themeClass);
};

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-6 text-[var(--color-base-content)]">
      <h2 className="text-2xl font-semibold">Appearance & Theme</h2>
      <p className="text-[var(--color-neutral-content)] mb-6">
        Switch between color modes and preview the color palettes.
      </p>

      <Card className="bg-[var(--color-base-100)] border border-[var(--color-base-300)]">
        <CardHeader>
          <CardTitle className="text-base text-[var(--color-base-content)]">
            Theme Mode
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {themes.map((theme) => (
            <button
              key={theme.name}
              onClick={() => handleThemeChange(theme.className)}
              className={cn(
                theme.className,
                "rounded-xl p-2 border-2 w-full text-left bg-[var(--color-base-200)] border-[var(--color-primary)]"
              )}
            >
              <div className={cn(theme.className, "p-2 rounded-md space-y-1")}>
                <div className="rounded-md h-4 bg-[var(--color-base-200)]" />
                <div className="rounded-md h-2 bg-[var(--color-primary)]" />
                <div className="rounded-md h-2 bg-[var(--color-secondary)]" />
              </div>
              <div className="mt-2 text-xs text-[var(--color-base-content)] font-medium">
                {theme.name}
              </div>
            </button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
