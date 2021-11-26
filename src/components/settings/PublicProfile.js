import { Avatar, Button, InputLabel, Stack, TextField, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { Fragment, useEffect, useState } from "react";
import SettingsButtons from "./SettingsButtons";

const Input = styled('input')({
    display: 'none',
});

function PublicProfile() {
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [bio, setBio] = useState('')
    const [website, setWebsite] = useState('')
    const [username, setUsername] = useState('')
    const [profilePic, setProfilePic] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [clear, setClear] = useState(false)


    useEffect(() => {
        (fname || lname || bio || website || username || profilePic)
            ? setDisabled(false)
            : setDisabled(true)
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
            />
        </Fragment >
    );
}

export default PublicProfile;