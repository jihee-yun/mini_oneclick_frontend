import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import AxiosApi from "../api/AxiosApi";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserStore";
import MypageFooter from "./MypageFooter";
import MypageHeader from "./MypageHeader";
import cancel from "../images/cancel.png";

const BodyContainer = styled.div`
  width: 100vw;
`;

const Container = styled.div`
  background-color: #FEFDFD;
  width: 40%;
  margin: 3px auto;
  border: 1px solid lightgray;
  padding: 30px;
`;

const SectionBox1 = styled.div`
  width: 100%;
  height: 230px;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const Thumbnail = styled.div`
  margin: 0 auto;
  width: 200px;
  height: 150px;
  object-fit: cover;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
`;

const Category = styled.p`
  text-align: center;
  font-size: 0.7rem;
  font-weight: normal;
  margin-top: 5px;
  color: gray;
`;

const Title = styled.h3`
  text-align: center;
  font-size: .8rem;
  font-weight: bold;
  margin-top: 10px;
`;

const Section2 = styled.div`
  position: relative;
  width: 80%;
  /* height: 270px; */
  margin: 0 auto;

  textarea {
    resize: none;
    border: 1px solid lightgray;
    border-radius: 3px;
    width: 100%;
    height: 150px;
  }
  .count {
    color: darkgray;
    font-size: 0.7em;
    position: absolute;
    right: 0;
    bottom: 10px;
  }
`;

const ImgBox = styled.div`
  width: 80%;
  margin: 0 auto;
  margin-top: 25px;
`;

const Attachment = styled.div`
  position: relative;
  width: 100%;
  margin-top: 5px;
  img {
    &:nth-child(1) {
    }
    &:nth-child(2) {
      position: absolute;
      top: 0;
      left: 90px;
      cursor: pointer;
    }
  }
`;

const Write = styled.div`
  width: 80%;
  margin: 30px auto;

  button {
    width: 100%;
    height: 35px;
    font-size: .8em;
    font-weight: bold;
    background-color: #FC7373;
    color: white;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    margin-bottom: 20px;

    &:hover {
      background-color: lightgray;
    }
  }

  .disable-button {
    background-color: darkgray;
    cursor: none;
  }

  hr {
    background-color: lightgray;
    border: .3px solid lightgray;
  }
`;


const MyReviewUpdate = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const { userId } = context;
  const { lectureId, reviewNum } = useParams();

  // 글자 수 표시
  const [inputCount, setInputCount] = useState(0);
  const MAX_LENGTH = 100;

  // 후기 작성, 수정
  const [inputContext, setInputContext] = useState("");

  // 강의 정보
  const [lectureInfo, setlectureInfo] = useState("");

  // 작성된 리뷰 정보 조회
  const [reviewInfo, setReviewInfo] = useState("");

  // 후기 사진
  const [attachment, setAttachment] =useState("");
  const [deleteImg, setDeleteImg] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    const lectureInfo = async() => {
      const response = await AxiosApi.classDetailGet(lectureId);
      if(response.status === 200) setlectureInfo(response.data);
    };
    lectureInfo(); 
  }, [lectureId]);

  useEffect(() => {
    const reviewInfo = async() => {
    const rsp = await AxiosApi.myReviewGet(userId);
    if(rsp.status === 200) setReviewInfo(rsp.data);
    console.log(rsp.data);
    const filteredReviews = rsp.data.filter(review => review.img !== null && review.num === Number(reviewNum));
      if (filteredReviews.length > 0) {
        setAttachment(filteredReviews[0].img);
      }
    }
    reviewInfo();
  },[userId])

  const textInput = (e) => {
    if (e.target.value.length > MAX_LENGTH) {
      e.target.value = e.target.value.slice(0, MAX_LENGTH);
    }
    setInputCount(e.target.value.length);
    setInputContext(e.target.value);
  };

  const changeReview = async() => {
    if(deleteImg === true) {
      const response = await AxiosApi.deleteReviewImg(reviewNum, url);
      console.log(response.data);
    } else if(inputContext){
      const response = await AxiosApi.updateReviewContent(reviewNum, inputContext);
      console.log(response.data);
    } else {
      const response = await AxiosApi.updateReview(reviewNum, inputContext, url);
      console.log(response.data);
    }
    navigate('/MyPage', { state: { selected: "후기" } });
  };

  const clear = () => {
    setAttachment(null);
    setDeleteImg(true);
    setUrl(null);
  }

  return( 
    <>
    <BodyContainer>
      <Container>
      <MypageHeader />
      {lectureInfo && lectureInfo.map(lecture => (
        <SectionBox1 key={lecture.num}>
        <Thumbnail imageUrl={lecture.thum}></Thumbnail>
        <Category>{lecture.categoryName}</Category>
        <Title>{lecture.name}</Title>
        </SectionBox1>
      ))}
      {reviewInfo && reviewInfo.filter(review => review.num === Number(reviewNum)).map(review => (
      <Section2 key={review.num}>
        <textarea cols="30" rows="10" maxLength={MAX_LENGTH} onChange={textInput} placeholder={review.content}></textarea>
        <div id="nowByte" className="count"><span>{inputCount.toLocaleString()}</span>/{MAX_LENGTH.toLocaleString()}자</div>
      </Section2>
      ))}
     <ImgBox>
     <Attachment>
            {attachment && (
              <div>
                <img src={attachment} width="100px" height="100px" alt="attachment" />
                <img src={cancel} alt="취소버튼" width="15px" height="15px" onClick={clear} />
              </div>
            )}
      </Attachment>
      </ImgBox> 
      <Write>
      {(inputContext || deleteImg) ?
      <button onClick={changeReview}>수정하기</button> :
      <button className="disable-button">수정하기</button>}
      <hr />
      </Write>
      <MypageFooter />
      </Container>
    </BodyContainer>
    </>
  )
}

export default MyReviewUpdate;