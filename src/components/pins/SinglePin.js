import React from "react";
import styled from 'styled-components';
import Button from '@mui/material/Button';
import CallMadeIcon from '@mui/icons-material/CallMade';
import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/Download';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom'
import { useLocation, useNavigate } from "react-router";


export function withRouter(Child) {
  return (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    return <Child {...props} navigate={navigate} location={location} />;
  }
}

function SinglePin({ img, external_link, id, url }) {
  const newTo = {
    pathname: url ? url : `/pin/${id}`,
    state: { id: id }
  };
  return (
    <Wrapper>
      <CardWrapper>
        
          <div className="myModal">

            <div className="my_modal_header">
              <Button>Save</Button>
            </div>
            <Link to={newTo}>
                            <div style={{ display: "flex", height: "60%"}}></div>
            </Link>
            <div className="my_modal_footer">
              {/* <a href={external_link}> */}
              <div className="my_ext">
                <IconButton>
                  <CallMadeIcon />
                </IconButton>
                <span>{external_link}</span>
              </div>
              {/* </a> */}

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

          <img src={img} alt="" />
        
      </CardWrapper>
    </Wrapper>
  )
}

export default withRouter(SinglePin)

const Wrapper = styled.div`
    display: inline-flex;
    padding: 8px;

    img{
        display: flex;
        justify-content: center;
        width: 100%;
        border-radius: 20px;
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
        justify-content: flex-end;
        padding: 8px;
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


