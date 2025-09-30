/********************************************************************************
* WEB322 – Assignment 01
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Nishaad      Student ID: 109348243      Date: 2025-09-30
*
********************************************************************************/

const express = require("express");
const projectData = require("./modules/projects");

const app = express();
const HTTP_PORT = process.env.PORT || 8080;

// Initialize data before starting the server
projectData.initialize()
    .then(() => {
        console.log("Data initialized successfully!");

        // Routes

        // Home route
        app.get("/", (req, res) => {
            res.send("Assignment 1: Nishaad - 109348243");
        });

        // Return all projects
        app.get("/solutions/projects", (req, res) => {
            projectData.getAllProjects()
                .then(data => res.json(data))
                .catch(err => res.status(500).send(err));
        });

        // Demo: Get project by ID
        app.get("/solutions/projects/id-demo", (req, res) => {
            projectData.getProjectById(9)
                .then(project => res.json(project))
                .catch(err => res.status(404).send(err));
        });

        // Demo: Get projects by sector
        app.get("/solutions/projects/sector-demo", (req, res) => {
            projectData.getProjectsBySector("agriculture")
                .then(projects => res.json(projects))
                .catch(err => res.status(404).send(err));
        });

        // Start server
        app.listen(HTTP_PORT, () => {
            console.log(`Server listening on port ${HTTP_PORT}`);
        });

    })
    .catch(err => {
        console.log("Failed to initialize data:", err);
    });
