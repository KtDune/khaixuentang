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

document.addEventListener("DOMContentLoaded", function () {
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

    const snowContainer = document.querySelector(".snowflakes");
    const snowCount = 10;

    for (let i = 0; i < snowCount; i++) {
        const snowflake = document.createElement("div");
        snowflake.classList.add("snowflake", "text-[#E0E0E0]", "dark:text-[#121212]");

        const inner = document.createElement("div");
        inner.classList.add("inner");
        inner.textContent = ".";

        snowflake.appendChild(inner);
        snowContainer.appendChild(snowflake);
    }

})