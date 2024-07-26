This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API routes

1. /generate-token : This route uses encode_token function from secureauthjwt package and generates a token.
2. /hello : Test route
3. /secure/:secret : It's a secure route and the token should be present and valid to access this route, it sends user payload stored in the token.

## Middleware

The middleware uses decode_jwt function from secureauthjwt package and decodes the token.

## Deployment

This project is deployed on vercel.
