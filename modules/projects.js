const projectData = require("../data/projectData.json");
const sectorData = require("../data/sectorData.json");

let projects = [];

// Initialize function
function initialize() {
    return new Promise((resolve, reject) => {
        try {
            projects = projectData.map(proj => {
                // find sector name by sector_id
                const sector = sectorData.find(sec => sec.id === proj.sector_id);
                return {
                    ...proj,
                    sector: sector ? sector.sector_name : "Unknown"
                };
            });
            resolve(); // no data needed, just confirm success
        } catch (err) {
            reject("Failed to initialize projects: " + err);
        }
    });
}

// Get all projects
function getAllProjects() {
    return new Promise((resolve, reject) => {
        if (projects.length > 0) {
            resolve(projects);
        } else {
            reject("No projects available");
        }
    });
}

// Get project by ID
function getProjectById(projectId) {
    return new Promise((resolve, reject) => {
        const project = projects.find(p => p.id === projectId);
        if (project) {
            resolve(project);
        } else {
            reject(`Project with id ${projectId} not found`);
        }
    });
}

// Get projects by sector
function getProjectsBySector(sector) {
    return new Promise((resolve, reject) => {
        const matches = projects.filter(p =>
            p.sector.toLowerCase().includes(sector.toLowerCase())
        );
        if (matches.length > 0) {
            resolve(matches);
        } else {
            reject(`No projects found for sector: ${sector}`);
        }
    });
}

// Export functions
module.exports = {
    initialize,
    getAllProjects,
    getProjectById,
    getProjectsBySector
};
