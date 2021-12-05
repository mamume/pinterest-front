import { Fragment, useEffect, useState } from "react";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Styles from "../../styles/Styles";
import { useNavigate } from "react-router";

function BoardThumbnail({ board }) {
  const classes = Styles()
  const [pins, setPins] = useState(board.pins.slice(0, 3))
  const navigate = useNavigate()

  useEffect(() => {
    if (board.pins.length === 0)
      setPins({ content_src: "/images/board_placeholder.png" })
  }, [board.pins.length])

  function openBoard() {
    navigate(`/board?board_id=${board.id}`)
  }

  return (
    <Fragment>
      <ImageList
        className={classes.boardThumbnail}
        variant="quilted"
        cols={3}
        onClick={openBoard}
      >
        {pins.map((pin, index) => (
          <ImageListItem key={index}>
            <img
              src={pin.content_src}
              alt={pin.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Fragment>
  );
}

export default BoardThumbnail;