import React, { useState } from "react";
import styled from "styled-components";
import Payment from "./Payment";
import Header from "./Header";
import Footer from "./Footer";



const Container = styled.div`
  margin: 50px 0 100px 0;
  background-color: #FEFDFD;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* border: 1px solid lightgray; */
  padding: 20px;
  width: 100%;
`;

const Subscriptions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`;

const SubscriptionContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
`;

const SubscriptionLabel = styled.label`
  margin-left: 10px;
  font-size: 18px;
  font-weight: bold;
  color: black;
  cursor: pointer;
  transition: color 1.3s ease;

  &:hover {
    color: #333;
  }
`;

const Price = styled.div`
  margin-top: 40px;
  font-size: 28px;
  font-weight: bold;
  color: black;
`;

const SpanStyle = styled.span`
  font-size: 14px;
  color: gray;
`;

const Subs = () => {
  const [subscription, setSubscription] = useState("");
  const [price, setPrice] = useState(0);
  console.log(price);

  const handleSubscriptionChange = (e) => {
    const value = e.target.value;
    setSubscription(value);

    
    // const [subsType, setSubsType] = useState(""); 사용불가능..
    

    switch (value) {
      case "threeMonth":
        setPrice(300000);
        // subsType = "3개월";
        break;
      case "sixMonth":
        setPrice(600000);
        // subsType = "6개월";
        break;
      case "twelveMonth":
        setPrice(900000);
        // subsType = "12개월";
        break;
      default:
        setPrice(0);
        break;
    }
  }

  return(
    <>
    <Header />
    <Container>
      <h1 className="title">정기 구독권</h1>
      <Subscriptions>
        <SubscriptionContainer>
          <input
            type="checkbox"
            id="threeMonth"
            name="subscription"
            value="threeMonth"
            checked={subscription === "threeMonth"}
            onChange={handleSubscriptionChange}
          />
          <SubscriptionLabel htmlFor="threeMonth">3개월 구독권 <SpanStyle>(클릭시 할인금액 확인)</SpanStyle></SubscriptionLabel>
        </SubscriptionContainer>
        <SubscriptionContainer>
          <input
            type="checkbox"
            id="sixMonth"
            name="subscription"
            value="sixMonth"
            checked={subscription === "sixMonth"}
            onChange={handleSubscriptionChange}
          />
          <SubscriptionLabel htmlFor="sixMonth">6개월 구독권 <SpanStyle>(클릭시 할인금액 확인)</SpanStyle></SubscriptionLabel>
        </SubscriptionContainer>
        <SubscriptionContainer>
          <input
            type="checkbox"
            id="twelveMonth"
            name="subscription"
            value="twelveMonth"
            checked={subscription === "twelveMonth"}
            onChange={handleSubscriptionChange}
          />
          <SubscriptionLabel htmlFor="twelveMonth">12개월 구독권 <SpanStyle>(클릭시 할인금액 확인)</SpanStyle></SubscriptionLabel>
        </SubscriptionContainer>
      </Subscriptions>
      {price >= 0 && (
        <>
          <Price>{`${price.toLocaleString()} 원`}</Price>
          <Payment price={price}></Payment>
        </>
      )}
    </Container>
    <Footer />
    </>
  );
};

export default Subs;