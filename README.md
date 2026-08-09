# 🏠 StayHub

### Full-Stack Accommodation Rental Platform

StayHub is a full-stack accommodation rental platform inspired by modern property-booking applications. It allows users to discover properties, create and manage listings, upload images, leave reviews, view locations on interactive maps, and securely authenticate using user accounts.

The project was built to understand and implement real-world backend concepts such as MVC architecture, RESTful routing, authentication, authorization, database relationships, middleware, image storage, geolocation, and production deployment.

---

## 🌐 Live Demo

🚀 **[Visit StayHub](https://stayhub-v40w.onrender.com)**

> Replace `https://stayhub-v40w.onrender.com` with your actual Render URL.

---

## 📸 Features

### 👤 Authentication & Authorization
- User registration and login
- Secure authentication using Passport.js
- Session-based authentication
- Protected routes
- Authorization for listing owners
- Users can edit/delete only their own listings
- Users can manage their own reviews

### 🏠 Property Listings
- Create new property listings
- View all available properties
- View individual property details
- Edit existing listings
- Delete listings
- Property title, description, price, location, and country information

### 🖼️ Image Uploads
- Upload property images
- Cloudinary integration for cloud-based image storage
- Image URLs stored with listing data
- Secure image handling

### ⭐ Reviews & Ratings
- Add reviews to properties
- Give ratings
- Display reviews on listing pages
- Delete reviews with proper authorization

### 🗺️ Maps & Location
- Interactive property maps
- Location-based property visualization
- Geocoding support
- Mapbox integration

### ⚠️ Error Handling
- Custom Express error handling
- Centralized error middleware
- Async error handling using `wrapAsync`
- Custom error messages
- HTTP status code handling

### 📱 Responsive UI
- Responsive interface
- Bootstrap-based design
- EJS templating
- User-friendly navigation

---

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript
- Bootstrap
- EJS
- EJS-Mate

### Backend
- Node.js
- Express.js
- RESTful APIs
- MVC Architecture

### Database
- MongoDB
- Mongoose
- MongoDB Atlas

### Authentication
- Passport.js
- Passport-Local
- Passport-Local-Mongoose
- Express-Session

### Cloud Services
- Cloudinary — Image Storage
- Mapbox — Interactive Maps
- MongoDB Atlas — Cloud Database

### Other Tools
- Git
- GitHub
- Method-Override
- Joi
- Multer
- Node-Geocoder
- Connect-Flash

### Deployment
- Render
- MongoDB Atlas
- Cloudinary

---

## 🏗️ Project Architecture

StayHub follows the **MVC (Model-View-Controller)** architecture.

```text
StayHub
│
├── controllers/
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
│
├── models/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── routes/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── views/
│   ├── layouts/
│   ├── listings/
│   ├── users/
│   └── includes/
│
├── public/
│   ├── css/
│   └── js/
│
├── utils/
│   ├── ExpressError.js
│   └── wrapAsync.js
│
├── app.js
├── cloudConfig.js
├── middleware.js
├── package.json
└── .gitignore
