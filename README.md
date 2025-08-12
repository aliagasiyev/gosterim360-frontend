# 🎬 Gösterim360

A modern, full-featured cinema ticketing platform for seamless movie discovery, smart seat selection, secure payments, and instant QR code ticketing—all wrapped in a beautiful, responsive user experience.

---

## 🚀 Project Vision

Gösterim360 aims to set a new standard for cinema ticketing.  
It empowers moviegoers with a delightful, intuitive interface and gives cinema operators robust tools for managing movies, sessions, seats, and reservations.

---

## ✨ Features

- **Movie Discovery:** Browse, search, and filter movies with real posters, genres, and ratings.
- **Session Selection:** View all available sessions for each movie, with clear times and details.
- **Smart Seat Selection:** Interactive seat map with AI-powered recommendations and real-time availability.
- **Secure Payments:** Integrated payment flow (Stripe), with instant feedback and error handling.
- **QR Code Ticketing:** Instantly receive a scannable QR code ticket after purchase.
- **User Management:** Register, log in, and manage your profile (with role-based access).
- **Admin Panel:** Manage movies, sessions, salons, seats, users, and reservations (optional).
- **Responsive Design:** Pixel-perfect experience on desktop, tablet, and mobile.
- **Dark/Light Mode:** Toggle between elegant dark and light themes.
- **Accessibility:** Keyboard navigation, alt text, and high-contrast color options.

---

## 🖥️ Screenshots

> ![Movie Selection](./screenshots/movie-selection.png)
> ![Seat Selection](./screenshots/seat-selection.png)
> ![Payment & QR Ticket](./screenshots/payment-qr.png)

---

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, TailwindCSS, React Router, Axios, Zustand/Redux (optional)
- **Backend:** Java, Spring Boot, RESTful APIs, Swagger/OpenAPI
- **Database:** (e.g., PostgreSQL, MySQL, or as configured)
- **Payments:** Stripe API
- **QR Codes:** qrcode.react or similar
- **Testing:** Jest, React Testing Library

---

## 📦 API Overview

Gösterim360 exposes a robust REST API for all core operations:

- **Movies:** `/api/v1/movies`, `/api/v1/movies/{id}`, `/api/v1/movies/search`, etc.
- **Sessions:** `/api/v1/sessions/films/{filmId}/sessions`, `/api/v1/sessions/{id}`
- **Seats:** `/api/v1/seats?sessionId=...`, `/api/v1/seats/{id}`
- **Reservations:** `/api/v1/reservations`, `/api/v1/reservations/session/{sessionId}`
- **Payments:** `/api/payments/reservation`, `/api/payments/confirm`
- **Users:** `/api/v1/users`, `/api/v1/users/{id}`

All responses follow a standard structure:
```json
{
  "success": true,
  "message": "string",
  "data": { ... },
  "status": 0,
  "path": "string",
  "errors": [ "string" ],
  "timestamp": "2025-08-12T09:52:05.302Z"
}
```

---

## ⚡️ Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/gosterim360-cinema.git
cd gosterim360-cinema
```

### 2. Install dependencies

```bash
# For frontend
cd frontend
npm install

# For backend
cd ../backend
./gradlew build
```

### 3. Run the app

```bash
# Start backend
cd backend
./gradlew bootRun

# Start frontend
cd ../frontend
npm start
```

### 4. Open in your browser

Visit [http://localhost:3000](http://localhost:3000) for the frontend  
Visit [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html) for API docs

---

## 🧑‍💻 Contributing

Contributions are welcome! Please open issues and pull requests for new features, bug fixes, or improvements.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

---

## 📄 License

This project is licensed under the [Apache 2.0 License](LICENSE).

---

## 🙏 Acknowledgements

- Movie data and posters: [TMDb](https://www.themoviedb.org/), [OMDb](https://www.omdbapi.com/)
- UI inspiration: Apple, Stripe, Dribbble community

---

## 🌟 About

Gösterim360 is built with ❤️ by the Gösterim360 Dev Team.  
For more info, visit our [Wiki](https://github.com/yourusername/gosterim360-cinema/wiki) or [contact us](mailto:info@gosterim360.com).

---
