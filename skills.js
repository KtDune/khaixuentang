let selectedSkillCategoryEl = null
let startIndex = 0

// --- Skill data: edit this to match your real skills ---
const SKILL_CATEGORIES = {
    "Frontend": [
        {
            name: "React", icon: '<img src="./assets/React Icon.png" />'
        },
        { name: "Vue", icon: '<img src="./assets/Vue.js Icon.png" />' },
        { name: "Tailwind", icon: '<img src="./assets/Tailwind CSS Icon.png" />' },
        { name: "HTML", icon: '<img src="./assets/HTML5 Icon.png" />' },
        { name: "CSS", icon: '<img src="./assets/CSS3 Icon.png" />' },
    ],
    "Backend": [
        { name: "Express", icon: '<img src="./assets/Express Icon.png" class="invert dark:invert-0" />' },
        { name: "MySQL", icon: '<img src="./assets/MySQL Icon.png" />' },
        { name: "MongoDB", icon: '<img src="./assets/MongoDB Icon.png" />' },
    ],
    "DevTools": [
        { name: "Git", icon: '<img src="./assets/Git Icon.png" />' },
    ],
    "Cloud": [
        { name: "Firebase", icon: '<img src="./assets/Firebase Icon.png" />' },
    ],
    "Languages": [
        { name: "Javascript", icon: '<img src="./assets/JavaScript Icon.png" />' },
        { name: "Java", icon: '<img src="./assets/Java Icon.png" />' },
        { name: "Python", icon: '<img src="./assets/Python Icon.png" />' },
        { name: "PHP", icon: '<img src="./assets/PHP.png" />' },
    ],
    "AI / ML": [
        { name: "Pandas", icon: '<img src="./assets/Pandas.png" class="bg-[#E0E0E0]" />' },
        { name: "Scikit-Learn", icon: '<img src="./assets/scikit-learn.png" />' },
        { name: "Matplotlib", icon: '<img src="./assets/Matplotlib.png" />' },
        { name: "Numpy", icon: '<img src="./assets/NumPy.png" />' }
    ]
};


function createButton(text, active = false) {
    const btn = document.createElement('button');
    btn.className = [
        'h-10',
        'bg-[#121212]',
        'dark:bg-[#E0E0E0]',
        'text-[#E0E0E0]',
        'dark:text-[#121212]',
        active ? 'text-4xl' : 'text-sm',
    ].join(' ');

    btn.textContent = text;
    return btn;
}

function drawSpider(categoryName, skills) {
    const container = document.getElementById('skill-svg-wrap');
    container.innerHTML = '';

    // Grid wrapper
    const gridWrap = document.createElement('div');
    gridWrap.className = `
    grid 
    grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 
    gap-6 sm:gap-4 
    justify-center  /* centers the grid horizontally */
    justify-items-center /* centers each card inside its grid cell */
  `;

    skills.forEach(skill => {
        const card = document.createElement('div');
        card.className = `
      flex flex-col items-center justify-center 
      p-4 bg-[#121212] dark:bg-[#E0E0E0] rounded-lg 
      w-24 md:w-36
    `;

        const icon = document.createElement('div');
        icon.innerHTML = skill.icon;
        icon.className = "w-12 h-12 mb-2";

        const name = document.createElement('span');
        name.textContent = skill.name;
        name.className = "text-lg text-[#E0E0E0] dark:text-[#121212] text-center";

        card.appendChild(icon);
        card.appendChild(name);
        gridWrap.appendChild(card);
    });

    container.appendChild(gridWrap);
}

// Why button for labels? Because it should be clickable but now iI dont need it anymore.
function makeAllButtons() {
    const names = Object.keys(SKILL_CATEGORIES);
    return names.map((name, idx) => {
        const btn = createButton(name, idx === 0);

        btn

        return btn;
    });
}


// initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    // draw first category
    const names = Object.keys(SKILL_CATEGORIES);
    const first = names[0];
    const allButtons = makeAllButtons();

    render(allButtons)

    drawSpider(first, SKILL_CATEGORIES[first]);

    // 🔑 Helper: update active button + redraw
    function updateCategoryByIndex(index) {
        // redraw spider
        drawSpider(names[index], SKILL_CATEGORIES[names[index]]);
    }

    function render(buttons) {
        const controls = document.getElementById('skill-controls');
        controls.innerHTML = '';

        buttons.forEach(btn => {
            btn.classList.remove('text-4xl');
            btn.classList.add('text-sm');
        });

        const visible = [
            buttons[(startIndex - 1 + buttons.length) % buttons.length],
            buttons[startIndex % buttons.length],
            buttons[(startIndex + 1) % buttons.length]
        ];

        // Make center button large
        visible[1].classList.remove('text-sm');
        visible[1].classList.add('text-4xl');

        // Clone elements to remove old event listeners
        const leftBtn = visible[0].cloneNode(true);
        const rightBtn = visible[2].cloneNode(true);

        // Add new event listeners
        leftBtn.addEventListener('click', () => {
            startIndex = (startIndex - 1 + buttons.length) % buttons.length;
            render(buttons);
            updateCategoryByIndex(startIndex);
            selectedSkillCategoryEl = document.querySelector('#skill-controls .text-4xl');
        });

        rightBtn.addEventListener('click', () => {
            startIndex = (startIndex + 1 + buttons.length) % buttons.length;
            render(buttons);
            updateCategoryByIndex(startIndex);
            selectedSkillCategoryEl = document.querySelector('#skill-controls .text-4xl');
        });

        // Append in correct order
        controls.appendChild(leftBtn);
        controls.appendChild(visible[1]); // center stays as-is
        controls.appendChild(rightBtn);
    }

    // Previous button
    document.querySelector('#previous-skill').addEventListener('click', () => {
        startIndex = (startIndex - 1 + allButtons.length) % allButtons.length;

        render(allButtons);
        updateCategoryByIndex(startIndex);

        selectedSkillCategoryEl = document.querySelector('#skill-controls .text-4xl')
    });

    // Next button
    document.querySelector('#next-skill').addEventListener('click', () => {
        startIndex = (startIndex + 1) % allButtons.length;

        render(allButtons);
        updateCategoryByIndex(startIndex);

        selectedSkillCategoryEl = document.querySelector('#skill-controls .text-4xl')
    });

});