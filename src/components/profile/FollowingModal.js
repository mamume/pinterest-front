import { Avatar, Button, Modal, Stack, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import ModalStyles from '../ModalStyles'

const useStyles = makeStyles({
  link: {
    textDecoration: "inherit",
    color: "inherit",
    '&:hover': {
      textDecoration: "inherit",
    }
  },
})


function FollowingModal({ username, open, onClose }) {
  const [following, setFollowing] = useState([])
  const classes = useStyles()

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
    <Modal
      open={open}
      onClose={onClose}
    >
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
                <a className={classes.link} href={`/profile?username=${following.username}`}>
                  <Avatar sx={{ width: 56, height: 56 }} src={following.profile_pic}>{following.username[0].toUpperCase()}</Avatar>
                </a>
                <a className={classes.link} href={`/profile?username=${following.username}`}>
                  <Typography fontWeight="bold">{following.full_name}</Typography>
                </a>
              </Stack>
              <Button>Follow</Button>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Modal>
  );
}

export default FollowingModal;