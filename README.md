# 🍕 The Pizza Hub

A modern and responsive **Food Ordering Web Application** built using **React + Vite**, designed for smooth browsing, fast performance, and clean UI. Users can explore the menu, view categories, choose pizza sizes, add items to the cart, update quantities, search items, and manage their profile — all in one place.

---

## 🚀 Features

* 🍕 **Pizza Size Selection (S / M / L)**
* 🛒 **Add to Cart / Increase & Decrease Quantity**
* 📂 **Browse by Categories**
* ⭐ **Ratings & Item Details**
* 🔎 **Search Food Items**
* 👤 **User Login & Profile Page**
* 📱 **Fully Responsive UI**
* ⚡ **Fast Performance with Vite**
* 🎨 **Tailwind CSS for Styling**
* ☁ **Context API for Global State (Cart, Menu)**

---

## 📦 Tech Stack

### **Frontend**

* React
* Vite
* Tailwind CSS
* React Router
* Context API
* React Icons

### **Backend (API Calls)**

⚠ *Backend API code not included in this project — only API usage is shown below.*

Your project uses `BASE_URL` from `Api.jsx`, something like:

```
BASE_URL = "http://your-backend-url/api"
```

### **APIs Used in The Pizza Hub**

| Purpose                      | API Route                   |
| ---------------------------- | --------------------------- |
| Fetch menu categories        | `/menu`                     |
| Fetch best / popular items   | `/best`                     |
| Fetch individual item images | `${BASE_URL}/${image}`      |
| User login                   | `/login`                    |
| User profile                 | `/profile`                  |
| Cart operations              | Context API (frontend only) |

You can add real backend endpoints here when you link your server.

---

## 📁 Project Structure

```
WEB_APP/
│── public/
│── src/
│   ├── assets/
│   ├── Components/
│   │   ├── Items/ (Navbar, Footer, Card)
│   │   ├── data/ (Api, Context, ContextTwo)
│   ├── pages/
│   │   ├── Homepage/
│   │   ├── Menu/
│   │   ├── Cart/
│   │   ├── Search.jsx
│   │   ├── user.jsx/
│   │   ├── profile/
│   ├── App.jsx
│   ├── main.jsx
│── index.html
│── package.json
│── README.md
```

---

## ⚙️ Installation & Usage

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

### 3. Build for Production

```bash
npm run build
```

### 4. Preview Production Build

```bash
npm run preview
```

---

## ❤️ Made with love for The Pizza Hub
