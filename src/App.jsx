import { useEffect, useState } from 'react'
import SearchTab from './components/SearchTab.jsx'
import Footer from './components/Footer.jsx';

function App() {
  const [valueJson, setvalueJson] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const jsonapi = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/todos");
        const resaw = await res.json();
        setvalueJson(resaw)
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    jsonapi();
  }, []);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <SearchTab searching={valueJson} />
          <Footer></Footer>
        </>

      )}
    </>
  );
}

export default App;
