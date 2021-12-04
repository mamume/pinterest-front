import { Fragment } from "react";
import React, { useState, useEffect, useContext } from "react";
import SinglePin from '../components/pins/SinglePin'
import Masonry from 'react-masonry-component';
import AddButton from "../components/navigationbar/AddButton"
import { UserContext } from "../context";
import CircularProgress from '@mui/material/CircularProgress';
import { Stack } from "@mui/material";



function Homepage() {
  const [itemData, setItemData] = useState([])
  const [loaded, setLoaded] = useState(false)
  const { authedUser, headers, host } = useContext(UserContext)
  const [boards, setBoards] = useState([])
  const [saveFlag, setSaveFlag] = useState(false)



  




  useEffect(  () => {
    // console.log(headers)
    // console.log(itemData)
    if (authedUser && authedUser.id){

    
    Promise.all([fetch(`${host}/pin/pins/`, { headers }), fetch(`${host}/board/list?owner_id=${authedUser.id}`,{ headers })])
    .then(  async ([pins, boardsData]) =>{
      pins = await pins.json()
      console.log(pins)
      boardsData = await boardsData.json()

      for (let i = 0; i < pins.length; i++) {
        setItemData(itemData =>
          [...itemData, { img: pins[i].content_src, external_link: pins[i].external_website, id: pins[i].id, sub_board: pins[i].board }]
        )
      }
      console.log(itemData)

      setBoards(boards =>[...boards, ...boardsData])
      
    })
  }

  }, [headers, host, authedUser, saveFlag])
  useEffect(() => {
    itemData.length && setLoaded(true)
  }, [itemData.length])





  return (
    <Fragment>
      {loaded
        ? authedUser
          ? (
            <Fragment>
              < AddButton />
              <Masonry style={{ width: "100%", paddingLeft: "80px" }}  >
                {itemData.map((item, index) => (
                  <SinglePin key={item.id} img={item.img} external_link={item.external_link} id={item.id} boards={boards} sub_board={item.sub_board} setSaveFlage= {setSaveFlag} />
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