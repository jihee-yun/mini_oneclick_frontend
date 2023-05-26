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
  position: relative;
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
  flex-direction: column;
  align-items: flex-end;
  margin: 5px auto;
  width: 100%;
  justify-content: space-around;
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
    width: 40%;
    border-radius: 5px;
    background-color: lightgray;

    :hover {
    background-color: gray;
    cursor: pointer;
    }
  }
  // 찜 버튼 비활성화 시
  .disable {
    background-color: lightgray;
  }
  // 찜 버튼 활성화 시
  .select {
    background-color: #FC7373;
    color: white;
    :hover {
      background-color: #FC7373;
      color: white;
    }
  }
  .cartBtn {
    display: flex;
    width: 100%;
    li {
      width: 40%;
    }

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0;
  .quantity-desc {
    font-size: 12px;
    font-weight: bold;
    text-align: right;
    width: 40px;
  }
  .quantity-control {
    margin: 0 2px;
    display:flex;
    flex-wrap: nowrap;
    height: 20px;
    input {
      display: flex;
      text-align: center;
      width: 25px;
      height: 20px;
      border: none;
      color: #636363;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    button {
      margin: 0;
    }
  }
  }
`;
const Contain = styled.div`
  width: 90%;
  margin: 10px auto;
`;
const PaymentStyle = styled.div`

`;

const RightDivision = () => {
  const context = useContext(UserContext);
  const {memberNum, lectureNum, categoryNum, info, price, setMemberNum, setLectureName} = context;

  const [list, setList] = useState([]);
  const [wishChk, setWishChk] = useState(false);
  useEffect(() => {
    if(memberNum === "") {
      setMemberNum(0);
    }
    const lectureList = async() => {
      const rsp = await AxiosApi.viewLecture(categoryNum, lectureNum);
      if(rsp.status === 200) {
        console.log(rsp.data.lectureList[0].name);
        const loadWishChk = await AxiosApi.getWishChk(lectureNum, memberNum);
        if(rsp.status === 200 && loadWishChk.status === 200) {
          setList(rsp.data.lectureList);
          setWishChk(loadWishChk.data);
          console.log(rsp.data.lectureList[0].name);
        }
      }

    }
    lectureList();
  }, [categoryNum, lectureNum, wishChk]);

const pricePay = () => {
  const navigate = useNavigate;
  navigate("/subs");
}

const wishChkBtn = () => {
  if(memberNum === 0) {
    alert("로그인 후 이용하세요.");
    // const navigate = useNavigate;
    // navigate("/");
  } else {
  const regChk = async() => {
    const rsp = await AxiosApi.getWishChk(lectureNum, memberNum);
    console.log("getWishChk 실행");
    if(rsp.data === false) {
      console.log("getWishchk 완료");
      console.log("acceptWishList 실행");
      const rsp = await AxiosApi.acceptWishList(lectureNum, memberNum);
      if(rsp.data === true) {
        alert("찜하기 완료");
        setWishChk(true);
      } else {
        console.log("acceptWishList 실패");
      }
    } else {
      const rsp = await AxiosApi.delWishList(lectureNum, memberNum);
      if(rsp.data === false) {
        alert("찜하기가 취소됐습니다.");
        setWishChk(false);
      } else {
        console.log("delWishList 실패");
      }
    }
  }
  regChk();
  }
};

const cartChkBtn = () => {
  if(memberNum === 0) {
    alert("로그인 후 이용하세요.");
  } else {
  const regChk = async() => {
    const rsp = await AxiosApi.getCartChk(lectureNum, memberNum);
    if(rsp.data === true) {
      const rsp = await AxiosApi.acceptCartList(lectureNum, memberNum, quantity);
      if(rsp.data === true) {
        alert("장바구니에 담기 완료");
      } else {
        console.log("acceptWishList 실패");
      }
    }
  }
  regChk();
  }
}

// 카트에 담을 인원 수 설정
const [quantity, setQuantity] = useState(1);
const decQuantity = (count) => {
  if(quantity > 1) setQuantity(count - 1);
};
const incQuantity = (count) => {
  setQuantity(count + 1);
};


 return (
  <Container>
    {list && list.map(Lecturelist => (
    <Contain key={Lecturelist.id}>
      <ClassCategory>
        {info[categoryNum]}
      </ClassCategory>
      <ClassTitle>
        <h3>{Lecturelist.name}</h3>
        <h5 style={{margin: "5px"}}>강의 종료일 : {Lecturelist.endDate}</h5>
      </ClassTitle>
      <ClassBtn>
        <li onClick={wishChkBtn} className={wishChk ? 'select' : 'disable'}>찜하기</li>
        <div className="cartBtn">
          <div className="quantity-desc">인원</div>
          <div className="quantity-control">
            <button onClick={() => decQuantity(quantity)}>-</button>
            <span>
            <input type="number" value={quantity} readOnly />
            </span>
            <button onClick={() => incQuantity(quantity)}>+</button>
          </div>
          <li onClick={cartChkBtn}>카트담기</li>
        </div>
      </ClassBtn>
      <PaymentStyle>
        <StyledButton onClick={pricePay} >구독하기</StyledButton> 
        <OrdinaryPayment />
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