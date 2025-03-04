import React, { useState } from 'react';
import Summary from './components/Summary';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';

function App() {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);

  // Añadir un nuevo producto
  const addProduct = () => {
    const newProduct = {
      id: Date.now(),
      description: 'Nuevo Producto',
      price: 0,
      subproducts: [],
    };
    setProducts([...products, newProduct]);
  };

  // Eliminar un producto
  const deleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
    if (selectedProductId === id) {
      setSelectedProductId(null); // Deseleccionar el producto si se elimina
    }
  };

  // Actualizar un campo de un producto
  const updateProduct = (id, field, value) => {
    setProducts(products.map(product =>
      product.id === id ? { ...product, [field]: value } : product
    ));
  };

  // Añadir un subproducto
  const addSubproduct = (productId) => {
    setProducts(products.map(product =>
      product.id === productId ? {
        ...product,
        subproducts: [...product.subproducts, { quantity: 1 }]
      } : product
    ));
  };

  // Actualizar la cantidad de un subproducto
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

  const deleteSubproduct = (productId, index) => {
    setProducts(products.map(product =>
      product.id === productId ? {
        ...product,
        subproducts: product.subproducts.filter((_, i) => i !== index)
      } : product
    ));
  };

  // Obtener el producto seleccionado
  const selectedProduct = products.find(product => product.id === selectedProductId);

  return (
    <div className="flex h-screen">
      {/* Panel izquierdo: Lista de productos y resumen */}
      <div className="w-1/2 p-4 border-r">
        <Summary products={products} />
        <button onClick={addProduct} className="bg-blue-500 text-white px-4 py-2 rounded">
          Añadir Producto
        </button>
        <ProductList
          products={products}
          onSelectProduct={setSelectedProductId}
          onDeleteProduct={deleteProduct}
        />
      </div>

      {/* Panel derecho: Detalles del producto */}
      <div className="w-1/2 p-4">
        {selectedProduct && (
          <ProductDetails
            product={selectedProduct}
            onUpdateProduct={updateProduct}
            onAddSubproduct={addSubproduct}
            onUpdateSubproduct={updateSubproduct}
            onDeleteSubproduct={deleteSubproduct}
          />
        )}
      </div>
    </div>
  );
}

export default App;