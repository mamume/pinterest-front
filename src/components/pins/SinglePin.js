import React from 'react'
import styled from 'styled-components';
import Button from '@mui/material/Button';
import CallMadeIcon from '@mui/icons-material/CallMade';
import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/Download';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function SinglePin({img}) {
    return (
        <Wrapper>  
            <CardWrapper>
                <div className="modal">

                    <div className="modal_header">
                        <Button>Save</Button>
                    </div>
                    <div className="modal_footer">
                        <div className="ext">
                            <IconButton>
                                <CallMadeIcon/>
                            </IconButton>
                            <span>placeholdermanthisisaplaceholder</span>
                        </div>

                        <div className="send">
                            <IconButton>
                                <DownloadIcon/>
                            </IconButton>
                        </div>

                        <div className="options">
                            <IconButton>
                                <MoreVertIcon/>
                            </IconButton>
                        </div>

                    </div>
                </div>
                {/*<img src="https://images.unsplash.com/photo-1637484581501-05bc3d6725be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" />*/}
                <img src={img} />
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

    .modal{
        width: 100%;
        opacity: 0;
        transition-duration: 1s;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        
        height:100%;

    }

    .modal:hover{
        opacity: 100%;
        
    }
    .modal_header{
        display: flex;
        justify-content: flex-end;
        padding: 8px;
    }

    .modal_footer{
        display: flex;
        width: 100%;
        justify-content: space-evenly;
        position: fixed;
        bottom: 0;
        padding: 10px 0px;
    }

    .ext{
        height: 32px;
        width: 130px;
        background-color: #efefef;
        border-radius: 16px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .ext span{
        overflow: hidden;
    }

    .send, .options{
        height: 32px;
        background-color: #efefef;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`


