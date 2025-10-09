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
            for (const category in data.skills) {
                const categoryContainer = document.createElement('div');
                categoryContainer.className = 'skill-category';

                const categoryTitle = document.createElement('h3');
                categoryTitle.textContent = category;
                categoryContainer.appendChild(categoryTitle);

                const skillsGrid = document.createElement('div');
                skillsGrid.className = 'skills-grid';

                data.skills[category].forEach(skill => {
                    const skillElement = document.createElement('div');
                    skillElement.className = 'skill';
                    skillElement.textContent = skill;
                    skillsGrid.appendChild(skillElement);
                });
                categoryContainer.appendChild(skillsGrid);
                skillsContainer.appendChild(categoryContainer);
            }

            // Populate Competitive Programming
            const cpContainer = document.getElementById('competitive-programming-container');
            data.competitiveProgramming.forEach(profile => {
                const profileCard = document.createElement('div');
                profileCard.className = 'cp-profile-card';
                profileCard.innerHTML = `
                    <h3>${profile.platform}</h3>
                    ${profile.id ? `<p>ID: ${profile.id} 
                        ${profile.profileLink ? `
                        <a href="${profile.profileLink}" target="_blank" rel="noopener noreferrer" class="external-link-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                                <path fill-rule="evenodd" d="M16 0h-5.5a.5.5 0 0 0 0 1h4.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V6.5a.5.5 0 0 0 1 0V.5a.5.5 0 0 0-.5-.5z"/>
                            </svg>
                        </a>` : ''}
                    </p>` : ''}
                    <ul>
                        ${profile.achievements.map(ach => `<li>${ach}</li>`).join('')}
                    </ul>
                `;
                cpContainer.appendChild(profileCard);
            });

            // Populate Education
            const educationContainer = document.getElementById('education-container');
            data.education.forEach(edu => {
                const eduCard = document.createElement('div');
                eduCard.className = 'education-card';
                let content = `
                    <h3>${edu.degree}</h3>
                    <p>${edu.institution} | ${edu.period}</p>
                `;
                if (edu.notableCourses) {
                    content += `
                        <h4>Notable Courses</h4>
                        <ul>
                            ${edu.notableCourses.map(course => `<li>${course}</li>`).join('')}
                        </ul>
                    `;
                }
                if (edu.research) {
                    content += `<p><strong>Research:</strong> ${edu.research}</p>`;
                }
                if (edu.result) {
                    content += `<p><strong>Result:</strong> ${edu.result}</p>`;
                }
                if (edu.achievements) {
                    content += `
                        <h4>Achievements</h4>
                        <ul>
                            ${edu.achievements.map(ach => `<li>${ach}</li>`).join('')}
                        </ul>
                    `;
                }
                eduCard.innerHTML = content;
                educationContainer.appendChild(eduCard);
            });

            // Populate Judging Experience
            const judgingContainer = document.getElementById('judging-experience-container');
            data.judgingExperience.forEach(item => {
                const judgingCard = document.createElement('div');
                judgingCard.className = 'judging-experience-card';
                judgingCard.innerHTML = `
                    <h3>${item.role}</h3>
                    <p>${item.event}</p>
                    <ul>
                        ${item.responsibilities.map(res => `<li>${res}</li>`).join('')}
                    </ul>
                `;
                judgingContainer.appendChild(judgingCard);
            });

            // Populate Programming Contest Achievements
            const programmingContestContainer = document.getElementById('programming-contest-achievements-container');
            data.programmingContestExperience.forEach(item => {
                const contestCard = document.createElement('div');
                contestCard.className = 'programming-contest-achievements-card';
                contestCard.innerHTML = `
                    <h3>${item.event}</h3>
                    ${item.team ? `<p>Team: ${item.team}</p>` : ''}
                    ${item.id ? `<p>ID: ${item.id}</p>` : ''}
                    <ul>
                        ${item.achievements.map(ach => `<li>${ach}</li>`).join('')}
                    </ul>
                `;
                programmingContestContainer.appendChild(contestCard);
            });

            // Populate Teaching Experience
            const teachingContainer = document.getElementById('teaching-experience-container');
            data.teachingExperience.forEach(item => {
                const teachingCard = document.createElement('div');
                teachingCard.className = 'teaching-experience-card';
                teachingCard.innerHTML = `
                    <h3>${item.institution}</h3>
                    ${item.period ? `<p>${item.period}</p>` : ''}
                    <ul>
                        ${item.responsibilities.map(res => `<li>${res}</li>`).join('')}
                    </ul>
                `;
                teachingContainer.appendChild(teachingCard);
            });

            // Populate Technical Writing Experience
            const technicalWritingContainer = document.getElementById('technical-writing-experience-container');
            if (data.technicalWritingExperience) {
                data.technicalWritingExperience.forEach(item => {
                    const technicalWritingCard = document.createElement('div');
                    technicalWritingCard.className = 'technical-writing-experience-card';

                    let companyHTML = item.company;
                    if (item.companyWebsite) {
                        companyHTML += ` <a href="${item.companyWebsite}" target="_blank" rel="noopener noreferrer" class="external-link-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                                <path fill-rule="evenodd" d="M16 0h-5.5a.5.5 0 0 0 0 1h4.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V6.5a.5.5 0 0 0 1 0V.5a.5.5 0 0 0-.5-.5z"/>
                            </svg>
                        </a>`;
                    }

                    technicalWritingCard.innerHTML = `
                        <h3>${companyHTML}</h3>
                        <ul>
                            ${item.responsibilities.map(res => `<li>${res}</li>`).join('')}
                        </ul>
                    `;
                    technicalWritingContainer.appendChild(technicalWritingCard);
                });
            }

            // Populate Contact
            const contactContainer = document.getElementById('contact-container');
            contactContainer.innerHTML = `
                <a href="${data.contact.linkedin}">LinkedIn</a>
                <a href="${data.contact.github}">GitHub</a>
                <a href="mailto:${data.contact.email}">Email</a>
                <a href="tel:${data.contact.phone}">Phone</a>
            `;

            // Populate Footer
            document.getElementById('footer-text').innerHTML = `&copy; ${new Date().getFullYear()} ${data.name}`;

            // Mobile menu toggle
            const mobileMenu = document.getElementById('mobile-menu');
            const navLinks = document.getElementById('nav-links');

            mobileMenu.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                mobileMenu.classList.toggle('active');
            });
        });
});
