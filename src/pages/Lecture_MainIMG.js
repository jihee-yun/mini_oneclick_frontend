import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "../context/UserStore";
import { storage } from "../api/firebase";
import { ref, getDownloadURL } from "firebase/storage";
import AxiosApi from "../api/AxiosApi";

const ClassImg = styled.div`
  /* width: auto; */
  height: 400px;
  width: 96%;
  margin: 16px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  align-self: center;

`

const Asdf = styled.div`
   height: 400px;
  width: 96%;
  margin: 16px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  align-self: center;
  img {
    box-sizing: border-box;
    object-fit: cover;
    margin: 5px;
    display: flex;
    height: 100%;
    width: 23%;
    transition: width 2s ease;
  }
  img:nth-child(1n):hover {
    /* overflow: hidden; */
    width: 100%;
    transform: scaleX(1);
    transform-origin: bottom left;
  }
  img:last-child:hover {
    /* overflow: hidden; */
    width: 100%;
    transform-origin: bottom right;
  }
  .title {
    width: auto;
  }
`
const MainIMG = () => {
  const context = useContext(UserContext);
  const { categoryNum, lectureNum } = context;
  const [img, setImg] = useState("");
  
  useEffect(() => {
    const loadMainIMG = async() => {
      const rsp = await AxiosApi.viewLecture(categoryNum, lectureNum);
      if(rsp.status === 200) {
        console.log("받아온 이미지리스트:" + rsp.data.imgList[0]);
        setImg(rsp.data.imgList);
        console.log(img);
      }
    }
    loadMainIMG();
  },[lectureNum]);


  return (
    <ClassImg >
      {img && img.map(list => (
        <Asdf >
          <img src={list.mainImg1} alt="" />
          <img src={list.mainImg2} alt="" />
          <img src={list.mainImg3} alt="" />
          <img src={list.mainImg4} alt="" />
        </Asdf >
      ))}
    </ClassImg>
  )
}

export default MainIMG;