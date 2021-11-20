import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Settings from './pages/Settings'
import { grey } from "@mui/material/colors";
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'


const theme = createTheme({
  components: {
    MuiInputBase: {
      defaultProps: {
        sx: {
          borderRadius: "16px",
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        color: 'info',
      }
    },
    MuiButton: {
      defaultProps: {
        size: "large",
        variant: "contained",
        sx: {
          borderRadius: "20px"
        }
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
    },
    MuiCheckbox: {
      defaultProps: {
        color: 'black'
      }
    },
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
