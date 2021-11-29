import { Avatar, Button, Modal, Stack, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import ModalStyles from '../ModalStyles'
import { UserContext } from "../../context";

const useStyles = makeStyles({
  link: {
    textDecoration: "inherit",
    color: "inherit",
    '&:hover': {
      textDecoration: "inherit",
    }
  },
})


function FollowersModal({ open, onClose, followersNum, username, handleFollow, handleUnfollow }) {
  const [followers, setFollowers] = useState([])
  const classes = useStyles()
  const { authedUser, setAuthedUser, headers } = useContext(UserContext)

  useEffect(() => {
    fetch(`http://localhost:8000/profile/followers?username=${username}`, { headers })
      .then(res => res.json())
      .then(data => {
        setFollowers([])
        for (let person of data) {
          setFollowers(prevFollowers => [...prevFollowers, person.follower[0]])
        }
      })
  }, [followersNum, headers, username])


  async function handleToFollow(e, id) {
    const status = await handleFollow(e, id)
    console.log(status)
    if (status === 201) {
      e.target.innerText = "Unfollow"
      e.target.className = e.target.className.replace('Primary', 'Black').replace('1vntq7r', 'uwuvhs')
      e.target.onclick = (e) => handleToUnfollow(e, id)
    }
    // updateAuthedUser()
  }

  async function handleToUnfollow(e, id) {
    const status = await handleUnfollow(e, id)
    console.log(status)
    if (status === 200) {
      console.log(e.target.onclick)
      e.target.innerText = "Follow"
      e.target.className = e.target.className.replace('Black', 'Primary').replace('uwuvhs', '1vntq7r')
      e.target.onclick = (e) => handleToFollow(e, id)
    }

    // updateAuthedUser()
  }

  // function updateAuthedUser() {
  //   fetch(`http://localhost:8000/account/details`, { headers })
  //     .then(res => res.json())
  //     .then(data => {
  //       if (data.username)
  //         setAuthedUser(data)
  //       else
  //         setAuthedUser(null)
  //     })
  // }

  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <Box sx={ModalStyles}>
        <Box sx={{ marginBottom: 3 }}>
          <Typography variant="h5" fontWeight="bold" textAlign="center">
            {followersNum} Followers
          </Typography>
        </Box>
        <Stack spacing={2}>
          {followers.map(follower => (
            <Stack justifyContent="space-between" alignItems="center" spacing={1} direction="row" key={follower.id}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <a className={classes.link} href={`/profile?username=${follower.username}`}>
                  <Avatar sx={{ width: 56, height: 56 }} src={follower.profile_pic}>{follower.username[0].toUpperCase()}</Avatar>
                </a>
                <a className={classes.link} href={`/profile?username=${follower.username}`}>
                  <Typography fontWeight="bold">{follower.full_name}</Typography>
                </a>
              </Stack>

              {/* {authedUser.username !== follower.username && (
                authedUser.following.filter(user => follower.username === user.followed_user).length === 1
                  ? <Button color="black" onClick={(e) => handleToUnfollow(e, follower.id)}>Unfollow</Button>
                  : <Button onClick={(e) => handleToFollow(e, follower.id)}>Follow</Button>
              )} */}
            </Stack>
          ))}
        </Stack>
      </Box>
    </Modal>
  );
}

export default FollowersModal;