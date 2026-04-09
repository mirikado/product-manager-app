import { useAuth } from "../../context/AuthContext";
import Login from "../../pages/Login";

export default function ProtectedApp({ children }) {
  const { user } = useAuth();

  if (!user) return <Login />;

  return children;
}