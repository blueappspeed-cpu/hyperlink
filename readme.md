

```md
# VoidLure Hyperlink Generator

A modern URL shortener built with Vercel Functions and Neon PostgreSQL.

Create your own custom hyperlink generator with:
- Fast redirects
- Custom short codes
- Click tracking
- Link history
- Vercel deployment support
- Neon PostgreSQL database

---

## Features

- Generate short links instantly
- Store links permanently
- Track clicks
- View recent history
- Serverless backend
- Works with Vercel
- PostgreSQL powered
- Clean frontend UI

---

# Requirements

Before starting, install:

- Node.js 18+
- Git
- Vercel account
- Neon account

---

# Project Structure

```

voidlure-hyperlink/
│
├── api/
│   ├── create.js
│   ├── history.js
│   └── r/
│       └── [code].js
│
├── lib/
│   └── db.js
│
├── js/
│   ├── api.js
│   ├── app.js
│   ├── ui.js
│   └── utils.js
│
├── css/
│   └── style.css
│
├── index.html
├── package.json
└── vercel.json

````

---

# Installation

Clone the repository:

```bash
git clone YOUR_REPOSITORY_URL
````

Enter the folder:

```bash
cd voidlure-hyperlink
```

Install dependencies:

```bash
npm install
```

---

# Database Setup

This project uses Neon PostgreSQL.

Create a database:

[https://neon.tech](https://neon.tech)

Copy your database connection string.

It will look like:

```
postgresql://username:password@host/database?sslmode=require
```

---

# Create Database Table

Open your Neon SQL Editor.

Run:

```sql
CREATE TABLE links (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20) UNIQUE NOT NULL,
    url TEXT NOT NULL,
    type VARCHAR(50),
    clicks INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

# Environment Variables

Create a `.env` file:

```
DATABASE_URL=your_neon_database_url
```

Example:

```
DATABASE_URL=postgresql://user:password@host/neondb?sslmode=require
```

Never share this file.

---

# Vercel Setup

Install Vercel CLI:

```bash
npm install -g vercel
```

Login:

```bash
vercel login
```

Deploy:

```bash
vercel
```

---

# Add Environment Variables on Vercel

Go to:

```
Vercel Dashboard
→ Project
→ Settings
→ Environment Variables
```

Add:

```
DATABASE_URL
```

Value:

```
Your Neon PostgreSQL connection string
```

Redeploy after adding variables.

---

# API Endpoints

## Create Link

```
POST /api/create
```

Request:

```json
{
    "url": "https://example.com",
    "type": "Profile"
}
```

Response:

```json
{
    "code": "abc123",
    "shortUrl": "https://yourdomain.com/abc123"
}
```

---

## Get History

```
GET /api/history
```

Returns recent links.

---

## Redirect

```
GET /abc123
```

Redirects users to the original URL.

---

# Custom Domain

You can connect your own domain:

```
Vercel
→ Project
→ Settings
→ Domains
```

Example:

```
https://short.yourdomain.com/a81k29
```

---

# Development

Run locally:

```bash
vercel dev
```

Open:

```
http://localhost:3000
```

---

# Security Notes

* Never expose DATABASE_URL
* Never upload `.env`
* Keep API keys private
* Use HTTPS in production

---

# Credits

Created by:

VoidLure

Built with:

* Vercel Functions
* Neon PostgreSQL
* JavaScript
* HTML/CSS

---

# License

MIT License

You are free to modify and use this project.


