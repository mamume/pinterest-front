import { ThemeProvider } from "@mui/material/styles";
import Profile from './pages/Profile'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import theme from './theme/Theme'
import Settings from "./pages/Settings";
import Board from './pages/Board'
import Auth from './Auth/Auth'
import NavigationBar from './components/NavigationBar'
import { Container, CssBaseline } from "@mui/material";
import { Fragment, useState } from "react";

function App() {
  const [authed] = useState(true)

  return (
    <Fragment>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        {authed
          ? <Fragment>
            <NavigationBar />
            <Container sx={{ paddingTop: 13 }}>
              <Router>
                <Routes>
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/settings/*" element={<Settings />} />
                  <Route path="/board/" element={<Board />} />
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
