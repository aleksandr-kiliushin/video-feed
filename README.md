# Video Feed Website

![Demo](./img/demo.png)

This is a small demo project that allows users to search for videos and sort them by date. The project is built using Astro.js and Solid.js, with plain CSS for styling. The app is deployed [here](http://84.201.152.144).

## Features

- Users can search for videos by name
- A dropdown list of possible options appears as the user types in the search bar
- Users can sort the list by date
- The state of the search and filter is saved in the URL
- The number of videos found is displayed
- The app is server-side rendered
- The app has responsive design for mobile users
- The app uses infinite loading

## Data

The app uses 500 randomly generated videos, with the following data type:

```typescript
type Video = {
  id: string
  title: string
  thumbnail: string
  publish_date: string
  duration: number
}
```

## Tech Stack

- Typescript
- Astro.js
- Solid.js
- Plain CSS
- Docker

## How to Run

To run the app locally, follow these steps:

- Clone the repository
- Install dependencies with npm install
- Run the app with npm run dev
- Open http://localhost:4321 in your browser

## Conclusion

This project was a great opportunity to practice using Astro.js and Solid.js. I enjoyed building the search and sort functionality, and I'm happy with how the app turned out.
