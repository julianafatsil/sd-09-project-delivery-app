import React from 'react';
import PropTypes from 'prop-types';
import dataTestIds from '../utils/dataTestIds';

function OrderCard({
  role,
  id,
  total_price: price,
  delivery_address: adress,
  delivery_number: addressNumber,
  sale_date: date,
  status,
}) {
  const handleClick = () => {};

  const statusDiv = (userRole) => {
    if (userRole === 'seller') {
      return (
        <div>
          <button
            type="button"
            onClick={ handleClick }
            data-testid={ dataTestIds[49] }
          >
            { status }
          </button>
        </div>
      );
    }
    return (
      <div>
        <p
          data-testid={ dataTestIds[34] }
        >
          { status }
        </p>
      </div>
    );
  };

  const addressDiv = () => (
    <div>
      <p data-testid={ dataTestIds[52] }>{ `${adress}, ${addressNumber}` }</p>
    </div>
  );

  return (
    <div>
      <div>
        <div>
          <p
            data-testid={ userRole === 'seller' ? dataTestIds[33] : dataTestIds[48] }
          >
            { `Pedido: ${id}` }
          </p>
        </div>
        { statusDiv(role) }
        <div>
          <p
            data-testid={ userRole === 'seller' ? dataTestIds[50] : dataTestIds[35] }
          >
            { date }
          </p>
          <p
            data-testid={ userRole === 'seller' && dataTestIds[51] }
          >
            { price }
          </p>
        </div>
      </div>
      { role === 'seller' && addressDiv() }
    </div>
  );
}

OrderCard.propTypes = {
  role: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  total_price: PropTypes.number.isRequired,
  delivery_address: PropTypes.string.isRequired,
  delivery_number: PropTypes.number.isRequired,
  sale_date: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default OrderCard;
