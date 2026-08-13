import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  // Covers the gap between mount and AuthContext's localStorage
  // read finishing — without this, a logged-in user flash-redirects
  // to /login for a frame on every load.
  if (loading) {
    return <p>Loading...</p>;
  } else {
    return <p>message</p>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
