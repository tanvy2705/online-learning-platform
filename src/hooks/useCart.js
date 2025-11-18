import { useCart as useCartContext } from '../context/CartContext';

// Re-export for convenience
const useCart = () => {
  return useCartContext();
};

export default useCart;