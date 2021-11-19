import { MenuItem, Button, InputLabel, Select, Stack, TextField, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { Fragment } from "react";

function AccountSettings() {
    return (
        <Fragment>
            <Typography variant="h5">Account Settings</Typography>
            <Typography variant="subtitle1" paragraph>Set your login preferences, help us personalize your experience and make big account changes here</Typography>

            <Typography variant="h6">Basic Information</Typography>

            <Stack direction="row" alignItems="center" spacing={2}>
                <TextField label="Email" fullWidth></TextField>
            </Stack>

            <FormControl fullWidth>
                <InputLabel id="country">Country/Region</InputLabel>
                <Select
                    labelId="country"
                    id="country-select"
                    label="Country/Region"
                    fullWidth
                >
                    <MenuItem value='eg'>Egypt</MenuItem>
                    <MenuItem value='us'>US</MenuItem>
                    <MenuItem value='ksa'>KSA</MenuItem>
                </Select>
            </FormControl>

            <FormControl>
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup row aria-label="gender" name="gender">
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                </RadioGroup>
            </FormControl>

            {/* TODO: Login Options */}

            <Typography variant="h6">Account Changes</Typography>
            <Typography sx={{ fontWeight: 'bold' }}>Delete Account</Typography>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                <Typography>Delete your account and account data</Typography>
                <Button color="text" variant="contained" component="span">
                    Delete Account
                </Button>
            </Stack>
        </Fragment >
    );
}

export default AccountSettings;