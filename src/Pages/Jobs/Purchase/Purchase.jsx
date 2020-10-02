import React, { Fragment } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './Purchase.scss';

const pricing = [
  { price: 20, quantity: 1, color: 'red', link: 'one', total: 20 },
  { price: 15, quantity: 5, color: 'blue', link: 'five', total: 15 * 5 },
  { price: 10, quantity: 10, color: 'gold', link: 'ten', total: 10 * 10 },
];

function Purchase(props) {
  return (
    <Fragment>
      <ul className="base-info-list purchase">
        {!props.currentUser && <li>Must create an account</li>}
        <li>Lasts for 45 days</li>
        <li>15 photos, plus a tile image</li>
        <li>Always editable from account page</li>
        <li>Preview job before posting</li>
      </ul>
      <div className="purchase-container">
        {pricing.map((el) => (
          <Tile key={el.price} {...el} currentUser={props.currentUser} />
        ))}
      </div>
    </Fragment>
  );
}

const Tile = ({ price, quantity, color, currentUser, link, total }) => {
  return (
    <div className={classNames('tile', 'base-container', color)}>
      <div className="text-container">
        <div className="buy-text">
          Buy <span className={classNames('spacing', color)}>{quantity}</span>
        </div>
        <div className={classNames('price-text', color)}>
          ${price}
          <span className="each-text">Each</span>
        </div>
      </div>

      <Link
        className="link-btn"
        to={currentUser ? `/purchase-form/${link}` : '/register'}
      >
        <button className="btn-blue btn purchase">Pay ${total}</button>
      </Link>
    </div>
  );
};

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
