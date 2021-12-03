import styled from 'styled-components';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Avatar from '@mui/material/Avatar';
import PinterestIcon from '@mui/icons-material/Pinterest';
import Button from '@mui/material/Button';
import { makeStyles } from "@mui/styles";
import { Link, Navigate } from 'react-router-dom';
//import {Redirect } from 'react-router';
import React, { useState, useEffect, useContext, Fragment } from "react";
import { UserContext } from "../../context";
import Main from "./Main";
import First from "./First"
import Second from "./Second";
import Third from "./Third";
import LoginSaved from "./LoginSaved";
import LoginUnSaved from "./LoginUnSaved";
//import './Auth.css';
import axiosInstance from './axios/Base.jsx';
import axiosFetchInstance from "./axios/Fetch.jsx";
//import test from '../../test.jpg'



const useStyles = makeStyles({
  link: {
    textDecoration: "inherit",
    color: "inherit",
    '&:hover': {
      textDecoration: "inherit",
    }
  },
});

export default function PrimarySearchAppBar() {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const { authedUser, headers, setHeaders } = useContext(UserContext);
  const [Cscreen, setCscreen] = useState("");
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [language, setLanguage] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [update, setUpdate] = useState(0);
  const [profilePic, setProfilePicture] = useState("");
  
  



  //const [formData, setFormData] = useState({email: "", password: "", age:"", username={}, gender: "", country: "", language: "", loginEmail: "", loginPassword: ""})

  useEffect( () => {
    // console.log(authedUser)
    try {
      setProfilePicture(authedUser.profile_pic)
    }
    catch(err) {
    }
    
  }, [authedUser]);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  
  const switchScreen=(screen)=>{
    setCscreen(screen)
    // console.log(Cscreen)
  };
  const CssTextField = {
    '& label.Mui-focused': {
      color: '#e60023',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#e60023',
    },
    '& .MuiOutlinedInput-root': {
      maxHeight:'50px',
      borderRadius:20,
      '&.Mui-focused fieldset': {
        borderColor: '#e60023',
        borderWidth:3,
        
      },
    },
  };
  const handleClickOpen = (type) => {
    setOpen(true)
    // console.log("here")
    if(type==="signup"){
      switchScreen("main")
    }else if(type==="login"){
      if(localStorage.pinterestAccount){
        setLoginEmail(localStorage.getItem('pinterestAccount'))  
        // console.log(localStorage.getItem('pinterestAccount'))
        //console.log(this.state.loginEmail)
        switchScreen("savedLogin")
      }else switchScreen("unsavedLogin")
    }
};
const handleClose = ()=>{
    setOpen(false);
};
const collectFromMain = (obj) =>{

    setEmail(obj.email);
    setPassword(obj.password);
    setAge(obj.age);
};

const collectFromFirst=(obj)=>{
  
  setUsername( obj.username)
};

const collectFromSecond=(obj)=>{
  setGender(obj.gender)    
};

const collectFromThird=(obj)=>{
  setCountry(obj.country)
  // this.setState({language:obj.lang})
  axiosInstance
    .post('/account/signup',{
      email:email,
      password:password,
      username:username,
      age:age,
      gender:gender,
      country:country,
    }).then(res => {
      localStorage.setItem('pinterestAccessToken', res.data.access_token)
      localStorage.setItem('pinterestRefreshToken', res.data.refresh_token)
      axiosFetchInstance.defaults.headers['Authorization'] =  res.data.access_token
      localStorage.setItem('pinterestAccount', email)
      window.location.href = '/'
    }).catch(err => {
      // console.log(err)
    })
};

  const collectFromLoginUnSaved=(obj)=>{

    axiosInstance
    .post('/account/auth/token', {
      username:obj.loginEmail,
      password:obj.loginPassword,
      grant_type:"password",
      client_id:"cPvFU0PqYK7nzAS8eJ0uwDHzq1voXNJB2Qs0xDWF",
      client_secret:"tjtDy1W4XoZ2EcF54X5ISKg0AAky7zksIqPmov2WSkxqDuWVWw6izZPhxJNLDtPCHBsw3xyr8huAT6xUQmQ62H2hP48yQwBkRLe8COfPF8c8eETQEHMoZR8ryeVk2TJ5",
    }).then(res => {
      localStorage.setItem('pinterestAccessToken', res.data.access_token)
      localStorage.setItem('pinterestRefreshToken', res.data.refresh_token)
      localStorage.setItem('pinterestAccount', obj.loginEmail) 
      axiosFetchInstance.defaults.headers['Authorization'] =  res.data.access_token
      window.location.reload()
    }).catch(err => {
      // console.log(err)
    })
};

  const collectFromLoginSaved=(password)=>{
      setLoginPassword(password)

      axiosInstance
        .post('/account/auth/token', {
          username:loginEmail,
          password:loginPassword,
          grant_type:"password",
          client_id:"cPvFU0PqYK7nzAS8eJ0uwDHzq1voXNJB2Qs0xDWF",
          client_secret:"tjtDy1W4XoZ2EcF54X5ISKg0AAky7zksIqPmov2WSkxqDuWVWw6izZPhxJNLDtPCHBsw3xyr8huAT6xUQmQ62H2hP48yQwBkRLe8COfPF8c8eETQEHMoZR8ryeVk2TJ5",
        }).then(res => {
          localStorage.setItem('pinterestAccessToken', res.data.access_token)
          localStorage.setItem('pinterestRefreshToken', res.data.refresh_token)
          localStorage.setItem('pinterestAccount', loginEmail) 
          axiosFetchInstance.defaults.headers['Authorization'] =  res.data.access_token
          window.location.reload()
        }).catch(err => {
          // console.log(err)
        })
  };



  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleLogout = () =>{
    localStorage.clear()
     setAnchorEl(null);
     handleMobileMenuClose();
    // return <Navigate to='/'/>;
    setHeaders({
      'content-type': "application/json",
      'Authorization': ''
    })

  }

  

  // useEffect( ()=> {
 
  //   //setUpdate(1);

  // },[headers])

 
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >

      <Link to="/profile" className={classes.link}>
        <MenuItem onClick={handleMenuClose}>
          Profile
        </MenuItem>
      </Link>
      
        <MenuItem onClick={handleLogout}>
          Logout
        </MenuItem>

    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/* <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem> */}
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }} style={{ margin: 0, position: "fixed", top: 0, left: 0, width: "100%", zIndex: 1000 }}>
      {
        Cscreen==="main" &&
        <Main switch={switchScreen} handle={handleClickOpen} open={open} close={handleClose} collect={collectFromMain} inputStyle={CssTextField}/> 
        }
        {
        Cscreen==="first" && 
        <First switch={switchScreen} handle={handleClickOpen} open={open} collect={collectFromFirst} inputStyle={CssTextField} email={email} />
        }
        {
        Cscreen==="second" && 
        <Second switch={switchScreen} open={open} collect={collectFromSecond} />
        }
        {
        Cscreen==="third" && 
        <Third switch={switchScreen} open={open} close={handleClose} collect={collectFromThird} />
        }
        {
        Cscreen==="savedLogin" &&
        <LoginSaved switch={switchScreen} open={open} close={handleClose} collect={collectFromLoginSaved} email={loginEmail} inputStyle={CssTextField}/> 
        }
        {
        Cscreen==="unsavedLogin" &&
        <LoginUnSaved switch={switchScreen} open={open} close={handleClose} collect={collectFromLoginUnSaved} inputStyle={CssTextField}/> 
        }
      <AppBar position="static" color="text">
        <Toolbar>
          <Link to="/">
            <LogoWrapper>
              <IconButton>
                <PinterestIcon />
              </IconButton>
            </LogoWrapper>


          </Link>

          <SearchWrapper>

            <SearchBarWrapper>
              <IconButton>
                <SearchIcon></SearchIcon>
              </IconButton>

              <form>
                <input type="text" />
                <button type="submit">Submit</button>
              </form>

            </SearchBarWrapper>
          </SearchWrapper>
          {authedUser?
          (<Fragment>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {/* <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton> */}
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {authedUser? <Avatar alt="Remy Sharp" src={profilePic} />: ""}
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ ml: 2 }}
          >
            <KeyboardArrowDownIcon />
          </IconButton> */}
     

          </Fragment>): (<Fragment>

            <Button onClick={()=> handleClickOpen("signup")}>Signup</Button>
          <Button onClick={()=> handleClickOpen("login")}>Signin</Button>
          </Fragment>)}

          
          
      
          
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      
    </Box>
  );
};



const SearchWrapper = styled.div`
    flex: 1;
`
const LogoWrapper = styled.div`
    .MuiSvgIcon-root{
        color: #e60023;
        font-size: 32px;
        cursor: pointer;
    }
`

const SearchBarWrapper = styled.div`
    background-color: #efefef;
    display: flex;
    height: 48px;
    width: 100%;
    border-radius: 50px;
    border: none;

    form{
        display: flex;
        flex: 1;
    }
    form > input{
        background-color: transparent;
        border: none;
        width: 100%;
        margin-left: 5px;
        font-size: 16px;
    }

    form > button{
        display: none;

    }

    input:focus{
        outline: none;
    }
` 

