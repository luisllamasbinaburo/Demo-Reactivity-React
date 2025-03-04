import React from 'react';
import ProductItem from './ProductItem';
import useStore from '../store';

function ProductList() {
  const { products, selectProduct, deleteProduct } = useStore();

  return (
    <ul className="mt-4">
      {products.map(product => (
        <ProductItem
          key={product.id}
          product={product}
          onSelectProduct={() => selectProduct(product)}
          onDeleteProduct={() => deleteProduct(product.id)}
        />
      ))}
    </ul>
  );
}

export default ProductList;
