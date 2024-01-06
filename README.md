# What Restaurant? (MDM Work Sample)

I built this small application a couple years ago to help my colleagues and I decide where to eat in the area. I have a deployed version up on https://what.restaurant. 

## Running locally

### Setup

1. Make sure you have Node 19 or higher installed, as well as Yarn (package manager).
2. Run `yarn` to install the node packages.
3. Create a Google Places API key from the [Google Places Developer Console](https://console.cloud.google.com/google/maps-apis/credentials)
4. Run `cp .env.example .env.local` and update `GOOGLE_MAPS_API_KEY` with your key. I have chosen not to expose my `.env.local` because Google Places is not a free service.

### Starting local development

- `yarn dev` to start the frontend development server.
- View the frontend on localhost:3300.

## What's inside?

This is a simple one-page ReactJS application built on [Next.js](https://nextjs.org/docs). Start orienting from `pages/index.js`.
