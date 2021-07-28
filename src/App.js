import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css';
import { Home } from './components/Home';
import { LogIn } from './components/LogIn';
import { Navbar } from './components/Navbar';
import { SignUp } from './components/SignUp';
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
        <Router>
          <Navbar />
          <body className="App-header">
            <Switch>
              <Route exact path="/signup">
                <SignUp />
              </Route>
              <Route exact path="/login">
                <LogIn />
              </Route>
              <Route path="/">
                <Home data={data} />
              </Route>
            </Switch>
          </body>
        </Router>
    </div>
  );
}

export default App;
