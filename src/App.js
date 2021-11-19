import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import PrimarySearchAppBar from './components/NavigationBar'
import { IconButton } from '@mui/material'; 
import AddIcon from '@mui/icons-material/Add';
import './app.css'


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
      <IconButton color="primary" aria-label="add to shopping cart" style={{
        position: "fixed",
        bottom: 90,
        right: 50,
        padding: "15px",
        color: "black",
        //border: "0.02px solid black",
        
        
      }} sx={{boxShadow: 3,}}>
        <AddIcon sx={{
          fontSize: 20,
          transform: "scale(2)"

        }}  />
      </IconButton>
        <PrimarySearchAppBar></PrimarySearchAppBar>
      </ThemeProvider>
    </div>
  );
}

export default App;
