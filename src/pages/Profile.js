import { Avatar, Button, Divider, Stack, Typography } from "@mui/material";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { makeStyles } from "@mui/styles";
import NotFound from './NotFound'
import ShareButton from '../components/profile/ShareButton'
import FollowersModal from '../components/profile/FollowersModal'
import FollowingModal from '../components/profile/FollowingModal'
import { UserContext } from "../context";
import Masonry from 'react-masonry-component';
import SinglePin from '../components/pins/SinglePin'
import CreateBoard from '../components/profile/CreateBoard'


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
  const [userId, setUserId] = useState('')
  const [notFound, setNotFound] = useState(false)
  const [followed, setFollowed] = useState(false)
  const [openFollowers, setOpenFollowers] = useState(false);
  const handleOpenFollowars = () => setOpenFollowers(true);
  const handleCloseFollowers = () => setOpenFollowers(false);
  const [openFollowing, setOpenFollowing] = useState(false);
  const handleOpenFollowing = () => setOpenFollowing(true);
  const handleCloseFollowing = () => setOpenFollowing(false);
  const [openCreateBoard, setOpenCreateBoard] = useState(false);
  const handleOpenCreateBoard = () => setOpenCreateBoard(true);
  const handleCloseCreateBoard = () => setOpenCreateBoard(false);
  const [pinItems, setPinItems] = useState([])
  const [boardItems, setBoardItems] = useState([])
  const { authedUser, headers } = useContext(UserContext)

  useEffect(() => {
    if (authedUser.following)
      for (const user of authedUser.following) {
        if (user.followed_user === username)
          setFollowed(true)
      }
  }, [authedUser, username])

  useEffect(() => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const url = params.get('username') ? `http://localhost:8000/profile/list?username=${params.get('username')}` : 'http://localhost:8000/profile/list'

    fetch(url, { headers })
      .then(res => res.json())
      .then(data => {
        if (!data.length)
          setNotFound(true)
        else {
          const { id, full_name, username, profile_pic, following_count, followers_count, bio, pins, boards } = data[0]
          setFullName(full_name)
          setFollowingNum(following_count)
          setFollwersNum(followers_count)
          setProfilePic(profile_pic)
          setUsername(username)
          setBioText(bio)
          setUserId(id)
          setPinItems(pins)
          setBoardItems(boards)
        }
      })
  }, [headers, followed])

  async function handleFollow(e, id = userId) {
    let statusCode

    await fetch(`http://localhost:8000/account/${id}/follow`, { headers })
      .then(res => res.status)
      .then((status) => statusCode = status)

    if (statusCode === 201)
      setFollowed(true)
    console.log(statusCode)

    return statusCode
  }

  async function handleUnfollow(e, id = userId) {
    let statusCode

    await fetch(`http://localhost:8000/account/${id}/unfollow`, { headers })
      .then(res => res.status)
      .then(status => statusCode = status)

    if (statusCode === 200)
      setFollowed(false)
    console.log(statusCode)
    return statusCode
  }


  return (
    <Fragment>
      {
        notFound
          ? <NotFound statusCode="400" message="User Not Found" />
          : <Fragment>
            <Stack direction="column" alignItems="center">
              <Avatar src={profilePic} sx={{ width: 120, height: 120 }} size='large' alt="Profile Image">
                {/* <Typography variant="h2">{fullName[0].toUpperCase()}</Typography> */}
              </Avatar>

              <Typography mt fontWeight="bold" variant="h4">{fullName}</Typography>
              <Typography>@{username}</Typography>
              <Typography textAlign="center" sx={{ maxWidth: "640px" }}>{bioText}</Typography>
              <Typography fontWeight="bold">
                <Button disabled={!followersNum} disableRipple variant="text" onClick={handleOpenFollowars} color="black">
                  {followersNum} followers
                </Button>
                ·
                <Button disabled={!followingNum} disableRipple variant="text" onClick={handleOpenFollowing} color="black">
                  {followingNum} following
                </Button>
              </Typography>

              <FollowersModal
                handleClose={handleCloseFollowers}
                followersNum={followersNum}
                username={username}
                handleFollow={handleFollow}
                handleUnfollow={handleUnfollow}
                open={openFollowers}
                onClose={handleCloseFollowers}
              />

              <FollowingModal
                handleClose={handleCloseFollowing}
                followingNum={followingNum}
                username={username}
                handleFollow={handleFollow}
                handleUnfollow={handleUnfollow}
                open={openFollowing}
                onClose={handleCloseFollowing}
              />

              <Stack direction="row" spacing={1} mt>
                <ShareButton />
                {authedUser.username === username
                  ? (<Link to="/settings" className={classes.link}>
                    <Button color="grey">Edit Profile</Button>
                  </Link>)
                  : <Fragment>
                    {followed
                      ? <Button color="black" onClick={handleUnfollow}>Unfollow</Button>
                      : <Button onClick={handleFollow}>Follow</Button>
                    }</Fragment>
                }
              </Stack>
            </Stack>

            {/* <Stack direction="row" justifyContent="space-between" mt={7}>
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
            </Stack> */}

            <Divider sx={{ marginY: 5 }} />
            <Stack direction='row' justifyContent="space-between" mt={3}>
              <Typography fontWeight="bold" variant="h6">Boards</Typography>
              <Button color="grey">Create Board</Button>
            </Stack>

            <CreateBoard
              openCreateBoard={handleOpenCreateBoard}
              onCloseCreateBoard={handleCloseCreateBoard}
            />

            {Boolean(boardItems.length)
              ? <Fragment>
                <Masonry style={{ width: "100%", paddingLeft: "80px" }}  >
                  {boardItems.map((item) => (
                    <SinglePin url={`/board?board_id=${item.id}`} key={item.id} img={item.cover_img} id={item.id} />
                  ))}
                </Masonry>
              </Fragment>
              : <Typography textAlign="center">There are no Boards</Typography>
            }

            <Divider sx={{ marginY: 5 }} />
            {/* <Stack direction='row' justifyContent="space-between" mt={3}> */}
            <Typography fontWeight="bold" variant="h6">Pins</Typography>
            {/* <Button color="grey">Organize</Button> */}
            {/* </Stack> */}

            {Boolean(pinItems.length)
              ? <Fragment>
                <Masonry style={{ width: "100%", paddingLeft: "80px" }}  >
                  {pinItems.map((item, index) => (
                    <SinglePin key={item.id} img={item.content_src} id={item.id} />
                  ))}
                </Masonry>
              </Fragment>
              : <Typography textAlign="center" mb={3}>There are no pins</Typography>}
          </Fragment>
      }
    </Fragment>
  );
}

export default Profile;