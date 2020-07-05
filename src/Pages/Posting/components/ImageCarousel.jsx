import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import classNames from 'classnames';

import { API_ROOT } from 'api-config';

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import { IoIosCloseCircleOutline } from 'react-icons/io';

import ReactLoading from 'react-loading';

import './ImageCarousel.scss';

const ImageCarousel = (props) => {
  const { handleClose } = props;
  const { uuid } = useParams();
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(API_ROOT + `/api/job/images/${uuid}`);

      setImages(data.images);
      setIsLoading(false);
    }

    fetchData();
  }, [uuid]);

  const handleNext = useCallback(() => {
    if (index < images.length - 1) {
      setIndex(index + 1);
    } else if (index === images.length - 1) {
      setIndex(0);
    }
  }, [index, images]);

  const handleBack = useCallback(() => {
    if (index > 0) {
      setIndex(index - 1);
    } else if (index === 0) {
      setIndex(images.length - 1);
    }
  }, [index, images]);

  const handleSlideSelect = (idx) => (e) => {
    e.preventDefault();
    setIndex(idx);
  };

  if (isLoading) {
    return (
      <div className="base-loading-container">
        <ReactLoading color="#000" type="spin" />
      </div>
    );
  }
  return (
    <div className="image-carousel-container">
      <button onClick={handleClose} className="close-btn">
        <IoIosCloseCircleOutline />
      </button>
      <button className="back-image-btn" onClick={handleBack}>
        <FaArrowLeft />
        BACK
      </button>
      <button className="next-image-btn" onClick={handleNext}>
        NEXT <FaArrowRight />
      </button>
      <ul className="circle-container">
        {images &&
          images.map((url, idx) => (
            <li onClick={handleSlideSelect(idx)} key={idx}>
              <button
                className={classNames('circle-button', {
                  selected: index === idx,
                })}
              />
            </li>
          ))}
      </ul>
      <div className="bg-gradient"></div>
      {images.map((el, idx) => (
        <img
          key={idx}
          className={classNames('carousel-image', { selected: idx === index })}
          alt="school scene"
          src={el}
        />
      ))}
    </div>
  );
};

export default ImageCarousel;
