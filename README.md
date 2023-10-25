# URL Shortener Microservice

A microservice that shortens a URL and returns a JSON response with the original URL and the shortened URL.

## Live Demo

Check out the microservice [here](https://url-shortener-service.fly.dev/).

## API Usage

### 1. Converting a URL to a short URL

- Endpoint: `POST /api/shorturl` x-www-form-urlencoded `url=<originalUrl: String>`
- Description: Returns a JSON response with the original URL and the shortened URL.
- Usage: `POST /api/shorturl` x-www-form-urlencoded `url=https://www.google.com`
- Response:

```
{
    "original_url": "https://www.google.com",
    "short_url": <shortUrlId: Number>
}
```

### 2. Redirecting to the original URL

- Endpoint: `GET /api/shorturl/<shortUrlId: Number>`
- Description: Redirects to the original URL.
- Usage: `GET /api/shorturl/1
- Response: Redirects to `https://www.google.com`.

## Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose ODM
- fly.io

## Run locally

```
npm install
npm start
```

## Deploy on fly.io

```
fly launch
fly deploy
```
