import { Avatar, Button, InputLabel, Stack, TextField, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { Fragment } from "react";

const Input = styled('input')({
    display: 'none',
});

function PublicProfile() {
    return (
        <Fragment>
            <Typography variant="h5">Public Profile</Typography>
            <Typography variant="subtitle1" paragraph>People visiting your profile will see following info</Typography>
            <InputLabel>Photo</InputLabel>

            <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ width: 75, height: 75 }}>
                    <Typography variant="h4">M</Typography>
                </Avatar>
                <label htmlFor="contained-button-file">
                    <Input accept="image/*" id="contained-button-file" multiple type="file" />
                    <Button disableElevation color="grey" variant="contained" component="span">
                        Change
                    </Button>
                </label>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={2}>
                <TextField label="First Name" fullWidth></TextField>
                <TextField label="Last Name" fullWidth></TextField>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={2}>
                <TextField placeholder="Describe Yourself" label="Short Bio" fullWidth></TextField>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
                <TextField placeholder="Add a link to drive traffic to your site" label="Website" fullWidth></TextField>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
                <TextField fullWidth label="Username" helperText="www.pinterest.com/username"></TextField>
            </Stack>
        </Fragment>
    );
}

export default PublicProfile;