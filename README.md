🐾 Tails-FinderBD – Backend API

Tails-FinderBD is a RESTful API for an animal search service.
It supports user registration, authentication, managing lost & found animal adverts, filters, and enum options.

🌍 Production: https://tails-finderbd.onrender.com/api

💻 Local: http://127.0.0.1:3000/api

🚀 Features

🔐 Auth – registration, login, token refresh, logout

👤 Users – view and update profile

🐕 Animal Ads – CRUD for lost/found animal adverts

🎛 Filters – search by city, district, species, color, and more

📑 Enums – retrieve allowed values (status, species, size, sex, etc.)

⚡ Pagination & Sorting – support for paging and sorting results

📦 Tech Stack

Node.js + Express

MongoDB (Mongoose ODM)

JWT + Cookies for sessions

Multer + Cloudinary for image uploads

http-errors for error handling

Render for deployment

🛠 Installation & Setup
1. Clone repo
git clone https://github.com/your-username/tails-finderbd.git
cd tails-finderbd

2. Install dependencies
npm install

3. Add environment variables

Create a .env file in the root:

PORT=3000
MONGO_URI=mongodb+srv://<your-db-uri>
JWT_SECRET=your-secret
CLOUDINARY_NAME=your-cloud-name
CLOUDINARY_KEY=your-api-key
CLOUDINARY_SECRET=your-api-secret

4. Run locally
npm run dev


API will be available at: http://127.0.0.1:3000/api

📚 API Overview
🔐 Auth

POST /auth/register — register a new user

POST /auth/login — log in

POST /auth/logout — log out

POST /auth/refresh — refresh tokens

👤 Users

GET /users/current — get current user

PATCH /users — update user data

🐕 Animal Ads

GET /adverts — get adverts (with filters, pagination, sorting)

POST /adverts — create new advert (auth required)

🎛 Filters & Enums

GET /filters/... — filter reference data

GET /enums — list of enum values

📖 API Docs

OpenAPI (Swagger) specification: openapi.json

Testing is recommended via Postman or Swagger UI.

📄 License

This project is licensed under the Apache 2.0
.

Хочеш, я ще додам до README приклади запитів (curl/Postman) англійською? Це зробить його ще більш дружнім для розробників 🚀

Is this conversation helpful so far?
