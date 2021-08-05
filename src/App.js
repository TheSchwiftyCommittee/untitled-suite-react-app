import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { createTheme, ThemeProvider } from "@material-ui/core";

import './App.css';
import { Home } from './pages/Home';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import Tasker from './pages/Tasker';

import { Navbar } from './components/navbar/Navbar';
import { ViewportProvider } from './components/viewport/ViewportProvider';

import { ProtectedRoute } from './routes/ProtectedRoute';

// import { USuiteApi } from './api/USuiteApi';
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

  const checkLoginStatus = () => {
    const token = localStorage.getItem('jwt')
    const isAdmin = localStorage.getItem('admin')
    
    if (token) {
      setUser(true)
    }
    if (isAdmin) {
      setAdmin(true)
    }
  }
  
  useEffect(() => {
    checkLoginStatus()
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
                <ProtectedRoute path="/tasker" component={Tasker} user={user} />
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
