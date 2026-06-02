# ☕ JavaVerse — Complete Setup Guide

## What You're Getting

A **complete, fully-coded Java Learning Platform** with:
- 🎓 **58 topics** across 8 modules — Basics → OOP → Collections → Exceptions → Java 8 → Multithreading → Advanced → Interview Prep
- 💻 **Online Code Editor** with 6 built-in snippets, line numbers, run simulation
- 🧠 **Quizzes** for every topic (4 questions each with scoring)
- 📊 **Progress tracking** saved to browser localStorage (no database needed)
- 🔖 **Bookmarks** system
- ⚡ **XP/Gamification** system
- 🗺️ **Visual Roadmap** page
- 🔍 **Search** across all 58 topics
- 🌙 **Dark/Light mode** toggle
- 📱 **Mobile responsive** design
- ✅ **No login required** — open browser → start learning immediately

---

## Prerequisites — Install These First (ALL FREE)

### Step 1 — Install Node.js

**What it is:** JavaScript runtime needed to run React/Vite

**Download:** https://nodejs.org/en/download

**Choose:** LTS version (e.g. 20.x or 22.x)

**Installation:**
- Windows: Download `.msi` installer → Run it → Click Next/Next/Finish
- Mac: Download `.pkg` installer → Run it
- Linux: `sudo apt install nodejs npm` (Ubuntu/Debian)

**Verify:**
```bash
node --version    # Should show v18+ or v20+
npm --version     # Should show 9+ or 10+
```

### Step 2 — Install Git (optional, for version control)

**Download:** https://git-scm.com/downloads

---

## Project Setup

### Step 1 — Get the project files

If you have the zip file:
```bash
# Extract the zip to a folder, then:
cd javaverse
```

Or create it from scratch:
```bash
mkdir javaverse && cd javaverse
# Copy all the files into this folder
```

### Step 2 — Install dependencies

```bash
# Inside the javaverse folder:
npm install
```

This installs:
- `react` + `react-dom` — UI framework
- `react-router-dom` — page routing
- `react-syntax-highlighter` — code highlighting
- `vite` + `@vitejs/plugin-react` — build tool

Takes 1-3 minutes depending on internet speed.

### Step 3 — Run the development server

```bash
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in 500ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: http://192.168.x.x:3000/
```

Open your browser to **http://localhost:3000**

🎉 **JavaVerse is now running!**

---

## File Structure

```
javaverse/
├── index.html              ← Entry HTML
├── package.json            ← Dependencies
├── vite.config.js          ← Vite config (port 3000)
└── src/
    ├── main.jsx            ← React entry point
    ├── App.jsx             ← Router + global state
    ├── index.css           ← Global styles + CSS variables
    ├── components/
    │   ├── Layout.jsx      ← Sidebar + top nav shell
    │   ├── CodeBlock.jsx   ← Syntax-highlighted code display
    │   ├── Quiz.jsx        ← Interactive quiz component
    │   └── Toast.jsx       ← Notification toasts
    ├── pages/
    │   ├── Dashboard.jsx   ← Main dashboard (landing page)
    │   ├── LearnPage.jsx   ← All modules/topics overview
    │   ├── TopicPage.jsx   ← Full lesson with theory/code/quiz
    │   ├── CompilerPage.jsx← Online code editor
    │   ├── RoadmapPage.jsx ← Visual learning roadmap
    │   └── SearchPage.jsx  ← Global search
    └── data/
        ├── index.js        ← Aggregates all data, exports helpers
        ├── modules.js      ← 8 module definitions
        ├── topics-basics.js        ← 10 beginner topics
        ├── topics-oop.js           ← 8 OOP topics
        ├── topics-collections.js  ← 8 collections topics
        ├── topics-exceptions.js   ← 6 exception topics
        ├── topics-java8.js        ← 7 Java 8 topics
        ├── topics-multithreading.js ← 6 concurrency topics
        └── topics-advanced.js     ← 13 advanced+interview topics
```

---

## All 58 Topics

### ☕ Java Basics (10)
Introduction, Variables, Data Types, Operators, Control Flow, Loops, Arrays, Strings, Methods, Input/Output

### 🏗️ OOP Concepts (8)
Classes & Objects, Constructors, Inheritance, Polymorphism, Abstraction, Encapsulation, Interfaces, Static Keyword

### 📦 Collections (8)
Overview, ArrayList, LinkedList, HashMap, TreeMap, HashSet, Stack & Queue, Iterators

### 🛡️ Exception Handling (6)
Overview, try-catch, finally, throw/throws, Custom Exceptions, Exception Hierarchy

### ⚡ Java 8 Features (7)
Lambdas, Functional Interfaces, Stream API, Optional, Default Methods, Method References, Date & Time

### 🧵 Multithreading (6)
Thread Intro, Synchronization, Thread Communication, ExecutorService, CompletableFuture, Concurrent Collections

### 🚀 Advanced Java (6)
Generics, Annotations, Reflection, Design Patterns, JDBC, File I/O

### 💼 Interview Prep (7)
Core Java Q&A, OOP Q&A, Collections Q&A, Java 8 Q&A, Concurrency Q&A, DSA Arrays, DSA Strings

---

## Features Guide

### Tracking Progress
- Click **✅ Mark Complete** on any topic to save progress
- Progress bars update in real-time
- XP is earned for completing topics and quizzes
- All data saved in browser localStorage (persists between sessions)

### Code Editor
- Go to **⚙️ Code Editor** in the sidebar
- Choose from 6 built-in templates
- Write/edit code in the left panel
- Click **▶ Run** or press **Ctrl+Enter** to see simulated output
- Font size controls: A- / A+

### Quizzes
- Open any topic → click **🧠 Quiz** tab
- 4 multiple-choice questions per topic
- Instant feedback (green = correct, red = wrong)
- Score summary + answer review at the end
- +25 XP per correct answer

### Dark/Light Mode
- Click the moon/sun button at the bottom of the sidebar
- Preference saved to localStorage

### Search
- Use the search bar in the top navigation
- Searches topic titles, introductions, modules, difficulty levels
- Click any result to navigate directly to that topic

---

## Production Build (for deployment)

```bash
npm run build
```

Creates a `dist/` folder with optimized static files.

### Deploy to Vercel (FREE)

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow prompts — your site gets a free URL like `javaverse.vercel.app`

### Deploy to Netlify (FREE)

1. Go to https://netlify.com
2. Drag and drop the `dist/` folder onto Netlify's dashboard
3. Done! You get a free URL

### Deploy to GitHub Pages (FREE)

1. Push code to GitHub
2. In `vite.config.js`, add: `base: '/your-repo-name/'`
3. Run `npm run build`
4. Push `dist/` to `gh-pages` branch
5. Enable Pages in GitHub repo settings

---

## Customization

### Add a new topic

1. Open `src/data/topics-basics.js` (or the relevant module file)
2. Add a new entry following the existing pattern:
```js
"my-new-topic": {
  title: "My New Topic",
  module: "basics",
  duration: "15 min",
  difficulty: "Beginner",
  xp: 75,
  icon: "📌",
  intro: "Introduction text here...",
  sections: [
    {
      heading: "Section Title",
      content: "Explanation...",
      code: `public class Example { ... }`,
      output: "Expected output..."
    }
  ],
  quiz: [
    { q: "Question?", options: ["A","B","C","D"], correct: 1 }
  ],
  code: `public class Main { ... }`,
  output: "Output..."
}
```
3. Add the topic id to the module's `topics` array in `src/data/modules.js`

### Change theme colors

Edit CSS variables in `src/index.css` under `[data-theme="dark"]` or `[data-theme="light"]`

---

## Troubleshooting

**Port 3000 in use:**
```bash
# Use different port:
vite --port 3001
# Or kill the process using port 3000
```

**npm install fails (network issue):**
```bash
npm install --legacy-peer-deps
# Or try:
npm install --force
```

**Page shows blank:**
- Open browser DevTools (F12)
- Check Console tab for errors
- Most likely a syntax error in a data file

**Fonts not loading:**
- Requires internet connection (Google Fonts CDN)
- Offline: Remove the Google Fonts import from `index.html` — system fonts will be used

---

## What's Next (after testing)

Tell me where you want to deploy and I'll give you exact instructions:

1. **Vercel** — Fastest, 1 command deploy
2. **Netlify** — Drag-and-drop easy
3. **GitHub Pages** — Free with your GitHub account
4. **Custom domain** — Add your own domain to any of the above
5. **Real Java compiler** — Integrate Judge0 API for actual code execution

---

## Tech Stack Summary

| Technology | Version | Purpose |
|---|---|---|
| React | 18.x | UI framework |
| Vite | 5.x | Build tool + dev server |
| React Router | 6.x | Page routing |
| react-syntax-highlighter | 15.x | Code highlighting |
| CSS Variables | — | Theming (dark/light) |
| localStorage | — | Progress persistence |
| Google Fonts | — | Typography |

**No backend. No database. No login. 100% static frontend.**

---

*JavaVerse — Built with ❤️ for Java learners everywhere*
