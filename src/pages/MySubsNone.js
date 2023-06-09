import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import sign from "../images/warning.png";

const Head = styled.div`
   p {
    font-size: 1.3em;
    font-weight: bold;
  }
`;

const Body = styled.div`


  hr {
    background-color: lightgray;
    border: .3px solid lightgray;
    margin-top: 30px;
    margin-bottom: 50px;
  }
  p {
    font-weight: bold;
  }
  button {
    width: 150px;
    height: 30px;
    border: none;
    border-radius: 2px;
    background-color:  #FC7373;
    text-align: center;
    font-size: 0.9em;
    font-weight: bold;
    color: white;
    margin-top: 50px;
    margin-bottom: 100px;
    cursor: pointer;
  }

  .notification {
    width: 100%;
    height: 30px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    /* border: 1px solid lightgray; */

    img {
      width: 15px;
      height: 15px;
    }

    p {
      font-size: 0.8em;
      font-weight: bold;
      color: darkgray;
      margin-left: 10px;
    }
  }
  
  .notifyDesc {
    width: 70%;
    font-size: 0.8em;
    color: darkgray;

    li {
      font-size: 0.7em;
    }
  }
`;


const MySubsNone = () => {


  return(
    <>
      <Head>
      <p>내 구독권</p>
      </Head>
      <Body>
        <hr />
        <p>현재 이용중인 구독권이 없습니다</p>
        <Link to="/subs"><button>구독권 구매하기</button></Link> {/** 구독권 구매하기 페이지로 링크 걸어둘 예정 */}
        <div className="notification">
          <img src={sign} alt="알림"></img>
          <p>유의사항</p>
        </div>
        <div className="notifyDesc">
          <p>
            <li>하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이
            하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이
            하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이
            하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이
            하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이
            </li>
            <li>하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이
            하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이
            하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이
            하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이
            하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이</li>
            <li>하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이
            하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이
            하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이
            하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이
            하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이</li>
            <li>하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이
            하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이
            하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이
            하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이
            하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이</li>
            <li>하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이
            하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이
            하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이
            하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이
            하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이</li>
            <li>하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이
            하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이
            하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이
            하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이
            하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이</li>
            <li>하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이
            하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이
            하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이
            하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이
            하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이</li>
          </p>
        </div>
      </Body>
    </>
  )
}

export default MySubsNone;