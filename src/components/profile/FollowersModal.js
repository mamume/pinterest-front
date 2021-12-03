import { Modal, Stack, Typography, Box, Avatar } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context";
import Styles from "../../styles/Styles";


function FollowersModal({ open, onClose, followersNum, username, handleFollow, handleUnfollow }) {
  const [followers, setFollowers] = useState([])
  const { headers, host } = useContext(UserContext)
  const classes = Styles()

  useEffect(() => {
    fetch(`${host}/profile/followers?username=${username}`, { headers })
      .then(res => res.json())
      .then(data => {
        setFollowers(data.map(user => ({
          id: user.follower[0].id,
          fullName: user.follower[0].full_name,
          profilePic: user.follower[0].profile_pic,
          username: user.follower[0].username,
        })))
      })
  }, [username, headers, host])


  // async function handleToFollow(e, id) {
  //   const status = await handleFollow(e, id)
  //   console.log(status)
  //   if (status === 201) {
  //     e.target.innerText = "Unfollow"
  //     e.target.className = e.target.className.replace('Primary', 'Black').replace('1vntq7r', 'uwuvhs')
  //     e.target.onclick = (e) => handleToUnfollow(e, id)
  //   }
  // }

  // async function handleToUnfollow(e, id) {
  //   const status = await handleUnfollow(e, id)
  //   console.log(status)
  //   if (status === 200) {
  //     console.log(e.target.onclick)
  //     e.target.innerText = "Follow"
  //     e.target.className = e.target.className.replace('Black', 'Primary').replace('uwuvhs', '1vntq7r')
  //     e.target.onclick = (e) => handleToFollow(e, id)
  //   }
  // }

  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <Box className={classes.modal}>
        <Box sx={{ marginBottom: 3 }}>
          <Typography variant="h5" fontWeight="bold" textAlign="center">
            {followersNum} Followers
          </Typography>
        </Box>
        <Stack spacing={2}>
          {followers.map(follower => (
            <Stack direction="row" alignItems="center" spacing={1} key={follower.id}>
              <a className={classes.link} href={`/profile?username=${follower.username}`}>
                <Avatar sx={{ width: 56, height: 56 }} src={follower.profilePic} />
              </a>
              <a className={classes.link} href={`/profile?username=${follower.username}`}>
                <Typography fontWeight="bold">{follower.fullName}</Typography>
              </a>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Modal>
  );
}

export default FollowersModal;