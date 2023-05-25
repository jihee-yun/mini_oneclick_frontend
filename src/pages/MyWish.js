import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import AxiosApi from "../api/AxiosApi";
import { UserContext } from "../context/UserStore";
import x from "../images/x.png"
import MyWishSectionBox from "./MyWishSectionBox";

const Container = styled.div`

  font-weight: bold;
  font-size: 1.3em;

  
  .head {
    margin-bottom: 50px;
    }
`;

const Section1 = styled.div`
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
  font-weight: bold;
  font-size: 1.3em;
  gap: 80px;

  .no {
    width: 100%;
    text-align: center;
    margin-top: 100px;
    font-size: 0.6em;
    color: darkgray;

    img {
      width: 20px;
      height: 20px;
    }
  }
`;

const SectionBox1 = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 240px;
  height: 310px;
  /* border: 1px solid lightgray; */
  margin-bottom: 50px;
`;

const MyWish = () => {
  const context = useContext(UserContext);
  const { userId, setCategoryNum, setLectureNum } = context;

  const [myWishInfo, setMyWishInfo] = useState("");

  useEffect(() => {
    const myWishInfo = async() => {
      const response = await AxiosApi.myWishGet(userId);
      if(response.status === 200) setMyWishInfo(response.data);
    };
    myWishInfo();
  },[userId]);

  console.log(myWishInfo);

  const cancleWish = async(num, wishNum) => {
    const response = await AxiosApi.deleteWish(num, wishNum);
    console.log(response.data);
    if(response.data === true) {
      const updatedWishList = myWishInfo.filter((wish) => wish.wishNum !== wishNum);
      setMyWishInfo(updatedWishList);
    }
  };

  const setInfo = (cateNum, lecNum) => {
    console.log(cateNum);
    setCategoryNum(cateNum);
    setLectureNum(lecNum);
  }

  return(
    <>
    <Container>
      <p className="head">위시리스트</p>
      <Section1>     
        {myWishInfo.length === 0 ? (
          <div className="no">
          <img src={x} alt="엑스" />
          <p>위시리스트 목록이 없습니다</p>
        </div>
        ) : (myWishInfo.map(myWish => (
          <Link to="/class" style={{ textDecoration: "none", color: "inherit"}}>
          <SectionBox1 key={myWish.wishNum} onClick={()=> setInfo(myWish.categoryNum, myWish.num)}>
          <MyWishSectionBox myWish={myWish} cancleWish={cancleWish} />
          </SectionBox1>
          </Link>
          )))}    
        
      </Section1>
    </Container>
    </>
  )
}

export default MyWish;