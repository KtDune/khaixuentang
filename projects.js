// 1. Project data with tags
const projects = [
    {
        title: "Blogging Website",
        img: "./assets/beautybird.png",
        desc: "A blogging website that allows users to post, edit, and remove blog posts.",
        fullDesc: "This blogging platform is built using Node.js, Express, and MongoDB. It allows user authentication, post creation, editing, and deletion, with full markdown support and image uploads. This blogging platform is built using Node.js, Express, and MongoDB. It allows user authentication, post creation, editing, and deletion, with full markdown support and image uploads. This blogging platform is built using Node.js, Express, and MongoDB. It allows user authentication, post creation, editing, and deletion, with full markdown support and image uploads. This blogging platform is built using Node.js, Express, and MongoDB. It allows user authentication, post creation, editing, and deletion, with full markdown support and image uploads.",
        tags: ["Fullstack"]
    },
    {
        title: "Knowledge Consolidation App",
        img: "project1.png",
        desc: "An app to help users consolidate and organize their knowledge effectively.",
        fullDesc: "This app provides flashcards, spaced repetition, and note organization to help students retain information better. Built using Vue.js and Firebase.",
        tags: ["Fullstack"]
    },
    {
        title: "AI Chat Application",
        img: "project1.png",
        desc: "An AI-powered chat application that provides intelligent responses to user queries.",
        fullDesc: "This chat app integrates the OpenAI API to generate dynamic, context-aware replies. It includes message persistence, theme switching, and responsive design.",
        tags: ["App"]
    },
    {
        title: "Bangboo Showcase Website",
        img: "project1.png",
        desc: "A showcase website for Bangboo, mascot character in Zenless Zone Zero.",
        fullDesc: "Built using Next.js and TailwindCSS, this site highlights Bangboo’s art gallery, personality, and related content, providing smooth animation and responsive layout.",
        tags: ["Fullstack"]
    },
    {
        title: "Spam Email Classifier",
        img: "project1.png",
        desc: "A machine learning model that classifies emails as spam or not spam.",
        fullDesc: "The spam classifier uses scikit-learn Decision Trees trained on labeled datasets. It visualizes classification results and allows user input for testing.",
        tags: ["Machine Learning"]
    },
];

// Get unique tags
const uniqueTags = Array.from(new Set(projects.flatMap(p => p.tags)));

const pageSize = 6;
let currentPage = 1;

function createProjects(filterTag = "All", page = 1) {
    const container = document.getElementById("projects-container");

    container.innerHTML = `
    <div class="first-row flex flex-col gap-4"></div>
    <div class="second-row flex flex-col gap-4"></div>
    <div class="third-row flex flex-col gap-4"></div>
  `; // reset and re-add rows

    const rows = [
        container.querySelector(".first-row"),
        container.querySelector(".second-row"),
        container.querySelector(".third-row"),
    ];

    const numCols = 3;

    const filtered = filterTag === "All"
        ? projects
        : projects.filter(p => p.tags.includes(filterTag));

    // --- Pagination logic ---
    const totalPages = Math.ceil(filtered.length / pageSize);
    currentPage = Math.min(page, totalPages); // clamp currentPage if needed

    const startIndex = (currentPage - 1) * pageSize;
    const paginated = filtered.slice(startIndex, startIndex + pageSize);

    // --- Insert projects into rows ---
    paginated.forEach((project, i) => {
        const order = i % numCols; // distribute into row 0,1,2

        const card = document.createElement("div");
        card.className = "rounded-xl overflow-hidden bg-[#333333] dark:bg-[#E0E0E0] dark:shadow-2xl m-4";

        // Add tag badge
        const tagsHTML = project.tags
            .map(
                tag =>
                    `<span class="bg-[#888888] dark:bg-[#444444] text-[#E0E0E0] text-xs px-2 py-1 rounded-full">${tag}</span>`
            )
            .join(" ");

        card.innerHTML = `
      <img src="${project.img}" alt="${project.title}" class="w-full h-64 object-cover">
      <div class="p-6">
        <h3 class="text-2xl font-bold">${project.title}</h3>
        <p class="mt-4 text-[#B0B0B0] dark:text-[#444444]">${project.desc}</p>
        <div class="mt-4 flex gap-2 flex-wrap">${tagsHTML}</div>
        <a href="#" class="text-sm mt-4 inline-block text-[#B0B0B0] dark:text-[#444444] underline hover:underline" data-title="${project.title}">View More</a>
      </div>
    `;

        rows[order].appendChild(card);
    });

    function attachModalEvents() {
        const modal = document.getElementById("project-modal");
        const modalImg = document.getElementById("modal-img");
        overlay = document.getElementById("overlay");
        const modalTitle = document.getElementById("modal-title");
        const modalDesc = document.getElementById("modal-desc");

        document.querySelectorAll('[data-title]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const projectTitle = e.target.dataset.title;
                const project = projects.find(p => p.title === projectTitle);

                if (project) {
                    modalImg.src = project.img;
                    modalTitle.textContent = project.title;
                    modalDesc.textContent = project.fullDesc;
                    modal.showModal();

                    overlay.classList.remove("hidden");
                }
            });

            const closeBtn = document.getElementById('closeBtn');

            closeBtn.addEventListener('click', () => {
                modal.close();
                overlay.classList.add("hidden");
            });
        });
    }

    createPagination(totalPages, filterTag);
    attachModalEvents();
}


// 4. Create pagination buttons
function createPagination(totalPages, filterTag) {
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        btn.className = "px-3 py-1 rounded-md mx-1 cursor-pointer hover:bg-[#888888]";

        if (i === currentPage) {
            btn.classList.add("bg-[#E0E0E0]", "text-[#121212]", "dark:bg-[#121212]", "dark:text-[#E0E0E0]");
        } else {
            btn.classList.add("bg-[#333333]", "text-[#E0E0E0]", "dark:bg-[#E0E0E0]", "dark:text-[#121212]");
        }

        btn.addEventListener("click", () => {
            createProjects(filterTag, i);

            document.getElementById("project-title").scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });

        paginationContainer.appendChild(btn);
    }
}

function createTagButtons() {
    const buttonContainer = document.getElementById("tag-buttons");
    buttonContainer.innerHTML = "";

    const allTags = ["All", ...uniqueTags];

    allTags.forEach((tag, index) => {
        const btn = document.createElement("button");
        btn.textContent = tag;
        btn.className = "px-4 py-2 rounded-full transition cursor-pointer hover:bg-[#888888]";

        // highlight "All" by default
        if (index === 0) {
            btn.classList.add("bg-[#E0E0E0]", "text-[#121212]", "dark:bg-[#333333]", "dark:text-[#E0E0E0]");
        }
        else {
            btn.classList.add("bg-[#333333]", "text-[#E0E0E0]", "dark:bg-[#E0E0E0]", "dark:text-[#121212]");
        }

        btn.addEventListener("click", () => {
            // reset all buttons
            document.querySelectorAll("#tag-buttons button").forEach(b => {
                b.classList.remove("bg-[#E0E0E0]", "text-[#121212]", "dark:bg-[#333333]", "dark:text-[#E0E0E0]");
                b.classList.add("bg-[#333333]", "text-[#E0E0E0]", "dark:bg-[#E0E0E0]", "dark:text-[#121212]");
            });

            // set active styles
            btn.classList.remove("bg-[#333333]", "text-[#E0E0E0]", "dark:bg-[#E0E0E0]", "dark:text-[#121212]");
            btn.classList.add("bg-[#E0E0E0]", "text-[#121212]", "dark:bg-[#333333]", "dark:text-[#E0E0E0]");

            currentPage = 1; // reset page when changing tag
            createProjects(tag, currentPage);
        });

        buttonContainer.appendChild(btn);
    });
}

// 6. Init
document.addEventListener("DOMContentLoaded", () => {
    createTagButtons();
    createProjects()
});
