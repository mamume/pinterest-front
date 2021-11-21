import React from "react";
import { Container, Button } from "@mui/material";
import Main from "./Main";
import First from "./First"
import Second from "./Second";
import Third from "./Third";
import './Signup.css'
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import {Routes} from 'react-router-dom';

export default class Signup extends React.Component{
    constructor(){
        super();
        this.state = {
            Cscreen:"",
            email:"",
            password:"",
            age:"",
            username:"",
            gender:"",
            country:"",
            language:"",


            

        }
    }

    handleClickOpen = () => {
        this.setState({Cscreen:"main"});
        
    };
    handleClose = ()=>{
        this.setState({mainOpen:false});
    }
    collectFromMain = (obj) =>{
        let email = obj.email
        console.log(obj)

        this.setState({email:obj.email});
        this.setState({password:obj.password});
        this.setState({age:obj.age});
        this.setState({Cscreen:obj.screen})


    } 

    collectFromFirst=(obj)=>{
        this.setState({username:obj.userName})
        this.setState({Cscreen:obj.screen})
    }

    collectFromSecond=(obj)=>{
      this.setState({gender:obj.gender})
      this.setState({Cscreen:obj.screen})
    }
    collectFromThird=(obj)=>{
      this.setState({country:obj.country});
      this.setState({language:obj.lang})
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
                borderWidth:3,
                
              },
            },
          };
        return <div>
        <Button onClick={this.handleClickOpen}>Open</Button> 
        {
        this.state.Cscreen==="main" &&
        <Main  close={this.handleClose} collect={this.collectFromMain} inputStyle={CssTextField}/> 
        }
        {
        this.state.Cscreen==="first" && 
        <First collect={this.collectFromFirst} inputStyle={CssTextField} email={this.state.email} />
        }
        {
        this.state.Cscreen==="second" && 
        <Second collect={this.collectFromSecond} />
        }
        {
        this.state.Cscreen==="third" && 
        <Third collect={this.collectFromThird} />
        }
      </div>

    }
}