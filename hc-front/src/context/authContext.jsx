import { createContext, useContext, useState, useEffect} from 'react';
import { loginRequest, registerRequest, verifyTokenRequest, updateUserRequest, desactivarUsuarioRequest, activarUsuarioRequest } from '../api/auth';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (errors.length > 0 ) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            setUser(res.data.user);
            setIsAuthenticated(true);
        } catch (error) {
            console.log("Errores recibidos",error.response?.data || error.message);
            const errorMessages = Array.isArray(error.response?.data?.message)
                ? error.response.data.message
                : [error.response?.data?.message || "Error desconocido"];
            setErrors(errorMessages);
        }
    }

    const signin = async (user) => {
        try {
            const res = await loginRequest(user);
            console.log(res)
            setUser(res.data.user);
            console.log(res.data)
            setIsAuthenticated(true);
        } catch (error)  {
            console.log(error.response?.data || error.message);

            if (error.response?.status === 401) {
                setErrors(["Contraseña incorrecta"]);
        } else if (error.response?.status === 404) {
                setErrors(["Usuario no encontrado"]);
        } else {
            const errorMessages = Array.isArray(error.response?.data?.message)
                ? error.response.data.message
                : [error.response?.data?.message || "Error desconocido"];
            setErrors(errorMessages);
        }
        setIsAuthenticated(false);

        }
    }
    const logout = async () => {
        Cookies.remove('token');
        setUser(null);
        setIsAuthenticated(false);
    };
    const updateUser = async (updatedData) => {
  try {
    if (!user) throw new Error("No hay usuario autenticado");

    const filteredData = {};
    for (const key in updatedData) {
      if (
        updatedData[key] !== undefined &&
        updatedData[key] !== null &&
        updatedData[key] !== ""
      ) {
        filteredData[key] = updatedData[key];
      }
    }

    const res = await updateUserRequest(user.id, filteredData);
    setUser(res.data.user);
    return { success: true };
  } catch (error) {
    const mensaje = error.response?.data?.message || "Error al actualizar usuario";
    console.error("Error al actualizar perfil:", mensaje);
    return { success: false, error: mensaje };
  }
};
    const desactivarUsuario = async (id) => {
    try {
      const res = await desactivarUsuarioRequest(id);
      console.log('Usuario desactivado:', res.data);
      return { success: true, data: res.data };
    } catch (error) {
      const mensaje =
        error.response?.data?.message || 'Error al desactivar usuario';
      console.error('Error al desactivar usuario:', mensaje);
      return { success: false, error: mensaje };
    }
  };

  const activarUsuario = async (id) => {
    try {
      const res = await activarUsuarioRequest(id);
      console.log('Usuario activado:', res.data);
      return { success: true, data: res.data };
    } catch (error) {
      const mensaje =
        error.response?.data?.message || 'Error al activar usuario';
      console.error('Error al activar usuario:', mensaje);
      return { success: false, error: mensaje };
    }
  };

    useEffect(() => {
        async function checkLogin (){

            const token = Cookies.get('token');
            if (!token) {
                setIsAuthenticated(false);
                setLoading(false);
                return setUser(null);
            }

            try { 
                const res = await verifyTokenRequest();
                if(!res.data){
                    setIsAuthenticated(false);
                    setLoading(false);
                    return;
                }
                setIsAuthenticated(true);
                setUser(res.data);
                setLoading(false);
            } catch (error) { 
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
            }
        };
        checkLogin();
    }, []);

    return (
        <AuthContext.Provider
        value = {{
            user,
            isAuthenticated,
            signup,
            signin,
            logout,
            updateUser,
            errors,
            setErrors,
            loading,
            desactivarUsuario,
            activarUsuario
        }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

