import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import { createTheme, ThemeProvider } from "@material-ui/core";

import './App.css';
import { Home } from './pages/Home';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import Tasker from './pages/Tasker';
import NewList from './pages/CreateNewList';
import Pricing from './pages/Pricing';

import { Navbar } from './components/navbar/Navbar';
import { ViewportProvider } from './components/viewport/ViewportProvider';

import { ProtectedRoute } from './routes/ProtectedRoute';
import { StandardRoute } from './routes/StandardRoute';

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
                <StandardRoute path="/signup" component={SignUp} setAdmin={setAdmin} setUser={setUser} /> 
                <StandardRoute path="/signin" component={SignIn} setAdmin={setAdmin} setUser={setUser} /> 
                <StandardRoute path="/pricing" component={Pricing} /> 
                <ProtectedRoute path="/tasker" component={Tasker} user={user} />
                <ProtectedRoute path="/createNewList" component={NewList} user={user} />
                <StandardRoute exact path="/" component={Home} user={user} setUser={setUser} /> 
              </Switch> 
            </div>
          </Router>
        </ThemeProvider>
      </div>
    </ViewportProvider>
  );
}

export default App;
