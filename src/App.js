import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Setting from './pages/Setting'
import { grey } from "@mui/material/colors";

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
      <ThemeProvider theme={theme}>
        
      </ThemeProvider>
    </div>
  );
}

export default App;
