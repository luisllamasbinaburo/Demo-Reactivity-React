import React from 'react';
import ProductItem from './ProductItem';

function ProductList({ products, onSelectProduct, onDeleteProduct }) {
  return (
    <ul className="mt-4">
      {products.map(product => (
        <ProductItem
          key={product.id}
          product={product}
          onSelectProduct={onSelectProduct}
          onDeleteProduct={onDeleteProduct}
        />
      ))}
    </ul>
  );
}

export default ProductList;