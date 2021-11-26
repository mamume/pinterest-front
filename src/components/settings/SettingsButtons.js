import { Button, Stack } from "@mui/material";

function SettingsButtons({ disabled, setClear }) {
    return (
        <Stack direction="row" spacing={2} justifyContent="center" mt={5} mb={5}>
            <Button disabled={disabled} onClick={() => setClear(true)}>
                Reset
            </Button>
            <Button color="primary" disabled>Save</Button>
        </Stack>
    );
}

export default SettingsButtons;