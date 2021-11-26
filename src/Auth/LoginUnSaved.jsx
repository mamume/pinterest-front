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