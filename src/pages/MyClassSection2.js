import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../context/UserStore";
import AxiosApi from "../api/AxiosApi";
import leftarrow from "../images/left-arrow.png";
import rightarrow from "../images/right-arrow.png";
import x from "../images/x.png"
import WishBox from './MyWishSectionBox';
import { Link, useNavigate } from "react-router-dom";

const Section2 = styled.div`
  display: flex;
  justify-content: left;
  overflow-x: hidden;
  flex-wrap: wrap;
  font-weight: bold;
  font-size: 1.3em;
  gap: 90px;
`;

const SectionBox2 = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 240px;
  height: 290px;
  margin-bottom: 50px;
`;

const MyClassSection2 = ({onSelect}) => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const { userId, setCategoryNum, setLectureNum } = context;

  const [myWishInfo, setMyWishInfo] = useState("");
  
  const [startIndex2, setStartIndex2] = useState(0);
  const [endIndex2, setEndIndex2] = useState(3);

  useEffect(() => {
    const myWishInfo = async() => {
      const response = await AxiosApi.myWishGet(userId);
      if(response.status === 200) setMyWishInfo(response.data);
    };
    myWishInfo();
  },[userId]);

  // 위시리스트 취소
  const cancleWish = async(num, wishNum) => {
    const response = await AxiosApi.deleteWish(num, wishNum);
    console.log(response.data);
    if(response.data === true) {
      const updatedWishList = myWishInfo.filter((wish) => wish.wishNum !== wishNum);
      setMyWishInfo(updatedWishList);
    }
  };

  const prevClick2 = () => {
      if (startIndex2 > 0) {
      setStartIndex2(startIndex2 - 3)
      setEndIndex2(endIndex2 - 3);
    }
  };
  
  const nextClick2 = () => {
    if(endIndex2 < myWishInfo.length) {
      setStartIndex2(startIndex2 + 3)
      setEndIndex2(endIndex2 + 3);
    }
  };

  const setInfo = (cateNum, lecNum) => {
    console.log(cateNum);
    console.log(lecNum);
    setCategoryNum(cateNum);
    setLectureNum(lecNum);
  }

  const movePage = () => {
    onSelect("위시");
  }

  return(
    <>
      <p className="head">위시리스트&nbsp;&nbsp;&nbsp;<span onClick={movePage}>전체보기</span></p>
      {myWishInfo.length > 3 && (
      <div className="arrow2">
        <img src={leftarrow} alt="이전" onClick={prevClick2}/>
        <img src={rightarrow} alt="다음" onClick={nextClick2}/>
      </div>
      )}
      <Section2>     
        {myWishInfo.length === 0 ? (
          <div className="no">
            <img src={x} alt="엑스" />
            <p>위시리스트 목록이 없습니다</p>
          </div>
        ) : (myWishInfo.slice(startIndex2, endIndex2).map(myWish => (
          <Link to="/class" style={{ textDecoration: "none", color: "inherit"}}>
          <SectionBox2 key={myWish.wishNum} onClick={()=> setInfo(myWish.categoryNum, myWish.num)} >
            <WishBox myWish={myWish} cancleWish={cancleWish}/>
          </SectionBox2>
          </Link>
        )))}  
      </Section2>
    </>
  )
}

export default MyClassSection2;