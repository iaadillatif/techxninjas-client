import { useState } from "react";
import { Search } from "lucide-react"; // assuming you're using lucide icons

export default function SearchButton() {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    alert(`Searching for: ${query}`);
  };

  return (
    <div className="flex items-center gap-3 top-10 bottom-10">
      <div className="flex-1 relative top-10 bottom-10">
      </div>
      <button
        onClick={handleSearch}
        className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition mt-0 mx-1 left-3"
      >
        Search
      </button>
    </div>
  );
}
