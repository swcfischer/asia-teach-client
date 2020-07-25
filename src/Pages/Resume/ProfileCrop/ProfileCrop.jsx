import axios from 'axios';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactCrop from 'react-image-crop';
import ReactModal from 'react-modal';
import ReactLoading from 'react-loading';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';

import { API_ROOT } from 'api-config';

import 'react-image-crop/dist/ReactCrop.css';

import './ProfileCrop.scss';

function ProfileCrop(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [isShowModal, setShowModal] = useState(false);
  const [src, setSrc] = useState(null);
  const [databaseSrc, setDatabaseSrc] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  const [crop, setCrop] = useState({
    unit: '%',
    width: 30,
    aspect: 1,
  });

  const { userUuid } = useParams();

  const imageUploadRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    async function fetchThumnail() {
      const { data } = await axios.get(
        API_ROOT + `/api/post-resume/profile-image/${userUuid}`
      );

      setDatabaseSrc(data.profileImage);
      setIsLoading(false);
    }
    fetchThumnail();
  }, [userUuid]);

  const onSelectFile = useCallback(
    (e) => {
      if (e.target.files && e.target.files.length > 0) {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
          setSrc(reader.result);
          setShowModal(true);
        });
        reader.readAsDataURL(e.target.files[0]);
      }
    },
    [setSrc, setShowModal]
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

      setShowModal(false);
      setBase64Image(null);
    },
    [setShowModal]
  );

  const handleImageSave = useCallback(
    async (event) => {
      event.preventDefault();
      // ! Double check that this works
      if (base64Image) {
        setIsLoading(true);
        const { data } = await axios.patch(
          API_ROOT + `/api/post-resume/profile-image/${userUuid}`,
          {
            profileImage: base64Image,
          }
        );

        setIsLoading(false);
        setShowModal(false);
        // ! not doing anyting with the return data
        if (data.error) {
          return toast.error(data.message);
        }
        return toast.success(data.message);
      }
    },
    [base64Image, userUuid]
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
    <div className="resume-crop-container">
      <div className="base-container resume-crop-tile">
        <div className="inner-upload-container">
          <div className="tile-image-container">
            <div className="left-btn-container">
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
                onClick={() => setShowModal(true)}
              >
                Edit
              </button>
            </div>
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
          <Link
            className="btn btn-orange"
            to={`/post-resume/details/${userUuid}`}
          >
            Back
          </Link>
          <Link className="btn btn-blue" to={`/post-resume/resume/${userUuid}`}>
            Next
          </Link>
        </div>
        <CropModal
          isShowModal={isShowModal}
          src={src}
          crop={crop}
          onImageLoaded={onImageLoaded}
          onCropChange={onCropChange}
          onCropComplete={onCropComplete}
          handleCloseModal={handleCloseModal}
          handleImageSave={handleImageSave}
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
  handleImageSave,
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
          circularCrop
          onComplete={onCropComplete}
          onChange={onCropChange}
        />
      )}
      <button className="close-btn" onClick={handleCloseModal}>
        <IoIosCloseCircleOutline className="close-btn-icon" />
      </button>
      <button className="save-btn btn btn-green" onClick={handleImageSave}>
        Save
      </button>
    </ReactModal>
  );
};

export default ProfileCrop;
