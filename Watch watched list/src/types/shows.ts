export interface Show {
  id: number;
  name: string;
  image: {
    medium: string;
    original: string;
  } | undefined;
  genres: string[];
  status: string;
  language: string;
  rating: {
    average: number | undefined;
  };
  premiered: string | undefined;
}
