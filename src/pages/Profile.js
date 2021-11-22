import { Avatar, Button, Divider, Stack, Typography } from "@mui/material";
import React, { Fragment } from "react";
import MenuButton from '../components/settings/MenuButton'
import AddRounded from "@mui/icons-material/AddRounded";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { Link } from 'react-router-dom'
import { makeStyles } from "@mui/styles";


const useStyles = makeStyles({
  link: {
    textDecoration: "inherit",
    color: "inherit",
    '&:hover': {
      textDecoration: "inherit",
    }
  },
})

function Profile() {
  const classes = useStyles()

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
          <Link to="/settings" className={classes.link}>
            <Button disableElevation color="grey">Edit Profile</Button>
          </Link>
        </Stack>
      </Stack>

      <Stack direction="row" justifyContent="space-between" mt={7}>
        <MenuButton
          icon={<MenuRoundedIcon fontSize="large" />}
          label="Sort boards by"
          options={["A to Z", "Drag and drop", "Last saved to"]}
        />

        <MenuButton
          icon={<AddRounded fontSize="large" />}
          label="Create"
          options={["Pin", "Board"]}
        />
      </Stack>

      <Divider />
      <Stack direction='row' justifyContent="space-between" mt={3}>
        <Typography fontWeight="bold" variant="h6">Unorganized Ideas</Typography>
        <Button color="grey">Organize</Button>
      </Stack>
    </Fragment >
  );
}

export default Profile;