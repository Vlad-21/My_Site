const anchors = document.querySelectorAll('a[href*="#"]');

for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const blockID = anchor.getAttribute('href').substr(1);

        document.getElementById(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    });
}

const SKILLS = [
    '- JavaScript',
    '- TypeScript',
    '- Node.js',
    '- Angular',
    '- React',
    '- Express',
    '- Git',
    '- MongoDB',
    '- MySQL',
];

const ul = document.getElementById('skill-list');

async function appendWithDelay(item, index) {
    const li = document.createElement('li');
    li.id = index;
    ul.appendChild(li);
    let loopCount = 0;
    let text = '';
    for (const element of item) {
        const liElem = document.getElementById(index);
        text += element;
        liElem.textContent = `${text}${
            item.length == loopCount + 1 ? '' : '|'
        }`;
        loopCount += 1;
        await new Promise((resolve) => setTimeout(resolve, 150));
    }
}

async function processItems() {
    for (let i = 0; i < SKILLS.length; i++) {
        await appendWithDelay(SKILLS[i], i);
    }
}

const targetBlock = document.getElementById('skill-image');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            setTimeout(() => {
                processItems();
            }, 500);
            observer.unobserve(entry.target);
        }
    });
});

observer.observe(targetBlock);
