import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { AuthProvider } from './src/contexts/AuthContext';
import { Router } from './src/routes';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar backgroundColor='#1D1D2E' barStyle='light-content' translucent={false}/>

        <Router/>
      </AuthProvider>
    </NavigationContainer>
  );
}