import React from 'react';
import SubProductList from './SubProductList';
import useStore from '../store';

function ProductDetails() {
  const {
    selectedProduct,
    updateProduct,
    addSubproduct,
  } = useStore();

  if (!selectedProduct) return null;

  return (
    <div>
      <h2 className="text-xl font-bold">Detalles del Producto</h2>
      <div className="mt-4">
        <label>Descripción:</label>
        <input
          type="text"
          value={selectedProduct.description}
          onChange={(e) => updateProduct(selectedProduct.id, 'description', e.target.value)}
          className="border p-1 w-full"
        />
      </div>
      <div className="mt-4">
        <label>Precio:</label>
        <input
          type="number"
          value={selectedProduct.price}
          onChange={(e) => updateProduct(selectedProduct.id, 'price', parseFloat(e.target.value))}
          className="border p-1 w-full"
        />
      </div>
      <div className="mt-4">
        <button onClick={() => addSubproduct(selectedProduct.id)} className="bg-green-500 text-white px-4 py-2 rounded">
          Añadir Subproducto
        </button>
      </div>
      <SubProductList/>
    </div>
  );
}

export default ProductDetails;
