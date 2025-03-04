import React from 'react';
import useStore from './store';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Summary from './components/Summary';

function App() {
  const {
    addProduct,
  } = useStore();

  return (
    <div className="flex h-screen">
      <div className="w-1/2 p-4 border-r">
      <h1 className="text-xl font-bold">Carrito de Compras</h1>
      <Summary />
      <button onClick={addProduct} className="bg-blue-500 text-white px-4 py-2 rounded">
          Añadir Producto
        </button>
      <ProductList/>
      
    </div>

      <div className="w-1/2 p-4">
        <ProductDetails/>
      </div>
    </div>
  );
}

export default App;