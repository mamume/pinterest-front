import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'; import Box from '@mui/material/Box'
import Styles from '../../styles/Styles'
import { UserContext } from '../../context'
import { useContext, useState } from 'react';
import Masonry from 'react-masonry-component';
import { saveAs } from 'file-saver'
import DownloadIcon from '@mui/icons-material/Download';

function ProfilePins({ pins, isAuthedProfile }) {
  const { headers, host } = useContext(UserContext)
  const classes = Styles()
  const navigate = useNavigate()

  const [pinItems, setPinItems] = useState(pins)

  function openPin(id) {
    navigate(`/pin/${id}`)
  }

  function removeFromPin(id) {
    const newPins = pinItems.filter(pin => pin.id !== id)

    fetch(`${host}/profile/pins-delete/${id}/`, {
      headers,
      method: "DELETE"
    })
      .then(res => res.json())
      .then(setPinItems(newPins))
  }

  const saveImage = (image, title) => {
    console.log(image)
    saveAs(image, `${title}.jpg`) // Put your image url here.
  }

  return (
    <Masonry className={classes.masonry}>
      {
        pinItems.map((pin, index) => (
          <ImageListItem key={index} sx={{ margin: 1 }}>
            <img
              className={classes.pin}
              src={`${pin.content_src}`}
              alt={pin.title}
              loading="lazy"
              onClick={() => openPin(pin.id)}
            />
            {isAuthedProfile &&
              <ImageListItemBar
                sx={{ bgcolor: "inherit", m: 1 }}
                position="top"
                actionIcon={
                  <IconButton disableRipple sx={{ bgcolor: "white" }} onClick={() => removeFromPin(pin.id)} color="error"><DeleteRoundedIcon /></IconButton>
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

export default ProfilePins;