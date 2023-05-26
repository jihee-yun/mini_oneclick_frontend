import React, { useState, useContext } from "react";
import styled from "styled-components";
import AxiosApi from "../api/AxiosApi";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserStore";
import Modal from "../utils/Modal";

const Container = styled.div`
`;

const RePayBtn = styled.button`
  
  margin-top: 20px;
  padding: 10px 20px;
  border: none;
  background-color: #fc7373;
  color: white;
  font-weight: bold;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  /* 모바일 */
  @media (max-width: 768px) {
    width: 100%;
  }
`;



const RefundClass = () => {
  const { paymentNum } = useContext(UserContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const onClickPayBackClass = async () => {
    console.log("환불 paymentNum : " + paymentNum);

    try {
      const response = await AxiosApi.payBackClass(paymentNum);
      const isRefund = response.data;
      if (isRefund) {
        console.log("환불 성공");
        alert("환불이 완료되었습니다. 더 좋은 강의로 보답하겠습니다.");
        navigate("/home");
      } else {
        console.error("환불 오류");
        navigate("/home");
      }
    } catch (error) {
      console.error("환불 요청 중 오류가 발생했습니다", error);
      navigate("/home");
    }
  };

  return (
    <Container>
      <RePayBtn className="btn" onClick={openModal}>환불하기</RePayBtn>
      <Modal
        open={showModal}
        close={closeModal}
        header="환불 확인"
        confirm={onClickPayBackClass} // 환불 로직 실행
        type
      >
        <p>※ 수강기간이 종료된 강의는 환불 불가입니다. ※ 위약금 = 실제 판매금액의 10% ※ 학습수수료 및 공제수수료는 실제 수강한 강의의 단과강의 판매 가격을 기준으로 계산합니다. 정말로 환불하시겠습니까?</p>
      </Modal>
    </Container>
  );
};

export default RefundClass;
