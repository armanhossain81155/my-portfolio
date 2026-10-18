# Arman Hossain — Portfolio

A responsive, dark-themed personal portfolio built with plain HTML, CSS and JavaScript (no build step).

## Structure

```
my-portfolio/
├── index.html          # Page layout (Hero, About, Skills, Projects, Contact)
├── css/style.css       # All styles (dark theme, hover effects, responsive rules)
├── js/projects.js      # Project data — edit this to add/remove projects
├── js/main.js          # Menu, smooth scroll, typing effect, filters, contact form
└── images/
    ├── profile.png
    └── projects/       # Project screenshots
```

## Adding a project

Add an object to the `PROJECTS` array in `js/projects.js`:

```js
{
  title: "My New Project",
  description: "Short description.",
  features: ["Feature one", "Feature two"],
  tech: ["React", "Firebase"],
  category: ["react"],          // must match a filter button's data-filter
  image: "images/projects/my-new-project.jpg",
  github: "https://github.com/armanhossain81155/my-new-project",
  live: "",                      // leave empty to show a disabled "Live Demo · Soon" button
}
```

## Run locally

Open `index.html` in a browser.

## Deploy (GitHub Pages)

1. Push this folder to `github.com/armanhossain81155/my-portfolio`.
2. Repo → **Settings → Pages** → Source: `main` branch, `/ (root)`.
3. The site will be live at `https://armanhossain81155.github.io/my-portfolio/`.
