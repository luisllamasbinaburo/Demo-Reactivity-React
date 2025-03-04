import React from 'react';

function Summary({ products }) {
  const totalPrice = products.reduce((sum, product) =>
    sum + product.price * product.subproducts.reduce((subSum, sub) => subSum + sub.quantity, 0), 0);

  const totalItems = products.reduce((sum, product) =>
    sum + product.subproducts.reduce((subSum, sub) => subSum + sub.quantity, 0), 0);

  return (
    <div className="mt-4">
      <p>Total: ${totalPrice.toFixed(2)}</p>
      <p>Total Items: {totalItems}</p>
    </div>
  );
}

export default Summary;