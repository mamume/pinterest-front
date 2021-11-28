import { Avatar, Button, Modal, Stack, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { Fragment, useContext, useEffect, useReducer, useState } from "react";
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

// function useForceUpdate() {
//   const [value, setValue] = useState(0); // integer state
//   return () => setValue(value => value + 1); // update the state to force render
// }

function FollowersModal({ open, onClose, followersNum, username, handleFollow, handleUnfollow }) {
  const [followers, setFollowers] = useState([])
  const classes = useStyles()
  const { authedUser, setAuthedUser, headers } = useContext(UserContext)
  // const [, forceUpdate] = useReducer(x => x + 1, 0);
  const [update, setUpdate] = useState(true)

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
          console.log(person.follower[0])
          setFollowers(prevFollowers => [...prevFollowers, person.follower[0]])
          // let found = false
          // for (const user in authedUser.following) {
          //   if (user.followed_user === person.follower[0].username) {
          //     found = true
          //     setToUnfollow(prev => [...prev, person.follower[0]])
          //   }
          // }
          // if (!found) {
          //   setToFollow(prev => [...prev, person.follower[0]])
          // }
        }
      })
    // .then(() => {
    //   const toFollow = followers.filter(user => user.username !== authedUser.username)
    //   const toUnfollow = toFollow.filter(user => {
    //     for (const follower of authedUser.following)
    //       if (user.username === follower.username)
    //         return user
    //   })
    //   console.log(followers, toFollow, toUnfollow)
    // })
  }, [username, update])

  // useEffect(() => {
  //   for (const follower of followers)
  //     console.log(follower)
  // }, [followers])

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

              {authedUser.username !== follower.username && (
                authedUser.following.filter(user => follower.username === user.followed_user).length === 1
                  ? <Button color="black" onClick={(e) => handleToUnfollow(e, follower.id)}>Unfollow</Button>
                  : <Button onClick={(e) => handleToFollow(e, follower.id)}>Follow</Button>
              )}
            </Stack>
          ))}
        </Stack>
      </Box>
    </Modal>
  );
}

export default FollowersModal;