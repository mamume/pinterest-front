import { Avatar, Button, Divider, Modal, Stack, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import MenuButton from '../components/settings/MenuButton'
import AddRounded from "@mui/icons-material/AddRounded";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { Link } from 'react-router-dom'
import { makeStyles } from "@mui/styles";
import HomePage from "./Homepage"
import NotFound from './NotFound'
import ShareButton from '../components/profile/ShareButton'
import FollowersModal from '../components/profile/FollowersModal'

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
  const [followersNum, setFollwersNum] = useState(0)
  const [profilePic, setProfilePic] = useState('')
  const [username, setUsername] = useState('')
  const [bioText, setBioText] = useState('')
  const [notFound, setNotFound] = useState(false)
  const [openFollowers, setOpenFollowers] = useState(false);
  const handleOpenFollowars = () => setOpenFollowers(true);
  const handleCloseFollowers = () => setOpenFollowers(false);

  function fetchData(url) {
    fetch(url, {
      headers: {
        'content-type': "application/json",
        'Authorization': `bearer ${localStorage.getItem('pinterestAccessToken')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (!data.length)
          setNotFound(true)
        else {
          const { full_name, username, profile_pic, following_count, followers_count, bio } = data[0]
          setFullName(full_name)
          setFollowingNum(following_count)
          setFollwersNum(followers_count)
          setProfilePic(profile_pic)
          setUsername(username)
          setBioText(bio)
        }
      })
  }

  useEffect(() => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    if (params.get('username'))
      fetchData(`http://localhost:8000/profile/list?username=${params.get('username')}`)
    else
      fetchData('http://localhost:8000/profile/list')
  }, [])

  return (
    <Fragment>
      {
        notFound
          ? <NotFound statusCode="400" message="User Not Found" />
          : <Fragment>
            <Stack direction="column" alignItems="center">
              <Avatar src={profilePic} sx={{ width: 120, height: 120 }} size='large' alt="Profile Image">
                <Typography variant="h2">M</Typography>
              </Avatar>

              <Typography mt fontWeight="bold" variant="h4">{fullName}</Typography>
              <Typography>@{username}</Typography>
              <Typography textAlign="center" sx={{ maxWidth: "640px" }}>{bioText}</Typography>
              <Typography fontWeight="bold">
                <Button disableRipple variant="text" onClick={handleOpenFollowars} color="black">
                  {followersNum} followers
                </Button>
                ·
                <Button disableRipple variant="text" onClick={handleOpenFollowars} color="black">
                  {followingNum} following
                </Button>
              </Typography>

              <Modal
                open={openFollowers}
                onClose={handleCloseFollowers}
              >
                <FollowersModal
                  handleClose={handleCloseFollowers}
                  followersNum={followersNum}
                  username={username}
                />
              </Modal>

              <Stack direction="row" spacing={1} mt>
                <ShareButton />
                <Link to="/settings" className={classes.link}>
                  <Button color="grey">Edit Profile</Button>
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
      }
    </Fragment>
  );
}

export default Profile;