import { Avatar, Button, InputLabel, Stack, TextField, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { Fragment, useEffect, useState } from "react";
import SettingsButtons from "./SettingsButtons";
import axiosInstance from "../../axios/Base";
import axiosFetchInstance from '../../axios/Fetch';
import axios from "axios";
const Input = styled('input')({
    display: 'none',
});

function PublicProfile() {
    const [fname, setFname] = useState('fname')
    const [lname, setLname] = useState('')
    const [bio, setBio] = useState('')
    const [website, setWebsite] = useState('')
    const [username, setUsername] = useState('')
    const [profilePic, setProfilePic] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [clear, setClear] = useState(false)
    const [change, setChange] = useState(true)


    
    
    

    

    /*async function HandelSave(){
            const data = {
                first_name:fname,
                last_name:lname ,
                bio:bio,
                website:website,
                username:username,
                profile_pic:profilePic,
            };
        
            const res  = await axiosFetchInstance.patch("/account/update",data)
            console.log(res)
        }*/
    
    
    const HandelSave = () => {
        


        const data = {
            first_name:fname,
            last_name:lname ,
            bio:bio,
            website:website,
            username:username,
            // profile_pic:profilePic,
        };
        let jsonUser = JSON.stringify(data)
        axiosFetchInstance
            .patch('/account/update',jsonUser).then((res) => {
                console.log(res.data)
            }).catch(err => {
            console.log(err)
            })
        // fetch(
        //         'http://localhost:8000/account/update',{
        //         method:"PATCH",
        //         headers:{
        //         'content-type':"application/json",
        //         'Authorization':`Bearer ${localStorage.getItem('pinterestAccessToken')}`
        //         },
        //         body:jsonUser
        //     }).then(res => {
        //         return res.json()
        //     }).then(json =>{
        //         if(json.msg){
        //             console.log(json.msg)
        //         }else{
        //         console.log(json.error)
        //         }
        //     })
    }

   

    useEffect(() => {
        if (fname || lname || bio || website || username || profilePic)
            setDisabled(false)
        else
            setDisabled(true)
    }, [fname, lname, bio, website, username, profilePic])

    useEffect(() => {
        if (clear) {
            setFname('')
            setLname('')
            setBio('')
            setWebsite('')
            setUsername('')

            setClear(false)
        }
    }, [clear])

    return (
        <Fragment>
            <Typography variant="h5">Public Profile</Typography>
            <Typography variant="subtitle1" paragraph>People visiting your profile will see following info</Typography>
            <InputLabel>Photo</InputLabel>

            <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar
                    sx={{ width: 75, height: 75 }}
                    src={profilePic}
                >
                    <Typography variant="h4">M</Typography>
                </Avatar>
                <label htmlFor="contained-button-file">
                    <Input accept="image/*" id="contained-button-file" type="file" onChange={e => setProfilePic(e.target.files[0])} />
                    <Button color="grey" variant="contained" component="span">
                        Change
                    </Button>
                </label>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={2}>
                <TextField
                    label="First Name"
                    fullWidth
                    value={fname}
                    onChange={e => setFname(e.target.value)}
                />
                <TextField
                    label="Last Name"
                    fullWidth
                    value={lname}
                    onChange={e => setLname(e.target.value)}
                />
            </Stack>

            <Stack direction="row" alignItems="center" spacing={2}>
                <TextField
                    placeholder="Describe Yourself"
                    label="Short Bio"
                    fullWidth
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                />
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
                <TextField
                    placeholder="Add a link to drive traffic to your site"
                    label="Website"
                    fullWidth
                    value={website}
                    onChange={e => setWebsite(e.target.value)}
                />
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
                <TextField
                    fullWidth
                    label="Username"
                    helperText={`www.pinterest.com/${username}`}
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
            </Stack>

            <SettingsButtons
                disabled={disabled}
                setClear={setClear}
                change={change}
                
            />
            <button type="submit" onClick={HandelSave}>click</button>
        </Fragment >
        
    );
}

export default PublicProfile;