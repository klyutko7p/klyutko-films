interface Film {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: Array<number>;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  homepage: string | null;
  status: string;
  belongs_to_collection: Collection | null;
  budget: number;
  genres: Array<Genre>;
  imdb_id: string | null;
  production_companies: Array<Company>;
  production_countries: Array<Country>;
  revenue: number;
  runtime: number;
  spoken_languages: Array<Language>;
  tagline: string;
  video: boolean | Array<string>;
  vote_average: number;
  vote_count: number;
}
