const projectData = require("./modules/projects");

projectData.initialize()
    .then(() => {
        return projectData.getAllProjects();
    })
    .then(allProjects => {
        console.log("✅ All projects loaded:", allProjects.length);

        return projectData.getProjectById(9);
    })
    .then(project => {
        console.log("✅ Project with id 9:", project);

        return projectData.getProjectsBySector("agriculture");
    })
    .then(projects => {
        console.log("✅ Projects in Agriculture sector:", projects.length);
    })
    .catch(err => {
        console.log("❌ Error:", err);
    });
