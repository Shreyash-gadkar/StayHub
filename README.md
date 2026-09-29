Absolutely. Now that StayHub is actually **deployed with React + Vite frontend on Vercel and Express backend on Render**, the README should reflect the **final project**, not the older EJS-only version.

One important correction: your current README says the live demo is the Render backend. The actual user-facing application is the **Vercel frontend**.

Here’s a clean, up-to-date version you can replace your `README.md` with:

````markdown
# 🏠 StayHub

### Full-Stack Accommodation Rental Platform

StayHub is a full-stack accommodation rental platform inspired by modern property-booking applications. Users can discover properties, create and manage listings, upload property images, leave reviews, make bookings, view property locations on interactive maps, and securely authenticate using user accounts.

The project was built to understand and implement real-world full-stack development concepts including RESTful APIs, MVC architecture, authentication, authorization, database relationships, middleware, image storage, geolocation, frontend-backend integration, and production deployment.

---

## 🌐 Live Demo

🚀 **[Visit StayHub](https://stay-hub-three.vercel.app)**

### Backend API

🔗 **[StayHub Backend](https://stayhub-v40w.onrender.com)**

> The frontend is deployed on Vercel and the backend API is deployed on Render.

---

## ✨ Features

### 👤 Authentication & Authorization

- User registration and login
- Session-based authentication
- Passport.js authentication
- Protected routes
- Persistent login sessions
- Authorization for listing owners
- Users can edit/delete only their own listings
- Users can manage their own reviews
- Secure authentication between frontend and backend

### 🏠 Property Listings

- Create new property listings
- View all available properties
- Search and filter listings
- View individual property details
- Edit existing listings
- Delete listings
- Property title, description, price, location, and country information
- Owner-based authorization

### 🖼️ Image Uploads

- Upload property images
- Cloudinary integration
- Cloud-based image storage
- Image URLs stored with listing data
- Image management through backend APIs

### ⭐ Reviews & Ratings

- Add reviews to properties
- Rating system
- Display reviews on listing pages
- Delete reviews
- Review-author authorization
- Real-time UI updates after adding or deleting reviews

### 📅 Bookings

- Users can book properties
- Booking API integration
- Authentication-protected booking operations
- Booking data associated with users and listings

### 🗺️ Maps & Location

- Interactive property maps
- Location-based property visualization
- Geocoding support
- Mapbox integration
- Geographic coordinates stored with listings

### 🔐 Security & Validation

- Authentication middleware
- Authorization middleware
- Joi request validation
- Protected API routes
- Session-based security
- CORS configuration
- Secure production cookies
- Centralized error handling

### ⚠️ Error Handling

- Custom Express error handling
- Centralized error middleware
- Async error handling using `wrapAsync`
- Custom error messages
- Proper HTTP status codes
- Frontend API error handling

### 📱 Responsive UI

- Responsive design
- React-based frontend
- Bootstrap styling
- User-friendly navigation
- Interactive listing and review interfaces

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- JavaScript
- HTML5
- CSS3
- Bootstrap
- React Router

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

### Validation & Middleware

- Joi
- Multer
- Method-Override
- Node-Geocoder
- Connect-Flash
- CORS

### Development Tools

- Git
- GitHub
- VS Code
- npm

### Deployment

- Vercel — Frontend
- Render — Backend
- MongoDB Atlas — Database
- Cloudinary — Image Storage

---

## 🏗️ Project Architecture

StayHub follows an MVC-based backend architecture with a separate React frontend.

```text
                         StayHub
                            │
             ┌──────────────┴──────────────┐
             │                             │
       React Frontend                Express Backend
          (Vite)                         (Node.js)
             │                             │
             │                        RESTful APIs
             │                             │
             │              ┌──────────────┼──────────────┐
             │              │              │              │
             │         Controllers       Routes       Middleware
             │              │              │              │
             │              └──────────────┼──────────────┘
             │                             │
             │                          Models
             │                             │
             │                        Mongoose
             │                             │
             │                      MongoDB Atlas
             │
             └────────────── API Requests ────────────────┘
````

---

## 📂 Project Structure

```text
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
```

---

## 🔄 Application Flow

```text
User
 │
 ▼
React Frontend
 │
 │ HTTP / REST API
 ▼
Express Backend
 │
 ├── Authentication
 ├── Authorization
 ├── Validation
 ├── Controllers
 └── Business Logic
 │
 ├───────────────┐
 ▼               ▼
MongoDB       Cloudinary
Atlas         Images
 │
 ▼
Listing / Review / User / Booking Data
```

---

## 🔐 Authentication Flow

```text
User Login
    │
    ▼
React Login Form
    │
    ▼
POST /api/auth/login
    │
    ▼
Express Authentication
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
```

---

## ⭐ Review Flow

```text
User
 │
 ▼
React Review Form
 │
 ▼
POST Review API
 │
 ▼
Authentication Check
 │
 ▼
Review Validation
 │
 ▼
Review Controller
 │
 ▼
MongoDB
 │
 ▼
Updated Review List
```

---

## 📅 Booking Flow

```text
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
Authentication Check
 │
 ▼
Validate Booking
 │
 ▼
Save Booking
 │
 ▼
MongoDB Atlas
```

---

## 🚀 Deployment Architecture

```text
                   Internet
                      │
                      ▼
              ┌───────────────┐
              │    Vercel     │
              │ React + Vite  │
              └───────┬───────┘
                      │
                  REST APIs
                      │
                      ▼
              ┌───────────────┐
              │    Render     │
              │ Node + Express│
              └───────┬───────┘
                      │
             ┌────────┴────────┐
             ▼                 ▼
      MongoDB Atlas         Cloudinary
       Database              Images
```

---

## ⚙️ Local Installation

### 1. Clone the repository

```bash
git clone https://github.com/Shreyash-gadkar/StayHub.git
```

### 2. Navigate to the project

```bash
cd StayHub
```

### 3. Install backend dependencies

```bash
npm install
```

### 4. Install frontend dependencies

```bash
cd frontend
npm install
```

### 5. Configure environment variables

Create a `.env` file in the backend root:

```env
ATLASDB_URL=your_mongodb_atlas_connection_string
SECRET=your_session_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET=your_cloudinary_api_secret
MAP_TOKEN=your_mapbox_token
```

For local frontend development, configure the API URL as required by the project.

> Never commit `.env` files or expose secret keys publicly.

### 6. Start the backend

From the project root:

```bash
npm start
```

The backend runs on:

```text
http://localhost:8080
```

### 7. Start the frontend

Open another terminal:

```bash
cd frontend
npm run dev
```

The frontend will run on the Vite development server, usually:

```text
http://localhost:5173
```

---

## 🧪 API Integration

The React frontend communicates with the Express backend through REST APIs.

Examples include:

```text
POST   /api/auth/signup
POST   /api/auth/login
GET    /api/auth/me
POST   /api/auth/logout

GET    /listings/api
GET    /listings/api/:id
POST   /listings/...

POST   /listings/:id/reviews/api
DELETE  /listings/:id/reviews/api/:reviewId

POST   /api/bookings/...
```

---

## 📚 What I Learned

This project helped me understand practical full-stack development concepts including:

* Building RESTful APIs with Express
* MVC architecture
* React component-based development
* React Router
* Frontend-backend API integration
* Authentication and authorization
* Session management
* MongoDB data modeling
* Mongoose relationships and population
* Middleware design
* Request validation with Joi
* Image uploads with Multer
* Cloudinary integration
* Geocoding and interactive maps
* Error handling
* CORS configuration
* Production environment variables
* Deployment with Vercel and Render
* Debugging production authentication and session issues
* Git and GitHub workflow

---

## 🔮 Future Improvements

Possible future improvements include:

* Advanced property search and filtering
* Date availability management
* Booking history dashboard
* User profile pages
* Host dashboard
* Admin dashboard
* Email notifications
* Payment gateway integration
* Wishlist / favorite properties
* Improved mobile UI
* Property image galleries
* Advanced map-based search

---

## 👨‍💻 Author

**Shreyash Gadkar**

B.Tech Computer Science Engineering

GitHub:
**[Shreyash-gadkar](https://github.com/Shreyash-gadkar)**

---

## ⭐ Support

If you find this project useful or interesting, consider giving the repository a ⭐ on GitHub.

---

## 📄 License

This project was created for educational and portfolio purposes.

```

### One thing I'd definitely change from your old README

Your old version says:

> Responsive UI — Bootstrap-based design — EJS templating

That's now misleading because your **actual user-facing frontend is React/Vite**. EJS is still part of the backend architecture/legacy server-rendered side, but it shouldn't be presented as the main frontend anymore.

Also, the live demo should be:

**`https://stay-hub-three.vercel.app`**

not the Render URL, because that's your backend deployment.

And since this is your **first completed full-stack project**, I'd keep this README fairly professional rather than stuffing it with every package you've ever installed. The architecture, features, deployment diagram, and what-you-learned sections are much more valuable to someone reviewing your GitHub.
```
