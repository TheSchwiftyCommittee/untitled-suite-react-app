import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { createTheme, ThemeProvider } from "@material-ui/core";

import './App.css';
import { Home } from './components/Home';
import { SignIn } from './components/SignIn';
import { Navbar } from './components/navbar/Navbar';
import { SignUp } from './components/SignUp';
import { ViewportProvider } from './components/viewport/ViewportProvider';
import { TaskerDashboard } from './components/tasker/TaskerDashboard';
// import importData from './utils/importData';

const theme = createTheme({
  palette: {
    primary: {
      main: "#eff0f3"
    },
    secondary: {
      main: "#ff8e3c"
    }
  }
})

function App() {
  const [admin, setAdmin] = useState(false)
  const [user, setUser] = useState(false)

  useEffect(() => {
  }, [])

  return (
    <ViewportProvider>
      <div className="App">
        <ThemeProvider theme={theme}>
          <Router>
            <Navbar admin={admin} setAdmin={setAdmin} user={user} setUser={setUser} />
            <div className="App-header">
              <Switch>
                <Route path="/signup">
                  <SignUp setAdmin={setAdmin} setUser={setUser} />
                </Route>
                <Route path="/signin">
                  <SignIn setAdmin={setAdmin} setUser={setUser} />
                </Route>
                <Route path="/tasker">
                  <TaskerDashboard user={user} />
                </Route>
                <Route exact path="/">
                  <Home user={user} setUser={setUser} />
                </Route>
              </Switch>
            </div>
          </Router>
        </ThemeProvider>
      </div>
    </ViewportProvider>
  );
}

export default App;
