# 🛡️ Cyber Scan Guardian Shield – Web Vulnerability Scanner

> An ethical, open-source web vulnerability scanner built with React, Tailwind CSS, and Node.js – designed for developers, cybersecurity learners, and ethical hackers.

![Screenshot](./screenshot.png)

## 🔗 Live Demo

👉 **Frontend (GitHub Pages)**: [https://ibwmahin.github.io/cyber-scan-guardian-shield/](https://ibwmahin.github.io/cyber-scan-guardian-shield/)  
👉 **Backend (Optional / Coming Soon)**: (e.g. Render or Railway deployment link)

---

## 📌 Project Summary

**Cyber Scan Guardian Shield** is a cybersecurity tool that performs basic automated scans on websites to detect common vulnerabilities like:

- SSL misconfigurations
- XSS and SQL injection indicators
- Insecure headers
- Clickjacking issues
- Basic port checks (optional backend)

🛠 For **educational and ethical use only** — no illegal or black-hat methods involved.

---

## ✨ Features

### 🧠 Frontend

- Clean UI with hacker-style terminal aesthetics
- Dark theme with Tailwind CSS
- Input form to scan a domain/IP
- Real-time scan result display
- Risk levels (Low / Medium / High)
- Fix suggestions for each issue

### 🔍 Vulnerability Checks

- ✅ SSL/TLS config
- ✅ XSS payload testing (safe dummy logic)
- ✅ SQL Injection indicators (mock)
- ✅ Clickjacking (X-Frame-Options check)
- ✅ CSP & Security Headers check
- ✅ Open ports (if backend enabled)

### 🕘 Optional (Advanced)

- Scan history (localStorage / Firebase)
- Backend-based deeper scans

---

## 🛠️ Tech Stack

| Layer        | Tech                        |
| ------------ | --------------------------- |
| Frontend     | React + Tailwind CSS        |
| Backend      | Node.js + Express (planned) |
| Deployment   | GitHub Pages (frontend)     |
| APIs / Tools | Public APIs + Mock Logic    |

---

## 🚀 Getting Started

### Clone and Setup

```bash
git clone https://github.com/ibwmahin/cyber-scan-guardian-shield.git
cd cyber-scan-guardian-shield
npm install
npm run dev


If you are running with a backend:

cd backend
npm install
node index.js
🌐 Deployment
GitHub Pages (Frontend)
Already deployed at:
https://ibwmahin.github.io/cyber-scan-guardian-shield/

If you want to deploy your fork:

1. Add homepage to package.json: "homepage": "https://<your-username>.github.io/<repo-name>"
2. Add scripts:
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}

3.Deploy:
npm run deploy
📄 License
MIT License – free for personal, academic, or commercial use.


🚨 Legal Disclaimer
This tool is for educational and ethical testing only.
Scanning websites without explicit permission is illegal.
Always respect privacy and digital rights.

✍️ Author
Built with 💻 + ☕ by Abdulla Al Mahin
For portfolio and learning purposes.

📂 Repo Structure

cyber-scan-guardian-shield/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   └── utils/
├── backend/ (optional)
├── README.md
└── package.json


🙌 Want to Contribute?
1. Fork the repo

2. Make a feature branch: git checkout -b feature/x

3. Commit: git commit -m "add new feature"

4. Push: git push origin feature/x

5. Open a Pull Request



🧠 Resources
OWASP Top 10

SecurityHeaders.com

Mozilla Observatory


```
