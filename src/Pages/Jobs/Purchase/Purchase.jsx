import React, { Fragment, useCallback } from 'react';
import axios from 'axios';
// import classNames from 'classnames';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { API_ROOT } from 'api-config';
import { toast } from 'react-toastify';

import './Purchase.scss';

// const pricing = [
//   { price: 20, quantity: 1, color: 'red', link: 'one', total: 20 },
//   { price: 15, quantity: 5, color: 'blue', link: 'five', total: 15 * 5 },
//   { price: 10, quantity: 10, color: 'gold', link: 'ten', total: 10 * 10 },
// ];

function Purchase(props) {
  const history = useHistory();

  const handleCreateJob = useCallback(
    (e) => {
      e.preventDefault();
      async function createJob() {
        const { data } = await axios.post(
          API_ROOT + '/api/jobs/create/' + props?.currentUser?.uuid
        );

        if (data.errorType === 'HAS_JOB') {
          toast.error('You already have an unpublished job');
          return history.push('/account');
        } else if (data.error) {
          history.push('/register');
          return toast.error('You must login or create an account first');
        }

        if (!data.error) {
          history.push('/account/unpublished');
          toast.success(data.message);
        }
      }

      createJob();
    },
    [history]
  );

  return (
    <Fragment>
      <ul className="base-info-list purchase">
        {!props.currentUser && <li>Must create an account</li>}
        <li>Lasts for 45 days</li>
        <li>15 photos, plus a tile image</li>
        <li>Always editable from account page</li>
        <li>Preview job before posting</li>
      </ul>
      <div className="purchase-button-container increased-size">
        <button className="btn-blue btn purchase" onClick={handleCreateJob}>
          Create Job <span className="plus"></span>
        </button>
      </div>
      {/* <div className="purchase-container">
        {pricing.map((el) => (
          <Tile key={el.price} {...el} currentUser={props.currentUser} />
        ))}
      </div> */}
    </Fragment>
  );
}

// const Tile = ({ price, quantity, color, currentUser, link, total }) => {
//   return (
//     <div className={classNames('tile', 'base-container', color)}>
//       <div className="text-container">
//         <div className="buy-text">
//           Buy <span className={classNames('spacing', color)}>{quantity}</span>
//         </div>
//         <div className={classNames('price-text', color)}>
//           ${price}
//           <span className="each-text">Each</span>
//         </div>
//       </div>

//       <Link
//         className="link-btn"
//         to={currentUser ? `/purchase-form/${link}` : '/register'}
//       >
//         <button className="btn-blue btn purchase">Pay ${total}</button>
//       </Link>
//     </div>
//   );
// };

export default connect(
  (state) => {
    return {
      currentUser: state.app.currentUser,
    };
  },
  (dispatch) => {
    return {};
  }
)(Purchase);
