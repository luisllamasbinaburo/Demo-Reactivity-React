import { create } from 'zustand';

const useStore = create((set, get) => ({
  products: [],
  selectedProduct: null,

  // Añadir un nuevo producto
  addProduct: () => {
    const newProduct = {
      id: Date.now(),
      description: 'Nuevo Producto',
      price: 0,
      subproducts: [],
    };
    set((state) => ({ products: [...state.products, newProduct] }));
  },

  // Eliminar un producto
  deleteProduct: (id) => {
    set((state) => ({
      products: state.products.filter((product) => product.id !== id),
      selectedProduct:
        state.selectedProduct?.id === id ? null : state.selectedProduct,
    }));
  },

  // Seleccionar un producto
  selectProduct: (product) => {
    set({ selectedProduct: { ...product } }); // Clonar el producto seleccionado
  },

  // Actualizar un campo de un producto
  updateProduct: (id, field, value) => {
    set((state) => ({
      products: state.products.map((product) =>
        product.id === id ? { ...product, [field]: value } : product
      ),
      selectedProduct:
        state.selectedProduct?.id === id
          ? { ...state.selectedProduct, [field]: value }
          : state.selectedProduct,
    }));
  },

  // Añadir un subproducto
  addSubproduct: (productId) => {
    set((state) => ({
      products: state.products.map((product) =>
        product.id === productId
          ? { ...product, subproducts: [...product.subproducts, { quantity: 1 }] }
          : product
      ),
      selectedProduct:
        state.selectedProduct?.id === productId
          ? {
              ...state.selectedProduct,
              subproducts: [...state.selectedProduct.subproducts, { quantity: 1 }],
            }
          : state.selectedProduct,
    }));
  },

  // Eliminar un subproducto
  deleteSubproduct: (productId, subproductIndex) => {
    set((state) => ({
      products: state.products.map((product) =>
        product.id === productId
          ? {
              ...product,
              subproducts: product.subproducts.filter((_, index) => index !== subproductIndex),
            }
          : product
      ),
      selectedProduct:
        state.selectedProduct?.id === productId
          ? {
              ...state.selectedProduct,
              subproducts: state.selectedProduct.subproducts.filter((_, index) => index !== subproductIndex),
            }
          : state.selectedProduct,
    }));
  },

  // Actualizar la cantidad de un subproducto
  updateSubproduct: (productId, index, quantity) => {
    set((state) => ({
      products: state.products.map((product) =>
        product.id === productId
          ? {
              ...product,
              subproducts: product.subproducts.map((sub, i) =>
                i === index ? { ...sub, quantity } : sub
              ),
            }
          : product
      ),
      selectedProduct:
        state.selectedProduct?.id === productId
          ? {
              ...state.selectedProduct,
              subproducts: state.selectedProduct.subproducts.map((sub, i) =>
                i === index ? { ...sub, quantity } : sub
              ),
            }
          : state.selectedProduct,
    }));
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
}));

export default useStore;
