import { createContext, useContext, useEffect } from 'react';
import useCartStore from '../store/useCartStore';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const cartStore = useCartStore();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      cartStore.fetchCart();
    }
  }, [isAuthenticated]);

  return (
    <CartContext.Provider value={cartStore}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export default CartContext;