import { Avatar, Button, Stack, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { Fragment, useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import ModalStyles from '../ModalStyles'
// import useStyles from "../LinkStyles";

const useStyles = makeStyles({
  link: {
    textDecoration: "inherit",
    color: "inherit",
    '&:hover': {
      textDecoration: "inherit",
    }
  },
})

function FollowersModal({ followersNum, username }) {
  const [followers, setFollowers] = useState([])
  const classes = useStyles()

  useEffect(() => {
    fetch(`http://localhost:8000/profile/followers?username=${username}`, {
      headers: {
        'content-type': "application/json",
        'Authorization': `bearer ${localStorage.getItem('pinterestAccessToken')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setFollowers([])
        for (let person of data) {
          setFollowers(prevFollowers => [...prevFollowers, person.follower[0]])
        }
      })
  }, [username])

  return (
    <Fragment>
      <Box sx={ModalStyles}>
        <Box sx={{ marginBottom: 3 }}>
          <Typography variant="h5" fontWeight="bold" textAlign="center">
            {followersNum} Followers
          </Typography>
        </Box>
        <Stack spacing={2}>
          {followers.map(follower => (
            <Stack justifyContent="space-between" alignItems="center" spacing={1} direction="row" key={follower.username}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <a className={classes.link} href={`/profile?username=${follower.username}`}>
                  <Avatar sx={{ width: 56, height: 56 }} src={follower.profile_pic}>{follower.username[0].toUpperCase()}</Avatar>
                </a>
                <a className={classes.link} href={`/profile?username=${follower.username}`}>
                  <Typography fontWeight="bold">{follower.full_name}</Typography>
                </a>
              </Stack>
              <Button>Follow</Button>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Fragment>
  );
}

export default FollowersModal;