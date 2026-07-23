# TechVanta Front Page MVP

A responsive static landing page for a professional knowledge-sharing network.

## Run locally

Just open `index.html` in a browser.

For a local web server:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Host on GitHub Pages

1. Create a new GitHub repository.
2. Upload `index.html`, `styles.css`, and `script.js` to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch **main** and folder **/(root)**.
6. Save. GitHub will publish the site.

## Current MVP interactions

- Responsive navigation
- Search/filter knowledge posts
- Topic filtering
- Knowledge-type tabs
- Useful button
- Save button
- Join community button
- Dark/light content theme toggle
- Demo AI assistant box
- Publishing modal

## Important

The current page is front-end only. Authentication, profiles, article creation,
comments, community membership, databases, AI responses and moderation require
a backend/API in the next development phase.

The name `TechVanta` is currently a placeholder and can be changed globally.
