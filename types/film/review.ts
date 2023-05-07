interface Review {
  author: string;
  author_details: {
    name: string;
    usernames: string;
    avatar_path: string | null;
    rating: number | null;
  };
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}
