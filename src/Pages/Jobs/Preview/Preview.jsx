import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './Preview.scss';

const Preview = (props) => {
  const { userUuid } = props;
  const { uuid } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [previewData, setPreviewData] = useState({});

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(`/api/job/preview/${uuid}/${userUuid}`);
      console.log('data', data);
      setPreviewData(data);
      setIsLoading(false);
    }

    fetchData();
  }, [userUuid, uuid]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return <div>{JSON.stringify(previewData, null, 4)}</div>;
};

const mapStateToProps = (state) => ({
  userUuid: state.app.currentUser.uuid,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Preview);
