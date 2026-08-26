import { useEffect, useState } from 'react';
import { getShows } from './services/showService';
import type { Show } from './types/shows';
import SearchBar from './componants/SearchBar';
import ShowList from './componants/ShowList';

function App() {
  const [shows, setShows] = useState<Show[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [watchedShows, setWatchedShows] = useState<Show[]>([]);

  const filteredShows = shows.filter(
    (show) =>
      show.name.toLowerCase().includes(search.toLowerCase()) &&
      !watchedShows.some((item) => item.id === show.id),
  );

  const filteredWatchedShows = watchedShows.filter((show) =>
    show.name.toLowerCase().includes(search.toLowerCase()),
  );

  function addToWatched(show: Show) {
    setWatchedShows((prev) => {
      if (prev.some((item) => item.id === show.id)) {
        return prev;
      }

      return [...prev, show];
    });
  }

  function removeFromWatchedList(show: Show) {
    setWatchedShows((prev) =>
      prev.filter((item) => item.id !== show.id),
    );
  }

  function loadMoreShows() {
    setPage((prev) => prev + 1);
  }

  useEffect(() => {
    getShows(page)
      .then((data) => {
        setShows((prev) => {
          const newShows = data.filter(
            (show) => !prev.some((item) => item.id === show.id),
          );

          return [...prev, ...newShows];
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [page]);

  return (
    <div>
      <SearchBar handleSearch={setSearch} />

      <div className="grid grid-cols-2 gap-8">
        <ShowList
          title="Watch List"
          shows={filteredShows}
          onAdd={addToWatched}
          onLoadMore={loadMoreShows}
        />

        <ShowList
          title="Watched List"
          shows={filteredWatchedShows}
          onRemove={removeFromWatchedList}
        />
      </div>
    </div>
  );
}

export default App;