import { useEffect, useState } from 'react';
import './App.css';
import importData from './utils/importData';

function App() {
  const [data, setData] = useState(null)

  const getData = async () => {
    let listData = await importData("/lists");
    let listArray = await listData
    setData(listArray)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        {data && data.map((list) => (
          <ul key={list.id}>
            <li>{list.title}</li>
            <li>{list.description}</li>
          </ul>
        ))}
      </header>
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
    </div>
  );
}

export default App;
