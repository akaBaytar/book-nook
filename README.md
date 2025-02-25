# Ceren's Book Nook

> Track your progress, set reading goals and build your dream library.

Ceren's Book Nook is a modern book tracking application that helps users manage their reading journey, set goals and organize their personal library.

---

## Table of Contents

- [Live Demo](#live-demo)
- [Screenshot](#screenshot)
- [Features](#features)
- [Usage](#usage)
- [Deployment](#deployment)
- [License](#license)

## Live Demo

- Experience Ceren's Book Nook live on [Vercel](https://booknookforceren.vercel.app/).

## Screenshot

![Screenshot](/public/screen.png)

---

## Features

#### Overview

- Track books read and books to be read
- Set and monitor reading goals
- Create public and private book lists and share public lists
- View detailed reading statistics and progress
- Maintain a digital library accessible from anywhere

#### Dashboard

- Comprehensive reading statistics
- Monthly and yearly book data visualization
- Reading goal progress tracking
- Current reading activity monitor
- Reading streak and daily average metrics

#### Book Management

- Add books to your personal library
- Mark books as read, currently reading or to be read
- Filter books by genres and categories
- Search functionality

#### Lists

- Create custom book lists
- Organize lists as public or private
- Share lists with other readers

#### Reading Tracker

- Color-coded tracking system based on page count
- Monthly reading calendar
- Goal setting and progress visualization

#### User Account

- Secure authentication via Clerk
- Profile management
- Reading preferences

### Technologies Used

Ceren's Book Nook is built using the latest technologies.

- Frontend: React, Next.js
- Styling: Tailwind CSS, shadcn/ui
- Authentication: Clerk
- Database: Prisma with Neon DB
- Charts & Visualization: Recharts
- Forms: React Hook Form with Zod validation

---

## Usage

### Pre Requirements

#### PostgreSQL Database URL

Sign up for a free PostgreSQL database through Vercel. Log into Vercel and click on "Storage" and create a new Postgres database. Then add the URL.

#### Uploadthing Settings

Sign up for an account at https://uploadthing.com/ and get the token, secret and app ID.

#### Install Dependencies

```bash
npm install
```

Note: Some dependencies may have not yet been upadated to support React 19. If you get any errors about depencency compatability, run the following:

```bash
npm install --legacy-peer-deps
```

#### Environment Variables

Create a `.env` file using the example and replace the values inside the square brackets with your own values.

```
NEXT_PUBLIC_APP_URL=[DEPLOYED_APP_URL]

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

SIGNING_SECRET=[YOUR_CLERK_WEBHOOK_SECRET]

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=[YOUR_CLERK_PUBLIC_KEY]
CLERK_SECRET_KEY=[YOUR_CLERK_SECRET_KEY]

DATABASE_URL=[YOUR_NEON_DB_URL]

UPLOADTHING_TOKEN=[YOUR_UPLOADTHING_TOKEN]
```

#### Run

```bash

# Run in development mode
npm run dev

# Build for production
npm run build

# Run in production mode
npm start

# Check ESLint error
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

#### Prisma Studio

To open Prisma Studio, run the following command:

```bash

npx prisma studio
```

Open [http://localhost:5555](http://localhost:5555) with your browser.


### Deployment

1. Overwrite install command with the legacy peer flag if necessary:
   ```bash
   npm install --legacy-peer-deps
   ```
2. Deploy your application to Vercel.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE.md) file for more details.
