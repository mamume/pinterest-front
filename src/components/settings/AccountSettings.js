import { MenuItem, Button, InputLabel, Select, Stack, TextField, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import SettingsButtons from "./SettingsButtons";

function AccountSettings() {
    const [clear, setClear] = useState(false)
    const [change, setChange] = useState(true)
    const [disabled, setDisabled] = useState(true)
    const [email, setEmail] = useState('')
    const [country, setCountry] = useState('')
    const [gender, setGender] = useState('male')

    useEffect(() => {
        if (email || country || gender)
            setDisabled(false)
        else
            setDisabled(true)
    }, [email, country, gender])

    useEffect(() => {
        if (clear) {
            setEmail('')
            setCountry('')
            setGender('')

            setClear(false)
        }
    }, [clear])

    return (
        <Fragment>
            <Typography variant="h5">Account Settings</Typography>
            <Typography variant="subtitle1" paragraph>Set your login preferences, help us personalize your experience and make big account changes here</Typography>

            <Typography variant="h6">Basic Information</Typography>

            <Stack direction="row" alignItems="center" spacing={2}>
                <TextField label="Email" fullWidth value={email} onChange={e => setEmail(e.target.value)} />
            </Stack>

            <FormControl fullWidth>
                <InputLabel id="country">Country/Region</InputLabel>
                <Select
                    labelId="country"
                    id="country-select"
                    label="Country/Region"
                    fullWidth
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                >
                    <MenuItem value='eg'>Egypt</MenuItem>
                    <MenuItem value='us'>US</MenuItem>
                    <MenuItem value='ksa'>KSA</MenuItem>
                </Select>
            </FormControl>

            <FormControl>
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup row aria-label="gender" name="gender" value={gender} onChange={e => setGender(e.target.value)}>
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                </RadioGroup>
            </FormControl>

            {/* TODO: Login Options */}

            <Typography variant="h6">Account Changes</Typography>
            <Typography sx={{ fontWeight: 'bold' }}>Delete Account</Typography>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                <Typography>Delete your account and account data</Typography>
                <Button color="error" variant="contained" component="span">
                    Delete Account
                </Button>
            </Stack>

            <SettingsButtons
                disabled={disabled}
                setClear={setClear}
                change={change}
            />
        </Fragment >
    );
}

export default AccountSettings;