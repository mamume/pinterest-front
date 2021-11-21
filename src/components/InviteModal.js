import { Box, Avatar, Button, IconButton, Stack, TextField, Typography } from "@mui/material";
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 445,
    bgcolor: 'background.paper',
    borderRadius: "32px",
    boxShadow: 24,
    p: 4
};

function InviteModal() {
    return (
        <Box sx={style}>
            <Typography variant="h5" fontWeight="bold" textAlign="center" b>
                Invite Collaborators
            </Typography>
            <Typography variant="caption">
                Collaborators can...
            </Typography>

            <Stack mt={1} direction="row" justifyContent="space-between">
                <div>
                    <Typography fontWeight="bold" variant="h6">Do (almost) everything</Typography>
                    <Typography variant="subtitle2" color="text.secondary">Add, move or delete Pins and sections, comment and react</Typography>
                </div>

                <IconButton>
                    <ArrowForwardIosRoundedIcon />
                </IconButton>
            </Stack>

            <Stack mb mt direction="row" spacing justifyContent="space-between">
                <TextField value="https://pin.it/id" fullWidth sx={{ maxWidth: 300 }} />
                <Button color="grey">Copy Link</Button>
            </Stack>

            <TextField label="Search" placeholder="Search by name or email" fullWidth margin="dense" />
            {/* List of users */}
            <Stack mb mt direction="row" justifyContent="space-between">
                <div>
                    <Stack direction="row" justifyContent="space-between" spacing>
                        <Avatar alt="User Name" src="#" />
                        <Stack>
                            <Typography fontWeight="bold">User Name</Typography>
                            <Typography variant="caption" color="text.secondary">username</Typography>
                        </Stack>
                    </Stack>
                </div>
                <Button>Invite</Button>
            </Stack>
        </Box>
    );
}

export default InviteModal;