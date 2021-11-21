import React from "react";
import { Container, Button } from "@mui/material";
import Main from "./Main";
import First from "./First"
import Second from "./Second";
import Third from "./Third";
import './Signup.css'


export default class Signup extends React.Component{
    constructor(){
        super();
        this.state = {
            open:false,
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
        this.setState({open:true})
        this.setState({Cscreen:"main"});
        
    };
    handleClose = ()=>{
        this.setState({open:false});
    }
    collectFromMain = (obj) =>{
        this.setState({email:obj.email});
        this.setState({password:obj.password});
        this.setState({age:obj.age});
    } 

    collectFromFirst=(obj)=>{
        this.setState({username:obj.userName})
    }

    collectFromSecond=(obj)=>{
      this.setState({gender:obj.gender})    
    }

    collectFromThird=(obj)=>{
      this.setState({country:obj.country});
      this.setState({language:obj.lang})
      this.handleClose()

    }

    componentWillUnmount(){
      let user = {
        email:this.state.email,
        password:this.state.password,
        username=this.state.username,
        age:this.state.age,
        gender:this.state.gender,
        country:this.state.country,
        language:this.state.language
      }
      let jsonUser = JSON.stringify(user)
      fetch(
        'API url',{
        method:"POST",
        headers:{'content-type':"application/json"},
        body:jsonUser
      }).then(res => {
        return res.json()
      }).then(json =>{
        if(json.token){
          localStorage.pinterestToken = json.token
          localStorage.pinterestAccount = this.state.email
        }else{

        }
      })
      
    }

    switchScreen=(screen)=>{
      this.setState({Cscreen:screen})
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
        <Main switch={this.switchScreen} open={this.state.open} close={this.handleClose} collect={this.collectFromMain} inputStyle={CssTextField}/> 
        }
        {
        this.state.Cscreen==="first" && 
        <First switch={this.switchScreen} open={this.state.open} collect={this.collectFromFirst} inputStyle={CssTextField} email={this.state.email} />
        }
        {
        this.state.Cscreen==="second" && 
        <Second switch={this.switchScreen} open={this.state.open} collect={this.collectFromSecond} />
        }
        {
        this.state.Cscreen==="third" && 
        <Third switch={this.switchScreen} open={this.state.open} close={this.handleClose} collect={this.collectFromThird} />
        }
      </div>

    }
}