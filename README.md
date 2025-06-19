✅ FRONTEND: README.md for shelfex-social-feed
markdown

# ShelfEx Social Feed – Frontend

This is the frontend of the **Infinite Scroll Social Feed** project for the ShelfEx Full-Stack Internship.

## 🚀 Live Demo

👉 [Live Frontend on Vercel](https://shelfex-social-feed-e1tu.vercel.app)

## 🎯 Features

- 🌟 Role-based login (`Celebrity` / `Public`)
- 📝 Celebrity: Create posts with text and images
- 📰 Public: View posts from followed celebrities
- 📡 Real-time updates via WebSocket
- 🔄 Infinite scroll with lazy loading
- 💬 Like and comment functionality
- 📱 Responsive UI with Tailwind CSS

## 📂 Folder Structure

/src
/components
- CreatePost.jsx
- Feed.jsx
- PostCard.jsx
/pages
- Login.jsx
- Profile.jsx
/utils
- api.js
- socket.js
App.jsx
main.jsx


## 🛠️ Tech Stack

- React.js
- Tailwind CSS
- Axios
- React Router
- Socket.io-client
- Vercel (for deployment)

## 🧪 Run Locally

```bash
git clone https://github.com/aryanch12/shelfex-social-feed.git
cd shelfex-social-feed
npm install
npm start
