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
import Pin from './components/pins/pin'
import { UserContext } from "./context";
import PwReset from './Auth/PwReset'
import PwResetConfirm from './Auth/PwResetConfirm'



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


  return (
    <Fragment>
      <CssBaseline />
      {authedUser
        ? <ThemeProvider theme={theme}>
          <UserContext.Provider value={{ authedUser, headers, setAuthedUser }}>
            <Container sx={{ paddingTop: 9 }} >
              <Router>
                <NavigationBar />
                <Routes>
                  <Route path="/" exact element={<Homepage />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/settings/*" element={<Settings />} />
                  <Route path="/board/" element={<Board />} />
                  <Route path="/create_pin/" element={<Create />} />
                  <Route path='/pin/:id' element={<Pin />}> </Route>
                  <Route path="/password-reset" element={<PwReset />} />
                  <Route path="/password-reset/confirm" element={<PwResetConfirm />} />
                </Routes>
              </Router>
            </Container>
          </UserContext.Provider>
        </ThemeProvider>
        : <Auth />
      }
    </Fragment>
  );
}

export default App;


