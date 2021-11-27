import React from "react";
import { Container, Button } from "@mui/material";
import Main from "./Main";
import First from "./First"
import Second from "./Second";
import Third from "./Third";
import LoginSaved from "./LoginSaved";
import LoginUnSaved from "./LoginUnSaved";
import './Auth.css'


export default class Auth extends React.Component{
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
            loginEmail:"",
            loginPassword:""


            

        }
    }

    handleClickOpen = (type) => {
        this.setState({open:true})
        if(type==="signup"){
          this.switchScreen("main")
        }else if(type==="login"){
          if(localStorage.pinterestAccount){
            this.state.loginEmail = localStorage.pinterestAccount
            this.setState({loginEmail:this.state.loginEmail})
            this.switchScreen("savedLogin")
          }else this.switchScreen("unsavedLogin")
        }
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
      let user = {
        email:this.state.email,
        password:this.state.password,
        username:this.state.username,
        age:this.state.age,
        gender:this.state.gender,
        country:this.state.country,
        language:this.state.language
      }
      let jsonUser = JSON.stringify(user)
      fetch(
        'http://localhost:8000/account/signup',{
        method:"POST",
        headers:{'content-type':"application/json"},
        body:jsonUser
      }).then(res => {
        return res.json()
      }).then(json =>{
        if(json.token){
          localStorage.setItem('pinterestToken', json.token)
          localStorage.setItem('pinterestAccount', this.state.email)
          window.location.href = 'http://localhost:3000/'
        }else{

        }
      })

    }
    collectFromLoginSaved=(password)=>{
      this.setState({loginPassword:password})
      let userLogin = {
        username:this.state.loginEmail,
        password:this.state.loginPassword
      }
      let jsonUser = JSON.stringify(userLogin)
      fetch(
        'http://localhost:8000/account/api/token/auth',{
        method:"POST",
        headers:{
          'content-type':"application/json",
          // 'Authorization':`jwt ${localStorage.getItem('pinterestToken')}`
        },
        body:jsonUser
      }).then(res => {
        return res.json()
      }).then(json =>{
        if(json.token){
          localStorage.setItem('pinterestToken', json.token)
          localStorage.setItem('pinterestAccount', this.state.email)
          wind
        }else{

        }
      })
    }

    collectFromLoginUnSaved=(obj)=>{
      let userLogin = {
        username:obj.loginEmail,
        password:obj.loginPassword
      }
      let jsonUser = JSON.stringify(userLogin)
      fetch(
        'http://localhost:8000/account/api/token/auth',{
        method:"POST",
        headers:{
          'content-type':"application/json",
          // 'Authorization':`jwt ${localStorage.getItem('pinterestToken')}`
        },
        body:jsonUser
      }).then(res => {
        return res.json()
      }).then(json =>{
        if(json.token){
          localStorage.setItem('pinterestToken', json.token)
          localStorage.setItem('pinterestAccount', userLogin.email)
        }else{

        }
      })
    }

    componentWillUnmount(){

      
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
        return <div >
        <div style={{margin:'5rem auto', maxWidth:'150px'}}>
          <div style={{display: "flex"}}>
            <Button ml={8} onClick={()=> this.handleClickOpen("signup")} style={{width: "100px"}}>Sign Up</Button> 
            <Button onClick={()=> this.handleClickOpen("login")}>Log In</Button></div>

          </div>
        {
        this.state.Cscreen==="main" &&
        <Main switch={this.switchScreen} handle={this.handleClickOpen} open={this.state.open} close={this.handleClose} collect={this.collectFromMain} inputStyle={CssTextField}/> 
        }
        {
        this.state.Cscreen==="first" && 
        <First switch={this.switchScreen} handle={this.handleClickOpen} open={this.state.open} collect={this.collectFromFirst} inputStyle={CssTextField} email={this.state.email} />
        }
        {
        this.state.Cscreen==="second" && 
        <Second switch={this.switchScreen} open={this.state.open} collect={this.collectFromSecond} />
        }
        {
        this.state.Cscreen==="third" && 
        <Third switch={this.switchScreen} open={this.state.open} close={this.handleClose} collect={this.collectFromThird} />
        }
        {
        this.state.Cscreen==="saved" &&
        <LoginSaved switch={this.switchScreen} open={this.state.open} close={this.handleClose} collect={this.collectFromLoginSaved} email={this.state.loginEmail} inputStyle={CssTextField}/> 
        }
                {
        this.state.Cscreen==="unsavedLogin" &&
        <LoginUnSaved switch={this.switchScreen} open={this.state.open} close={this.handleClose} collect={this.collectFromLoginUnSaved} inputStyle={CssTextField}/> 
        }
      </div>

    }
}