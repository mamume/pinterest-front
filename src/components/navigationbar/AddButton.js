import React, {Fragment} from 'react'
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import {Link} from "react-router-dom";

function AddButton() {
    return (
        <Fragment>
            <Link to="/create_pin">
                <IconButton color="primary" aria-label="add to shopping cart" style={{
                    position: "absolute",
                    bottom: "90px",
                    right: "50px",
                    padding: "15px",
                    color: "black",
                    zIndex: 10000
                    //border: "0.02px solid black",


                    }} sx={{boxShadow: 3,}}>
                    <AddIcon sx={{
                    fontSize: 20,
                    transform: "scale(2)"

                    }}  />
                </IconButton>

            </Link>
            
        </Fragment>
    )
}

export default AddButton
