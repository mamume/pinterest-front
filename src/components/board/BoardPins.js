import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router";
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import Box from '@mui/material/Box'
import Styles from '../../styles/Styles'

function BoardPin({ pins }) {
  const classes = Styles()
  const navigate = useNavigate()

  function openPin(id) {
    navigate(`/pin/${id}`)
  }

  function removeFromBoard() {
    console.log('remove')
  }

  return (
    <ImageList cols={4} variant="masonry">
      {pins.map((pin) => (
        <ImageListItem key={pin.img} >
          <img
            className={classes.pin}
            src={`${pin.content_src}`}
            alt={pin.title}
            loading="lazy"
            onClick={() => openPin(pin.id)}
          />
          <ImageListItemBar
            sx={{ bgcolor: "inherit", m: 1 }}
            position="top"
            actionIcon={
              <Box sx={{ bgcolor: "lightgray", borderRadius: "50%" }} onClick={removeFromBoard}>
                <IconButton color="error"><RemoveCircleRoundedIcon /></IconButton>
              </Box>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

export default BoardPin;