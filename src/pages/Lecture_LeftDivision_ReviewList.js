import React, { useContext } from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { UserContext } from "../context/UserStore";
import account from "../images/account.png"
import { getStorage, ref, uploadBytes, storage, getDownloadURL } from "firebase/storage";
import AxiosApi from "../api/AxiosApi";
import ModalReviewDel from "../utils/ModalReviewDel";

const Container = styled.div`
  width: 100%;
  .containerbox {
    display: flex;
    flex-direction: row;
  }
  .reviewbox {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 15px;

    width: 95%;
    border: 1px solid #D7D6D6;
    border-radius: 5px;
    margin: 10px auto;
  }

  .reviewhead {
    display: flex;
  }
  img {
    width: 70px;
    height: 70px;
    border: 1px solid lightgray;
  }

  .title {
    display:flex;
    align-items: center;
    width: 75%;
    height: 70px;
    font-size: 0.8em;
    font-weight: bold;
    margin-left: 10px;
    p {
      &:nth-child(2) {
       position: absolute;
       top: 63px;
       font-size: 0.6em;
       color: darkgray;
      }
    }
  }

  .contents {
    margin-top: 10px;
    width: 100%;
    font-size: 0.7em;
    color: darkgray;
  }

  hr {
    background-color: lightgray;
    border: .3px solid lightgray;
  }
  
  button {
    margin: 2px;
    border: 1px solid lightgray;
    border-radius: 2px;
    width: 15%;
    background-color: white;
    color: darkgray;
    font-size: 0.7em;
    &:hover {
      background-color: lightgray;
      color: white;
      cursor: pointer;
    }
  }

  .activeBtnStyle {
    display: flex;
    justify-content: right;
    align-items: center;
  }

  .noBtnStyle {
    display:none;
  }
`
// 부모 컴포넌트는 Lecture_LeftDivision_ReviewWrite
const ReviewList = ({reviewNum, member, title, content, img}) => {
  // 리뷰 한 개씩 불러올 때 사진을 올리지 않았으면 Default 사진으로 불러오게 하기
  // + firebase 사용해서 불러오기
  if(img === null) img = account;

  // context에서 사용자 PK 불러오기
  const context = useContext(UserContext);
  const {memberNum} = context;
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteChk, setDeleteChk] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const checkDelete = () => {
    if(deleteChk) deleteReview();
  }
  const deleteReview = async() => {
    const response = await AxiosApi.deleteReview(reviewNum);
    if(response.status === 200) {
      alert("리뷰가 삭제됐습니다.");
    }
  }
  return (
    <Container>
      <div className="reviewbox">
        <div className="reviewhead">
          <img src={img} alt="강의이미지" />
          <div className="title">{title}</div>
        </div>
        <div className="contents">
          <hr />
          <p>{content}</p>
        </div>
        {/* 자신이 쓴 후기만 삭제, 수정 버튼이 뜨도록 */}
        <div className={member === memberNum ? ".activeBtnStyle" : "noBtnStyle"}>
          <button>수정하기</button>
          <button onClick={openModal}>삭제하기</button>
        </div>
        {/* 삭제 확인 모달 */}
        {modalOpen ?
          <ModalReviewDel open={modalOpen} setDeleteChk={setDeleteChk} close={closeModal} >
            <div>삭제하시겠습니까?</div>
          </ModalReviewDel> 
          : null
        }
    </div>
  </Container>
  )
}

export default ReviewList;