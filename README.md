## learn-web



## Cloning the api repo

```bash
git clone git@github.com:peteradam0/learn-web-api.git
```

First set-up the [`api`](https://github.com/peteradam0/learn-web-api) in order for the learn-web app to function correctly.

## Cloning the repo

```bash
git clone git@github.com:peteradam0/learn-web.git
```

## Install packages

```bash
npm i
```

## Setup .env file

```bash
cp .env.example .env
```

```
CLERK_SECRET_KEY=
NEXT_PUBLIC_API_BASE_URL=

UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=

LIVEKIT_API_URL=
LIVEKIT_URL=
LIVEKIT_API_KEY=
LIVEKIT_API_SECRET=
NEXT_PUBLIC_LIVEKIT_WS_URL=
```

## Start the app
```bash
npm run dev
```
