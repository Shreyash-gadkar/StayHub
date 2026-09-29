🏠 StayHub

<p align="center">
  <strong>Full-Stack Accommodation Rental Platform</strong>
</p>

<p align="center">
  Discover stays • Create listings • Upload images • Review properties • Make bookings
</p>

<p align="center">
  <a href="https://stay-hub-three.vercel.app">🚀 Live Demo</a> •
  <a href="https://github.com/Shreyash-gadkar/StayHub">💻 GitHub Repository</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-24-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-4-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Cloudinary-Image%20Storage-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white" />
  <img src="https://img.shields.io/badge/Vercel-Frontend-000000?style=for-the-badge&logo=vercel&logoColor=white" />
  <img src="https://img.shields.io/badge/Render-Backend-46E3B7?style=for-the-badge&logo=render&logoColor=white" />
</p>

🌐 Live Application

🚀 Visit StayHub

Frontend: Vercel

Backend: Render

Database: MongoDB Atlas

Image Storage: Cloudinary

✨ About StayHub

StayHub is a full-stack accommodation rental platform inspired by modern property-booking applications.

Users can discover properties, create and manage listings, upload property images, leave reviews, make bookings, view property locations on interactive maps, and securely authenticate using user accounts.

The project was built to understand practical full-stack development concepts including RESTful APIs, MVC architecture, authentication, authorization, database relationships, middleware, image storage, geolocation, frontend-backend integration, and production deployment.

🎯 Features

🔐 Authentication & Authorization

User registration and login

Secure session-based authentication

Passport.js authentication

Protected routes

Owner-based authorization

Users can edit/delete only their own listings

Users can manage their own reviews

Production session handling

🏠 Property Listings

Create new property listings

View all available properties

Search and filter listings

View individual property details

Edit listings

Delete listings

Property title, description, price, location, and country

Owner-based permissions

🖼️ Image Uploads

Property image uploads

Multer integration

Cloudinary cloud storage

Image URLs stored with listing data

Secure image handling

⭐ Reviews & Ratings

Add reviews to properties

Rating system

Display reviews on listing pages

Delete own reviews

Review-author authorization

Dynamic UI updates

📅 Bookings

Book properties

Authentication-protected booking operations

Booking API integration

User and listing relationships

Booking data persistence

🗺️ Maps & Location

Interactive property maps

Location-based property visualization

Geocoding support

Mapbox integration

Geographic coordinates stored with listings

🛡️ Validation & Error Handling

Joi request validation

Authentication middleware

Authorization middleware

Centralized error handling

Async error handling with wrapAsync

Custom error messages

Proper HTTP status codes

CORS configuration

📱 Responsive UI

React-based frontend

Responsive design

Bootstrap styling

React Router navigation

User-friendly interface

🛠️ Tech Stack

Frontend

React

Vite

JavaScript

HTML5

CSS3

Bootstrap

React Router

Backend

Node.js

Express.js

RESTful APIs

MVC Architecture

Database

MongoDB

Mongoose

MongoDB Atlas

Authentication

Passport.js

Passport-Local

Passport-Local-Mongoose

Express-Session

Cloud Services

Cloudinary — Image Storage

Mapbox — Interactive Maps

MongoDB Atlas — Cloud Database

Other Tools

Joi

Multer

Node-Geocoder

Method-Override

Connect-Flash

CORS

Git

GitHub

Deployment

Vercel — Frontend

Render — Backend

MongoDB Atlas — Database

Cloudinary — Image Storage

🏗️ Architecture

                         ┌─────────────────────┐
                         │        USER         │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   React + Vite      │
                         │      Frontend       │
                         └──────────┬──────────┘
                                    │
                              REST API Calls
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   Node.js +         │
                         │   Express.js        │
                         │      Backend        │
                         └──────────┬──────────┘
                                    │
              ┌─────────────────────┼─────────────────────┐
              │                     │                     │
              ▼                     ▼                     ▼
      ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
      │   MongoDB    │     │  Cloudinary  │     │    Mapbox    │
      │    Atlas     │     │    Images    │     │     Maps     │
      └──────────────┘     └──────────────┘     └──────────────┘

🏛️ MVC Architecture

StayHub follows an MVC-based backend architecture.

                    Express Application
                           │
            ┌──────────────┼──────────────┐
            │              │              │
            ▼              ▼              ▼
         Routes       Controllers      Middleware
            │              │              │
            └──────────────┼──────────────┘
                           │
                           ▼
                         Models
                           │
                           ▼
                     MongoDB Atlas

Request Flow

Client Request
      │
      ▼
    Route
      │
      ▼
 Middleware
      │
      ├── Authentication
      ├── Authorization
      └── Validation
      │
      ▼
 Controller
      │
      ▼
    Model
      │
      ▼
 MongoDB Atlas
      │
      ▼
  API Response

📂 Project Structure

StayHub/
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
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   └── App.jsx
│   │
│   ├── public/
│   ├── package.json
│   └── vercel.json
│
├── app.js
├── cloudConfig.js
├── middleware.js
├── package.json
└── .gitignore

🔐 Authentication Flow

User
 │
 ▼
Login Form
 │
 ▼
POST /api/auth/login
 │
 ▼
Passport.js
 │
 ▼
Session Created
 │
 ▼
Secure Session Cookie
 │
 ▼
Authenticated API Requests

⭐ Review Flow

User
 │
 ▼
Review Form
 │
 ▼
POST Review API
 │
 ▼
Authentication
 │
 ▼
Validation
 │
 ▼
Review Controller
 │
 ▼
MongoDB
 │
 ▼
Updated Review

📅 Booking Flow

User
 │
 ▼
Select Property
 │
 ▼
Booking Form
 │
 ▼
POST Booking API
 │
 ▼
Authentication
 │
 ▼
Validation
 │
 ▼
Booking Controller
 │
 ▼
MongoDB Atlas
 │
 ▼
Booking Created

🚀 Production Architecture

                    🌍 Internet
                         │
                         ▼
              ┌─────────────────────┐
              │       Vercel        │
              │   React + Vite      │
              │     Frontend        │
              └──────────┬──────────┘
                         │
                         │ REST APIs
                         ▼
              ┌─────────────────────┐
              │       Render        │
              │ Node.js + Express   │
              │      Backend        │
              └──────────┬──────────┘
                         │
              ┌──────────┴──────────┐
              │                     │
              ▼                     ▼
      ┌───────────────┐     ┌───────────────┐
      │ MongoDB Atlas │     │   Cloudinary  │
      │   Database    │     │     Images    │
      └───────────────┘     └───────────────┘

⚙️ Run Locally

1. Clone the repository

git clone https://github.com/Shreyash-gadkar/StayHub.git
cd StayHub

2. Install backend dependencies

npm install

3. Install frontend dependencies

cd frontend
npm install

4. Configure environment variables

Create a .env file in the backend root:

ATLASDB_URL=your_mongodb_atlas_connection_string
SECRET=your_session_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET=your_cloudinary_api_secret

MAP_TOKEN=your_mapbox_token

⚠️ Never commit your .env file or expose secret keys publicly.

5. Start the backend

From the project root:

npm start

Backend:

http://localhost:8080

6. Start the frontend

Open another terminal:

cd frontend
npm run dev

Frontend:

http://localhost:5173

🔌 API Highlights

Authentication

POST   /api/auth/signup
POST   /api/auth/login
GET    /api/auth/me
POST   /api/auth/logout

Listings

GET    /listings/api
GET    /listings/api/:id
POST   /listings/...
PUT    /listings/...
DELETE /listings/...

Reviews

POST   /listings/:id/reviews/api
DELETE /listings/:id/reviews/api/:reviewId

Bookings

POST   /api/bookings/...

🧠 Key Learnings

Building StayHub helped me gain practical experience with:

Full-stack application architecture

React component-based development

REST API design

Express.js backend development

MVC architecture

Authentication and authorization

Session management

MongoDB data modeling

Mongoose relationships

Middleware

Joi validation

Image uploads

Cloudinary integration

Geocoding

Interactive maps

CORS

Production environment variables

Git and GitHub

Vercel deployment

Render deployment

Production debugging

🧩 Real-World Challenges Solved

During development, I worked through issues involving:

Frontend ↔ backend API communication

CORS configuration

Authentication and authorization

Session cookies in production

MongoDB Atlas connectivity

Cloudinary image uploads

API route mismatches

Request validation

Production environment variables

Vercel and Render deployment

Debugging production-only issues

🔮 Future Improvements

💳 Payment gateway integration

❤️ Wishlist / favorites

📊 Host dashboard

👤 User profile dashboard

📅 Advanced booking availability

📧 Email notifications

🔎 Advanced search and filtering

🖼️ Advanced image gallery

🛠️ Admin dashboard

📱 Further mobile optimization

👨‍💻 Author

Shreyash Gadkar

B.Tech Computer Science Engineering



⭐ Support

If you found this project useful or interesting, consider giving the repository a ⭐.

<p align="center">

🏠 StayHub

Discover • Stay • Experience

Built with ❤️ using React, Node.js, Express & MongoDB.

</p>
