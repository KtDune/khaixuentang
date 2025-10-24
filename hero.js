const texts = [
  "4th Year student@TUS Athlone",
  "Software Developer",
  "Aspiring Graphic Engineer",
  "Tech Enthusiast",
];

let count = 0;   // which string we are on
let index = 0;   // which character in that string
let currentText = "";
let letter = "";

function type() {
  if (count === texts.length) {
    count = 0; // loop back to start
  }

  currentText = texts[count];
  letter = currentText.slice(0, ++index);

  document.getElementById("typing").textContent = letter;

  if (letter.length === currentText.length) {
    // wait before erasing
    setTimeout(() => erase(), 1000);
  } else {
    setTimeout(type, 100);
  }
};

function erase() {
  if (index > 0) {
    letter = currentText.slice(0, --index);
    document.getElementById("typing").textContent = letter;
    setTimeout(erase, 50);
  }
  else {
    count++;
    setTimeout(() => type(), 200);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  erase()

  document.getElementById('scroll-to-next').addEventListener('click', function () {
    document.getElementById('about-section').scrollIntoView({ behavior: 'smooth' });
  });

  document.querySelector('aside a[href="#project-title"]').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('project-title').scrollIntoView({ behavior: 'smooth' });
  });

  document.querySelector('aside a[href="#skill-section"]').addEventListener('click', function (e) {
    e.preventDefault();
    const skillsSection = document.getElementById('skills-section');
    const rect = skillsSection.getBoundingClientRect();
    const scrollY = window.scrollY + rect.top - (window.innerHeight / 2) + (rect.height / 2);
    window.scrollTo({ top: scrollY, behavior: 'smooth' });
  });

  document.querySelector('aside a[href="#about-section"]').addEventListener('click', function (e) {
    e.preventDefault();
    const skillsSection = document.getElementById('about-section');
    const rect = skillsSection.getBoundingClientRect();
    const scrollY = window.scrollY + rect.top - (window.innerHeight / 2) + (rect.height / 2);
    window.scrollTo({ top: scrollY, behavior: 'smooth' });
  });

  document.querySelector('aside a[href="#contact-section"]').addEventListener('click', function (e) {
    e.preventDefault();
    const skillsSection = document.getElementById('contact-section');
    const rect = skillsSection.getBoundingClientRect();
    const scrollY = window.scrollY + rect.top - (window.innerHeight / 2) + (rect.height / 2);
    window.scrollTo({ top: scrollY, behavior: 'smooth' });
  });

  document.querySelector('aside a[href="#hero-section"]').addEventListener('click', function (e) {
    e.preventDefault();
    const skillsSection = document.getElementById('hero-section');
    const rect = skillsSection.getBoundingClientRect();
    const scrollY = window.scrollY + rect.top - (window.innerHeight / 2) + (rect.height / 2);
    window.scrollTo({ top: scrollY, behavior: 'smooth' });
  });

  // Select elements
  // Select the burger button and sidebar
  const burgerBtn = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebar');

  // Toggle sidebar when burger is clicked
  burgerBtn.addEventListener('click', () => {
    sidebar.classList.add("max-sm:duration-300");
    sidebar.classList.toggle('max-sm:-translate-x-full');
    document.getElementById('overlay').classList.toggle('hidden');
  });

  overlay.addEventListener("click", () => {
    sidebar.classList.toggle("max-sm:-translate-x-full");
    overlay.classList.toggle("hidden");
  });

  window.addEventListener('resize', () => {
    // sm breakpoint in Tailwind
    if (window.innerWidth >= 640) {

      // Execute while sidebar is visible
      if (!sidebar.classList.contains('max-sm:-translate-x-full')) {
        sidebar.classList.add('max-sm:-translate-x-full');

        if (sidebar.classList.contains('max-sm:duration-300')) {
          sidebar.classList.remove('max-sm:duration-300');
        }
      } else {
        if (sidebar.classList.contains('max-sm:duration-300')) {
          sidebar.classList.remove('max-sm:duration-300');
        }
      }

      if (!overlay.classList.contains('hidden')) {
        overlay.classList.add('hidden');
      }
    }


  });
})