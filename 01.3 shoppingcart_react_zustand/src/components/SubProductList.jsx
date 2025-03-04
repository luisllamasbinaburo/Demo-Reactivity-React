import React from 'react';
import useStore from '../store';

function SubProductList() {
  const {
    selectedProduct,
    updateSubproduct,
    deleteSubproduct,
  } = useStore();

  return (
    <ul className="mt-4">
      {selectedProduct?.subproducts.map((sub, index) => (
        <li key={index} className="mb-2">
          <label>Cantidad:</label>
          <input
            type="number"
            value={sub.quantity}
            onChange={(e) => updateSubproduct(selectedProduct.id, index, Number(e.target.value))}
            className="border p-1 w-full"
          />
          <button
            onClick={() => deleteSubproduct(selectedProduct.id, index)}
            className="bg-red-500 text-white px-2 py-1 rounded mt-2"
          >
            Eliminar Subproducto
          </button>
        </li>
      ))}
    </ul>
  );
}

export default SubProductList;
