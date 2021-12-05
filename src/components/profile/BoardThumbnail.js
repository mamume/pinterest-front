import { Fragment, useEffect, useState } from "react";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Styles from "../../styles/Styles";

function BoardThumbnail({ board }) {
  const classes = Styles()
  const [pins, setPins] = useState(board.pins.slice(0, 3))

  useEffect(() => {
    if (board.pins.length === 0)
      setPins({ content_src: "/images/board_placeholder.png" })
  }, [board.pins.length])

  return (
    <Fragment>
      <ImageList
        className={classes.boardThumbnail}
        variant="quilted"
        cols={3}
      >
        {pins.map((item, index) => (
          <ImageListItem key={index}>
            <img
              src={item.content_src}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Fragment>
  );
}

export default BoardThumbnail;