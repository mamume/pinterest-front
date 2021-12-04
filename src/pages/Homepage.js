import { Fragment } from "react";
import React, { useState, useEffect, useContext } from "react";
import SinglePin from '../components/pins/SinglePin'
import Masonry from 'react-masonry-component';
import AddButton from "../components/navigationbar/AddButton"
import { UserContext } from "../context";



function Homepage() {
  const [itemData, setItemData] = useState([])
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


  return (
    <Fragment >
      {authedUser ? (
        <Fragment>
          <AddButton />
          <Masonry style={{ width: "100%", paddingLeft: "80px" }}  >
            {itemData.map((item, index) => (
              <SinglePin key={item.id} img={item.img} external_link={item.external_link} id={item.id} boards={boards} sub_board={item.sub_board} setSaveFlage= {setSaveFlag} />
            ))}
          </Masonry>
        </Fragment>
      ) : <div>Please Login</div>}

    </Fragment>
  );
}

export default Homepage;