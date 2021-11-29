import React from 'react';
import {
    Button,
    TextField,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography,
    Avatar,
    IconButton,
    Divider
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import PinterestIcon from '@mui/icons-material/Pinterest';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import GoogleLogin from 'react-google-login';
import FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone';
import { FcGoogle } from "react-icons/fc";

export default class LoginUnSaved extends React.Component{
    constructor(){
        super()
        this.state = {
            loginEmail:"",
            loginPassword:""
        }
    }

    collectInput=(e)=>{
      
        this.setState({[e.target.name]:e.target.value});
        
    }

    sendData=()=>{
        let data = {
          loginEmail:this.state.loginEmail,
          loginPassword:this.state.loginPassword,
        }
        this.props.collect(data)  
      }
      
    responseFacebook=(response)=>{
      console.log(response.accessToken)
      let obj = {
        grant_type:"convert_token",
        client_id:"cPvFU0PqYK7nzAS8eJ0uwDHzq1voXNJB2Qs0xDWF",
        client_secret:"tjtDy1W4XoZ2EcF54X5ISKg0AAky7zksIqPmov2WSkxqDuWVWw6izZPhxJNLDtPCHBsw3xyr8huAT6xUQmQ62H2hP48yQwBkRLe8COfPF8c8eETQEHMoZR8ryeVk2TJ5",
        backend:"facebook",
        token:response.accessToken
      }
      let jsonObj = JSON.stringify(obj)
      fetch(
        'http://localhost:8000/account/auth/convert-token',{
        method:"POST",
        headers:{'content-type':"application/json"},
        body:jsonObj
      }).then(res =>{
        console.log(res)
        return res.json()
      }).then(json =>{
        if(json.access_token){
          localStorage.setItem('pinterestAccessToken', json.access_token)
          localStorage.setItem('pinterestRefreshToken', json.refresh_token)
          localStorage.setItem('pinterestAccount', response.email)
          window.location.href = 'http://localhost:3000/'
        }else console.log(json)
      })
    }
  
    responseGoogle=(response)=>{
      console.log(response)
      let obj = {
        grant_type:"convert_token",
        client_id:"cPvFU0PqYK7nzAS8eJ0uwDHzq1voXNJB2Qs0xDWF",
        client_secret:"tjtDy1W4XoZ2EcF54X5ISKg0AAky7zksIqPmov2WSkxqDuWVWw6izZPhxJNLDtPCHBsw3xyr8huAT6xUQmQ62H2hP48yQwBkRLe8COfPF8c8eETQEHMoZR8ryeVk2TJ5",
        backend:"google-oauth2",
        token:response.accessToken
      }
      let jsonObj = JSON.stringify(obj)
      fetch(
        'http://localhost:8000/account/auth/convert-token',{
        method:"POST",
        headers:{'content-type':"application/json"},
        body:jsonObj
      }).then(res =>{
        console.log(res)
        return res.json()
      }).then(json =>{
        if(json.access_token){
          localStorage.setItem('pinterestAccessToken', json.access_token)
          localStorage.setItem('pinterestRefreshToken', json.refresh_token)
          localStorage.setItem('pinterestAccount', response.vu.jv)
          window.location.href = 'http://localhost:3000/'
        }else console.log(json)
      })
    }

    render(){
        return <Dialog open={this.props.open}  maxWidth='xs' fullWidth={false}>
        <DialogTitle>
          <IconButton
            aria-label="close"
            onClick={this.props.close}
            sx={{
              position: 'absolute',
              right: 10,
              top: 10,
              color:'black',
              fontWeight:'bold',
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{textAlign:"center"}}>
        <div style={{width:"90%", textAlign:"center", margin:'auto'}}>
          <PinterestIcon fontSize="large" 
          sx={{
            color:'#e60023',
            marginBottom:2
          }} />
          <DialogContentText>
            <Typography variant="h4" sx={{fontWeight:400}}>
            Welcome to Pinterest
            </Typography>
          </DialogContentText>
          </div>
          
          <div style={{width:"70%", textAlign:"center", margin:'auto', marginTop:'0.5rem'}}>

          <TextField
          autoFocus
            required
            sx={this.props.inputStyle}
            margin="dense"
            name="loginEmail"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            value={this.state.loginEmail}
            onChange={this.collectInput}
          />
          <TextField
            required
            sx={this.props.inputStyle}  
            margin="dense"
            name="loginPassword"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={this.state.loginPassword}
            onChange={this.collectInput}

          />
          <DialogContentText ml={1} sx={{textAlign:"left"}}>
            <Typography variant="subtitle2"><button className="asAnchor">Forgot your password?</button>
            </Typography>
          </DialogContentText>

          <Button
          onClick={this.sendData}
          variant="contained" 
          size='large' 
          fullWidth
          sx={{
            backgroundColor:"#e60023", 
            '&:hover':{backgroundColor:"#e60023"}, 
            borderRadius:10,
            textTransform:'none',
            marginTop:'1.5rem',
           
          }}
          >
          Next</Button>

          <DialogContentText my={1}>
          <Typography variant="h6">OR</Typography>
          </DialogContentText>
          <FacebookLogin
                appId="1730643360462848"
                fields='name,email,picture,first_name,last_name'
                callback={this.responseFacebook}
                render={renderProps => (
                  <Button
                  onClick={renderProps.onClick}
                  variant="contained" 
                  size='large' 
                  fullWidth 
                  sx={{
                    backgroundColor:"#4267b2", 
                    '&:hover':{backgroundColor:"#4267b2"}, 
                    borderRadius:10,
                    textTransform:'none',
                    paddingLeft:'0.1rem',
                    paddingRight:'0.5rem'
                  }}
                  >
                  <FacebookTwoToneIcon sx={{marginRight:'0.5rem'}}/>
                  Continue With Facebook</Button>
                )}
            />
            <GoogleLogin
              clientId="784070846451-8g55v603c490t8pj4meumoa7c2a3viuv.apps.googleusercontent.com"
              render={renderProps => (
                <Button
                onClick={renderProps.onClick}
                variant="contained" 
                size='large' 
                fullWidth 
                sx={{
                  backgroundColor:"rgb(255, 255, 255)", 
                  color:'rgba(0, 0, 0, 0.54)',
                  '&:hover':{backgroundColor:"rgb(255, 255, 255)"}, 
                  
                  borderRadius:10,
                  textTransform:'none',
                  paddingLeft:'0.1rem',
                  paddingRight:'0.5rem',
                  marginTop:'1rem'
                }}
                >
                <FcGoogle style={{marginRight:'0.5rem', fontSize:'1.5rem'}}/>
                Continue With Google</Button>
            )}
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              cookiePolicy={'single_host_origin'}
            />

         <DialogContentText mt={2}> 
         <Typography variant="caption">
          By continuing you agree to pinterest's <button className="asAnchor">Terms of Service</button> and
           acknowledge you've read our <button className="asAnchor">Privacy Policy</button>
        </Typography>
        </DialogContentText>
        <div style={{width:'40%', margin:'1rem auto'}}><Divider /></div>
        <DialogContentText> 
          <Typography variant="caption">
          <button className="asAnchor" onClick={()=> this.props.switch('main')}>Not a pintersest yet? sign up</button>
        </Typography>
        </DialogContentText>    

        </div>

        </DialogContent>

      </Dialog>
    }
}