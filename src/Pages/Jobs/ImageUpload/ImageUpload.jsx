import React, { useState, useEffect } from 'react';
import ImageUploader from 'react-images-upload';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './ImageUpload.scss';

function ImageUpload(props) {
  const [defaultPictures, setDefaultPictures] = useState([]);
  const [pictures, setPictures] = useState([]);
  const { uuid } = useParams();
  const { uuid: userUuid } = props.currentUser;

  useEffect(() => {
    async function fetchImages() {
      const { data } = await axios.get(
        `https://historic-arches-33577.herokuapp.com/api/job/image-upload/${uuid}/${userUuid}`
      );
      setDefaultPictures(data.images);
      console.log('data', data);
    }
    fetchImages();
  }, [uuid, userUuid]);

  const handleDrop = async (pictureFiles, pictureDataURLs) => {
    const resizedImages = [];
    const alreadyUploaded = pictureDataURLs.filter((img) =>
      img.match(/asia-teach/)
    );
    for (let img of pictureFiles) {
      const MAX_WIDTH = 900,
        MAX_HEIGHT = 900;
      img = await createImageBitmap(img);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // calculate new size
      const ratio = Math.min(MAX_WIDTH / img.width, MAX_HEIGHT / img.height);
      const width = (img.width * ratio + 0.5) | 0;
      const height = (img.height * ratio + 0.5) | 0;

      // resize the canvas to the new dimensions
      canvas.width = width;
      canvas.height = height;
      // scale & draw the image onto the canvas
      ctx.drawImage(img, 0, 0, width, height);
      resizedImages.push(canvas.toDataURL());
    }
    setPictures([...alreadyUploaded, ...resizedImages]);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    console.log('pictures', pictures);

    const { data } = await axios.post(
      `https://historic-arches-33577.herokuapp.com/api/job/image-upload/${uuid}/${userUuid}`,
      {
        images: pictures,
      }
    );
    console.log('data', data);
  };

  return (
    <div className="upload-container">
      <div className="btn-container">
        <button onClick={handleSave} className="btn btn-green save-btn">
          Save
        </button>
        <Link to={`/post-job/stepper/image-crop/${uuid}`}>
          <button className="btn btn-orange back-btn">Back</button>
        </Link>
        <Link to={`/post-job/stepper/preview/${uuid}`}>
          <button className="btn btn-blue next-btn">Next</button>
        </Link>
      </div>
      <ImageUploader
        className="image-upload-container"
        withIcon={false}
        withPreview
        defaultImages={defaultPictures}
        buttonText="Upload images"
        buttonClassName="btn-image-upload btn btn-blue"
        labelClass="label-image-upload"
        onChange={handleDrop}
        imgExtension={['.jpg', '.png', '.jpeg']}
        maxFileSize={5242880}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentUser: state.app.currentUser,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ImageUpload);
