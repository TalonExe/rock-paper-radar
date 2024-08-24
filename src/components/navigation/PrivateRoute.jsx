import { Navigate } from 'react-router-dom';
import userStore from '../../stores/userStore';

const PrivateRoute = ({ children }) => {
    const isLogin = userStore(state => state.isLogin);
    const checkLogin = userStore(state => state.checkLogin);

    checkLogin();

    if (!isLogin) {
        return <Navigate to="/auth/signin" replace />;
    }

    return children;
};

export default PrivateRoute;
