import { useState } from 'react';

interface SearchBarProps {
  handleSearch: (value: string) => void;
}

function SearchBar({ handleSearch }: SearchBarProps) {
  const [value, setValue] = useState('');

  function handleChange(value: string) {
    setValue(value);
    handleSearch(value);
  }

  return (
    <div className="mx-auto mb-8 flex max-w-7xl justify-center px-6 pt-6">
      <input
        value={value}
        placeholder="Search shows..."
        onChange={(event) => handleChange(event.target.value)}
        className="w-full max-w-sm rounded-lg border border-gray-300 px-4 py-3 text-gray-700 shadow-sm outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
      />
    </div>
  );
}

export default SearchBar;
