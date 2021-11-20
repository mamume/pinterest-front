import React from "react";
import { Container, Button } from "@mui/material";
import Main from "./Main";
import First from "./First"
import './Signup.css'

export default class Signup extends React.Component{
    constructor(){
        super();
        this.state = {
            mainOpen:false,
            
            email:"ahmed.email",
            password:"",
            age:"",
            username:""

            

        }
    }

    handleClickOpen = () => {
        this.setState({mainOpen:true});
    };
    handleClose = ()=>{
        this.setState({mainOpen:false});
    }
    collectFromMain = (obj) =>{
        this.setState({email:obj.email});
        this.setState({password:obj.password});
        this.setState({age:obj.age});
    } 

    collectFromFirst=(userName)=>{
        this.setState({username:userName})
    }

    render(){ 
        const CssTextField = {
            '& label.Mui-focused': {
              color: '#e60023',
            },
            '& .MuiInput-underline:after': {
              borderBottomColor: '#e60023',
            },
            '& .MuiOutlinedInput-root': {
    
              borderRadius:20,
              '&.Mui-focused fieldset': {
                borderColor: '#e60023',
                borderWidth:3
              },
            },
          };
        return <div>
        <Button onClick={this.handleClickOpen}>Open</Button> 
        <Main open={this.state.mainOpen} close={this.handleClose} collect={this.collectFromMain} inputStyle={CssTextField}/>
        {/* <First collect={this.collectFromFirst} inputStyle={CssTextField} email={this.state.email}/> */}
        </div>
    }
}