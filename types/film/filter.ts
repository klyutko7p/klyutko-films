interface Filter {
  date: number | string;
  language: string;
  sort: string;
  userScore: number;
  userVotes: number;
  runtime: number;
  genres_ids: Array<number>;
}
