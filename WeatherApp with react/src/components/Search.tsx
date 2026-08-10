
import {  useState } from "react";
interface SearchProps {
  
    handleSearch: (city: string) => void;
}

function Search({ handleSearch}: SearchProps) {
    const [value, setValue] = useState("");
    function onKeyDown(event:any){
         if (event.key === "Enter") {
                        handleSearch(value);
                        setValue("");
                    }


    }
    return (
        <div>
            <input
                id="search"
                placeholder="your city"
                value={value}
                onChange={(event) => setValue(event.target.value)}
                onKeyDown={(event) =>  onKeyDown(event)}
            />

            <button onClick={()=>handleSearch(value)}>
                Search
            </button>
        </div>
    );
}

export default Search;
