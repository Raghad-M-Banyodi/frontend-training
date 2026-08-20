import { useEffect, useState } from 'react';
import { getShows } from './services/showService';
import type { Show } from './types/shows';
import SearchBar from './componants/SearchBar';
import ShowList from './componants/ShowList';

function App() {
  const [shows, setShows] = useState<Show[]>([]);
  const [search, setSearch] = useState('');
  const [visibleShowsCount, setVisibleShowsCount] = useState(10);
  const [visibleWatchedCount, setVisibleWatchedCount] = useState(10);

  const [watchedShows, setWatchedShows] = useState<Show[]>(() => {
    const savedWatchedShow = localStorage.getItem('watchedShows');

    return savedWatchedShow ? JSON.parse(savedWatchedShow) : [];
  });

  const filteredShows = shows.filter(
    (show) =>
      show.name.toLowerCase().includes(search.toLowerCase()) &&
      !watchedShows.some((item) => item.id === show.id),
  );

  const filteredWatchedShows = watchedShows.filter((show) =>
    show.name.toLowerCase().includes(search.toLowerCase()),
  );

  const visibleShows = filteredShows.slice(0, visibleShowsCount);

  const visibleWatchedShows = filteredWatchedShows.slice(
    0,
    visibleWatchedCount,
  );

  function saveWatchedShows(shows: Show[]) {
    localStorage.setItem('watchedShows', JSON.stringify(shows));
  }

  function addToWatched(show: Show) {
    setWatchedShows((prev) => {
      if (prev.some((item) => item.id === show.id)) {
        return prev;
      }

      const updatedShows = [...prev, show];

      saveWatchedShows(updatedShows);

      return updatedShows;
    });
  }

  function removeFromWatchedList(show: Show) {
    setWatchedShows((prev) => {
      const updatedShows = prev.filter((item) => item.id !== show.id);

      saveWatchedShows(updatedShows);

      return updatedShows;
    });
  }

  function loadMoreShows() {
    setVisibleShowsCount((prev) => prev + 10);
  }

  function loadMoreWatched() {
    setVisibleWatchedCount((prev) => prev + 10);
  }

  useEffect(() => {
    getShows()
      .then((data) => {
        setShows(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <SearchBar handleSearch={setSearch} />

      <div className="grid grid-cols-2 gap-8">
        <ShowList
          title="Watch List"
          shows={visibleShows}
          onAdd={addToWatched}
          onRemove={removeFromWatchedList}
          isWatched={false}
          onLoadMore={loadMoreShows}
          hasMore={visibleShows.length < filteredShows.length}
        />

        <ShowList
          title="Watched List"
          shows={visibleWatchedShows}
          onAdd={addToWatched}
          onRemove={removeFromWatchedList}
          isWatched={true}
          onLoadMore={loadMoreWatched}
          hasMore={visibleWatchedShows.length < filteredWatchedShows.length}
        />
      </div>
    </div>
  );
}

export default App;
