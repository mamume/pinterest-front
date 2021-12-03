import { Button } from "@mui/material";
export default function Buttons(props){
    const {runAuth} = props;

    return (<div style={{margin:'5rem auto', maxWidth:'150px'}}>
    <div style={{display: "flex"}}>
      <Button ml={8} onClick={()=> runAuth("signup")} style={{width: "100px"}}>Sign Up</Button> 
      <Button onClick={()=> runAuth("login")}>Log In</Button></div>

    </div>);
}