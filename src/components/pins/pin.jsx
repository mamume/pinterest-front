import React, { useState, useEffect } from "react";
import './pin_styles.css'
import { Router, Route, browserHistory, IndexRoute} from 'react-router'
import { NavigateFunction, useLocation, useNavigate, useParams } from "react-router";

export function withRouter( Child ) {
    return ( props ) => {
      const location = useLocation();
      const navigate = useNavigate();
      return <Child { ...props } navigate={ navigate } location={ location } />;
    }
  }




    const handelfocus = () => {
        let ftarget = document.getElementById("comment_controllers")
        ftarget.classList.add("comment_vis")
    }

    const handelclick = () => {
        let btarget = document.getElementById("comment_controllers")
        console.log(btarget)

        btarget.classList.remove("comment_vis")
        btarget.classList.add("comment_hide")
    }

    const handelchange = (event) => {
        let target = document.getElementsByClassName("comment_done")
        target.item(0).disabled = false;
        target.item(0).classList.add("comment_done_edite")
        if (event.target.value === "") {
            target.item(0).disabled = true;
            target.item(0).classList.remove("comment_done_edite")
        }
    }

    const commentclick = () => {
        let dis = document.getElementById("comment_area_container")
        console.log(dis);
        dis.classList.toggle("comment_area_container");
        console.log("done")
    }
    
    
    const Pin =() =>{
        const [pin, setPin] = useState({})
        let data = useLocation();
        let param = useParams();
        console.log(param.id)

        useEffect(() => {
            fetch(`http://127.0.0.1:8000/pin/${param.id}`)
              .then(res => res.json())
              .then(data => {
                // console.log(data)
                //setItemData(itemData => [...itemData, { img: temp }])
                console.log(data)
                console.log(data.content_src)
                setPin({img:data.content_src, title: data.title, desc: data.description })
               
                
              })
          }, [])

    
        return (
            <React.Fragment>
                <div className="pin-container">
                    <div className="sides">
                        <div className="left-side">
                            <div className="modals_pin_pin">
                                <div className="pin_image_pin">
                                    <img src={pin.img} alt="pin_image" />
                                </div>
                            </div>

                        </div>
                        <div className="right-side">
                            <div className="section1">
                                <div className="icons">
                                    <div className="icon_more">
                                        <i className="fas fa-ellipsis-h"></i>
                                    </div>
                                    <div className="upload">
                                        <i className="fas fa-upload"></i>
                                    </div>
                                    <div className="favorite">
                                        <i className="far fa-star"></i>
                                    </div>
                                </div>

                                <div className="select_board">
                                    <select defaultValue="Select" name="pin_size" id="board_btn">
                                        <option value="">Select</option>
                                        <option value="small">small</option>
                                        <option value="medium">meduim</option>
                                        <option value="large">large</option>
                                    </select>
                                    <div className="save_pin_pin"><span>save</span></div>
                                </div>

                            </div>

                            <div className="section2">
                                <div className="section2_header">
                                    <h1 className="pin_title_for_pin">{pin.title}</h1>
                                    <div className="pin_description_for_pin">{pin.desc}</div>
                                </div>
                                <div className="user_details">
                                    <div className="user_icon"><span>m</span></div>
                                    <div className="user_name"><span>momen awad</span></div>
                                </div>

                                <div className="note">
                                    <div className="note_head">
                                        Note to self
                                    </div>
                                    <div className="note_details">
                                        what do you want to remember about this pin?
                                    </div>
                                    <div className="add_note"><span>Add note</span></div>
                                </div>


                                <div className="section3">
                                    <div className="comment_head">
                                        <h3>comments</h3>
                                        <div className="comment_icon" onClick={commentclick}>
                                            <i className="fas fa-chevron-down"></i>
                                        </div>
                                    </div>
                                    <div className="comment_area_container" id="comment_area_container">
                                        <div className="comment_area_header">
                                            share feedback, ask a question or give a high five
                                        </div>

                                        <div className="comment_area">
                                            <div className="persons_icon"><span>A</span></div>
                                            <div className="text">
                                                <input type="text" placeholder="Add a comment" name="comment" className="comment-btn" onFocus={handelfocus} onChange={handelchange} />
                                            </div>
                                        </div>
                                        <div className="comment_controllers" id="comment_controllers">
                                            <input type="button" value="Cancel" name="comment_canceled" className="comment_canceled" onClick={handelclick} />
                                            <input type="button" value="Done" name="comment_done" className="comment_done" disabled />
                                        </div>
                                    </div>
                                </div>


                            </div>
                            <div className="bord_name">
                                <div className="bord_items">
                                    <div className="comment_icon"><span>M</span></div>
                                    <div className="bord_content">
                                        <span>you saved to bord name</span>
                                    </div>
                                </div>
                            </div>




                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

export default Pin