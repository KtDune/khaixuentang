let selectedSkillCategoryEl = null
let startIndex = 0

// --- Skill data: edit this to match your real skills ---
const SKILL_CATEGORIES = {
    "Frontend": [
        { name: "React", icon: "⚛️" },
        { name: "Vue", icon: "🟢" },
        { name: "Tailwind", icon: "🌊" },
        { name: "HTML", icon: "📄" },
        { name: "CSS", icon: "🎨" },
    ],
    "Backend": [
        { name: "Express", icon: "🚏" },
        { name: "MySQL", icon: "🐘" },
        { name: "MongoDB", icon: "🐘" },
    ],
    "DevTools": [
        { name: "Git", icon: "🔧" },
    ],
    "Cloud": [
        { name: "Firebase", icon: "☕" },
    ],
    "Labguages": [
        { name: "Javascript", icon: "☕" },
        { name: "Java", icon: "☕" },
        { name: "Python", icon: "☕" },
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
        'block',
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
    icon.textContent = skill.icon;
    icon.className = "text-4xl mb-2";

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

        return btn;
    });
}

function render(buttons) {
    const controls = document.getElementById('skill-controls');
    controls.innerHTML = '';

    buttons.forEach(btn => {

        btn.classList.remove('text-4xl')
        btn.classList.add('text-sm')

    })

    const visible = [
        buttons[(startIndex - 1 + buttons.length) % buttons.length],
        buttons[startIndex % buttons.length],
        buttons[(startIndex + 1) % buttons.length]
    ];

    // Change the style of the 2nd button to have text-4xl
    visible[1].classList.remove('text-sm')
    visible[1].classList.add('text-4xl')


    visible.forEach(btn => controls.appendChild(btn));
}

function addSwipeListener(el, onSwipeLeft, onSwipeRight) {
    let startX = 0;
    let startY = 0;

    function touchStart(e) {
        const touch = e.changedTouches[0];
        startX = touch.screenX;
        startY = touch.screenY;
    }

    function touchEnd(e) {
        const touch = e.changedTouches[0];
        let dx = touch.screenX - startX;
        let dy = touch.screenY - startY;

        // only detect horizontal swipe (ignore vertical)
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
            if (dx > 0) {
                onSwipeRight();
            } else {
                onSwipeLeft();
            }
        }
    }

    // return handlers so we can remove them later
    return { touchStart, touchEnd };
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