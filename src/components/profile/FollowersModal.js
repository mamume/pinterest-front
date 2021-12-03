import { Modal, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context";
import Styles from "../../styles/Styles";

// const useStyles = makeStyles({
//   link: {
//     textDecoration: "inherit",
//     color: "inherit",
//     '&:hover': {
//       textDecoration: "inherit",
//     }
//   },
// })


function FollowersModal({ open, onClose, followersNum, username, handleFollow, handleUnfollow }) {
  const [, setFollowers] = useState([])
  const { headers, host } = useContext(UserContext)
  const classes = Styles()

  useEffect(() => {
    fetch(`${host}/profile/followers?username=${username}`, { headers })
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        // setFollowers([])
        // console.log(data.map(user => user.follower[0].id))
        // let followersIds = data.map(user => user.follower[0].id)
        setFollowers(data.map(user => user.follower[0].id))
        // for (let person of data) {
        // setFollowers(prevFollowers => [...prevFollowers, person.follower[0]])
        // }
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
      <Box sx={classes.modal}>
        <Box sx={{ marginBottom: 3 }}>
          <Typography variant="h5" fontWeight="bold" textAlign="center">
            {followersNum} Followers
          </Typography>
        </Box>
        <Stack spacing={2}>
          {/* {followers.map(follower => (
            <Stack direction="row" alignItems="center" spacing={1} key={follower.id}>
              <a className={classes.link} href={`/profile?username=${follower.username}`}>
                <Avatar sx={{ width: 56, height: 56 }} src={follower.profile_pic}>{follower.username[0].toUpperCase()}</Avatar>
              </a>
              <a className={classes.link} href={`/profile?username=${follower.username}`}>
                <Typography fontWeight="bold">{follower.full_name}</Typography>
              </a>
            </Stack>
          ))} */}
        </Stack>
      </Box>
    </Modal>
  );
}

export default FollowersModal;