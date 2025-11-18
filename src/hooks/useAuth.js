import { useAuth as useAuthContext } from '../context/AuthContext';

// Re-export for convenience
const useAuth = () => {
  return useAuthContext();
};

export default useAuth;