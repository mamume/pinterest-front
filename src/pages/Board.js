import { Button, IconButton, Modal, Stack, Typography } from "@mui/material";
import { Fragment, useState } from "react";
import MenuButton from '../components/MenuButton'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FlareRoundedIcon from '@mui/icons-material/FlareRounded';
import AppRegistrationRoundedIcon from '@mui/icons-material/AppRegistrationRounded';
import NotesRoundedIcon from '@mui/icons-material/NotesRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import InviteModal from "../components/InviteModal";

const boardBtn = {
    bgcolor: "#E2E2E2",
    width: "88px",
    height: "88px",
    borderRadius: "16px"
}

function Board() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Fragment>
            <Stack direction="column" alignItems="center">
                <Stack direction='row' alignItems="baseline" spacing>
                    <Typography mt fontWeight="bold" variant="h4">Board Name</Typography>
                    <MenuButton
                        icon={<MoreHorizIcon />}
                        options={["Edit Board", "Share", "Merge", "Archive"]}
                        label="Board Options"
                    />
                </Stack>

                <Button onClick={handleOpen} color="text" disableElevation sx={{ margin: 0, padding: 0, borderRadius: "16px" }}>
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
                </Button>

                <Modal
                    open={open}
                    onClose={handleClose}
                >
                    <InviteModal />
                </Modal>

                <Typography>[Board Privacy]</Typography>
                <Stack direction="row" spacing mt mb>
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
                </Stack>
            </Stack>

            <Stack direction="row" justifyContent="space-between" mt={7}>
                <Typography fontWeight="bold">[num]Pins</Typography>
                <MenuButton
                    icon={<MenuRoundedIcon fontSize="large" />}
                    label="Sort boards by"
                    options={["A to Z", "Drag and drop", "Last saved to"]}
                />
            </Stack>
        </Fragment >
    );
}

export default Board;