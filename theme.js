tailwind.config = {
    content: ["./*.html"],
    theme: {
        extend: {
            colors: {
                primary: {
                    blue: {
                        light: "#00ccdd"
                    }
                }
            }
        }
    },
    darkMode: "class"
};

const themeToggleBtn = document.getElementById("theme-toggle");
const themeToggleLightIcon = document.getElementById("theme-toggle-light-icon");

// Set initial theme based on saved preference or system preference
const storedTheme = localStorage.getItem("color-theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
    document.documentElement.classList.add("dark");
} else {
    document.documentElement.classList.remove("dark");
}

// Toggle theme when button clicked
themeToggleBtn.addEventListener("click", () => {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("color-theme", isDark ? "dark" : "light");
});
