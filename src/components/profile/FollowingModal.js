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


function FollowingModal({ username, open, onClose, handleFollow, handleUnfollow }) {
  const [following, setFollowing] = useState([])
  const classes = useStyles()
  const { authedUser, setAuthedUser, headers } = useContext(UserContext)

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

  function handleToFollow(e, id) {
    handleFollow(e, id)
    // setUpdate(prev => !prev)
    e.target.innerText = "Unfollow"
    // console.log(e.target.className)
    e.target.className = e.target.className.replace('Primary', 'Black').replace('1vntq7r', 'uwuvhs')
    // console.log(e.target.className)
    // e.target.className = "MuiButton-root MuiButton-contained MuiButton-containedBlack MuiButton-sizeLarge MuiButton-containedSizeLarge MuiButtonBase-root  css-1vntq7r-MuiButtonBase-root-MuiButton-root"
  }

  function handleToUnfollow(e, id) {
    handleUnfollow(e, id)
    // setUpdate(prev => !prev)
    // e.target.className += "MuiButton-containedPrimary"
    e.target.innerText = "Follow"
    // console.log(e.target.className)
    e.target.className = e.target.className.replace('Black', 'Primary').replace('uwuvhs', '1vntq7r')
    // console.log(e.target.className)

    // updateAuthedUser()
  }

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
              {/* {authedUser.username !== following.username && (
                authedUser.following.filter(user => following.username === user.followed_user).length === 1
                  ? <Button color="black" onClick={(e) => handleToUnfollow(e, following.id)}>Unfollow</Button>
                  : <Button onClick={(e) => handleToFollow(e, following.id)}>Follow</Button>
              )} */}
            </Stack>
          ))}
        </Stack>
      </Box>
    </Modal>
  );
}

export default FollowingModal;