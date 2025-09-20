document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            // Populate Hero Section
            document.getElementById('nav-logo').textContent = data.name;
            document.getElementById('hero-name').textContent = data.name;
            document.getElementById('hero-title').textContent = data.title;
            document.getElementById('hero-img').alt = data.name;

            // Populate About Me
            document.getElementById('about-me').innerHTML = data.aboutMe;

            // Populate Experience
            const experienceContainer = document.getElementById('experience-container');
            data.experience.forEach(item => {
                const expItem = document.createElement('div');
                expItem.className = 'experience-item';
                expItem.innerHTML = `
                    <h3>${item.title}</h3>
                    <p>${item.company} | ${item.period}</p>
                    <ul>
                        ${item.responsibilities.map(res => `<li>${res}</li>`).join('')}
                    </ul>
                `;
                experienceContainer.appendChild(expItem);
            });

            // Populate Projects
            const projectsContainer = document.getElementById('projects-container');
            data.projects.forEach(project => {
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card';
                projectCard.innerHTML = `
                    <h3>${project.name}</h3>
                    <p>${project.description}</p>
                `;
                projectsContainer.appendChild(projectCard);
            });

            // Populate Skills
            const skillsContainer = document.getElementById('skills-container');
            data.skills.forEach(skill => {
                const skillElement = document.createElement('div');
                skillElement.className = 'skill';
                skillElement.textContent = skill;
                skillsContainer.appendChild(skillElement);
            });

            // Populate Contact
            const contactContainer = document.getElementById('contact-container');
            contactContainer.innerHTML = `
                <a href="${data.contact.linkedin}">LinkedIn</a>
                <a href="${data.contact.github}">GitHub</a>
                <a href="${data.contact.twitter}">Twitter</a>
            `;

            // Populate Footer
            document.getElementById('footer-text').textContent = `&copy; ${new Date().getFullYear()} ${data.name}`;
        });
});
