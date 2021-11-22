import { ThemeProvider } from "@mui/material/styles";
import Profile from './pages/Profile'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import theme from './theme/Theme'
import Settings from "./pages/Settings";
import Board from './pages/Board'
import NavigationBar from './components/NavigationBar'
import { Container, CssBaseline } from "@mui/material";
import { Fragment } from "react";

function App() {
  return (
    <Fragment>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <NavigationBar />
        <Container sx={{ paddingTop: 4 }}>
          <Router>
            <Routes>
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings/*" element={<Settings />} />
              <Route path="/board/" element={<Board />} />
            </Routes>
          </Router>
        </Container>
      </ThemeProvider>
    </Fragment>
  );
}

export default App;
