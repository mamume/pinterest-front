import { Avatar, Button, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Fragment, useEffect, useState } from "react";
import ModalStyles from '../ModalStyles'

function FollowingModal({ username }) {
  const [following, setFollowing] = useState([])

  useEffect(() => {
    fetch(`http://localhost:8000/profile/following?username=${username}`, {
      headers: {
        'content-type': "application/json",
        'Authorization': `bearer ${localStorage.getItem('pinterestAccessToken')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setFollowing([])
        for (let person of data) {
          setFollowing(prevFollowing => [...prevFollowing, person.following[0]])
        }
      })
  }, [username])

  return (
    <Fragment>
      <Box sx={ModalStyles}>
        <Box sx={{ marginBottom: 3 }}>
          <Typography variant="h5" fontWeight="bold" textAlign="center">
            Following
          </Typography>
        </Box>
        <Stack spacing={2}>
          {following.map(following => (
            <Stack justifyContent="space-between" alignItems="center" spacing={1} direction="row" key={following.username}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Avatar sx={{ width: 56, height: 56 }} src={following.profile_pic}>{following.username[0].toUpperCase()}</Avatar>
                <Typography fontWeight="bold">{following.full_name}</Typography>
              </Stack>
              <Button>Follow</Button>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Fragment>
  );
}

export default FollowingModal;