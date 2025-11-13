// 1. Project data with tags
const projects = [
    {
        title: "Fullstack Blogging Website",
        img: "./assets/beautybird.png",
        desc: "Sharing my thoughts makes me happu, so thats why I choose to build a blogging website. Featuring multiple ways to interact with others, I am not just building a blogging website, but a space for people to share their thoughts and react to others as well.",
        fullDesc: `
      <p>
      A well designed blogging website can make people wants to share more, so thats what I did. During my summer holiday, I have built a dynamic 
      </p><br />

      <p>Built using React for the frontend and Node.js with Express for the backend, it features:</p>
      <ul class="list-disc list-outside pl-5">
        <li>User authentication</li>
        <li>CRUD operations for blog posts and comments</li>
        <li>Responsive design for various devices</li>
      </ul><br />

      <p>This blogging website was created by following 
      <a class="underline" href="https://www.youtube.com/watch?v=J7BGuuuvDDk&list=PLqm86YkewF6QbR7QwqYWcAbl70Zhv0JUE" target="_blank">this tutorial</a>, 
      but I modified and improved many parts of it to enhance the user experience and add more features.</p><br />

      <p>Added features include:</p>
      <ul class="list-disc list-outside pl-5">
        <li>Improved security measures: input validation and sanitization on the frontend, strict type checking on the backend.</li>
        <li>Refactored components for better usability and maintainability.</li>
        <li>Enhanced the comment section with nested replies and likes.</li>
        <li>Added a weather widget using the OpenWeather API to display current weather information based on the user’s location.</li>
      </ul>
    `,
        tags: ["Fullstack"],
        techStack: ['React', 'Express', 'Firebase', 'MongoDB', 'Tailwind']
    },
    {
        title: "Knowledge Consolidation App",
        img: "./assets/knowledge-consolidation.png",
        desc: "How to structure my knowledge? Is there a way to manage my knowledge effectively? To find out the answer, I built this app on top of how I really manage my physical notes. and leveraging AI abilities to quickly summarize.",
        fullDesc: `
      <p>This project is built on top of the Feynman note-taking technique and aims to help users consolidate and organize their knowledge effectively using AI.</p><br />

      <p>Developed with React for the frontend and Node.js with Express for the backend, it integrates IBM Watsonx AI to intelligently summarize user-selected notes.</p><br />

      <p>Notable features include:</p>
      <ul class="list-disc list-outside pl-5">
        <li>Allow users to select multiple notes for AI-powered consolidation.</li>
        <li>Dynamic addition and removal of notes.</li>
        <li>Responsive interface for seamless navigation and retrieval of information.</li>
      </ul><br />

      <p>This app was developed during the IBM Watsonx Hackathon 2024.</p>
    `,
        tags: ["Fullstack"],
        techStack: ['React', 'Express', 'Tailwind', 'Groq']
    },
    {
        title: "AI Chat Application",
        img: "./assets/ai-chat-app.png",
        desc: "Imagine combining mobile phone's accessbility and AI's random dad joke: this is what this application is. A mobile app that knows you, and are always trying to say some jokes to make you laugh. Your laughter is its greatest reward.",
        fullDesc: `
      <p>This AI Chat Application leverages large language models (LLMs) to provide intelligent, conversational responses to user queries.</p><br />

      <p>Built in Android Studio using Java, it enables users to send input to the Groq API and receive real-time AI-generated responses.</p>
    `,
        tags: ["App"],
        techStack: ['Java', 'Android']
    },
    {
        title: "Bangboo Showcase Website",
        img: "./assets/bangboo.png",
        desc: "I like Bangboo, and I hope there is a website to store all bangboos and their details. Bangboo showcase website makes managing bangboo's information much easier.",
        fullDesc: `
      <p>This project showcases different types of Bangboo, a mascot character in the game Zenless Zone Zero by HoYoverse.</p><br />

      <p>The website is built using jQuery and Bootstrap for the frontend, with PHP and MySQL on the backend.</p><br />

      <p>Key features include:</p>
      <ul class="list-disc list-outside pl-5">
        <li>Integration of <code>datatables.js</code> for displaying Bangboo types in a sortable and searchable table format.</li>
        <li>CRUD operations for easy management of Bangboo data.</li>
      </ul>
    `,
        tags: ["Fullstack"],
        techStack: ['PHP', 'MySQL', 'jQuery']
    },
    {
        title: "Spam Email Classifier",
        img: "./assets/spam-email-classifier.png",
        desc: "Corporates receive thousands of email every day, so finding which one os spam email would be very challenging. Not only it might put receiver's in potential danger, handling them is also a waste of resources. With this motive, I created this spam email classifier hoping to solve this problem.",
        fullDesc: `
      <p>This project focuses on building a spam email classifier using a Decision Tree model.</p><br />

      <p>Using the UCI ML Spam Email dataset, I performed data mining to uncover valuable insights about the data. For example, I visualized feature correlations using Matplotlib.</p><br />

      <p>After preprocessing the data, I trained a Decision Tree model to classify emails as spam or not spam. The model was further enhanced through cross-validation.</p><br />

      <p>In the end, it achieved an accuracy score of over <strong>91%</strong> on the test set.</p>
    `,
        tags: ["Machine Learning"],
        techStack: ['Python', 'Pandas', 'Scikit-learn']
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
        const tagsHTML = project.techStack
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
        const overlay = document.getElementById("overlay");
        const modalTitle = document.getElementById("modal-title");
        const modalDesc = document.getElementById("modal-desc");
        const burgerBtn = document.getElementById('menu-toggle');

        document.querySelectorAll('[data-title]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const projectTitle = e.target.dataset.title;
                const project = projects.find(p => p.title === projectTitle);

                if (project) {
                    modalImg.src = project.img;
                    modalTitle.textContent = project.title;
                    modalDesc.innerHTML = project.fullDesc;
                    modal.showModal();
                    modal.scrollTop = 0

                    overlay.classList.remove("hidden");
                }

                burgerBtn.classList.add('hidden')
            });

            const closeBtn = document.getElementById('closeBtn');

            closeBtn.addEventListener('click', () => {
                modal.close();
                overlay.classList.add("hidden");
                burgerBtn.classList.remove('hidden')
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
