import axios from 'axios';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactCrop from 'react-image-crop';
import ReactModal from 'react-modal';
import ReactLoading from 'react-loading';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import { API_ROOT } from 'api-config';

import 'react-image-crop/dist/ReactCrop.css';

import './ImageCrop.scss';
import { bindActionCreators } from 'redux';

function ImageCrop(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [isShowModal, setIsShowModal] = useState(false);
  const [src, setSrc] = useState(null);
  const [databaseSrc, setDatabaseSrc] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  const [crop, setCrop] = useState({
    unit: '%',
    width: 50,
    aspect: 16 / 9,
  });

  const { uuid: userUuid } = props.currentUser;
  const { uuid } = useParams();

  const imageUploadRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    async function fetchThumnail() {
      const { data } = await axios.get(
        API_ROOT + `/api/job/image-crop/${uuid}/${userUuid}`
      );

      setDatabaseSrc(data.thumbnail);
      setIsLoading(false);
    }
    fetchThumnail();
  }, [userUuid, uuid]);

  const onSelectFile = useCallback(
    (e) => {
      if (e.target.files && e.target.files.length > 0) {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
          setSrc(reader.result);
          setIsShowModal(true);
        });
        reader.readAsDataURL(e.target.files[0]);
      }
    },
    [setSrc, setIsShowModal]
  );

  const onImageLoaded = useCallback(
    (image) => {
      imageRef.current = image;
    },
    [imageRef]
  );

  const setCroppedImg = useCallback(
    (image, crop) => {
      const canvas = document.createElement('canvas');
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext('2d');
      // debugger;
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );
      const base64Image = canvas.toDataURL();
      setBase64Image(base64Image);
    },
    [setBase64Image]
  );

  const makeClientCrop = useCallback(
    (crop) => {
      if (imageRef && imageRef.current && crop.width && crop.height) {
        setCroppedImg(imageRef.current, crop);
      }
    },
    [imageRef, setCroppedImg]
  );

  const onCropComplete = useCallback(
    (crop) => {
      makeClientCrop(crop);
    },

    [makeClientCrop]
  );

  const onCropChange = useCallback(
    (crop, percentCrop) => {
      // You could also use percentCrop:
      // this.setState({ crop: percentCrop });
      setCrop(crop);
    },
    [setCrop]
  );

  const handlePublish = useCallback(
    (event) => {
      event.preventDefault();
      // I am going to want to store the cropped image
      // and the carousel images in s3 and then save the strings

      // for now, I'm just going to switch the job to isPublished: true
      axios.post(API_ROOT + `/api/job/publish/${uuid}/${userUuid}`);
    },
    [uuid, userUuid]
  );

  const handleImageUploadClick = useCallback(
    (event) => {
      event.preventDefault();
      if (imageUploadRef && imageUploadRef.current) {
        imageUploadRef.current.click();
      }
    },
    [imageUploadRef]
  );

  const handleCloseModal = useCallback(
    (event) => {
      event.preventDefault();
      setIsShowModal(false);
    },
    [setIsShowModal]
  );

  const handleImageSave = useCallback(
    async (event) => {
      event.preventDefault();

      if (base64Image) {
        setIsLoading(true);
        const { data } = await axios({
          method: 'post',
          url: API_ROOT + `/api/job/image-crop/${uuid}/${userUuid}`,
          data: {
            thumbnail: base64Image,
          },
        });

        if (data.success) {
          toast.info(data.message);
        } else {
          toast.error(data.message);
        }

        setIsLoading(false);
        // ! not doing anyting with the return data
        console.log('data', data);
      }
    },
    [base64Image, uuid, userUuid]
  );

  if (isLoading) {
    // Check if this is right
    return (
      <div className="base-loading-container">
        <ReactLoading type="spin" color="#333" />
      </div>
    );
  }

  return (
    <div className="image-crop-container">
      <div className="btn-container">
        <button onClick={handleImageSave} className="btn btn-green save-btn">
          Save
        </button>
        <Link to={`/post-job/stepper/description/${uuid}`}>
          <button className="btn btn-orange back-btn">Back</button>
        </Link>
        <Link to={`/post-job/stepper/carousel-images/${uuid}`}>
          <button className="btn btn-blue next-btn">Next</button>
        </Link>
      </div>
      <div className="base-container image-crop-tile">
        <div className="inner-upload-container">
          <div className="tile-image-container">
            <label htmlFor="tile-image" className="image-upload-label">
              Upload Header Image
            </label>
            <input
              ref={imageUploadRef}
              type="file"
              id="tile-image"
              accept="image/*"
              onChange={onSelectFile}
            />
          </div>
          {base64Image || databaseSrc ? (
            <img
              alt="Crop"
              className="image-preview"
              src={
                base64Image ? base64Image : `${databaseSrc}?random=${uuidv4()}`
              }
              onClick={handleImageUploadClick}
            />
          ) : (
            <div
              onClick={handleImageUploadClick}
              className="image-upload-button"
            >
              Click upload button
            </div>
          )}
        </div>
        <div className="inner-btn-container">
          <button
            className="btn btn-blue upload-image"
            onClick={handleImageUploadClick}
          >
            Upload
          </button>
          <button
            className={classNames('btn btn-blue edit-crop', {
              'is-disabled': !src,
            })}
            onClick={() => setIsShowModal(true)}
          >
            Edit
          </button>
        </div>
        <button onClick={handlePublish}>published</button>
        <CropModal
          isShowModal={isShowModal}
          src={src}
          crop={crop}
          onImageLoaded={onImageLoaded}
          onCropChange={onCropChange}
          onCropComplete={onCropComplete}
          handleCloseModal={handleCloseModal}
        />
      </div>
    </div>
  );
}

ReactModal.setAppElement('body');

const CropModal = ({
  isShowModal,
  src,
  crop,
  onImageLoaded,
  onCropChange,
  onCropComplete,
  handleCloseModal,
}) => {
  return (
    <ReactModal
      isOpen={isShowModal}
      contentLabel="Carousel Modal"
      className="image-crop-modal"
      overlayClassName="image-crop-overlay"
    >
      {src && (
        <ReactCrop
          src={src}
          crop={crop}
          ruleOfThirds
          onImageLoaded={onImageLoaded}
          onComplete={onCropComplete}
          onChange={onCropChange}
        />
      )}
      <button className="close-btn" onClick={handleCloseModal}>
        <IoIosCloseCircleOutline className="close-btn-icon" />
      </button>
    </ReactModal>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.app.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ImageCrop);
