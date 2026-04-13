# ENFLIX

A Netflix + Prime inspired movie streaming platform with watch-together and AI-powered recommendations. Built with Next.js.

## Features

### Browse & Watch
- Netflix-style homepage with hero banner, scrollable genre rows, and movie cards
- 12 movies across genres: Sci-Fi, Action, Drama, Thriller, Adventure, Comedy, Horror, Romance, Crime, Fantasy, Mystery
- Movie detail pages with cast, rating, description, and similar movie suggestions
- Fullscreen video player with overlay controls

### Authentication
- Sign up / Sign in with email and password
- Passwords hashed with bcrypt
- JWT-based sessions (7-day expiry) stored in httpOnly cookies
- Protected routes — redirects to login if unauthenticated

### Watch Together
- Create a watch party from any movie detail page
- Share the party link with friends to watch in sync
- Real-time participant list with avatars
- Built-in chat sidebar for messaging while watching

### AI Chatbot
- Floating chat assistant powered by Claude (Haiku)
- Recommends movies based on mood, genre, or preferences
- Quick prompts: "Surprise me!", "Something thrilling", "A feel-good movie"
- Clickable Watch buttons link directly to movie pages
- Full conversation context for follow-up questions

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Create a `.env.local` file in the root directory:

```
ANTHROPIC_API_KEY=your-anthropic-api-key
```

The AI chatbot requires an [Anthropic API key](https://console.anthropic.com/). The rest of the app works without it.

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS |
| Auth | JWT + bcrypt |
| AI | Claude API (Anthropic SDK) |
| Storage | JSON file-based |
| Language | TypeScript |

## Project Structure

```
src/
  app/
    api/
      auth/        # Login, signup, session endpoints
      chat/        # AI chatbot endpoint
      watch-party/ # Party creation and join endpoints
    browse/        # Main homepage
    login/         # Sign in page
    signup/        # Sign up page
    movie/[id]/    # Movie detail page
    watch/[id]/    # Video player page
    party/[id]/    # Watch party room
  components/
    AuthContext    # Auth state provider
    ChatBot       # AI recommendation chatbot
    HeroBanner    # Featured movie hero section
    MovieCard     # Movie thumbnail card
    MovieRow      # Horizontal scrollable genre row
    Navbar        # Navigation bar with user menu
  lib/
    auth.ts       # Auth helpers (JWT, bcrypt, user CRUD)
    movies.ts     # Movie catalog data and queries
    watchParty.ts # Watch party CRUD
data/
  users.json      # User accounts
  parties.json    # Watch party rooms
```

## License

MIT
