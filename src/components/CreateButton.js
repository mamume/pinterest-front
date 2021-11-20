import { Button, Menu, MenuItem, Typography } from "@mui/material";
import { Fragment, useState } from "react";
import AddRoundedIcon from '@mui/icons-material/AddRounded';

function SortButton() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Fragment>
            <Button onClick={handleClick} disableElevation color="text"><AddRoundedIcon fontSize="large" /></Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                elevation
            >
                <Typography variant="caption" color="grey" mx>Create</Typography>
                <MenuItem selected onClick={handleClose}>Pin</MenuItem>
                <MenuItem onClick={handleClose}>Board</MenuItem>
            </Menu>
        </Fragment>
    );
}

export default SortButton;
