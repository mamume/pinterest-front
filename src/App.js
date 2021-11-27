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
import { Fragment, useState } from "react";
import PinThumbnail from './components/pins/pin_thumbnail'
import Create from './components/pins/create_pin'


function App() {
  const [authed] = useState(true)

  return (
    <Fragment>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        {authed
          ? <Fragment>
            <PinThumbnail />
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
          </Fragment>
          : <Auth />
        }
      </ThemeProvider>
    </Fragment>
  );
}

export default App;


