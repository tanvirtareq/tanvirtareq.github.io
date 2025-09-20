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
                    <h3>
                        ${project.name}
                        <span class="project-links">
                            ${project.githubLink ? `<a href="${project.githubLink}" target="_blank" rel="noopener noreferrer" class="project-link github-link">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
                                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38C13.71 14.53 16 11.54 16 8c0-4.42-3.58-8-8-8z"/>
                                </svg>
                            </a>` : ''}
                            ${project.liveAppLink ? `<a href="${project.liveAppLink}" target="_blank" rel="noopener noreferrer" class="project-link live-app-link">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                                    <path fill-rule="evenodd" d="M16 0h-5.5a.5.5 0 0 0 0 1h4.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V6.5a.5.5 0 0 0 1 0V.5a.5.5 0 0 0-.5-.5z"/>
                                </svg>
                            </a>` : ''}
                        </span>
                    </h3>
                    <ul>
                        ${project.description.map(desc => `<li>${desc}</li>`).join('')}
                    </ul>
                    ${project.technologies && project.technologies.length > 0 ? `
                        <div class="technologies-used">
                            ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                        </div>
                    ` : ''}
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
            `;

            // Populate Footer
            document.getElementById('footer-text').textContent = `&copy; ${new Date().getFullYear()} ${data.name}`;
        });
});
