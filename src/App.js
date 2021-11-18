import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import PrimarySearchAppBar from './Components/NavigationBar'

const theme = createTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        color: 'info'
      }
    },
    MuiButton: {
      defaultProps: {
        size: "large",
        variant: "contained",
      }
    }
  },
  palette: {
    primary: {
      main: red[700],
      light: red[300],
      dark: red[900]
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
        <PrimarySearchAppBar></PrimarySearchAppBar>
      </ThemeProvider>
    </div>
  );
}

export default App;
