import React from 'react';
import useStore from '../store';

function Summary() {
    const {
      getTotalPrice,
      getTotalItems,
    } = useStore();

  return (
    <div className="mt-4">
      <p>Total: ${getTotalPrice().toFixed(2)}</p>
      <p>Total Items: { getTotalItems()}</p>
    </div>
  );
}

export default Summary;
