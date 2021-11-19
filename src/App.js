import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Settings from './pages/Settings'
import { grey } from "@mui/material/colors";
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'

console.log(grey[900])

const theme = createTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        color: 'info',
        margin: 'dense'
      }
    },
    MuiButton: {
      defaultProps: {
        size: "large",
        variant: "contained",
      }
    },
    MuiSelect: {
      defaultProps: {
        color: 'info'
      }
    },
    MuiInputLabel: {
      defaultProps: {
        color: 'info'
      }
    },
    MuiRadio: {
      defaultProps: {
        color: 'black'
      }
    },
    MuiFormLabel: {
      defaultProps: {
        color: 'black'
      }
    }
  },
  palette: {
    primary: {
      main: red[700],
      light: red[300],
      dark: red[900]
    },
    black: {
      main: grey[900],
      light: grey[500],
    }
  },
  shape: {
    borderRadius: "24px"
  }
});

function App() {
  return (
    <div>
      <Router>
        <ThemeProvider theme={theme}>
          <Settings />
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
