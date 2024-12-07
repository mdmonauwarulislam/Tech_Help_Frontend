import { useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const role = useSelector((state) => state.user?.user?.role);
  const navigate = useNavigate();

  if (!isAuthenticated || (allowedRoles && !allowedRoles.includes(role))) {
    navigate("/login");
  }

  return children;
};
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string)
};

export default ProtectedRoute;

