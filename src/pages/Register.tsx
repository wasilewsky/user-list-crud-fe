import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Register = () => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/dashboard" />;
  
  return <h1 className="text-xl font-bold text-center">Register Page</h1>;
};

export default Register;
