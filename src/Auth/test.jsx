import { useRef } from "react";
import NavigationBar from '../components/navigationbar/NavigationBar'
import Buttons from './Buttons'
import Auth from './Auth'

export default function Test(){
    const AuthRef = useRef();
    const runAuth = (type)=>{
        AuthRef.current.handleClickOpen(type)
    }

    return (<div>
        <Auth ref={AuthRef} />
        <Buttons runAuth={runAuth} />
    </div>);
}