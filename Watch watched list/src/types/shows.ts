export interface Show {
  id: number;
  name: string;
  image: {
    medium: string;
    original: string;
  } | null;
  genres: string[];
  status: string;
  language: string;
  rating: {
    average: number | null;
  };
  premiered: string | null;
}
