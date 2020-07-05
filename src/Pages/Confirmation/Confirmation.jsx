import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';
import axios from 'axios';
import { API_ROOT } from 'api-config';

function Confirmation() {
  const match = useRouteMatch();
  const history = useHistory();
  const { token } = match.params;
  useEffect(() => {
    async function confirmUser() {
      const { data } = await axios.post(API_ROOT + `/api/confirmation/`, {
        token,
      });

      if (data.error) {
        toast.error(data.message);
        return history.pushState('/');
      }

      toast.success(data.message);
      history.push('/login');
    }

    confirmUser();
  }, [history, token]);
  return (
    <div className="base-loading-container">
      <ReactLoading color="#000" type="spin" />
    </div>
  );
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);
