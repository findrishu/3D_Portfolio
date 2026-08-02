# 🚀 Rahul's 3D Interactive Portfolio

A modern, high-performance **3D developer portfolio website** built with **React**, **TypeScript**, **Three.js**, **GSAP**, **Tailwind CSS**, and **Firebase**. 

This project isn't just a static portfolio—it features a fully functional, secure **Admin Panel** to manage content dynamically and track live visitors!

---

## ✨ Key Features

- **🎨 3D / WebGL Experience:** Stunning visual effects powered by **Three.js** and **React Three Fiber**.
- **⚡ Smooth Animations:** High-end scroll animations built with **GSAP**.
- **🛡️ Secure Admin Panel:** Protected by Firebase Authentication. Update your portfolio content (projects, tech stack) on the fly without changing code.
- **📊 Live Visitor Analytics:** Tracks visitors, their OS, and approximate locations securely using Firestore. (Built with OWASP security standards).
- **💎 Premium UI:** Redesigned Admin dashboard using **Tailwind CSS Glassmorphism** techniques.
- **💪 Type-Safe:** Fully refactored into **Strict TypeScript** for maximum reliability and maintainability.
- **📱 Fully Responsive:** Optimized for both desktop and mobile viewing.

---

## 🧰 Tech Stack

**Frontend:**
- React (Vite)
- TypeScript
- Tailwind CSS
- Three.js / WebGL
- GSAP

**Backend / Database:**
- Firebase Authentication
- Cloud Firestore (Realtime DB)

---

## 🚀 Getting Started (Local Development)

### 1) Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd "your-repo-name"
```

### 2) Install Dependencies

```bash
npm install
```

### 3) Set up Environment Variables
Create a `.env` file in the root directory and add your Firebase configuration:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4) Run the Dev Server

```bash
npm run dev
```

Your main portfolio will run at `http://localhost:5173/` 
Your secure Admin Panel will be at `http://localhost:5173/admin`

---

## 🔒 Security Best Practices Implemented
- **HSTS Headers** enabled via `vercel.json`
- **Firestore Security Rules** drafted restricting read/write access to authenticated admins only.
- **Sanitized Inputs** for visitor tracking to prevent injection attacks (OWASP A03:2021).
- **Tailwind Preflight Disabled** to protect legacy global CSS styling from accidental overrides.

---
*Designed & Maintained by Rahul Sharma*
