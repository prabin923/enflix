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
}

export const movies: Movie[] = [
  {
    id: "1",
    title: "Cosmic Odyssey",
    description:
      "A team of astronauts embarks on a perilous journey beyond our solar system to find a new home for humanity. As they venture deeper into the unknown, they encounter wonders and dangers that challenge everything they know about the universe.",
    thumbnail:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=225&fit=crop",
    backdrop:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1920&h=1080&fit=crop",
    videoUrl:
      "https://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4",
    year: 2024,
    duration: "2h 28m",
    rating: "PG-13",
    genre: ["Sci-Fi", "Adventure", "Drama"],
    cast: ["Alex Rivera", "Emma Chen", "Marcus Johnson"],
    match: 97,
  },
  {
    id: "2",
    title: "Shadow Protocol",
    description:
      "A retired intelligence operative is pulled back into the world of espionage when a ghost from her past threatens global security. She must navigate a web of deceit and betrayal to prevent catastrophe.",
    thumbnail:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=225&fit=crop",
    backdrop:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1920&h=1080&fit=crop",
    videoUrl:
      "https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4",
    year: 2024,
    duration: "2h 12m",
    rating: "R",
    genre: ["Action", "Thriller"],
    cast: ["Sarah Blake", "James Morton", "Yuki Tanaka"],
    match: 95,
  },
  {
    id: "3",
    title: "The Last Garden",
    description:
      "In a post-apocalyptic world where nature has all but vanished, a young botanist discovers the last surviving garden. She must protect it from those who would exploit it while nurturing hope for the future.",
    thumbnail:
      "https://images.unsplash.com/photo-1518882570532-3a3e5fc39dfe?w=400&h=225&fit=crop",
    backdrop:
      "https://images.unsplash.com/photo-1518882570532-3a3e5fc39dfe?w=1920&h=1080&fit=crop",
    videoUrl:
      "https://www.w3schools.com/html/mov_bbb.mp4",
    year: 2023,
    duration: "1h 54m",
    rating: "PG",
    genre: ["Drama", "Sci-Fi"],
    cast: ["Lily Park", "David Okafor", "Mia Santos"],
    match: 93,
  },
  {
    id: "4",
    title: "Midnight Express",
    description:
      "A jazz musician in 1950s New York finds himself entangled in a dangerous underworld after witnessing a crime. With nothing but his wits and his music, he must outplay the criminals hunting him.",
    thumbnail:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=225&fit=crop",
    backdrop:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1920&h=1080&fit=crop",
    videoUrl:
      "https://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4",
    year: 2024,
    duration: "2h 05m",
    rating: "R",
    genre: ["Crime", "Drama", "Music"],
    cast: ["Damon Wright", "Isabella Cruz", "Robert Kim"],
    match: 91,
  },
  {
    id: "5",
    title: "Frozen Peaks",
    description:
      "Two mountaineers attempt to conquer the world's most treacherous unclimbed peak. Battling extreme weather, dwindling supplies, and their own demons, they push the limits of human endurance.",
    thumbnail:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=225&fit=crop",
    backdrop:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&h=1080&fit=crop",
    videoUrl:
      "https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4",
    year: 2023,
    duration: "1h 48m",
    rating: "PG-13",
    genre: ["Adventure", "Drama"],
    cast: ["Chris Walker", "Nina Patel", "Hans Mueller"],
    match: 89,
  },
  {
    id: "6",
    title: "Digital Ghosts",
    description:
      "When a brilliant AI researcher discovers that digital consciousness persists after death, she must confront the ethical implications — and the vengeful spirits that now haunt the internet.",
    thumbnail:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=225&fit=crop",
    backdrop:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920&h=1080&fit=crop",
    videoUrl:
      "https://www.w3schools.com/html/mov_bbb.mp4",
    year: 2024,
    duration: "1h 52m",
    rating: "PG-13",
    genre: ["Horror", "Sci-Fi", "Thriller"],
    cast: ["Ava Thompson", "Lucas Grant", "Priya Sharma"],
    match: 94,
  },
  {
    id: "7",
    title: "Ocean's Whisper",
    description:
      "A marine biologist uncovers an ancient underwater civilization that holds the key to solving the planet's climate crisis. But powerful forces will stop at nothing to keep the discovery buried.",
    thumbnail:
      "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=225&fit=crop",
    backdrop:
      "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1920&h=1080&fit=crop",
    videoUrl:
      "https://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4",
    year: 2023,
    duration: "2h 15m",
    rating: "PG-13",
    genre: ["Adventure", "Mystery", "Sci-Fi"],
    cast: ["Olivia Reyes", "Kai Nakamura", "Ben Harrison"],
    match: 92,
  },
  {
    id: "8",
    title: "Street Kings",
    description:
      "In the gritty streets of Detroit, three childhood friends find themselves on opposite sides of the law. Loyalty, betrayal, and redemption collide in this intense urban drama.",
    thumbnail:
      "https://images.unsplash.com/photo-1517732306149-e8f829eb588a?w=400&h=225&fit=crop",
    backdrop:
      "https://images.unsplash.com/photo-1517732306149-e8f829eb588a?w=1920&h=1080&fit=crop",
    videoUrl:
      "https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4",
    year: 2024,
    duration: "2h 20m",
    rating: "R",
    genre: ["Crime", "Drama"],
    cast: ["Jamal Brown", "Tony Russo", "DeShawn Williams"],
    match: 88,
  },
  {
    id: "9",
    title: "Wildfire Hearts",
    description:
      "A firefighter and a journalist cross paths during the worst wildfire season in California's history. As the flames close in, they discover that saving each other might be the hardest rescue of all.",
    thumbnail:
      "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=400&h=225&fit=crop",
    backdrop:
      "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=1920&h=1080&fit=crop",
    videoUrl:
      "https://www.w3schools.com/html/mov_bbb.mp4",
    year: 2024,
    duration: "1h 58m",
    rating: "PG-13",
    genre: ["Romance", "Drama", "Action"],
    cast: ["Ryan Cooper", "Sofia Mendez", "Jake Sullivan"],
    match: 90,
  },
  {
    id: "10",
    title: "The Algorithm",
    description:
      "A tech mogul's revolutionary social platform begins predicting users' futures with terrifying accuracy. When a software engineer discovers the dark truth behind the predictions, she races to shut it down.",
    thumbnail:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=225&fit=crop",
    backdrop:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1920&h=1080&fit=crop",
    videoUrl:
      "https://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4",
    year: 2024,
    duration: "2h 01m",
    rating: "PG-13",
    genre: ["Thriller", "Sci-Fi"],
    cast: ["Emily Zhang", "Oscar Davis", "Rachel Kim"],
    match: 96,
  },
  {
    id: "11",
    title: "Legends of Arkon",
    description:
      "An orphaned warrior discovers she is the last descendant of an ancient order destined to defeat a rising dark force. Epic battles and mythical creatures await in this fantasy adventure.",
    thumbnail:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=225&fit=crop",
    backdrop:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&h=1080&fit=crop",
    videoUrl:
      "https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4",
    year: 2023,
    duration: "2h 35m",
    rating: "PG-13",
    genre: ["Fantasy", "Adventure", "Action"],
    cast: ["Freya Stark", "Aiden Cole", "Zara Malik"],
    match: 87,
  },
  {
    id: "12",
    title: "Laugh Track",
    description:
      "A struggling stand-up comedian lands an unlikely gig writing for a late-night show. Navigating Hollywood egos, backstage drama, and her own insecurities, she discovers what it really means to be funny.",
    thumbnail:
      "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=400&h=225&fit=crop",
    backdrop:
      "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=1920&h=1080&fit=crop",
    videoUrl:
      "https://www.w3schools.com/html/mov_bbb.mp4",
    year: 2024,
    duration: "1h 45m",
    rating: "R",
    genre: ["Comedy", "Drama"],
    cast: ["Tina Brooks", "Marco Perez", "Sam Goldstein"],
    match: 85,
  },
];

export const genres = [
  "Trending Now",
  "Sci-Fi",
  "Action",
  "Drama",
  "Thriller",
  "Adventure",
  "Comedy",
  "Horror",
  "Romance",
  "Crime",
  "Fantasy",
  "Mystery",
];

export function getMoviesByGenre(genre: string): Movie[] {
  if (genre === "Trending Now") {
    return movies.sort((a, b) => b.match - a.match).slice(0, 8);
  }
  return movies.filter((m) => m.genre.includes(genre));
}

export function getMovieById(id: string): Movie | undefined {
  return movies.find((m) => m.id === id);
}
