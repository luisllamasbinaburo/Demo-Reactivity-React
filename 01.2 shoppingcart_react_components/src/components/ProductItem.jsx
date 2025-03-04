import React from 'react';

function ProductItem({ product, onSelectProduct, onDeleteProduct }) {
  return (
    <li className="mb-2 p-2 border rounded">
      <div onClick={() => onSelectProduct(product.id)} className="cursor-pointer">
        <p>{product.description}</p>
        <p>Precio: ${product.price}</p>
        <p>Subtotal: ${(product.price * product.subproducts.reduce((sum, sub) => sum + sub.quantity, 0)).toFixed(2)}</p>
      </div>
      <button onClick={() => onDeleteProduct(product.id)} className="bg-red-500 text-white px-2 py-1 rounded mt-2">
        Eliminar
      </button>
    </li>
  );
}

export default ProductItem;