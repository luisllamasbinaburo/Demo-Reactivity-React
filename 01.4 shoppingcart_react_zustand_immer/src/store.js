import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

const useStore = create(
  immer((set, get) => ({
    products: [],
    selectedProduct: null,

    // Añadir un nuevo producto
    addProduct: () => {
      set((state) => {
        state.products.push({
          id: Date.now(),
          description: 'Nuevo Producto',
          price: 0,
          subproducts: [],
        });
      });
    },

    // Eliminar un producto
    deleteProduct: (id) => {
      set((state) => {
        state.products = state.products.filter((p) => p.id !== id);
        if (state.selectedProduct?.id === id) state.selectedProduct = null;
      });
    },

    // Seleccionar un producto
    selectProduct: (product) => {
      set((state) => {
        state.selectedProduct = { ...product }; // Se clona para evitar mutaciones directas
      });
    },

    // Actualizar un campo de un producto
    updateProduct: (id, field, value) => {
      set((state) => {
        const product = state.products.find((p) => p.id === id);
        if (product) product[field] = value;

        if (state.selectedProduct?.id === id) {
          state.selectedProduct[field] = value;
        }
      });
    },

    // Añadir un subproducto
    addSubproduct: (productId) => {
      set((state) => {
        const product = state.products.find((p) => p.id === productId);
        if (product) product.subproducts.push({ quantity: 1 });

        if (state.selectedProduct?.id === productId) {
          state.selectedProduct.subproducts.push({ quantity: 1 });
        }
      });
    },

    // Eliminar un subproducto
    deleteSubproduct: (productId, subproductIndex) => {
      set((state) => {
        const product = state.products.find((p) => p.id === productId);
        if (product && product.subproducts[subproductIndex]) {
          product.subproducts.splice(subproductIndex, 1);
        }

        if (state.selectedProduct?.id === productId) {
          state.selectedProduct.subproducts.splice(subproductIndex, 1);
        }
      });
    },

    // Actualizar la cantidad de un subproducto
    updateSubproduct: (productId, index, quantity) => {
      set((state) => {
        const product = state.products.find((p) => p.id === productId);
        if (product && product.subproducts[index]) {
          product.subproducts[index].quantity = quantity;
        }

        if (state.selectedProduct?.id === productId) {
          state.selectedProduct.subproducts[index].quantity = quantity;
        }
      });
    },

    // Calcular el precio total
    getTotalPrice: () => {
      return get().products.reduce(
        (sum, product) =>
          sum + product.price * product.subproducts.reduce((subSum, sub) => subSum + sub.quantity, 0),
        0
      );
    },

    // Calcular el total de items
    getTotalItems: () => {
      return get().products.reduce(
        (sum, product) =>
          sum + product.subproducts.reduce((subSum, sub) => subSum + sub.quantity, 0),
        0
      );
    },
  }))
);

export default useStore;
