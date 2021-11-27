import { Avatar, Button, Divider, Stack, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import MenuButton from '../components/settings/MenuButton'
import AddRounded from "@mui/icons-material/AddRounded";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { Link } from 'react-router-dom'
import { makeStyles } from "@mui/styles";
import HomePage from "./Homepage"
import { useLocation } from 'react-router-dom'


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
  const [fullName, setFullName] = useState('')
  const [followingNum, setFollowingNum] = useState(0)
  const [profilePic, setProfilePic] = useState('')
  const [username, setUsername] = useState('')
  const location = useLocation()


  useEffect(() => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    if (params.get('username')) {
      fetch(`http://127.0.0.1:8000/account/${params.get('username')}/details`, {
        headers: {
          'content-type': "application/json",
          'Authorization': `jwt ${localStorage.getItem('pinterestToken')}`
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          const { first_name, last_name, username, profile_pic, following } = data
          setFullName(`${first_name} ${last_name}`)
          setFollowingNum(following.length)
          setProfilePic(profile_pic)
          setUsername(username)
        })
        .catch(console.log("Error"))
    }
    else {
      fetch(`http://127.0.0.1:8000/account/details`, {
        headers: {
          'content-type': "application/json",
          'Authorization': `jwt ${localStorage.getItem('pinterestToken')}`
        }
      })
        .then(res => res.json())
        .then(data => {
          const { first_name, last_name, username, profile_pic, following } = data
          setFullName(`${first_name} ${last_name}`)
          setFollowingNum(following.length)
          setProfilePic(profile_pic)
          setUsername(username)
        })
    }
  }, [])

  return (
    <Fragment>
      <Stack direction="column" alignItems="center">
        <Avatar src={profilePic} sx={{ width: 120, height: 120 }} size='large' alt="Profile Image">
          <Typography variant="h2">M</Typography>
        </Avatar>

        <Typography mt fontWeight="bold" variant="h4">{fullName}</Typography>
        <Typography>@{username}</Typography>
        <Typography>{followingNum} following</Typography>

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

      <HomePage />
    </Fragment>
  );
}

export default Profile;