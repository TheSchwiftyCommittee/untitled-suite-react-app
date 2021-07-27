import { useEffect, useState } from 'react';
import './App.css';
import importData from './utils/importData';

function App() {
  const [data, setData] = useState(null)

  const getData = async () => {
    let lists = await importData("/lists");
    let title = await lists[0].title
    setData(title)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <p>{data && data}</p>
      </header>
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
    </div>
  );
}

export default App;
