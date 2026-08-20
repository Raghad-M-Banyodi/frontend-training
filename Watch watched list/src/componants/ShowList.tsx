import type { Show } from '../types/shows';
import ShowCard from './ShowCard';

interface ShowListProps {
  title: string;
  shows: Show[];
  onAdd: (show: Show) => void;
  onRemove: (show: Show) => void;
  isWatched: boolean;
  onLoadMore: () => void;
  hasMore: boolean;
}

function ShowList({
  title,
  shows,
  onAdd,
  onRemove,
  isWatched,
  onLoadMore,
  hasMore,
}: ShowListProps) {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">{title}</h1>

      <div className="grid grid-cols-2 gap-4">
        {shows.map((show) => (
          <ShowCard
            key={show.id}
            show={show}
            onAdd={onAdd}
            onRemove={onRemove}
            isWatched={isWatched}
          />
        ))}
      </div>

      {hasMore && (
        <button
          onClick={onLoadMore}
          className="mt-6 w-full rounded-lg bg-violet-400 px-4 py-2 font-medium text-white transition hover:bg-violet-700"
        >
          Load More
        </button>
      )}
    </div>
  );
}

export default ShowList;
