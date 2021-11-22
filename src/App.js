import { ThemeProvider } from "@mui/material/styles";
import Profile from './pages/Profile'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './app.css'
import theme from './theme/Theme'
import Settings from "./pages/Settings"
import Homepage from "./pages/Homepage";
import Board from './pages/Board'
import NavigationBar from './components/NavigationBar'
import { Container } from "@mui/material";

function App() {
  return (
    <div >
      <ThemeProvider theme={theme} >
        <NavigationBar />
        <Container sx={{ paddingTop: 4, marginTop: "50px", }} >
          <Router>
            <Routes>
              <Route path="/" exact element={<Homepage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings/*" element={<Settings />} />
              <Route path="/board/" element={<Board />} />
            </Routes>
          </Router>
        </Container>
      </ThemeProvider>
    </div >
  );
}

export default App;
