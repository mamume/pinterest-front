import { Button, Stack } from "@mui/material";

function SettingsButtons({ disabled, setClear, change }) {
    return (
        <Stack direction="row" spacing={2} justifyContent="center" mt={5} mb={5}>
            <Button color="text" disabled={disabled} onClick={() => setClear(true)}>
                Reset
            </Button>
            <Button disabled={!change}>Save</Button>
        </Stack>
    );
}

export default SettingsButtons;