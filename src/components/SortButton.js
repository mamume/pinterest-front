import { Button, Menu, MenuItem, Typography } from "@mui/material";
import { Fragment, useState } from "react";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

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
            <Button onClick={handleClick} disableElevation color="text"><MenuRoundedIcon fontSize="large" /></Button>

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
                <Typography variant="caption" color="grey" mx>Sort boards by</Typography>
                <MenuItem selected onClick={handleClose}>A to Z</MenuItem>
                <MenuItem onClick={handleClose}>Drag and drop</MenuItem>
                <MenuItem onClick={handleClose}>Last saved to</MenuItem>

            </Menu>
        </Fragment>
    );
}

export default SortButton;
