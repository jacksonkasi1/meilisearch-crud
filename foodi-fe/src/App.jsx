import React, { useState, useEffect } from "react";
import { client } from "./utils";
import MenuCard from "./MenuCard";
import SkeletonLoader from "./SkeletonLoader";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTime, setSearchTime] = useState(0);

  useEffect(() => {
    if (searchResults.length === 0) {
      setLoading(false);
    }
  }, [searchResults]);

  const handleSearch = async () => {
    setLoading(true);
    const startTime = performance.now();
    try {
      const index = client.index("menuitems");
      const searchResponse = await index.search(searchQuery, {
        hitsPerPage: 1000,  // Adjust the number of results per page
      });
      setSearchResults(searchResponse.hits);
      const endTime = performance.now();
      setSearchTime(endTime - startTime);

      setLoading(false);
    } catch (error) {
      console.error("Error searching:", error);
      setLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col items-center mt-6">
      <h1 className="text-3xl font-bold mb-4">Food Search</h1>
      <div className="w-full max-w-md flex mb-4">
        <input
          type="text"
          placeholder="Search for food..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full p-2 rounded-l border-r-0 focus:ring focus:border-red-300"
        />
        <button
          onClick={handleSearch}
          className="bg-red-500 text-white p-2 rounded-r"
        >
          Search
        </button>
      </div>
      <div className="w-full max-w-md flex justify-between mb-3">
        <p className="text-gray-500">
          Total Data: {searchResults.length}
        </p>
        <p className="text-gray-500">
          {searchTime === 0
            ? ""
            : searchTime < 1000
            ? `${searchTime.toFixed(2)} ms`
            : searchTime < 60000
            ? `${(searchTime / 1000).toFixed(1)} sec`
            : `${(searchTime / 60000).toFixed(1)} min`}
        </p>
      </div>
      <div className="w-full flex justify-center flex-col gap-3 max-w-md">
        {loading ? (
          <SkeletonLoader />
        ) : (
          searchResults.map((result) => (
            <MenuCard key={result.id} data={result} />
          ))
        )}
      </div>
    </div>
  );
};

export default App;
