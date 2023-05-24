import React from "react";
import styled from "styled-components";
import AxiosApi from "../api/AxiosApi";
import { useState, useEffect } from "react";
import StyledButton from "../utils/StyledButton"
import like_icon from "../images/like_icon.png"
import heart_icon from "../images/heart.png"
import NaverMap from "../utils/NaverMap";
import { useContext } from "react";
import { UserContext } from "../context/UserStore";
import OrdinaryPayment from "./OrdinaryPayment";
import { Navigate, useNavigate } from "react-router-dom";


// 오른쪽 메뉴

const Container = styled.div`
  box-sizing: border-box;
  /* margin-right:10px; */
  height: auto;
  max-width: 25%;
  min-width: 25%;
  box-shadow: 1px 1px 1px 1px lightgray;
  /* padding: auto; */
  .btnStyle {
    border-radius: 5px;
  color: white;
  font-weight:bold;
  height: 40px;
  width: 100%;
  background-color: #FC7373;
  border: none;
  margin-bottom: 5px;
  :hover {
    cursor: pointer;
  }
  }
`
const ClassCategory = styled.div`
  display: inline-block;
  margin: 1rem;
  margin-bottom: 0;
  font-size: 12px;
  font-weight: bold;
  padding: 2px;
`
const ClassTitle = styled.div`
  margin: 1rem;
  margin-top:0;
  width: 90%;
  display: flex;
  flex-direction:column;
`
const ClassBtn = styled.div`
  display: flex;
  margin: 5px auto;
  width: 100%;
  justify-content: space-evenly;
  flex-wrap: nowrap;
  li {
    padding: 5px;
    font-size: 12px;
    font-weight: bold;
    list-style: none;
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    width: 28%;
    border-radius: 5px;
    background-color: lightgray;
    img {
      width:15px;
      margin: 3px;
    }
  }
  li:hover {
    background-color: gray;
    cursor: pointer;
  }
`
const Contain = styled.div`
  width: 90%;
  margin: 10px auto;
`
const PaymentStyle = styled.div`

`

const RightDivision = () => {
  const context = useContext(UserContext);
  const {memberNum, lectureNum, categoryNum} = context;

  const [list, setList] = useState([]);
  const [wishChk, setWishChk] = useState("");
  useEffect(() => {
    const lectureList = async() => {
      const rsp = await AxiosApi.viewLecture(categoryNum, lectureNum);
      if(rsp.status === 200) {
        setList(rsp.data.lectureList);
        setWishChk(rsp.data.regWish);
      }
    }
    lectureList();
  }, [categoryNum, lectureNum]);
const pricePay = () => {
  const navigate = useNavigate;
  navigate("/subs");
}

const wishChkBtn = () => {
  if(memberNum === false) {
    alert("로그인 후 이용하세요.");
    const navigate = useNavigate;
    navigate("/login");
  } else {
  const chk = async() => {
    const rsp = await AxiosApi.getWishChk(lectureNum, memberNum);
    if(rsp.data === true) {
      const rsp = await AxiosApi.acceptWishList(lectureNum, memberNum);
      if(rsp.data === true) {
        alert("찜하기 완료");
      } else(console.log("acceptWishList 실패"));
    } else {
      const rsp = await AxiosApi.delWishList(lectureNum, memberNum);
      if(rsp.data === true) {
        alert("찜하기가 취소됐습니다.");
      } else(console.log("delWishList 실패"));
    }
  }
  chk();
  }
}

 return (
  <Container>
    {list && list.map(Lecturelist => (
    <Contain key={Lecturelist.id}>
      <ClassCategory>
        
      </ClassCategory>
      <ClassTitle>
        <h3>{Lecturelist.name}</h3>
      </ClassTitle>
      <ClassBtn>
        <li onClick={wishChkBtn}><img src={heart_icon} alt="" />찜하기</li>
        <li><img src={heart_icon} alt="" />장바구니</li>
      </ClassBtn>
      <PaymentStyle>
        <OrdinaryPayment>{Lecturelist.price}원 결제</OrdinaryPayment> 
        <StyledButton onClick={pricePay} >구독하기</StyledButton> 
      </PaymentStyle>
      <ClassTitle >
        <h2>강의 장소</h2>
        {Lecturelist.addr}
      </ClassTitle>
      <NaverMap children={Lecturelist.addr}>{/* 네이버 지도 */}</NaverMap>
    </Contain> 
    ))}
  </Container>
 );
}

export default RightDivision;