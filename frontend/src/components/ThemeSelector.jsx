import { PaletteIcon } from "lucide-react";
import React from "react";
import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";

const ThemeSelector = () => {
  const { theme: defaultTheme, setTheme } = useThemeStore();

  return (
    <div className="dropdown dropdown-end">
      <button tabIndex={0} className="btn btn-ghost btn-circle">
        <PaletteIcon className="size-5" />
      </button>
      <div
        className="dropdown-content mt-2 p-1 shadow-2xl bg-base-200 backdrop-blur-lg rounded-2xl w-56 border border-base-content/10"
        tabIndex={0}
      >
        {THEMES.map((theme) => (
          <button
            key={theme.name}
            onClick={() => setTheme(theme.name)}
            className={`w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-colors ${
              defaultTheme === theme.name
                ? "bg-primary/10 text-primary"
                : "hover:bg-base-content/5"
            }`}
          >
            <PaletteIcon className="size-4" />
            <span className="text-sm font-medium">{theme.label}</span>
            <div className="ml-auto flex gap-2">
              {theme.colors.map((item, i) => (
                <span
                  className="size-2 rounded-full"
                  key={i}
                  style={{ backgroundColor: item }}
                />
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
