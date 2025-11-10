/********************************************************************************
* WEB322 – Assignment 02
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Nishaad      Student ID: 109348243      Date: 2025-11-09
*
********************************************************************************/

const express = require("express");
const path = require("path");
const projectData = require("./modules/projects");

const app = express();
const PORT = process.env.PORT || 8080;

// ---------- EJS ----------
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ---------- STATIC ----------
app.use(express.static("public"));

// ---------- DATA ----------
projectData.initialize()
  .then(() => {
    console.log("Data ready");

    // ----- HOME -----
    app.get("/", (req, res) => res.render("home", { page: "/" }));

    // ----- ABOUT -----
    app.get("/about", (req, res) => res.render("about", { page: "/about" }));

    // ----- PROJECT LIST (optional sector) -----
    app.get("/solutions/projects", (req, res) => {
      const sector = req.query.sector;
      const p = sector ? projectData.getProjectsBySector(sector) : projectData.getAllProjects();

      p.then(projects => res.render("projects", { projects, page: "/solutions/projects" }))
       .catch(() => res.status(404).render("404", {
         message: `No projects found for sector "${sector || "all"}".`,
         page: ""
       }));
    });

    // ----- SINGLE PROJECT -----
    app.get("/solutions/projects/:id", (req, res) => {
      projectData.getProjectById(parseInt(req.params.id))
        .then(project => res.render("project", { project, page: "" }))
        .catch(() => res.status(404).render("404", {
          message: `Project #${req.params.id} not found.`,
          page: ""
        }));
    });

    // ----- 404 FALLBACK -----
    app.use((req, res) => {
      res.status(404).render("404", {
        message: "Page not found.",
        page: ""
      });
    });

    // ----- START -----
    app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
  })
  .catch(err => console.error("Init failed:", err));