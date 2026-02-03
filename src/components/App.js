import React, { useEffect, useState } from 'react'
const url = "https://www.course-api.com/react-tours-project"

const App = () => {
  const [tour, setTour] = useState([])
  const [readMore, setReadMore] = useState({})
  const [loading, setLoading] = useState(true)


  const fetchTour = () => {
    setLoading(true)

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setTour(data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      })
  }

  useEffect(() => {
    fetchTour()
  }, [])

  // console.log(tour)

  const handleRemove = (id) => {
    const filterData = tour.filter((item) => item.id !== id)
    setTour(filterData)
    // console.log("clikkked")
  }

  const toggleReadMore = (id) => {
    setReadMore(prev => ({
      ...prev,
      [id]: !prev[id],
    }))
  }
  // console.log("reddda" , readMore)
  if (loading) {
    return (
      <div className="container">
        <h1>Fetchinngg Data</h1>
      </div>
    )
  }

  if (tour.length === 0) {
    return (
      <div className="container">
        <h1>NO TOUR LEFT</h1>
        <button onClick={fetchTour}>Refreshh</button>
      </div>
    )
  }
  return (
    <main id="id">
      {tour.map((item, index) => {
        return (
          <div className="container" key={item.id}>
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>Price {item.price}</p>

            <p>Infomation {readMore[item.id] ? item.info : item.info.substring(0, 200)}
              <button onClick={() => toggleReadMore(item.id)}>
                {readMore[item.id] ? "show less" : "show more"}</button> 
                {/* {readMore[item.id] its mean id existed krti hai ki nhi  */}
            </p>

            <button onClick={() => handleRemove(item.id)}>remove</button>
          </div>
        )
      })}
    </main>
  )
}

export default App