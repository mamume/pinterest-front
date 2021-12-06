import { ThemeProvider } from "@mui/material/styles";
import Profile from './pages/Profile'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import theme from './styles/Theme'
import Settings from "./pages/Settings"
import Homepage from "./pages/Homepage";
import Board from './pages/Board'
import NavigationBar from './components/navigationbar/NavigationBar'
import { Container, CssBaseline } from "@mui/material";
import { Fragment, useEffect, useState, useRef } from "react";
import Create from './components/pins/create_pin'
import Pin from './components/pins/pin'
import { UserContext } from "./context";
import PwReset from './Auth/PwReset'
import PwResetConfirm from './Auth/PwResetConfirm'
import Auth from './Auth/Auth'



function App() {
  const [authedUser, setAuthedUser] = useState({})
  const [host] = useState('http://localhost:8000')
  const [pins, setPins] = useState([])
  const [boards, setBoards] = useState([])
  const [headers, setHeaders] = useState({
    'content-type': "application/json",
    'Authorization': `bearer ${localStorage.getItem('pinterestAccessToken')}`
  })

  const removeItem = (id) => {
    // let idx;
    setPins(pins => pins.filter(item => item.id !== id))
    // for (let i =0 ; i < pins.length; i++){
    //   if( pins[i].id == id){
    //     idx = i;
    //   }
    // }
    // if(idx){

    //   setPins(pins => pins.splice(idx, 1))
    // }
  }

  const addItem = (item) => {
    console.log(item)
    item.content_src = `${host}${item.content_src}`
    setPins(pins => [...pins, item])

  }
  

  useEffect(() => {
    if (authedUser)
      fetch(`${host}/pin/pins/`, { headers })
        .then(res => res.json())
        .then(data => {
          setPins(data)
          console.log(data)
        })
  }, [authedUser, host, headers])

  useEffect(() => {
    try {
      if (authedUser) {
        fetch(`${host}/board/list?owner_id=${authedUser.id}`, { headers })
          .then(res => res.json())
          .then(data => setBoards(data))

      }
    }
    catch (err) {
      console.log(err)
    }


  }, [authedUser, host, headers])
  const AuthRef = useRef();
  const runAuth = (type) => {
    AuthRef.current.handleClickOpen(type)
  }
  

  useEffect(() => {
    fetch(`${host}/account/details`, { headers })
      .then(res => res.json())
      .then(data => {
        if (data.username)
          setAuthedUser(data)
        else
          setAuthedUser(null)
      })
  }, [headers, host])

  if (authedUser == null) AuthRef.current.state.open = true
  return (
    <Fragment>
      
      <CssBaseline />
      
      {authedUser
        ? <ThemeProvider theme={theme}>
          <UserContext.Provider value={{ authedUser, headers, setAuthedUser, setHeaders, host }}>
            <Container maxWidth="xl" sx={{ paddingTop: 9 }} >
              <Router>
                <NavigationBar runAuth={runAuth} pins={pins} setPins={setPins} />

                <Routes>

                  <Route path="/" exact element={<Homepage pins={pins} boards={boards} addItem={addItem} removeItem={removeItem}/>} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/settings/*" element={<Settings />} />
                  <Route path="/board/" element={<Board />} />
                  <Route path="/create_pin/" element={<Create />} />
                  <Route path='/pin/:id' element={<Pin />}> </Route>
                  <Route path="/password-reset" element={<PwReset />} />
                  <Route path="/password-reset/confirm" element={<PwResetConfirm />} />
                </Routes>
              </Router>
            </Container>
          </UserContext.Provider>
        </ThemeProvider>

        : AuthRef.current.state.open = true
      }
      <Auth ref={AuthRef} />
    </Fragment>
  );
}

export default App;


