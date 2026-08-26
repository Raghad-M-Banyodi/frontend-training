import type { Show } from '../types/shows';

const API_URL = 'https://api.tvmaze.com/shows';

export async function getShows(page: number): Promise<Show[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Failed to fetch shows');
  }

  const shows: Show[] = await response.json();

  const start = page * 10;

  return shows.slice(start, start + 10);
}