#  The Pizza Hub — Frontend

A modern, fully responsive food ordering web application built with React and Vite. Designed and developed as a freelance project for a local food business client.

**Live Demo:** [web-shopfrontend.vercel.app](https://web-shopfrontend.vercel.app)  
**Backend Repo:** [github.com/SsuryaTyagi/web-shop](https://github.com/SsuryaTyagi/web-shop)  
**Backend Live:** [web-shop-nine-zeta.vercel.app](https://web-shop-nine-zeta.vercel.app)

---

## Screenshots

### Homepage
![Homepage](https://ik.imagekit.io/gb1lyvp8q/The%20pizza%20hub/website%20photo/Screenshot%202026-05-24%20035933.png)
> Hero banner with food categories, clean navigation — Home, Search, Profile, Cart, Contact Us

### Contact Page
![Contact Us](https://ik.imagekit.io/gb1lyvp8q/The%20pizza%20hub/website%20photo/Screenshot%202026-05-24%20035946.png)
> Contact form with name, email, subject, message fields and business info

### Live Razorpay Payment
![Razorpay Payment](https://ik.imagekit.io/gb1lyvp8q/The%20pizza%20hub/website%20photo/Screenshot%202026-05-24%20040018.png)
> Real Razorpay payment modal in action — UPI, Cards, Netbanking, Wallet, Pay Later — **Live mode, not test**

---

## Features

- **Pizza Size Selection** — Choose between Small, Medium, and Large with dynamic pricing
- **Shopping Cart** — Add items, increase/decrease quantity, real-time total calculation
- **Browse by Category** — Filter menu by food categories
- **Search** — Real-time search across all menu items
- **User Authentication** — Register, login, logout with JWT-based sessions
- **Email Verification** — Account activation via verification email on registration
- **Google OAuth Login** — Sign in with Google in one click
- **Razorpay Live Payments** — Real payment gateway — UPI, Cards, Netbanking, Wallets
- **User Profile Page** — View and manage account details
- **Contact Us Page** — Contact form with business info
- **Product Images via ImageKit** — Fast CDN-served images for all food items
- **Fully Responsive UI** — Mobile-first design, works on all screen sizes
- **Fast Performance** — Built with Vite for near-instant builds and hot reload

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React.js |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Routing | React Router v6 |
| State Management | Context API |
| Icons | React Icons |
| Payments | Razorpay (Live Mode) |
| Media | ImageKit CDN |
| Deployment | Vercel |

---

## Getting Started

### Prerequisites
- Node.js v18+
- Backend server running ([web-shop backend](https://github.com/SsuryaTyagi/web-shop))

### Installation

```bash
git clone https://github.com/SsuryaTyagi/web-shop-frontend.git
cd web-shop-frontend
npm install
```

### Environment Variables

Create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:5000
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
VITE_IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

### Run Locally

```bash
npm run dev
```

App runs at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

---

## Project Structure

```
web-shop-frontend/
├── src/
│   ├── Components/
│   │   ├── Items/         # Navbar, Footer, Cards
│   │   └── data/          # API config, Context, CartContext
│   ├── pages/
│   │   ├── Homepage/
│   │   ├── Menu/
│   │   ├── Cart/
│   │   ├── Search.jsx
│   │   ├── user.jsx
│   │   └── profile/
│   ├── App.jsx
│   └── main.jsx
├── screenshots/           # Project screenshots
├── index.html
├── vercel.json
└── package.json
```

---

## User Flow

```
Visit Site
→ Browse menu / search items / browse categories
→ Select pizza size (S/M/L) → Add to cart
→ Register → Email verification sent
→ Verify email → Account activated
   OR
→ Login with Google OAuth (one click)
→ Add delivery address
→ Razorpay payment modal opens (Live)
   → Pay via UPI / Card / Netbanking / Wallet
→ Order confirmed
```

---

## Deployment

- **Frontend** — Vercel (`vercel.json` configured for React SPA routing)
- **Backend** — Vercel serverless ([web-shop](https://github.com/SsuryaTyagi/web-shop))

> Built as a freelance project for a local food business client.

---

## Built by

**Surya Tyagi** — [github.com/SsuryaTyagi](https://github.com/SsuryaTyagi) · [LinkedIn](https://www.linkedin.com/in/surya-tyagi-71a899361/)
