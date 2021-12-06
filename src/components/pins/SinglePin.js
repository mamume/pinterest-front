
import styled from 'styled-components';
import Button from '@mui/material/Button';
import CallMadeIcon from '@mui/icons-material/CallMade';
import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/Download';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom'
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import React, { useState, useEffect, useContext, Fragment } from "react";
import { UserContext } from "../../context";
import { Stack, Typography, Box } from '@mui/material';
import Styles from '../../styles/Styles'

function SinglePin({ img, external_link, id, url, boards, sub_board }) {
  const newTo = {
    pathname: url ? url : `/pin/${id}`,
    state: { id: id }
  };
  const { headers, host } = useContext(UserContext)

  const classes = Styles()
  const [savedBoard, setSavedBoard] = useState("");
  const [linked, setLinked] = useState(false)
  const [subBoard, setSubBoard] = useState(sub_board)
  // const [update, setUpdate] = useState(false)

  const handlePost = () => {
    const fd = new FormData()
    fd.append('pin_id', id)
    fd.append('board_id', savedBoard)

    fetch(`${host}/pin/link_board`, {
      method: 'POST',
      body: fd,
      headers: { 'Authorization': headers.Authorization }
    })
      .then(response => response.json())
      .then(() => {
        // setUpdatePins(prev => !prev)
        // setUpdate(prev => !prev)
        setSubBoard(boards.filter(board => board.id === savedBoard)[0])
        setLinked(true)
        console.log(savedBoard)
        console.log(sub_board)
        // sub_board = { id: savedBoard, title: boards[savedBoard].title }
      })
  }

  useEffect(() => {
    if (subBoard !== "None") {
      setLinked(true)
    }
  }, [subBoard])

  return (
    <Wrapper>
      <CardWrapper className={classes.pin}>
        <div className="myModal">
          {/* <div className="my_modal_header"> */}
          <Stack direction='row' justifyContent="space-between" p={1} spacing={1}>
            {/* <div> */}
            {linked
              ? <Fragment>
                <Link
                  to={`/board?board_id=${subBoard.id}`}
                  // style={{ display: "inline-block", width: "130px", overflow: "hidden", whiteSpace: "nowrap", color: "white", textDecoration: "none", fontWeight: "700", fontSize: "20px" }}
                  className={classes.link}
                >
                  <Box sx={{ bgcolor: "white", borderRadius: 1, p: "5px" }}>
                    <Typography variant="h6">{subBoard.title}</Typography>
                  </Box>
                </Link>
                <Button style={{ color: "white", backgroundColor: "black" }}>Saved</Button>
              </Fragment>

              : <Fragment>
                <FormControl size="small" fullWidth>
                  <InputLabel id="select-board" style={{ color: "#455a64" }}>Board</InputLabel>
                  <Select
                    labelId="select-board"
                    onChange={(e) => setSavedBoard(e.target.value)}
                    label="Board"
                    style={{ backgroundColor: "white" }}
                    value={savedBoard}
                    size="small"
                  >
                    {boards.map((item, index) => (
                      <MenuItem value={item.id} key={index}>{item.title}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button onClick={handlePost}>Save</Button>
              </Fragment>
            }
            {/* </div> */}
            {/* <div className="Two"></div> */}
            {/* <div className="Three"> */}
            {/* {linked
                ? <Button style={{ color: "white", backgroundColor: "black" }}>Saved</Button>
                : <Button onClick={handlePost}>Save</Button>
              } */}
            {/* </div> */}
          </Stack>
          {/* </div> */}
          <Link to={newTo}>
            <div style={{ display: "flex", height: "60%" }}></div>
          </Link>
          <div className="my_modal_footer">
            <div className="my_ext">
              <IconButton>
                <CallMadeIcon />
              </IconButton>
              <span>{external_link}</span>
            </div>

            <div className="my_send">
              <IconButton>
                <DownloadIcon />
              </IconButton>
            </div>

            <div className="my_options">
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </div>
          </div>
        </div>

        <img style={{ minHeight: 236, }} src={img} alt="" />
      </CardWrapper>
    </Wrapper>
  )
}

export default SinglePin

const Wrapper = styled.div`
    display: inline-flex;
    padding: 8px;

    img{
        display: flex;
        justify-content: center;
        width: 100%;
        border-radius: 16px;
        object-fit: cover;
    }
`

const CardWrapper = styled.div`
    width: 250px;

    border-radius: 16px;
    background-color: #efefef;
    position: relative;
    overflow: hidden;
    margin: auto;
    &:hover{
        img{
            opacity: 50%;
        }
    }

    .myModal{
        width: 100%;
        opacity: 0;
        transition-duration: 1s;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        height:100%;

    }

    .myModal:hover{
        opacity: 100%;
        postion: absolute;
        z-index: 1000;

    }
    .my_modal_header{
        display: flex;
        padding: 8px;
    }

    .my_modal_header .One{
        flex-grow: 10;
    }
    .my_modal_header .Two{
        flex-grow:30 ;
    }
    .my_modal_header .Three{
        flex-grow: 10;
    }

    .my_modal_footer{
        display: flex;
        width: 100%;
        justify-content: space-evenly;
        position: fixed;
        bottom: 0;
        padding: 10px 0px;

        a{
            text-decoration: none;
        }


    }

    .my_ext{
        height: 32px;
        width: 130px;
        background-color: #efefef;
        border-radius: 16px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .my_ext span{
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
    }

    .my_send, .my_options{
        height: 32px;
        background-color: #efefef;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`


