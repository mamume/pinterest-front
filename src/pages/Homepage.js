import { Button, Stack, Typography } from "@mui/material";
import { Fragment } from "react";
import React, { useState ,useEffect } from "react";
import Masonry from '@mui/lab/Masonry';
import temp from '../images/1.jpg'



function Homepage() {
    const [itemData, setItemData] = useState([{img: temp}, {img: temp}, {img: temp}, {img: temp}, {img: temp}, {img: temp}])
    useEffect( () => {

        for (let i=1; i<10; i++ ){
            setItemData(itemData => [ ...itemData, {img:temp}])
        }

    }, [])

    return (
        <Fragment>
            <Masonry columns={5} spacing={1}>
                {itemData.map((item, index) => (
                    <Stack key={index}>
                        {/*<Label>{index + 1}</Label>*/}
                        <img
                        src={`${item.img}?w=162&auto=format`}
                        srcSet={`${item.img}?w=162&auto=format&dpr=2 2x`}
                        alt={item.title}
                        loading="lazy"
                        style={{ borderBottomLeftRadius: 4, borderBottomRightRadius: 4 }}
                    />
                    </Stack>
                ))}
            </Masonry>
        </Fragment>
    );
}

export default Homepage;