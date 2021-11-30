import { Box, Button, FormControlLabel, Stack, TextField, Typography, Modal, Checkbox } from "@mui/material";
import { Fragment } from "react";
import ModalStyles from "../ModalStyles";

function CreateBoard({ openCreateBoard, onCloseCreateBoard }) {
  return (
    <Modal
      open={openCreateBoard}
      onClose={onCloseCreateBoard}
    >
      <Box sx={ModalStyles}>
        <Box sx={{ marginBottom: 5 }}>
          <Typography variant="h5" fontWeight="bold" textAlign="center">
            Create Board
          </Typography>
        </Box>

        {/* <Stack spacing={2}> */}
        <Stack spacing={3} marginY={1}>
          <TextField fullWidth label="Name" placeholder='Like "Places to Go" or "Recipes to Make"' />
          <FormControlLabel control={<Checkbox defaultChecked color="black" />} label={
            <Fragment>
              <Typography fontWeight="bold">Keep this board secret</Typography>
              <Typography color="text_secondary">So only you and collaborators can see it</Typography>
            </Fragment>
          } />
          <Button>Create</Button>
        </Stack>
        {/* </Stack> */}
      </Box>
    </Modal >
  );
}

export default CreateBoard;