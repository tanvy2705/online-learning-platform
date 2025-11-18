import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { NotificationProvider } from './context/NotificationContext';
import AppRouter from './router/AppRouter';
import './App.css'



function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <NotificationProvider>
          <AppRouter />
        </NotificationProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;