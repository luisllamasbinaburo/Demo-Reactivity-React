import React from 'react';
import SubProductList from './SubProductList';

function ProductDetails({ product, onUpdateProduct, onAddSubproduct, onUpdateSubproduct, onDeleteSubproduct }) {
  return (
    <div>
      <h2 className="text-xl font-bold">Detalles del Producto</h2>
      <div className="mt-4">
        <label>Descripción:</label>
        <input
          type="text"
          value={product.description}
          onChange={(e) => onUpdateProduct(product.id, 'description', e.target.value)}
          className="border p-1 w-full"
        />
      </div>
      <div className="mt-4">
        <label>Precio:</label>
        <input
          type="number"
          value={product.price}
          onChange={(e) => onUpdateProduct(product.id, 'price', parseFloat(e.target.value))}
          className="border p-1 w-full"
        />
      </div>
      <div className="mt-4">
        <button onClick={() => onAddSubproduct(product.id)} className="bg-green-500 text-white px-4 py-2 rounded">
          Añadir Subproducto
        </button>
      </div>
      <SubProductList
        subproducts={product.subproducts}
        onUpdateSubproduct={(index, quantity) => onUpdateSubproduct(product.id, index, quantity)}
        onDeleteSubproduct={(index) => onDeleteSubproduct(product.id, index)}
      />
    </div>
  );
}

export default ProductDetails;