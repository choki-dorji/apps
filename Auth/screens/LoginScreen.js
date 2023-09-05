import AuthContent from '../components/Auth/AuthContent';
import { useContext, useState } from 'react';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { Login } from '../util/auth';
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';

function LoginScreen() {
    const [isAuthenticated,setIsAuthenticated] = useState(false)
    const authCtx = useContext(AuthContext)
    
    async function loginHandler({email, password}){
        setIsAuthenticated(true);
        
        try{
            const token = await Login(email, password);
            authCtx.authenticate(token)
        }catch(e){
            Alert.alert('Authentication failed', 'Could not login')
            setIsAuthenticated(false)
        }
        
        
    }

    if(isAuthenticated){
        return <LoadingOverlay message="Loggin You in...." />
    }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;