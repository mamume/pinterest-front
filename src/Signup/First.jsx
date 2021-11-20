import React from "react";
import "./First.css"
import {
    Button,
    TextField,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography,
    Avatar,
    MobileStepper
} from "@mui/material";

export default class First extends React.Component{
    constructor(){
        super();
        this.state = {
            username:""
        }
    }

    collectInput=(e)=>{
      
      this.setState({[e.target.name]:e.target.value})
      
    }

    render(){
        return <Dialog open={true} onClose={this.props.close} maxWidth='xs' fullWidth={false}>
        <DialogTitle mb={3} mt={2}>
        <MobileStepper
        variant="dots"
        steps={4}
        position="static"
        activeStep={0}
        sx={{ maxWidth: 400, flexGrow: 1}}
        />
        </DialogTitle>
        <DialogContent sx={{textAlign:"center"}}>
        <Avatar
        sx={{ width: 100, height: 100 , margin:'auto', backgroundColor:"#f3f0f0"}}
        >
          <Typography variant="h3" sx={{color:'black', fontWeight:400, textTransform:'uppercase'}}>{this.props.email[0]}
          
          </Typography>
          </Avatar>
        <DialogContentText mt={2} >
        <Typography variant="body2">{this.props.email}</Typography>
        </DialogContentText>
        <DialogContentText my={2} >
        <Typography variant="h4" sx={{color:'black'}}>Welcome to Pinterest</Typography>
        </DialogContentText>  
          
          <div style={{width:"70%", textAlign:"center", margin:'auto'}}>

          <TextField
            autoFocus
            required
            sx={this.props.inputStyle}
            margin="dense"
            name="email"
            id="username"
            label="User Name"
            type="text"
            fullWidth
            variant="outlined"
            defaultValue={this.props.email}
            value={this.state.username}
            onChange={this.collectInput}
          />

          <DialogContentText mt={3} >
          <Typography variant="body2">Your answers to the next few qustions will help us find the 
          the right ideas for you</Typography>
          </DialogContentText>
          </div>
          <Button
          onClick={()=> this.props.collect(this.state.username)}
          variant="contained" 
          size='large' 
          fullWidth
          sx={{
            backgroundColor:"#e60023", 
            '&:hover':{backgroundColor:"#e60023"}, 
            borderRadius:10,
            textTransform:'none',
            marginTop:'1.5rem'
          }}
          >
          Next</Button>
          

         <DialogContentText mt={2}> 
          <Typography variant="caption">
          <a href="#">Are you a member? Log in</a>
        </Typography>
        </DialogContentText>  

        </DialogContent>

      </Dialog>
    }
}