import { ThemeProvider } from "@mui/material/styles";
import Settings from './pages/Settings'
import Profile from './pages/Profile'
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import theme from './theme/Theme'

function App() {
  return (
    <div>
      <Router>
        <ThemeProvider theme={theme}>
          <Profile />
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
