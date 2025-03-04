import React from 'react';

function SubProductList({ subproducts, onUpdateSubproduct, onDeleteSubproduct }) {
  return (
    <ul className="mt-4">
      {subproducts.map((sub, index) => (
        <li key={index} className="mb-2">
          <label>Cantidad:</label>
          <input
            type="number"
            value={sub.quantity}
            onChange={(e) => onUpdateSubproduct(index, e.target.value)}
            className="border p-1 w-full"
          />
          <button
            onClick={() => onDeleteSubproduct(index)}
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