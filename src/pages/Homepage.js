import { Fragment } from "react";
import React, { useState, useEffect, useContext } from "react";
import SinglePin from '../components/pins/SinglePin'
import Masonry from 'react-masonry-component';
import AddButton from "../components/navigationbar/AddButton"
import { UserContext } from "../context";
import CircularProgress from '@mui/material/CircularProgress';
import { Stack } from "@mui/material";
import Styles from '../styles/Styles'


function Homepage({pins , boards, addItem, removeItem}) {
  const classes = Styles()
  const [loaded, setLoaded] = useState(false)
  const { authedUser, headers, host } = useContext(UserContext)

 

  useEffect(() => {
    pins.length /*&& boards.length*/
      ? setLoaded(true)
      : setLoaded(false)
  }, [pins.length, boards.length])

  return (
    <Fragment>
      {loaded
        ? authedUser
          ? (
            <Fragment>
              <AddButton addItem={addItem} />
              <Masonry className={classes.masonry}  >
                
                {pins.map((pin) => (
                  <SinglePin key={pin.id} img={pin.content_src} external_link={pin.external_website} id={pin.id} boards={boards || []} sub_board={pin.board || []} removeItem={removeItem} />
                ))}
              </Masonry>
            </Fragment>
          )
          : <div>Please Login</div>
        : <Stack direction="row" justifyContent="center" mt={10}><CircularProgress /></Stack>
      }
    </Fragment >
  );
}

export default Homepage;