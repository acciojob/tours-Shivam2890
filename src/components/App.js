import React, { useEffect, useState } from "react";

const url = "https://www.course-api.com/react-tours-project";

const App = () => {
  const [tour, setTour] = useState([]);
  const [readMore, setReadMore] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchTour = () => {
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setTour(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchTour();
  }, []);

  const handleRemove = (id) => {
    setTour(tour.filter((item) => item.id !== id));
  };

  const toggleReadMore = (id) => {
    setReadMore((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <main id="main">
      {loading && <h1>Fetching Data</h1>}

      {!loading && tour.length === 0 && (
        <>
          <h1>NO TOUR LEFT</h1>
          <button onClick={fetchTour}>Refresh</button>
        </>
      )}

      {!loading &&
        tour.map((item) => (
          <div className="container" key={item.id}>
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>Price {item.price}</p>

            <p id={`tour-item-para-${item.id}`}>
              {readMore[item.id]
                ? item.info
                : item.info.substring(0, 200)}
              <button
                id={`see-more-${item.id}`}
                onClick={() => toggleReadMore(item.id)}
              >
                {readMore[item.id] ? "show less" : "show more"}
              </button>
            </p>

            <button
              id={`delete-btn-${item.id}`}
              onClick={() => handleRemove(item.id)}
            >
              remove
            </button>
          </div>
        ))}
    </main>
  );
};

export default App;
