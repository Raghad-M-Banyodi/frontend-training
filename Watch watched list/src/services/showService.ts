import type { Show } from '../types/shows';

const API_URL = 'https://api.tvmaze.com/shows';

export async function getShows(): Promise<Show[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Failed to fetch shows');
  }

  return response.json();
}
