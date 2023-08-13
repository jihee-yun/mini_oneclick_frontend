import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";
import { UserContext } from "../context/UserStore";
import MainIMG from "./Lecture_MainIMG"
import LeftDivision from "./Lecture_LeftDivision";
import RightDivision from "./Lecture_RightDivision";
import Header from "./Header";
import Footer from "./Footer";
import AxiosApi from "../api/AxiosApi";




const BodyContainer = styled.div`
  max-width: 100%;
  box-sizing: border-box;
  display:flex;
  flex-direction:column;
  /* background-color:black */
  margin-bottom: 20px;
`



// 양 쪽 메뉴 분할
const Classlist = styled.div`
  width: 90%;
  display:flex;
  justify-content: space-between;
  align-self: center;
`

const Lecture = () => {
  const [lectureData, setLectureData] = useState("");
  const [lectureList, setLectureList] = useState([]);
  const [img, setImg] = useState("");
  const context = useContext(UserContext);
  const {lectureNum} = context;

  useEffect(() => {
    const LectureList = async() => {
      // 강의 번호 대입
      const rsp = await AxiosApi.viewLecture(lectureNum);
      if(rsp.status === 200) {
        setLectureList(rsp.data.lectureList);
        setImg(rsp.data.imgList);
      }
      else alert("강의 불러오기 실패");
    }
    LectureList();
  }, []);

  return (
    <>
    <Header />
    <BodyContainer>
      <MainIMG img={img}/>
      <Classlist>
        <LeftDivision lectureList={lectureList}/>
        <RightDivision lectureList={lectureList}/>
      </Classlist>
    </BodyContainer>
    <Footer />
    </>
    
  )
}

export default Lecture;