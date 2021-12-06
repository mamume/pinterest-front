import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Styles from '../../styles/Styles'
import { UserContext } from '../../context'
import { useContext, useState } from 'react';
import Masonry from 'react-masonry-component';
import { saveAs } from 'file-saver'
import DownloadIcon from '@mui/icons-material/Download';
import Pin from '../pins/pin';

function ProfilePins({ pins, isAuthedProfile }) {
  const { headers, host } = useContext(UserContext)
  const classes = Styles()

  const [pinItems, setPinItems] = useState(pins)
  const [openPin, setOpenPin] = useState(false)
  const [pinModalId, setPinModalId] = useState('')

  function openPinModal(id) {
    setPinModalId(id)
    setOpenPin(true)
  }
  function closePinModal() {
    setOpenPin(false)
    setPinModalId('')
  }

  function removeFromProfile(id) {
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
    saveAs(image, `${title}.jpg`)
  }

  return (
    <>
      <Masonry className={classes.masonry}>
        {
          pinItems.map((pin, index) => (
            <ImageListItem key={index} sx={{ margin: 1 }}>
              <img
                className={classes.pin}
                src={`${pin.content_src}`}
                alt={pin.title}
                loading="lazy"
                onClick={() => openPinModal(pin.id)}
              />
              {isAuthedProfile &&
                <ImageListItemBar
                  sx={{ bgcolor: "inherit", m: 1 }}
                  position="top"
                  actionIcon={
                    <IconButton disableRipple sx={{ bgcolor: "white" }} onClick={() => removeFromProfile(pin.id)} color="error"><DeleteRoundedIcon /></IconButton>
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
      </Masonry >
      <Pin open={openPin} onClose={closePinModal} id={pinModalId} removeItem={() => removeFromProfile(pinModalId)} />
    </>
  );
}

export default ProfilePins;