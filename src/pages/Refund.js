// 구독 환불
import React from "react";
import AxiosApi from "../api/AxiosApi";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import UserStore, { UserContext } from "../context/UserStore";
import { useContext } from "react";
import { useState } from "react";
import Modal from "../utils/Modal";
import { useParams } from "react-router-dom/dist";

const Container = styled.div`
  display: flex;
  `;

const RePayBtn = styled.button`margin-top: 20px;
  padding: 10px 20px;
  border: none;
  background-color: #FC7373;
  color: white;
  font-weight: bold;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  /* 모바일 */
  @media (max-width: 768px) {
      width: 100%;
  }`;


const Refund = () => {
  // 해당 PaySubNum 갖고와서 쏴주면 끝.
  const paySubNum = 10;


  const navigate = useNavigate(); // 환불성공시 홈으로;
  const [showModal, setShowModal] = useState(false);
  
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  

  const onClickPayBack = async() => {
    console.log("환불 paymentNum : " + paySubNum);
    try {
      const response = await AxiosApi.payBack(paySubNum);
      const isRefund = response.data;
      if(isRefund) {
        console.log("구독권 환불 성공");
        alert("구독권 환불이 완료되었습니다. 더 좋은 혜택으로 보답하겠습니다.");
        navigate("/home"); // 구독권 환불 성공시 일단 홈으로 이동
      } else {
        console.error("환불 오류");
        navigate("/home"); // 환불실패시 일단 홈으로 이동 
      }
    } catch (error) {
      console.error("환불 요청 중 오류가 발생했습니다", error);
      navigate("/home"); // 이하동문
    };
    
  };

  return(
    <Container>
      <RePayBtn onClick={openModal}>환불하기</RePayBtn>
      <Modal
        open={showModal}
        close={closeModal}
        header="구독권 환불 확인"
        confirm={onClickPayBack} // 구독권 환불 로직 실행
        type
      >
        <p>※ 수강기간이 종료된 강의는 환불 불가입니다. ※ 위약금 = 실제 판매금액의 10% ※ 학습수수료 및 공제수수료는 실제 수강한 강의의 단과강의 판매 가격을 기준으로 계산합니다. 정말로 환불하시겠습니까?</p>
      </Modal>
    </Container>
  );
};

export default Refund;