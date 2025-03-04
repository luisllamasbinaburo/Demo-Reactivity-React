import React, { useState } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);

  // Función para añadir un nuevo producto
  const addProduct = () => {
    const newProduct = {
      id: Date.now(),
      description: 'Nuevo Producto',
      price: 0,
      subproducts: [],
    };
    setProducts([...products, newProduct]);
  };

  // Función para eliminar un producto
  const deleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
    if (selectedProductId === id) {
      setSelectedProductId(null); // Deseleccionar el producto si se elimina
    }
  };

  // Función para actualizar un campo de un producto
  const updateProduct = (id, field, value) => {
    setProducts(products.map(product =>
      product.id === id ? { ...product, [field]: value } : product
    ));
  };

  // Función para añadir un subproducto
  const addSubproduct = (productId) => {
    setProducts(products.map(product =>
      product.id === productId ? {
        ...product,
        subproducts: [...product.subproducts, { quantity: 1 }]
      } : product
    ));
  };

  // Función para eliminar subproductos la cantidad de un subproducto
  const deleteSubproduct = (productId, index) => {
    setProducts(products.map(product =>
      product.id === productId ? {
        ...product,
        subproducts: product.subproducts.filter((_, i) => i !== index)
      } : product
    ));
  };

  // Función para actualizar la cantidad de un subproducto
  const updateSubproduct = (productId, index, quantity) => {
    setProducts(products.map(product =>
      product.id === productId ? {
        ...product,
        subproducts: product.subproducts.map((sub, i) =>
          i === index ? { ...sub, quantity: parseInt(quantity) || 0 } : sub
        )
      } : product
    ));
  };

  // Calcular el precio total
  const totalPrice = products.reduce((sum, product) =>
    sum + product.price * product.subproducts.reduce((subSum, sub) => subSum + sub.quantity, 0), 0);

  // Calcular el total de items
  const totalItems = products.reduce((sum, product) =>
    sum + product.subproducts.reduce((subSum, sub) => subSum + sub.quantity, 0), 0);

  // Obtener el producto seleccionado
  const selectedProduct = products.find(product => product.id === selectedProductId);

  return (
    <div className="flex h-screen">
      {/* Panel izquierdo: Lista de productos */}
      <div className="w-1/2 p-4 border-r">
        <h1 className="text-xl font-bold">Carrito de Compras</h1>
        <div className="mt-4">
          <button onClick={addProduct} className="bg-blue-500 text-white px-4 py-2 rounded">
            Añadir Producto
          </button>
        </div>
        <div className="mt-4">
          <p>Total: ${totalPrice.toFixed(2)}</p>
          <p>Total Items: {totalItems}</p>
        </div>
        <ul className="mt-4">
          {products.map(product => (
            <li key={product.id} className="mb-2 p-2 border rounded">
              <div onClick={() => setSelectedProductId(product.id)} className="cursor-pointer">
                <p>{product.description}</p>
                <p>Precio: ${product.price}</p>
                <p>Subtotal: ${(product.price * product.subproducts.reduce((sum, sub) => sum + sub.quantity, 0)).toFixed(2)}</p>
              </div>
              <button onClick={() => deleteProduct(product.id)} className="bg-red-500 text-white px-2 py-1 rounded mt-2">
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Panel derecho: Detalles del producto */}
      <div className="w-1/2 p-4">
        {selectedProduct && (
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
            <ul className="mt-4">
              {selectedProduct.subproducts.map((sub, index) => (
                <li key={index} className="mb-2">
                  <label>Cantidad:</label>
                  <input
                    type="number"
                    value={sub.quantity}
                    onChange={(e) => updateSubproduct(selectedProduct.id, index, e.target.value)}
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
          </div>
        )}
      </div>
    </div>
  );
}

export default App;