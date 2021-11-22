import React, {Fragment} from 'react'
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

function AddButton() {
    return (
        <Fragment>
            <IconButton color="primary" aria-label="add to shopping cart" style={{
                position: "fixed",
                bottom: 90,
                right: 50,
                padding: "15px",
                color: "black",
                //border: "0.02px solid black",


                }} sx={{boxShadow: 3,}}>
                <AddIcon sx={{
                fontSize: 20,
                transform: "scale(2)"

                }}  />
            </IconButton>
            
        </Fragment>
    )
}

export default AddButton
