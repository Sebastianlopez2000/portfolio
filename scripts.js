document.addEventListener('DOMContentLoaded', function() {
    const fetchGithubProjects = async () => {
        try {
            const response = await fetch('/github-projects'); // Fetch projects from your server
            const projects = await response.json();
            displayProjects(projects);
        } catch (error) {
            console.error('Error fetching GitHub projects:', error);
        }
    };

    const displayProjects = (projects) => {
        const projectsContainer = document.getElementById('github-projects');
        projectsContainer.innerHTML = '';
        projects.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.classList.add('portfolio-item');
            projectElement.innerHTML = `
                <h3><a href="${project.html_url}" target="_blank">${project.name}</a></h3>
                <p>${project.description || 'No description available.'}</p>
                <p>⭐ ${project.stargazers_count}</p>
            `;
            projectsContainer.appendChild(projectElement);
        });
    };

    fetchGithubProjects();
});
