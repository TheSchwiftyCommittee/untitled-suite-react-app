import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css';
import { Home } from './components/Home';
import { SignIn } from './components/SignIn';
import { Navbar } from './components/Navbar';
import { SignUp } from './components/SignUp';
import importData from './utils/importData';

function App() {
  const [data, setData] = useState(null)
  const [admin, setAdmin] = useState(false)
  const [user, setUser] = useState(false)

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
          <Navbar admin={admin} user={user}/>
          <div className="App-header">
            <Switch>
              <Route path="/signup">
                <SignUp />
              </Route>
              <Route path="/signin">
                <SignIn />
              </Route>
              <Route exact path="/">
                <Home data={data} />
              </Route>
            </Switch>
          </div>
        </Router>
    </div>
  );
}

export default App;
