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

                let companyHTML = item.company;
                if (item.companyWebsite) {
                    companyHTML += ` <a href="${item.companyWebsite}" target="_blank" rel="noopener noreferrer" class="external-link-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                            <path fill-rule="evenodd" d="M16 0h-5.5a.5.5 0 0 0 0 1h4.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V6.5a.5.5 0 0 0 1 0V.5a.5.5 0 0 0-.5-.5z"/>
                        </svg>
                    </a>`;
                }

                expItem.innerHTML = `
                    <h3>${item.title}</h3>
                    <p>${companyHTML} | ${item.period}</p>
                    <ul>
                        ${item.responsibilities.map(res => `<li>${res}</li>`).join('')}
                    </ul>
                    ${item.technologies && item.technologies.length > 0 ? `
                        <div class="technologies-used">
                            <h4>Technologies:</h4>
                            ${item.technologies.map(tech => `<span>${tech}</span>`).join('')}
                        </div>
                    ` : ''}
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
