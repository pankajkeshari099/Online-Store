import { useEffect } from "react";
import { useNavigate } from "react-router";

const AuthVerify = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkToken = () => {
            const token = localStorage.getItem('token');
            if (token) {
                const decodedToken = parseJwt(token);
                if (decodedToken.exp * 1000 < Date.now()) {
                    localStorage.removeItem('token');
                    localStorage.clear();
                    navigate('/');
                }
            }
            else {
                if (!token && window.location.pathname !== '/signup') {
                    navigate('/')
                }
            }
        }

        const parseJwt = (token) => {
            try {
                return JSON.parse(atob(token.split('.')[1]));
            } catch (error) {
                return null;
            }
        };
        checkToken();
        const interval = setInterval(checkToken, 60000);
        return () => clearInterval(interval);
    }, [navigate]);
    return null;
};
export default AuthVerify;