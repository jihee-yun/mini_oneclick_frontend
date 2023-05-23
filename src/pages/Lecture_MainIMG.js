import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "../context/UserStore";
import { storage } from "../api/firebase";
import { ref, getDownloadURL } from "firebase/storage";
import AxiosApi from "../api/AxiosApi";


// 수강 설명 이미지
const detailImg1 = <img className="detail img1" src="https://cdn.class101.net/images/aaac23bf-682b-4e06-bfaa-e0c5a1d5bf9a/2048xauto.webp" alt="그림1" />
const detailImg2 = <img className="detail img2" src="https://cdn.class101.net/images/bd6763f2-5fe4-4e20-93b5-586ede7b4515/2048xauto.webp" alt="그림2" />
const detailImg3 = <img className="detail img3" src="https://cdn.class101.net/images/cf838d00-61ce-440b-8ebc-cb22483fc925/960xauto.webp" alt="그림3" />
const detailImg4 = <img className="detail img4" src="https://cdn.class101.net/images/6bedd4fb-2713-4b40-b64b-4f6e6246cbd6/960xauto.webp" alt="그림4" />


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