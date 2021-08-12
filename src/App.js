import { useEffect, useState } from 'react';
import {
  HashRouter,
  Switch
} from "react-router-dom";
import { createTheme, ThemeProvider } from "@material-ui/core";

import './App.css';

import { Navbar } from './components/navbar/Navbar';
import { ViewportProvider } from './components/viewport/ViewportProvider';

import { ProtectedRoute } from './routes/ProtectedRoute';
import { StandardRoute } from './routes/StandardRoute';

import { Home } from './pages/Home';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import Tasker from './pages/Tasker';
import NewList from './pages/CreateNewList';
import Pricing from './pages/Pricing';
import Profile from './pages/Profile';
import CreateProfile from './pages/CreateProfile';
import Users from './pages/Users';
import CreateNewTask from './pages/CreateNewTask';

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

const initialUser = () => {
  return localStorage.getItem('jwt') ? true : false;
}

function App() {
  const [adminDirector, setAdminDirector] = useState(false)
  const [admin, setAdmin] = useState(false)
  const [user, setUser] = useState(initialUser())

  // When user closes the app and reopen
  const checkLoginStatus = () => {
    const token = localStorage.getItem('jwt')
    const isAdmin = localStorage.getItem('admin')
    const isAdminDirector = localStorage.getItem('adminDirector')
    
    if (token) {
      setUser(true)
    }
    if (isAdmin) {
      setAdmin(true)
    }
    if (isAdminDirector) {
      setAdminDirector(true)
    }
  }
  
  useEffect(() => {
    checkLoginStatus()
  }, [])

  return (
    <ViewportProvider>
      <div className="App">
        <ThemeProvider theme={theme}>
          <HashRouter>
            <Navbar adminDirector={adminDirector} setAdminDirector={setAdminDirector} admin={admin} setAdmin={setAdmin} user={user} setUser={setUser} />
            <div className="App-header">
              <Switch>
                <StandardRoute path="/signup" component={SignUp} user={user} setAdmin={setAdmin} setUser={setUser} /> 
                <StandardRoute path="/signin" component={SignIn} user={user} setAdmin={setAdmin} setUser={setUser} setAdminDirector={setAdminDirector} /> 
                <StandardRoute path="/pricing" component={Pricing} /> 
                <ProtectedRoute path="/tasker" component={Tasker} user={user} />
                <ProtectedRoute path="/createNewList" component={NewList} user={user} />
                <ProtectedRoute path="/createNewTask/:listId" component={CreateNewTask} user={user} />
                <ProtectedRoute path="/users" component={Users} user={user} admin={admin} adminDirector={adminDirector} />
                <ProtectedRoute path="/profile/new" component={CreateProfile} user={user} setAdmin={setAdmin} setUser={setUser} />
                <ProtectedRoute exact path="/profile" component={Profile} user={user} setAdmin={setAdmin} setUser={setUser} />
                <StandardRoute exact path="/" component={Home} user={user} setUser={setUser} /> 
              </Switch> 
            </div>
          </HashRouter>
        </ThemeProvider>
      </div>
    </ViewportProvider>
  );
}

export default App;
