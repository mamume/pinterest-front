import { ThemeProvider } from "@mui/material/styles";
import Profile from './pages/Profile'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import theme from './theme/Theme'
import Settings from "./pages/Settings"
import Homepage from "./pages/Homepage";

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" exact element={<Homepage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings/*" element={<Settings />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
