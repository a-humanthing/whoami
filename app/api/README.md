# Next.js API Architecture Guide
*For developers coming from React + Express.js background*

This guide explains how Next.js handles backend logic, specifically within the App Router architecture used in your `whoami` project.

## 1. The Single Server Model vs. Separate Backend
In a traditional **React (frontend) + Express (backend)** setup, you often run two separate servers:
- React Dev Server (e.g., `localhost:3000`)
- Express API Server (e.g., `localhost:5000`)

**In Next.js**, there is only **one server**.
When you run `npm run dev`, Next.js starts a Node.js server (typically on port `3000`) that handles **everything**:
1.  **Frontend**: It renders your React Components (Server Components & Client Components) into HTML.
2.  **Backend**: It handles API requests sent to `/api/*` routes.

**Result**: You don't need CORS for your own API because the frontend and backend are on the **same origin** (same domain and port).

## 2. File-System Based Routing (`app/api`)
In Express, you define routes programmatically:
```javascript
// Express
app.post('/api/analytics/visit', (req, res) => { ... })
```

In Next.js App Router, you define routes using **file structure**.
Looking at your specific project structure:
```
app/
  api/
    analytics/
      visit/
        route.ts  <-- This file becomes the endpoint
```
This folder path automatically creates the endpoint: `POST /api/analytics/visit`.

## 3. HTTP Methods (Named Exports)
Next.js uses **Named Exports** to define allowed HTTP methods for a route.
In your file `app/api/analytics/visit/route.ts`:

```typescript
// Next.js: The name of the function defines the HTTP method
export async function POST(request: Request) {
  // logic here...
}
```

- If you export `POST`, that route accepts POST requests.
- If you export `GET`, it accepts GET requests.
- If you call a method that isn't exported (e.g., PUT), Next.js automatically returns `405 Method Not Allowed`.

## 4. Request & Response Objects
Next.js builds on standard **Web APIs** (Request/Response), confusingly different from Express's Node.js-native objects.

| Feature | Express.js | Next.js App Router |
| :--- | :--- | :--- |
| **Object** | `req` (IncomingMessage), `res` (ServerResponse) | `request` (Web Standard Request), `NextResponse` |
| **Get Body** | `req.body` (parsed by body-parser) | `await request.json()` |
| **Get Query** | `req.query` | `request.nextUrl.searchParams` |
| **Get Headers**| `req.headers['user-agent']` | `request.headers.get('user-agent')` |
| **Send JSON** | `res.json({ success: true })` | `return NextResponse.json({ success: true })` |
| **Status** | `res.status(400)` | `NextResponse.json(..., { status: 400 })` |

### Example from your code (`app/api/analytics/visit/route.ts`):
```typescript
// Reading JSON body (async!)
const { visitorId, sessionId } = await request.json();

// Reading Headers
const userAgent = request.headers.get('user-agent');

// Sending Response
return NextResponse.json({ success: true });
```

## 5. Where is the Server Listening?
The server configuration is handled by the Next.js CLI.
- **Port**: Defaults to `3000`. controlled via command line: `next dev -p 4000`.
- **Entry point**: `npm run dev` executes `next dev`. Next.js orchestrates the HTTP server creation internally. You don't verify `app.listen(3000)` manually.

## 6. CORS (Cross-Origin Resource Sharing)
Since your API and Frontend are on the same origin, **CORS is disabled/unnecessary by default** for internal calls.
- Browser calls `/api/analytics/visit` -> Relative path treats it as same-origin.

If you *did* need to access this API from a completely different domain (e.g., a mobile app), you would handle CORS in `next.config.ts` or `middleware.ts`.

## 7. Middleware
You have a `middleware.ts` file in your root.
- This runs **before** every request (or requests matching the `matcher`).
- It is similar to `app.use((req, res, next) => ...)` in Express but runs on the edge/globally.
- In your project, it is currently protecting `/dashboard-7c24f-secure` using Basic Auth headers.

## 8. Viewing Logs (Netlify Deployment)
When you deploy to Netlify, your Next.js API routes and Server Components run as **Serverless Functions** (or Edge Functions).

### Where to find logs:
1.  Go to your **Netlify Dashboard**.
2.  Click on the **"Logs"** tab in the sidebar (or within specific site details).
3.  Select **"Functions"** (sometimes labeled "Serverless Functions").
4.  You will see a stream of logs.
    - `console.log()` statements from your `route.ts` files will appear here.
    - `console.error()` will appear here as well.

### Important Distinction:
- **Browser Output**: `console.log` in *Client Components* (files with `'use client'`) will **NOT** show in Netlify logs. They show in the user's browser DevTools.
- **Server Output**: `console.log` in *Server Components* or *API Routes* will show in **Netlify Function Logs**.
