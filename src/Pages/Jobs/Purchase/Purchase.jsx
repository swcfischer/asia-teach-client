import React, { Fragment } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './Purchase.scss';

const pricing = [
  { price: 65, quantity: 1, color: 'red', link: 'one', total: 65 },
  { price: 55, quantity: 5, color: 'blue', link: 'five', total: 55 * 5 },
  { price: 45, quantity: 10, color: 'gold', link: 'ten', total: 45 * 10 },
];

function Purchase(props) {
  return (
    <Fragment>
      <ul className="base-info-list purchase">
        {!props.currentUser && (
          <li>
            <strong>Must create an account and be logged in</strong>
          </li>
        )}
        <li>
          Lasts for <strong>45 days</strong>
        </li>
        <li>
          <strong>15 photos</strong>, plus a <strong>tile image</strong>
        </li>
        <li>
          <strong>Always</strong> editable from account page
        </li>
        <li>
          <strong>Preview</strong> job before posting
        </li>
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
