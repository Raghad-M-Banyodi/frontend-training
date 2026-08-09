interface SearchProps {
    setCity: (city: string) => void;
    handleSearch: () => void;
}

function Search({
    setCity,
    handleSearch,
}: SearchProps) {
    return (
        <div>
            <input
                id="search"
                placeholder="your city"
                onChange={(event) => setCity(event.target.value)}
                onKeyDown={(event) => {
                    if (event.key === "Enter") {
                        handleSearch();
                    }
                }}
            />

            <button onClick={handleSearch}>
                Search
            </button>
        </div>
    );
}

export default Search;