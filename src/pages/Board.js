import { Divider, Modal, Stack, Typography } from "@mui/material";
import { Fragment, useContext, useEffect, useState } from "react";
import Avatar from '@mui/material/Avatar';
import InviteModal from "../components/board/InviteModal";
import { UserContext } from "../context";
import SinglePin from "../components/pins/SinglePin";
import Masonry from 'react-masonry-component';


function Board() {
  const [boardId, setBoardId] = useState('')
  const [title, setTitle] = useState('')
  const [share, setShare] = useState(false)
  const [, setDescription] = useState('')
  const [pinItems, setPinItems] = useState([])
  const [coverImage, setCoverImage] = useState('')

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const { headers } = useContext(UserContext)

  useEffect(() => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    setBoardId(params.get('board_id'))
    fetch(`http://127.0.0.1:8000/board/list?board_id=${boardId}`, { headers })
      .then(res => res.json())
      .then(data => {
        setTitle(data[0].title)
        setShare(data[0].share)
        setDescription(data[0].description)
        setPinItems(data[0].pins)
        setCoverImage(data[0].cover_img)
      })
  }, [])

  return (
    <Fragment>
      <Stack direction="column" alignItems="center">
        <Avatar src={coverImage} sx={{ width: 120, height: 120 }} size='large' alt="Profile Image">
          <Typography variant="h2">{title.toUpperCase()}</Typography>
        </Avatar>
        {/* <Stack direction='row' alignItems="baseline" spacing> */}
        <Typography mt fontWeight="bold" variant="h4">{title}</Typography>
        {/* <MenuButton
            icon={<MoreHorizIcon />}
            options={["Edit Board", "Share", "Merge", "Archive"]}
            label="Board Options"
          /> */}
        {/* </Stack> */}

        {/* <Button onClick={handleOpen} color="text" disableElevation sx={{ margin: 0, padding: 0, borderRadius: "16px" }}>
          <Stack direction='row' alignItems="center">
            <AvatarGroup max={2}>
              <Avatar alt="Remy Sharp" src="#" />
              <Avatar alt="Travis Howard" src="#" />
              <Avatar alt="Cindy Baker" src="#" />
              <Avatar alt="Agnes Walker" src="#" />
              <Avatar alt="Trevor Henderson" src="#" />
            </AvatarGroup>
            <AddRoundedIcon fontSize="large" color="black" />
          </Stack>
        </Button> */}

        <Modal
          open={open}
          onClose={handleClose}
        >
          <InviteModal
            handleClose={handleClose}
          />
        </Modal>

        <Typography>{share ? "Public" : "Private"} Board</Typography>
        {/* <Stack direction="row" spacing mt mb>
          <Stack alignItems="center">
            <IconButton sx={boardBtn}>
              <FlareRoundedIcon fontSize="large" color="black" />
            </IconButton>
            <Typography variant="caption">More Ideas</Typography>
          </Stack>

          <Stack alignItems="center">
            <IconButton sx={boardBtn}>
              <AppRegistrationRoundedIcon fontSize="large" color="black" />
            </IconButton>
            <Typography variant="caption">Organize</Typography>
          </Stack>

          <Stack alignItems="center">
            <IconButton sx={boardBtn}>
              <NotesRoundedIcon fontSize="large" color="black" />
            </IconButton>
            <Typography variant="caption">Notes</Typography>
          </Stack>
        </Stack> */}
      </Stack>

      <Divider sx={{ marginY: 5 }} />

      {/* <Stack direction="row" justifyContent="space-between" mt={7}> */}
      <Typography fontWeight="bold">{pinItems.length} Pins</Typography>
      {/* <MenuButton
          icon={<MenuRoundedIcon fontSize="large" />}
          label="Sort boards by"
          options={["A to Z", "Drag and drop", "Last saved to"]}
        /> */}
      {/* </Stack> */}

      <Masonry style={{ width: "100%", paddingLeft: "80px" }}  >
        {pinItems.map((item, index) => (
          <SinglePin key={item.id} img={item.content_src} id={item.id} />
        ))}
      </Masonry>
    </Fragment >
  );
}

export default Board;