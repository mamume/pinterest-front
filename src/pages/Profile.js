import { Avatar, Button, Divider, Stack, Typography } from "@mui/material";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import NotFound from './NotFound'
import ShareButton from '../components/profile/ShareButton'
import FollowersModal from '../components/profile/FollowersModal'
import FollowingModal from '../components/profile/FollowingModal'
import { UserContext } from "../context";
import Masonry from 'react-masonry-component';
import SinglePin from '../components/pins/SinglePin'
import CreateBoard from '../components/profile/CreateBoard'
import CircularProgress from '@mui/material/CircularProgress';
import LinkStyles from "../styles/Styles";


function Profile() {
  const classes = LinkStyles()
  const { authedUser, headers, host } = useContext(UserContext)

  const [fullName, setFullName] = useState('')
  const [followingNum, setFollowingNum] = useState(0)
  const [followersNum, setFollwersNum] = useState(0)
  const [profilePic, setProfilePic] = useState('')
  const [userName, setUserName] = useState('')
  const [bioText, setBioText] = useState('')
  const [userId, setUserId] = useState('')
  const [notFound, setNotFound] = useState(false)
  const [followed, setFollowed] = useState(false)
  const [openFollowers, setOpenFollowers] = useState(false);
  const [openFollowing, setOpenFollowing] = useState(false);
  const [openCreateBoard, setOpenCreateBoard] = useState(false);
  const [pinItems, setPinItems] = useState([])
  const [boardItems, setBoardItems] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [isAuthedProfile, setIsAuthedProfile] = useState(false)

  const handleOpenFollowars = () => setOpenFollowers(true);
  const handleCloseFollowers = () => setOpenFollowers(false);
  const handleOpenFollowing = () => setOpenFollowing(true);
  const handleCloseFollowing = () => setOpenFollowing(false);
  const handleOpenCreateBoard = () => setOpenCreateBoard(true);
  const handleCloseCreateBoard = () => setOpenCreateBoard(false);

  const search = window.location.search;
  const params = new URLSearchParams(search);
  const usernameParam = params.get('username')
  const [url] = useState(
    usernameParam
      ? `${host}/profile/list?username=${usernameParam}`
      : `${host}/profile/list`
  )

  useEffect(() => {
    if (authedUser.following)
      for (const user of authedUser.following) {
        if (user.followed_user === userName)
          setFollowed(true)
      }
  }, [authedUser.following, userName])

  useEffect(() => {
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
          setUserName(username)
          setBioText(bio)
          setUserId(id)
          setPinItems(pins)
          setBoardItems(boards)
        }
      })
  }, [headers, url, followed])

  useEffect(() => {
    userName && userId && setLoaded(true)
  }, [userName, userId])

  useEffect(() => {
    userName === authedUser.username && setIsAuthedProfile(true)
  }, [authedUser.username, userName])

  async function handleFollow(e, id = userId) {
    let statusCode

    await fetch(`${host}/account/${id}/follow`, { headers })
      .then(res => res.status)
      .then((status) => statusCode = status)

    if (statusCode === 201)
      setFollowed(true)

    return statusCode
  }

  async function handleUnfollow(e, id = userId) {
    let statusCode

    await fetch(`${host}/account/${id}/unfollow`, { headers })
      .then(res => res.status)
      .then(status => statusCode = status)

    if (statusCode === 200)
      setFollowed(false)
    return statusCode
  }


  return (
    <Fragment>
      {
        notFound
          ? <NotFound statusCode="400" message="User Not Found" />
          : loaded
            ? (
              <Fragment>
                <Stack direction="column" alignItems="center">
                  <Avatar src={profilePic} sx={{ width: 120, height: 120 }} size='large' alt="Profile Image" />

                  <Typography mt fontWeight="bold" variant="h4">{fullName}</Typography>
                  <Typography>@{userName}</Typography>
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
                    followersNum={followersNum}
                    username={userName}
                    handleFollow={handleFollow}
                    handleUnfollow={handleUnfollow}
                    open={openFollowers}
                    onClose={handleCloseFollowers}
                  />

                  <FollowingModal
                    username={userName}
                    handleFollow={handleFollow}
                    handleUnfollow={handleUnfollow}
                    open={openFollowing}
                    onClose={handleCloseFollowing}
                  />

                  <Stack direction="row" spacing={1} mt>
                    <ShareButton />
                    {isAuthedProfile
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
                  {isAuthedProfile && <Button color="grey" onClick={handleOpenCreateBoard}>Create Board</Button>}
                </Stack>

                <CreateBoard
                  openCreateBoard={openCreateBoard}
                  closeCreateBoard={handleCloseCreateBoard}
                />

                {Boolean(boardItems.length)
                  ? <Fragment>
                    <Masonry style={{ width: "100%", paddingLeft: "80px" }}  >
                      {boardItems.map((item) => (
                        <SinglePin url={`/board?board_id=${item.id}`} key={item.id} img={item.cover_img || '/images/board_placeholder.png'} id={item.id} />
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
                      {pinItems.map((item) => (
                        <SinglePin key={item.id} img={item.content_src} id={item.id} />
                      ))}
                    </Masonry>
                  </Fragment>
                  : <Typography textAlign="center" mb={3}>There are no pins</Typography>}
              </Fragment>
            )
            : <Stack direction="row" justifyContent="center" mt={10}><CircularProgress /></Stack>
      }
    </Fragment>
  );
}

export default Profile;