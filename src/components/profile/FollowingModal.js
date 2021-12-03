import { Avatar, Modal, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context";
import Styles from "../../styles/Styles";


function FollowingModal({ username, open, onClose, followingNum }) {
  const [following, setFollowing] = useState([])
  const classes = Styles()
  const { headers, host } = useContext(UserContext)

  useEffect(() => {
    fetch(`${host}/profile/following?username=${username}`, { headers })
      .then(res => res.json())
      .then(data => {
        setFollowing([])
        for (let person of data) {
          setFollowing(prevFollowing => [...prevFollowing, person.following[0]])
        }
      })
  }, [username, followingNum, headers, host])

  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <Box className={classes.modal}>
        <Box sx={{ marginBottom: 3 }}>
          <Typography variant="h5" fontWeight="bold" textAlign="center">
            Following
          </Typography>
        </Box>
        <Stack spacing={2}>
          {following.map(following => (
            <Stack direction="row" alignItems="center" spacing={1} key={following.id}>
              <a className={classes.link} href={`/profile?username=${following.username}`}>
                <Avatar sx={{ width: 56, height: 56 }} src={following.profile_pic}>{following.username[0].toUpperCase()}</Avatar>
              </a>
              <a className={classes.link} href={`/profile?username=${following.username}`}>
                <Typography fontWeight="bold">{following.full_name}</Typography>
              </a>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Modal>
  );
}

export default FollowingModal;