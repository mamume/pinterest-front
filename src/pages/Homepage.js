import { Fragment } from "react";
import React, { useState, useEffect, useContext } from "react";
import SinglePin from '../components/pins/SinglePin'
import Masonry from 'react-masonry-component';
import AddButton from "../components/navigationbar/AddButton"
import { UserContext } from "../context";
import CircularProgress from '@mui/material/CircularProgress';
import { Stack } from "@mui/material";
import Styles from '../styles/Styles'


function Homepage() {
  const classes = Styles()

  const [pins, setPins] = useState([])
  const [loaded, setLoaded] = useState(false)
  const { authedUser, headers, host } = useContext(UserContext)
  const [boards, setBoards] = useState([])

  const removeItem = (id) => {
    let idx;
    setPins(pins => pins.filter( item => item.id !== id))
    // for (let i =0 ; i < pins.length; i++){
    //   if( pins[i].id == id){
    //     idx = i;
    //   }
    // }
    // if(idx){

    //   setPins(pins => pins.splice(idx, 1))
    // }
  } 

  const addItem = (item) =>{
    setPins( pins => [...pins, item])

  }
  // const [updatePins, setUpdatePins] = useState(false)

  // useEffect(() => {
  //   if (authedUser.id) {
  //     Promise.all([fetch(`${host}/pin/pins/`, { headers }), fetch(`${host}/board/list?owner_id=${authedUser.id}`, { headers })])
  //       .then(async ([pins, boardsData]) => {
  //         pins = await pins.json()
  //         boardsData = await boardsData.json()

  //         for (let i = 0; i < pins.length; i++) {
  //           setItemData(itemData =>
  //             [...itemData, { img: pins[i].content_src, external_link: pins[i].external_website, id: pins[i].id, sub_board: pins[i].board }]
  //           )
  //         }

  //         setBoards(boards => [...boards, ...boardsData])
  //       })
  //   }
  // }, [authedUser.id, headers, host])

  // useEffect(() => {
  //   if (authedUser.id) {
  //     Promise.all([
  //       fetch(`${host}/pin/pins/`, { headers }).then(res => res.json()),
  //       fetch(`${host}/board/list?owner_id=${authedUser.id}`, { headers }).then(res => res.json())
  //     ])
  //       .then(dataArr => {
  //         console.log(dataArr)
  //         const [pins, boards] = dataArr
  //         setPins(pins)
  //         setBoards(boards)
  //       })
  //   }
  // }, [authedUser.id, host, headers])

  useEffect(() => {
    // console.log(updatePins)
    if (authedUser)
      fetch(`${host}/pin/pins/`, { headers })
        .then(res => res.json())
        .then(data => {
          setPins(data)
          console.log(data)
        })
  }, [authedUser, host, headers, pins])

  useEffect(() => {
    try{
      if (authedUser){
      fetch(`${host}/board/list?owner_id=${authedUser.id}`, { headers })
        .then(res => res.json())
        .then(data => setBoards(data))

    }
  }
  catch(err){
    console.log(err)
  }
  
  
  }, [authedUser, host, headers])

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
              <Masonry  className={classes.masonry}  >
                {pins.map((pin) => (
                  <SinglePin key={pin.id} img={pin.content_src} external_link={pin.external_website} id={pin.id} boards={boards || [] } sub_board={pin.board || []} removeItem={removeItem} />
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