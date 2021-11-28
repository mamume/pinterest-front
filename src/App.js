import { ThemeProvider } from "@mui/material/styles";
import Profile from './pages/Profile'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import theme from './theme/Theme'
import Settings from "./pages/Settings"
import Homepage from "./pages/Homepage";
import Board from './pages/Board'
import Auth from './Auth/Auth'
import NavigationBar from './components/navigationbar/NavigationBar'
import { Container, CssBaseline } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import Create from './components/pins/create_pin'
import { UserContext } from "./context";


function App() {
  const [authedUser, setAuthedUser] = useState({})
  const [headers] = useState({
    'content-type': "application/json",
    'Authorization': `bearer ${localStorage.getItem('pinterestAccessToken')}`
  })

  useEffect(() => {
    fetch(`http://localhost:8000/account/details`, { headers })
      .then(res => res.json())
      .then(data => {
        if (data.username)
          setAuthedUser(data)
        else
          setAuthedUser(null)
      })
  }, [headers])

  // const UserContext = createContext()

  return (
    <Fragment>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        {authedUser
          ? <UserContext.Provider value={authedUser}>
            <Container sx={{ paddingTop: 9 }} >
              <Router>
                <NavigationBar />
                <Routes>
                  <Route path="/" exact element={<Homepage />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/settings/*" element={<Settings />} />
                  <Route path="/board/" element={<Board />} />
                  <Route path="/create_pin/" element={<Create />} />
                </Routes>
              </Router>
            </Container>
          </UserContext.Provider>
          : <Auth />
        }
      </ThemeProvider>
    </Fragment>
  );
}

export default App;


