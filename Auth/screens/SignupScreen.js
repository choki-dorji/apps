import AuthContent from '../components/Auth/AuthContent';
import { CreateUser } from '../util/auth';
import { useContext, useState } from 'react';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { Alert } from 'react-native';

function SignupScreen() {
    const [isAuthenticated,setIsAuthenticated] = useState(false)
    const authCtx =  useContext(AuthContent)
    
    async function signupHandler({email, password}){
        setIsAuthenticated(true);
        try{
            const token = await CreateUser(email, password);
            authCtx.authenticate(token)
        } catch(err){
            Alert.alert('Authentication failed', 'Could not create User')
            setIsAuthenticated(false)
        }
        
        
    }

    if(isAuthenticated){
        return <LoadingOverlay message="Creating User...." />
    }

  return <AuthContent  onAuthenticate={signupHandler}/>;
}

export default SignupScreen;