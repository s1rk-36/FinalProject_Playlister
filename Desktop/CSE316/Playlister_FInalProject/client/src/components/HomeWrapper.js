import { useContext } from 'react'
import HomeScreen from './HomeScreen'
import SplashScreen from './SplashScreen'
import AuthContext from '../auth'
import { useHistory } from 'react-router-dom'

export default function HomeWrapper() {
    const { auth } = useContext(AuthContext);
    const history = useHistory();
    console.log("HomeWrapper auth.loggedIn: " + auth.loggedIn);
    
    if (auth.loggedIn === true)
        return <HomeScreen />
    else{
        return <SplashScreen />
    }
}