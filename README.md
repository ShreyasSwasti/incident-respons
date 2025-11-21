# 🚨 Incident Response Playbook Generator & DDoS Request Monitor

## 🛡️ Overview
This project is built as part of a cybersecurity hackathon. It is designed to generate a **step-by-step Incident Response (IR) playbook** based on the type of incident and associated log data. Additionally, it includes a **DDoS Request Monitoring System** that tracks incoming requests and automatically raises an alert when the threshold limit is exceeded.

---

## ✨ Key Features
- 🔐 **Login & Signup UI** with visual security shields and modern UI
- 📄 **Incident Response Playbook Generator**
  - Input: Incident type + log data
  - Output: Step-by-step incident response instructions
- 🚨 **DDoS Monitoring**
  - Tracks number of incoming requests
  - If requests > 300 → Alert popup & server offline
  - If requests < 300 → Accept traffic normally
- 📋 **Checklist-based IR workflow**
- 🌐 **Frontend Built with React**
- ☁️ **GitHub deployment & hosting Ready**

---

## 🏗️ Tech Stack
| Component | Technology |
|----------|------------|
| Frontend UI | React.js / HTML / CSS / JavaScript |
| Styling | Custom Components & Security Widgets |
| Version Control | Git + GitHub |
| Deployment | GitHub Pages / Vercel (future upgrade) |

---

## 📌 Project Structure

---

## 🚀 How It Works (Flow)
| Step | Description |
|------|------------|
| 1 | User logs in or creates an account |
| 2 | Selects incident type (Malware, DDoS, Phishing, Ransomware, Insider Threat) |
| 3 | Uploads or pastes logs |
| 4 | System analyzes logs |
| 5 | Generates step-by-step IR playbook |
| 6 | Displays checklist for responders |
| 7 | If DDoS Monitor active → auto threshold alert popup |

---

## 🔧 Commands to Run Locally
```bash
cd frontend
npm install
npm start
git clone https://github.com/ShreyasSwasti/incident-respons.git

---

# 🎉 Done!
You can now:
## 1️⃣ Copy and paste this into README.md
## 2️⃣ Commit and push:

```bash
git add README.md
git commit -m "Updated README documentation"
git push
