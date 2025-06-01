// utils/themes.js
export function setTheme(themeName) {
  document.documentElement.className = `theme-${themeName}`;
  localStorage.setItem('theme', themeName);
}

export function loadTheme() {
  const savedTheme = localStorage.getItem('theme') || 'moonlight';
  setTheme(savedTheme);
}

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}