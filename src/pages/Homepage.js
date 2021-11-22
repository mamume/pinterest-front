import { Button, Stack, Typography } from "@mui/material";
import { Fragment } from "react";
import React, { useState ,useEffect } from "react";
import Masonry from '@mui/lab/Masonry';
import temp from '../images/1.jpg'
import temp1 from '../images/2.jpg'
import SinglePin from '../components/pins/SinglePin'





function Homepage() {
    const [itemData, setItemData] = useState([{img: temp1}, {img: temp}, {img: temp1}, {img: temp}, {img: temp1}, {img: temp}])
    useEffect( () => {

        for (let i=1; i<20; i++ ){
            setItemData(itemData => [ ...itemData, {img:temp}])
        }

    }, [])

    return (
        <Fragment >
            <Masonry columns={{  xs: 1,sm: 2, md: 3, lg: 5, xl: 5 }} style={{width: "100%"}} >
                { itemData.map((item, index) => (
                <SinglePin img={item.img}/>
))}
            </Masonry>
        </Fragment>
    );
}

export default Homepage;