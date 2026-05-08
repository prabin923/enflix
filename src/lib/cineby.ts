import {
  buildGenresFromMovies,
  defaultGenres,
  localMovies,
  Movie,
} from "@/lib/movies";

interface CinebyMoviePayload {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  adult?: boolean;
  original_language?: string;
  popularity?: number;
  video?: boolean;
  vote_count?: number;
}

interface CinebyListResponse {
  page?: number;
  results: CinebyMoviePayload[];
  total_pages?: number;
  total_results?: number;
}

interface CinebyGenreResponse {
  genres: Array<{ id: number; name: string }>;
}

function toImageUrl(value?: string): string {
  if (!value) return "";
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  const imageBase = process.env.CINEBY_IMAGE_BASE_URL || "https://image.tmdb.org/t/p/original";
  return `${imageBase}${value}`;
}

function toDuration(value?: number | string): string {
  if (typeof value === "string" && value.trim().length > 0) return value;
  const runtime = typeof value === "number" ? value : Number(value ?? 0);
  if (!runtime || Number.isNaN(runtime)) return "2h 00m";
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return `${hours}h ${minutes.toString().padStart(2, "0")}m`;
}

function toYear(value?: string | number): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value.slice(0, 4));
    if (Number.isFinite(parsed)) return parsed;
  }
  return new Date().getFullYear();
}

function toGenres(
  genreIds: number[],
  genreMap?: Map<number, string>
): string[] {
  if (genreIds.length > 0 && genreMap) {
    const resolved = genreIds
      .map((id) => genreMap.get(id))
      .filter((genre): genre is string => Boolean(genre));
    if (resolved.length > 0) return resolved;
  }

  return ["Drama"];
}

function mapCinebyMovie(
  payload: CinebyMoviePayload,
  index: number,
  genreMap?: Map<number, string>
): Movie {
  const movieId = String(payload.id);
  const title = payload.title?.trim() || `Untitled Movie ${index + 1}`;
  const description = payload.overview?.trim() || "No description available for this title yet.";
  const thumbnail = toImageUrl(payload.poster_path ?? undefined) || localMovies[index % localMovies.length].thumbnail;
  const backdrop = toImageUrl(payload.backdrop_path ?? undefined) || thumbnail;
  const year = toYear(payload.release_date);
  const genre = toGenres(payload.genre_ids || [], genreMap);
  const match = Math.max(80, Math.min(99, Math.round((payload.vote_average || 7.5) * 10)));

  return {
    id: movieId,
    title,
    description,
    thumbnail,
    backdrop,
    videoUrl: localMovies[index % localMovies.length].videoUrl,
    year,
    duration: toDuration(),
    rating: payload.adult ? "R" : "PG-13",
    genre,
    cast: localMovies[index % localMovies.length].cast,
    match,
    tagline: undefined,
    top10: index < 10 ? index + 1 : undefined,
  };
}

async function fetchGenreMap(baseUrl: string, headers: HeadersInit): Promise<Map<number, string>> {
  const endpoint = process.env.CINEBY_API_GENRES_PATH;
  if (!endpoint) return new Map();

  try {
    const url = new URL(endpoint, baseUrl);
    if (process.env.CINEBY_API_KEY) {
      url.searchParams.set("api_key", process.env.CINEBY_API_KEY);
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      headers,
      next: { revalidate: 86400 },
    });

    if (!response.ok) return new Map();

    const payload = (await response.json()) as CinebyGenreResponse;
    const genres = payload.genres || [];
    const map = new Map<number, string>();
    for (const genre of genres) {
      if (typeof genre.id === "number" && typeof genre.name === "string") {
        map.set(genre.id, genre.name);
      }
    }
    return map;
  } catch {
    return new Map();
  }
}

async function fetchFromCineby(): Promise<Movie[] | null> {
  const baseUrl = process.env.CINEBY_API_BASE_URL;
  if (!baseUrl) return null;

  const endpoint = process.env.CINEBY_API_MOVIES_PATH || "/movies/trending";
  const url = new URL(endpoint, baseUrl);
  if (process.env.CINEBY_API_KEY) {
    url.searchParams.set("api_key", process.env.CINEBY_API_KEY);
  }

  const headerValues: Record<string, string> = { Accept: "application/json" };
  if (process.env.CINEBY_API_BEARER_TOKEN) {
    headerValues.Authorization = `Bearer ${process.env.CINEBY_API_BEARER_TOKEN}`;
  }
  if (process.env.CINEBY_API_KEY && process.env.CINEBY_API_KEY_HEADER) {
    headerValues[process.env.CINEBY_API_KEY_HEADER] = process.env.CINEBY_API_KEY;
  }
  const headers: HeadersInit = headerValues;

  const response = await fetch(url.toString(), {
    method: "GET",
    headers,
    next: { revalidate: 900 },
  });

  if (!response.ok) {
    throw new Error(`Cineby request failed with status ${response.status}`);
  }

  const payload = (await response.json()) as CinebyListResponse;
  const movieItems = payload.results || [];

  if (!Array.isArray(movieItems) || movieItems.length === 0) {
    return null;
  }

  const genreMap = await fetchGenreMap(baseUrl, headers);
  return movieItems.slice(0, 30).map((movie, index) => mapCinebyMovie(movie, index, genreMap));
}

export async function getCatalogMovies(): Promise<Movie[]> {
  try {
    const cinebyMovies = await fetchFromCineby();
    if (cinebyMovies && cinebyMovies.length > 0) {
      return cinebyMovies;
    }
  } catch (error) {
    console.error("Failed to fetch movies from Cineby API:", error);
  }

  return localMovies;
}

export async function getCatalogGenres(movieList?: Movie[]): Promise<string[]> {
  if (movieList && movieList.length > 0) {
    return buildGenresFromMovies(movieList);
  }

  const movies = await getCatalogMovies();
  return movies.length > 0 ? buildGenresFromMovies(movies) : defaultGenres;
}
