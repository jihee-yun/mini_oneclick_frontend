import React from "react";
import styled from "styled-components";
import cancel from "../images/cancel.png";

const UploadSection = styled.div`
  width: 80%;
  margin: 0 auto;
  padding-top: 10px;

  .upload {
    display: none;
  }
`;

const ImgContainer = styled.div`
  .btn-upload,
  button {
    width: 55px;
    height: 20px;
    background: #fff;
    border: 1px solid lightgray;
    border-radius: 3px;
    font-weight: bold;
    font-size: 0.7em;
    color: darkgray;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: lightgray;
      color: white;
      border: none;
    }
  }

  #file {
    display: none;
  }
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

const MyReviewImgUpload = ({ handleFileInputChange, attachment, onClearAttachment }) => {
  return (
    <UploadSection>
      <ImgContainer>
        <div>
          <label htmlFor="file">
            <div className="btn-upload">사진 첨부</div>
          </label>
          <input type="file" id="file" accept="image/*" onChange={handleFileInputChange} />
          <Attachment>
            {attachment && (
              <div>
                <img src={attachment} width="100px" height="100px" alt="attachment" />
                <img src={cancel} alt="취소버튼" width="15px" height="15px" onClick={onClearAttachment} />
              </div>
            )}
          </Attachment>
        </div>
      </ImgContainer>
    </UploadSection>
  );
};

export default MyReviewImgUpload;