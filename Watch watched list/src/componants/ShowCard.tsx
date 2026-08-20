import type { Show } from '../types/shows';

interface ShowCardProps {
  show: Show;
  onAdd: (show: Show) => void;
  onRemove: (show: Show) => void;
  isWatched: boolean;
}

function ShowCard({ show, onAdd, onRemove, isWatched }: ShowCardProps) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-xl bg-white shadow-md transition hover:shadow-lg">
      {show.image && (
        <img
          src={show.image.medium}
          alt={show.name}
          className="h-80 w-full object-cover"
        />
      )}

      <div className="flex flex-1 flex-col p-4">
        <h2 className="min-h-14 text-lg font-bold">{show.name}</h2>

        <p className="min-h-10 text-sm text-gray-500">
          {show.genres.join(', ')}
        </p>

        <p className="mt-2 mb-2">⭐ {show.rating.average ?? 'N/A'}</p>

        {isWatched ? (
          <button
            onClick={() => onRemove(show)}
            className="mt-auto rounded-lg bg-rose-300 px-4 py-2 text-sm font-medium text-black transition hover:bg-rose-700"
          >
            Remove from Watched List
          </button>
        ) : (
          <button
            onClick={() => onAdd(show)}
            className="mt-auto rounded-lg bg-purple-100 px-4 py-2 text-sm font-medium text-black transition hover:bg-purple-300"
          >
            Add to Watched List
          </button>
        )}
      </div>
    </div>
  );
}

export default ShowCard;
