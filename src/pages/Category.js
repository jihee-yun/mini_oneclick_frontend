import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import heart from "../images/heart.png";
import redheart from "../images/redheart.png";
import AxiosApi from "../api/AxiosApi";
import { useContext } from "react";
import { UserContext } from "../context/UserStore";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Contain = styled.div`
  max-width: 1440px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;
const Sort = styled.div`
  margin-left: 120px;
  list-style: none;
  display:flex;
  flex-direction:row;
  padding: 0 100px;
  margin: 5px 0;
  li {
    margin: 0 5px;
  }

  .activeSort {
    color: gray;
    font-weight: bold;
  }
  .none {
    
  }
`;
const SectionContain = styled.div`
  display: flex;
  justify-content: space-evenly;
  /* align-items: center; */
  width: 100%;

`;
const Section1 = styled.div`
  margin-top: 60px;
  margin-left: 100px;
  font-weight: bold;
  font-size: 1.3em;
  margin-bottom: 50px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: right;
  /* border: 1px solid black; */
  /* background-color: black; */
  .card :visited {
    color: inherit;
  }
  .card {
    text-decoration:none;
  }
`;

const SectionBox1 = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 240px;
  height: 330px;
  margin: 25px;
  /* border: 1px solid lightgray; */
  z-index: 5;
  border: 1px solid lightgray;
`;

const Thumbnail = styled.div`
  /* margin: 0 auto; */
  width: 100%;
  height: 200px;
  object-fit: cover;
  overflow: hidden;
`;
const Image = styled.img`
  /* max-width: 100%; */
  /* max-height: 0%; */
  width: 100%;
  height: 150px;
  transition: transform 0.3s ease;

  ${Thumbnail}:hover & {
    transform: scale(1.2);
  }
`;
const CategoryTextStyle = styled.div`
  padding: 10px 0;
  display: flex;
  /* border: 1px solid black; */
  hr {
    border: .2px solid gray;
    margin: 0;
  }
  margin-top: -40px;
`
const Category = styled.div`
  padding: 0 5px;
  font-size: 0.6rem;
  font-weight: normal;
  color: gray;
  /* border: 1px solid black; */
`;

const Title = styled.h3`
  display: flex;
  align-items: center;
  padding: 10px 5px;
  margin: 0;
  /* height: 40px; */
  font-size: .8rem;
  font-weight: bold;
  /* margin-top: 5px; */
  /* border: 1px solid black; */
`;

const Description = styled.div`
  font-size: 0.6rem;
  font-weight: normal;
  display:flex;
  height: 34px;
  padding: 5px 5px;
  color: gray;
  /* border: 1px solid black; */
  text-overflow: hidden;
  overflow: hidden;
  margin-bottom: 5px;

`;
const PriceDate = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
  .price, .date {
    font-size: 0.7rem;
    font-weight: bold;
    /* padding: 10px 0; */
    margin-right: 10px;
  }

  .dateContain {
    display: flex;
  }
`

const Heart = styled.div`
  position: absolute;
  bottom: 20px;
  right: 8px;
  z-index: 10;
  background-color: black;
  img {
    width: 25px;
    height: 25px;
    z-index: 10;
  }
    
`;

const CategoryList = () => {
 // nav 메뉴에서 강의 카테고리 클릭시 context 로 값 끌어옴
  const context = useContext(UserContext);
  const { setLectureNum, categoryNum, memberNum, info, setPrice} = context;
  const [sortNum, setSortNum] = useState(1);
  const [wishInfo, setWishInfo] = useState("");
  const [wishChk, setWishChk] = useState(false);


  // axios 로 받아온 DB를 담아두기
  const [list, setList] = useState([]);

  useEffect(() => {
    const loadLectureList = async() => {
      const rsp = await AxiosApi.loadList(categoryNum);
      if(rsp.status === 200) {
        const sortList = rsp.data;
        const lecInfo = await AxiosApi.loadList(categoryNum);
        if(Array.isArray(lecInfo.data) && lecInfo.data.length > 0) {
          const lecture = lecInfo.data[0];
          setLectureNum(lecture.lectureNum);
        };
        const chk = await AxiosApi.myWishGet(memberNum);
        if(chk.status === 200) {
          setWishInfo(chk.data);
          console.log(chk.data);
        }
        console.log(sortList);
        if(sortNum === 1) {
          setList(sortList.sort((a, b) => a.likeCount - b.likeCount)); // 인기순으로 정렬
        } else if (sortNum === 2) {
          setList(sortList.sort((a, b) => a.endDate - b.endDate)); // 날짜 빠른 순으로 정렬
        } else if (sortNum === 3) {
          setList(sortList.sort((a, b) => b.price - a.price)); // 가격 높은 순으로 정렬
        }
      }
      else console.log("loadLectureList 실행 실패");
    }
    loadLectureList();
  },[sortNum, categoryNum]); // context, sortNum 같이 들어가야함
const event = (listData) => {
  setLectureNum(listData.lectureNum);
  setPrice(listData.price);
}

// 구현 X
const wishBtn = (listData) => {
  if(memberNum === 0) {
    alert("로그인을 먼저 해주세요.");
  }
  const getwishChk = async() => {
    const rsp = await AxiosApi.getWishChk(listData.lectureNum, memberNum);
    console.log("getWishChk 실행");
    if(rsp.data === false) {
      console.log("getWishchk 완료");
      console.log("acceptWishList 실행");
      const rsp = await AxiosApi.acceptWishList(listData.lectureNum, memberNum);
      if(rsp.data === true) {
        alert("찜하기 완료");
        setWishChk(true);
      } else {
        console.log("acceptWishList 실패");
      }
    } else {
      const rsp = await AxiosApi.delWishList(listData.lectureNum, memberNum);
      if(rsp.data === false) {
        alert("찜하기가 취소됐습니다.");
        setWishChk(false);
      } else {
        console.log("delWishList 실패");
      }
    }
  }
  getwishChk(); 
}

  return(
    <>
    <Header/>
    <Contain>
      <h2 style={{padding:"0 110px"}}>{info[categoryNum]}</h2>
      <Sort>
        <li><div className={sortNum === 1 ? "activeSort" : "none"} onClick={()=>setSortNum(1)}>인기순</div></li>
        <li><div className={sortNum === 2 ? "activeSort" : "none"} onClick={()=>setSortNum(2)}>종료일순</div></li>
        <li><div className={sortNum === 3 ? "activeSort" : "none"} onClick={()=>setSortNum(3)}>가격순</div></li>
      </Sort>
      <SectionContain>
        <Section1>
        {list && list.map(listData => (
          <div className="card" key={listData.num} onClick={() => {event(listData)}} >
            <SectionBox1>
            <Link to="/class" style={{ textDecoration: "none", color: "inherit"}}>
                <Thumbnail>
                  <Image src={listData.thum} alt="class thumbnail" />
                </Thumbnail>
                <CategoryTextStyle>
                  <Category>{listData.categoryName}</Category>
                  <hr />
                  <Category className="line">{listData.lecturer}</Category>
                </CategoryTextStyle>
                <Title>{listData.name}</Title>
                <Description>{listData.intro}</Description>
                <PriceDate>
                  <div className="price">{listData.price}원</div>
                </PriceDate>
            </Link>
            </SectionBox1>
          </div>
        ))}
        </Section1>
        </SectionContain>
    </Contain>
    <Footer/>
    </>
  )
}

export default CategoryList;