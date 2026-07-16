# ADTEC JTM Kampus Sandakan Dashboard (Static HTML)

This project is a completely static, frontend-only Student Enrollment Dashboard. It is built using standard web technologies (**HTML**, **Tailwind CSS**, and **Chart.js**), meaning it requires zero servers, zero python, and can be hosted anywhere for free!

## Features
- **Instant Load Time:** No backend servers to spin up or put to sleep.
- **Premium UI:** Uses Tailwind CSS for a sleek, glassmorphism dark-mode design.
- **Interactive Charts:** Powered by Chart.js.
- **Easy Updates:** Update your student data by simply editing one file (`data.js`).

## How to Update Data
When a new semester starts:
1. Open the `data.js` file.
2. Change the numbers next to `sem1`, `sem2`, etc.
3. Save the file. The dashboard will update automatically!

## How to View Locally
You do not need to install anything. Just double-click the `index.html` file on your computer and it will open perfectly in your web browser.

## How to Deploy to GitHub Pages (100% Free Forever)
Since this is a static site, GitHub Pages is the perfect home for it. Here is the step-by-step guide to put it live on the internet:

### Step 1: Upload to GitHub
1. Go to [GitHub.com](https://github.com/) and click the **+** icon in the top right to create a **New repository**.
2. Give it a name (e.g., `adtec-dashboard`) and keep it **Public**. Click **Create repository**.
3. On the next screen, click the blue link that says **"uploading an existing file"**.
4. Drag and drop these 4 files from your computer into the browser window:
   - `index.html`
   - `data.js`
   - `script.js`
   - `README.md`
5. Click the green **Commit changes** button.

### Step 2: Turn on GitHub Pages
1. On your repository page, look for the **Settings** tab near the top right.
2. In the left-hand menu, scroll down and click on **Pages**.
3. Under "Build and deployment", look for the **Source** dropdown and make sure it says **Deploy from a branch**.
4. Under "Branch", change the dropdown from `None` to `main` (or `master`).
5. Click **Save**.

**That's it!** 
Wait about 1 to 2 minutes, and then refresh that Settings -> Pages screen. You will see a message at the top that says *"Your site is live at https://[your-username].github.io/[repo-name]/"*. 

Click that link to view your live dashboard and share it with auditors and visitors!
