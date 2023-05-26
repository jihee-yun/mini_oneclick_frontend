import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import AxiosApi from "../api/AxiosApi";
import { UserContext } from "../context/UserStore";
import { Link } from "react-router-dom";

const SideBar = styled.div`
  width: 300px;
  display: flex;
  float: right;
  flex-direction: column;
  /* gap: 10px; */
  margin-top: -30px;

  h3 {
    margin-left: 0;
  }
`;

const TopBox = styled.div`
  display: flex;
  align-items: center;
`;

const Thum = styled.div`
  margin-right: 10px;
  width: 100px;
  height: 60px;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
`;

const InfoBox = styled.div`
  width: 200px;
  height: 60px;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;

const Category = styled.div`
  font-size: 0.6rem;
  color: gray;
`;

const Name = styled.div`
  font-size: 0.8rem;
`;


const Sidebar = () => {
  const [topLectuer, setTopLectuer] = useState("");
  const context = useContext(UserContext);
  const { setCategoryNum, setLectureNum } = context;


  useEffect(() => {
    const topLectuer = async() => {
      const rsp = await AxiosApi.likeCountGet("ALL");
      if(rsp.status === 200) setTopLectuer(rsp.data);
    };
    topLectuer();
  }, []);

  const setInfo = (cateNum, lecNum) => {
    console.log(cateNum);
    setCategoryNum(cateNum);
    setLectureNum(lecNum);
  };

  console.log(topLectuer);

  return(
    <>
    <SideBar>
      <h3>Top 10 Class</h3>
      {topLectuer && topLectuer.map(items => (
        <Link to="/class" style={{textDecoration: "none", color: "inherit"}}>
          <TopBox key={items.num} onClick={() => setInfo(items.categoryNum, items.num)}>
              <Thum imageUrl={items.thum}></Thum>
              <InfoBox>
                <Category>{items.categoryName}</Category>
                <Name>{items.name}</Name>
              </InfoBox>
          </TopBox>
        </Link>
      ))}

    </SideBar>
    </>
  );
};

export default Sidebar;