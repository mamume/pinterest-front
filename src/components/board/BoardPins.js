import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router";
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import Styles from '../../styles/Styles'
import { UserContext } from '../../context'
import { useContext, useState } from 'react';
import Masonry from 'react-masonry-component';
import { saveAs } from 'file-saver'
import DownloadIcon from '@mui/icons-material/Download';

function BoardPin({ pins, boardId, isAuthedBoard }) {
  const { headers, host } = useContext(UserContext)
  const classes = Styles()
  const navigate = useNavigate()

  const [boardPins, setBoardPins] = useState(pins)

  function openPin(id) {
    navigate(`/pin/${id}`)
  }

  function removeFromBoard(id) {
    const newPins = pins.filter(pin => pin.id !== id)
    const pinsIds = newPins.map(pin => pin.id)

    const data = {
      pins: pinsIds
    }

    fetch(`${host}/board/update/${boardId}/`, {
      headers,
      method: "PATCH",
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(setBoardPins(newPins))
  }

  const saveImage = (image, title) => {
    console.log(image)
    saveAs(image, `${title}.jpg`) // Put your image url here.
  }

  return (
    <Masonry className={classes.masonry}>
      {
        boardPins.map((pin, index) => (
          <ImageListItem key={index} sx={{ margin: 1 }}>
            <img
              className={classes.pin}
              src={`${pin.content_src}`}
              alt={pin.title}
              loading="lazy"
              onClick={() => openPin(pin.id)}
            />
            {isAuthedBoard &&
              <ImageListItemBar
                sx={{ bgcolor: "inherit", m: 1 }}
                position="top"
                actionIcon={
                  <IconButton disableRipple sx={{ bgcolor: "white" }} onClick={() => removeFromBoard(pin.id)} color="error"><RemoveCircleRoundedIcon /></IconButton>
                }
              />}
            <ImageListItemBar
              sx={{ bgcolor: "inherit", m: 1 }}
              position="bottom"
              actionIcon={
                <IconButton disableRipple sx={{ bgcolor: "white" }} onClick={() => saveImage(pin.content_src, pin.title)}>
                  <DownloadIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))
      }
    </Masonry>
  );
}

export default BoardPin;