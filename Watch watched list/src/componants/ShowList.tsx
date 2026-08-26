import { useEffect, useRef } from 'react';
import type { Show } from '../types/shows';
import ShowCard from './ShowCard';

interface ShowListProps {
  title: string;
  shows: Show[];
  onAdd?: (show: Show) => void;
  onRemove?: (show: Show) => void;
  onLoadMore?: () => void;
}

function ShowList({
  title,
  shows,
  onAdd,
  onRemove,
  onLoadMore,
}: ShowListProps) {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!onLoadMore) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      {
        threshold: 1,
      },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [onLoadMore, shows.length]);

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
          />
        ))}
      </div>

      {onLoadMore && <div ref={observerRef} className="h-10" />}
    </div>
  );
}

export default ShowList;