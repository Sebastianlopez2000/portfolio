document.addEventListener('DOMContentLoaded', function() {
    const githubUsername = 'your-github-username'; // Replace with your GitHub username
    const githubToken = 'your-github-token'; // Replace with your GitHub token

    const fetchGithubProjects = async () => {
        const response = await fetch(`https://api.github.com/users/${githubUsername}/repos`, {
            headers: {
                'Authorization': `token ${githubToken}`
            }
        });
        const projects = await response.json();
        displayProjects(projects);
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
