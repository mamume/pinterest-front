import { MenuItem, Button, InputLabel, Select, Stack, TextField, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { Fragment } from "react";
import { FormGroup, Checkbox } from '@mui/material';

function PrivacyAndData() {
    return (
        <Fragment>
            <Typography variant="h5">Privacy And Data</Typography>
            <Typography variant="subtitle1" paragraph>Decide whether your Pinterest profile will be hidden from search engines, and what kinds of data you want us to use to improve the recommendations and ads you see.</Typography>

            <Typography variant="h6">@Mentions</Typography>

            <FormControl component="fieldset">
                <FormLabel component="legend">Choose who can @mention you</FormLabel>
                <RadioGroup
                aria-label="mentions"
                defaultValue="anyone"
                name="radio-buttons-group"
                >
                    <FormControlLabel className="settings_checkbox" value="anyone" control={<Radio />} label="Anyone on Pinterest" />
                    <FormControlLabel className="settings_checkbox" value="followers" control={<Radio />} label="Only people you follow" />
                    <FormControlLabel className="settings_checkbox" value="none" control={<Radio />} label="Turn off - no one can @mention you" />
                </RadioGroup>
            </FormControl>


            <Typography variant="h6">Search Privacy</Typography>
            <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked color="default" />} label="Hide your profile from search engines (Ex. Google)." />
            </FormGroup>

            {/* TODO: Login Options */}

            <Typography variant="h6">Personalization</Typography>
            <FormGroup sx={{}}>
                <FormControlLabel className="settings_checkbox" control={<Checkbox defaultChecked color="default" />} label="Use sites you visit to improve which recommendations and ads you see." />
                <FormControlLabel className="settings_checkbox" control={<Checkbox defaultChecked color="default" />} label="Use information from our partners to improve which recommendations and ads you see." />
                <FormControlLabel className="settings_checkbox" control={<Checkbox defaultChecked color="default" />} label="Use your activity to improve the ads you see about Pinterest on other sites or apps you may visit." />
                <FormControlLabel className="settings_checkbox" control={<Checkbox defaultChecked color="default" />} label="Share activity for ads performance reporting." />
                <FormControlLabel className="settings_checkbox" control={<Checkbox defaultChecked color="default" />} label="Autoplay videos on desktop." />
            </FormGroup>
            <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
                <Button color="text" variant="contained" component="span">
                    Reset
                </Button>
                <Button color="error" variant="contained" component="span">
                    Save
                </Button>
            </Stack>
        </Fragment >
    );
}

export default PrivacyAndData;