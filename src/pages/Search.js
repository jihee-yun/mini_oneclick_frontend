import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AxiosApi from "../api/AxiosApi";
import styled from "styled-components";
import wish from "../images/wish.png";
import Header from "./Header";
import Footer from "./Footer";
import { UserContext } from "../context/UserStore";

const BodyContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`;

const Container = styled.div`
  /* margin: 60px; */
  margin-top: 60px;
  margin-left: 100px;
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
  font-weight: bold;
  font-size: 1.3em;
  gap: 25px;
  margin: 80px 0px 80px 100px;
`;

const LectureBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 240px;
  height: 310px;
  /* margin-left: 30px; */
  /* margin-top: 30px; */
  margin: 25px;
`;

const Wish = styled.div`
  position: absolute;
  top: 120px;
  right: 5px;
  img {
    width: 15px;
    height: 15px;
  }  
`;

const Thum = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 150px;
  object-fit: cover;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
`;

const Category = styled.div`
  margin: 0 0;
  font-size: 0.6rem;
  font-weight: normal;
  margin-top: 15px;
  color: gray;
`;

const Name = styled.p`
  font-size: .8rem;
  font-weight: bold;
  margin-top: 10px;
`;

const Intro = styled.p`
  font-size: 0.6rem;
  font-weight: normal;
  margin-top: 5px;
  color: gray;
`;

const Price = styled.p`
  position: absolute;
  bottom: 0;
  font-size: 0.7rem;
  font-weight: bold;
  margin-top: 35px;
`;

const Search = () => {
  const { searchInput } = useParams();
  const [searchLecture, setSearchLecture] = useState([]);
  const context = useContext(UserContext);
  const { setCategoryNum, setLectureNum } = context;

  const setInfo = (cateNum, lecNum) => {
    console.log(cateNum);
    setCategoryNum(cateNum);
    setLectureNum(lecNum);
  };

  useEffect(() => {
    const fetchLectureList = async() => {
      const rsp = await AxiosApi.lectureGet("ALL");
      if(rsp.status === 200) setSearchLecture(rsp.data);
    };
    fetchLectureList();
  }, []);

  console.log(searchLecture);

  return(
    <>
      <Header />
      <BodyContainer>
      <Container>
        {searchLecture
        .filter((item) => item.name.includes(searchInput))
        .map((item) =>(
          <Link to= "/class" style={{textDecoration: "none", color: "inherit"}}>
            <LectureBox key={item.num} onClick={() => setInfo(item.categoryNum, item.num)}>
              <Wish><div><img src={wish} alt="찜" /></div></Wish>
              <Thum imageUrl={item.thum}></Thum>
              <Category>{item.categoryName} | {item.lecturer}</Category>
              <Name>{item.name}</Name>
              <Intro>{item.intro}</Intro>
              <Price>{item.price.toLocaleString()}원</Price>
            </LectureBox>
          </Link>
        ))}
      </Container>
      </BodyContainer>
      <Footer />
    </>
  );
};

export default Search;