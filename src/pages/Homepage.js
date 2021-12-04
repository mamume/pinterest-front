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

  useEffect(() => {
    // console.log(headers)
    // console.log(itemData)
    fetch(`${host}/pin/pins/`, { headers })
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        //setItemData(itemData => [...itemData, { img: temp }])
        for (let i = 0; i < data.length; i++) {
          setItemData(itemData =>
            [...itemData, { img: data[i].content_src, external_link: data[i].external_website, id: data[i].id }]
          )
        }
      })
  }, [headers, host])

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
                  <SinglePin key={item.id} img={item.img} external_link={item.external_link} id={item.id} />
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