import { Avatar, Button, Stack, Typography } from "@mui/material";
import React, { Fragment } from "react";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import SortButton from '../components/SortButton'
import CreateButton from '../components/CreateButton'


function Profile() {
    return (
        <Fragment>
            <Stack direction="column" alignItems="center">
                <Avatar sx={{ width: 120, height: 120 }} size='large' alt="Profile Image">
                    <Typography variant="h2">M</Typography>
                </Avatar>

                <Typography mt fontWeight="bold" variant="h4">Mahmoud Metwally</Typography>
                <Typography>@username</Typography>
                <Typography>[numOfFollowing] following</Typography>

                <Stack direction="row" spacing={1} mt>
                    <Button disableElevation color="grey">Share</Button>
                    <Button disableElevation color="grey">Edit Profile</Button>
                </Stack>
            </Stack>

            <Stack direction="row" justifyContent="space-between" mt={7}>
                <SortButton />
                {/* <Button disableElevation color="text"><AddRoundedIcon fontSize="large" /></Button> */}
                <CreateButton />
            </Stack>
        </Fragment >
    );
}

export default Profile;