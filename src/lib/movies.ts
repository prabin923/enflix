export interface Movie {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  backdrop: string;
  videoUrl: string;
  year: number;
  duration: string;
  rating: string;
  genre: string[];
  cast: string[];
  match: number;
  tagline?: string;
  top10?: number;
}

export const movies: Movie[] = [
  {
    id: "1",
    title: "Interstellar Horizon",
    description:
      "When Earth's resources reach a tipping point, a former NASA pilot is recruited for humanity's most ambitious mission — a voyage through a newly discovered wormhole to find a habitable planet. As time bends and realities shift, he must choose between seeing his children again and ensuring the survival of the human race.",
    tagline: "Mankind was born on Earth. It was never meant to die here.",
    thumbnail:
      "https://images.unsplash.com/photo-1462332420958-a05d1e002413?w=400&h=600&fit=crop",
    backdrop:
      "https://images.unsplash.com/photo-1462332420958-a05d1e002413?w=1920&h=1080&fit=crop",
    videoUrl:
      "https://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4",
    year: 2025,
    duration: "2h 49m",
    rating: "PG-13",
    genre: ["Sci-Fi", "Adventure", "Drama"],
    cast: ["Alex Rivera", "Emma Chen", "Marcus Johnson"],
    match: 98,
    top10: 1,
  },
  {
    id: "2",
    title: "The Silent Witness",
    description:
      "A celebrated defense attorney takes on an impossible case: her own husband stands accused of a murder she's not sure he didn't commit. As she digs deeper into the evidence, every truth she uncovers threatens to destroy the life she's built.",
    tagline: "The truth doesn't set everyone free.",
    thumbnail:
      "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop",
    backdrop:
      "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=1920&h=1080&fit=crop",
    videoUrl:
      "https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4",
    year: 2025,
    duration: "2h 12m",
    rating: "R",
    genre: ["Thriller", "Crime", "Drama"],
    cast: ["Sarah Blake", "James Morton", "Yuki Tanaka"],
    match: 96,
    top10: 2,
  },
  {
    id: "3",
    title: "Neon Dynasty",
    description:
      "In a rain-soaked megacity of 2087, a black-market neural hacker discovers a corporate conspiracy that could rewrite human consciousness itself. Hunted by private armies and rogue AI, she has 48 hours to expose the truth before her own mind is erased.",
    tagline: "Your mind is the last thing they'll take.",
    thumbnail:
      "https://images.unsplash.com/photo-1515705576963-95cad62945b6?w=400&h=600&fit=crop",
    backdrop:
      "https://images.unsplash.com/photo-1515705576963-95cad62945b6?w=1920&h=1080&fit=crop",
    videoUrl:
      "https://www.w3schools.com/html/mov_bbb.mp4",
    year: 2025,
    duration: "2h 18m",
    rating: "R",
    genre: ["Sci-Fi", "Action", "Thriller"],
    cast: ["Ava Thompson", "Lucas Grant", "Priya Sharma"],
    match: 97,
    top10: 3,
  },
  {
    id: "4",
    title: "Ember & Ash",
    description:
      "After the deadliest wildfire season in history leaves a small Oregon town in ruins, a firefighter struggling with survivor's guilt and a photojournalist haunted by what she's witnessed find solace — and something deeper — in the wreckage of their former lives.",
    tagline: "Some things only grow after the fire.",
    thumbnail:
      "https://images.unsplash.com/photo-1468276311594-df7cb65d8df6?w=400&h=600&fit=crop",
    backdrop:
      "https://images.unsplash.com/photo-1468276311594-df7cb65d8df6?w=1920&h=1080&fit=crop",
    videoUrl:
      "https://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4",
    year: 2024,
    duration: "1h 58m",
    rating: "PG-13",
    genre: ["Romance", "Drama"],
    cast: ["Ryan Cooper", "Sofia Mendez", "Jake Sullivan"],
    match: 92,
    top10: 4,
  },
  {
    id: "5",
    title: "Phantom Protocol",
    description:
      "A disavowed intelligence operative resurfaces after five years in hiding when her former handler is assassinated. To survive, she must reassemble a team of burned agents and infiltrate the very agency that erased them — before a weapons deal reshapes the global order.",
    tagline: "She was supposed to stay dead.",
    thumbnail:
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
    backdrop:
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1920&h=1080&fit=crop",
    videoUrl:
      "https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4",
    year: 2025,
    duration: "2h 22m",
    rating: "R",
    genre: ["Action", "Thriller"],
    cast: ["Diana Koval", "Rafe Donovan", "Chen Wei"],
    match: 95,
    top10: 5,
  },
  {
    id: "6",
    title: "The Depth Below",
    description:
      "A deep-sea research team exploring the Mariana Trench discovers an ancient structure that predates human civilization. When their submersible is damaged, they're forced to take shelter inside — and realize they're not the first visitors, and something down here is still alive.",
    tagline: "7 miles down. Nowhere to surface.",
    thumbnail:
      "https://images.unsplash.com/photo-1551244072-5d12893278ab?w=400&h=600&fit=crop",
    backdrop:
      "https://images.unsplash.com/photo-1551244072-5d12893278ab?w=1920&h=1080&fit=crop",
    videoUrl:
      "https://www.w3schools.com/html/mov_bbb.mp4",
    year: 2024,
    duration: "1h 52m",
    rating: "PG-13",
    genre: ["Horror", "Sci-Fi", "Thriller"],
    cast: ["Olivia Reyes", "Kai Nakamura", "Ben Harrison"],
    match: 94,
    top10: 6,
  },
  {
    id: "7",
    title: "Kings of the Corner",
    description:
      "Three childhood friends from Detroit's east side took different paths — one became a cop, one a hustler, one a preacher. When a real estate developer threatens to demolish their block, old loyalties are tested and buried secrets surface in a fight for their neighborhood's soul.",
    tagline: "Blood is thicker. But the block is forever.",
    thumbnail:
      "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?w=400&h=600&fit=crop",
    backdrop:
      "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?w=1920&h=1080&fit=crop",
    videoUrl:
      "https://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4",
    year: 2025,
    duration: "2h 20m",
    rating: "R",
    genre: ["Crime", "Drama"],
    cast: ["Jamal Brown", "Tony Russo", "DeShawn Williams"],
    match: 91,
    top10: 7,
  },
  {
    id: "8",
    title: "Ascent",
    description:
      "Two elite climbers attempt the first winter ascent of K2's unclimbed west face. At 28,000 feet, a catastrophic storm separates them, and survival becomes a solo battle against the mountain, frostbite, and the limits of human will.",
    tagline: "Above the clouds, you're on your own.",
    thumbnail:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=600&fit=crop",
    backdrop:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&h=1080&fit=crop",
    videoUrl:
      "https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4",
    year: 2024,
    duration: "1h 48m",
    rating: "PG-13",
    genre: ["Adventure", "Drama"],
    cast: ["Chris Walker", "Nina Patel", "Hans Mueller"],
    match: 89,
    top10: 8,
  },
  {
    id: "9",
    title: "Zero Day",
    description:
      "A cybersecurity analyst at a major bank discovers a zero-day exploit embedded in the global financial system — set to trigger in 72 hours. No one believes her. With time running out, she goes rogue to stop a digital heist that could collapse the world economy.",
    tagline: "The countdown already started.",
    thumbnail:
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=600&fit=crop",
    backdrop:
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1920&h=1080&fit=crop",
    videoUrl:
      "https://www.w3schools.com/html/mov_bbb.mp4",
    year: 2025,
    duration: "2h 01m",
    rating: "PG-13",
    genre: ["Thriller", "Sci-Fi"],
    cast: ["Emily Zhang", "Oscar Davis", "Rachel Kim"],
    match: 96,
    top10: 9,
  },
  {
    id: "10",
    title: "The Iron Crown",
    description:
      "In a war-torn medieval kingdom, an orphaned blacksmith's apprentice discovers she carries the bloodline of an exiled dynasty. With a ragtag band of outcasts, she must reclaim a throne she never wanted — before a tyrant's dark sorcery consumes the realm.",
    tagline: "Empires aren't inherited. They're forged.",
    thumbnail:
      "https://images.unsplash.com/photo-1500964757637-c85e8a162699?w=400&h=600&fit=crop",
    backdrop:
      "https://images.unsplash.com/photo-1500964757637-c85e8a162699?w=1920&h=1080&fit=crop",
    videoUrl:
      "https://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4",
    year: 2024,
    duration: "2h 35m",
    rating: "PG-13",
    genre: ["Fantasy", "Adventure", "Action"],
    cast: ["Freya Stark", "Aiden Cole", "Zara Malik"],
    match: 90,
    top10: 10,
  },
  {
    id: "11",
    title: "Last Call at Murray's",
    description:
      "A washed-up stand-up comedian gets one final shot: a week-long residency at the legendary comedy club that launched her career a decade ago. Between sets, she confronts the relationships she burned, the jokes she buried, and the version of herself she left on stage.",
    tagline: "The hardest person to make laugh is yourself.",
    thumbnail:
      "https://images.unsplash.com/photo-1514306191717-452ec28c7814?w=400&h=600&fit=crop",
    backdrop:
      "https://images.unsplash.com/photo-1514306191717-452ec28c7814?w=1920&h=1080&fit=crop",
    videoUrl:
      "https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4",
    year: 2025,
    duration: "1h 45m",
    rating: "R",
    genre: ["Comedy", "Drama"],
    cast: ["Tina Brooks", "Marco Perez", "Sam Goldstein"],
    match: 88,
  },
  {
    id: "12",
    title: "Echoes of Tomorrow",
    description:
      "A quantum physicist grieving her daughter's death accidentally opens a bridge to parallel timelines. She finds a version of her daughter alive — but every attempt to bring her back destabilizes both realities. How much of the world will she sacrifice for one life?",
    tagline: "Every choice creates a universe. Every universe has a cost.",
    thumbnail:
      "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=400&h=600&fit=crop",
    backdrop:
      "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1920&h=1080&fit=crop",
    videoUrl:
      "https://www.w3schools.com/html/mov_bbb.mp4",
    year: 2025,
    duration: "2h 10m",
    rating: "PG-13",
    genre: ["Sci-Fi", "Drama"],
    cast: ["Lily Park", "David Okafor", "Mia Santos"],
    match: 93,
  },
  {
    id: "13",
    title: "Midnight in Havana",
    description:
      "A jazz pianist from New York travels to Havana to trace the roots of a mysterious recording left by his late grandfather. What he finds is a hidden legacy of revolution, forbidden love, and music that was never meant to be heard outside those walls.",
    tagline: "Some melodies are born in secret.",
    thumbnail:
      "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=400&h=600&fit=crop",
    backdrop:
      "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=1920&h=1080&fit=crop",
    videoUrl:
      "https://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4",
    year: 2024,
    duration: "2h 05m",
    rating: "PG-13",
    genre: ["Drama", "Mystery"],
    cast: ["Damon Wright", "Isabella Cruz", "Robert Kim"],
    match: 91,
  },
  {
    id: "14",
    title: "Bloodline Pact",
    description:
      "A family reunion at a remote Scottish estate turns deadly when the patriarch reveals a centuries-old curse: by dawn, one family member must die, or they all will. Trust fractures instantly as each sibling confronts dark secrets and darker motives.",
    tagline: "Family is murder.",
    thumbnail:
      "https://images.unsplash.com/photo-1478174613198-e353c3f3aee1?w=400&h=600&fit=crop",
    backdrop:
      "https://images.unsplash.com/photo-1478174613198-e353c3f3aee1?w=1920&h=1080&fit=crop",
    videoUrl:
      "https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4",
    year: 2025,
    duration: "1h 56m",
    rating: "R",
    genre: ["Horror", "Mystery", "Thriller"],
    cast: ["Helena Voss", "Callum Byrne", "Suki Arora"],
    match: 94,
  },
  {
    id: "15",
    title: "Velocity",
    description:
      "A disgraced Formula 1 engineer gets a shot at redemption when a rookie driver with raw talent but zero funding hires her to build a car from scratch. Together they take on the most dominant team in racing history — and the politics that protect it.",
    tagline: "Speed is engineered. Heart isn't.",
    thumbnail:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=600&fit=crop",
    backdrop:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&h=1080&fit=crop",
    videoUrl:
      "https://www.w3schools.com/html/mov_bbb.mp4",
    year: 2025,
    duration: "2h 14m",
    rating: "PG-13",
    genre: ["Action", "Drama"],
    cast: ["Zoe Nakamura", "Luca Ferrari", "Amara Osei"],
    match: 93,
  },
  {
    id: "16",
    title: "The Cartographer's Daughter",
    description:
      "In 1920s Istanbul, a young cartographer inherits her father's unfinished map — one that reveals hidden passages beneath the city. Following his trail, she uncovers an underground world of smugglers, lost relics, and a conspiracy that connects Ottoman history to a modern-day heist.",
    tagline: "Every map hides a secret. This one hides an empire.",
    thumbnail:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=600&fit=crop",
    backdrop:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&h=1080&fit=crop",
    videoUrl:
      "https://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4",
    year: 2024,
    duration: "2h 18m",
    rating: "PG-13",
    genre: ["Adventure", "Mystery"],
    cast: ["Leila Amir", "Thomas Crane", "Elif Yilmaz"],
    match: 90,
  },
];

export const genres = [
  "Trending Now",
  "Top 10 on Enflix",
  "Sci-Fi",
  "Action",
  "Thriller",
  "Drama",
  "Adventure",
  "Horror",
  "Romance",
  "Crime",
  "Fantasy",
  "Mystery",
  "Comedy",
];

export function getMoviesByGenre(genre: string): Movie[] {
  if (genre === "Trending Now") {
    return [...movies].sort((a, b) => b.match - a.match).slice(0, 10);
  }
  if (genre === "Top 10 on Enflix") {
    return movies.filter((m) => m.top10).sort((a, b) => (a.top10 ?? 99) - (b.top10 ?? 99));
  }
  return movies.filter((m) => m.genre.includes(genre));
}

export function getMovieById(id: string): Movie | undefined {
  return movies.find((m) => m.id === id);
}
