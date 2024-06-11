// App.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from './screens/Signup';
import Login from './screens/Login';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Budgets from './screens/Budgets';
import AddBudget from './screens/AddBudget';
import Settings from './screens/Settings';
import BudgetDetails from './screens/BudgetDetails';
import SelectCategories from './screens/SelectCategories';
import ForgotPassword from './screens/ForgotPassword';
import Savings from './screens/Savings';
import NotificationSettings from './screens/NotificationSettings';
import DataExport from './screens/DataExport';
import Coaching from './screens/Coaching';
import Support from './screens/Support';
import FAQ from './screens/FAQ';
import BankAccounts from './screens/BankAccounts';
import CurrencySettings from './screens/CurrencySettings';
import SecuritySettings from './screens/SecuritySettings';
import Subscription from './screens/Subscription';
import ProfileSettings from './screens/ProfileSettings';
import Logout from './screens/Logout';
import SavingsHistory from './screens/SavingsHistory';
import TransactionHistory from './screens/TransactionHistory';
import AuthCodeScreen from './screens/AuthCodeScreen';
import ResetAuthCodeScreen from './screens/ResetAuthCodeScreen';
import ConfirmResetAuthCodeScreen from './screens/ConfirmResetAuthCodeScreen';
import { getUserDetails } from './api';
import Preloader from './components/Preloader';

const Stack = createNativeStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handlePreloaderFinished = () => {
    setIsPreloaderVisible(false);
    checkUserAuthentication();
  };

  useEffect(() => {
    if (!isPreloaderVisible) {
      checkUserAuthentication();
    }
  }, [isPreloaderVisible]);

  const checkUserAuthentication = async () => {
    try {
      const user = await getUserDetails();
      setIsAuthenticated(!!user);
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || isPreloaderVisible) {
    return <Preloader onFinished={handlePreloaderFinished} />;
  }

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="AuthCodeScreen">
          <Stack.Screen name="AuthCodeScreen" component={AuthCodeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ResetAuthCode" component={ResetAuthCodeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ConfirmResetAuthCode" component={ConfirmResetAuthCodeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
          <Stack.Screen name="Budgets" component={Budgets} options={{ headerShown: false }} />
          <Stack.Screen name="AddBudget" component={AddBudget} options={{ headerShown: false }} />
          <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
          <Stack.Screen name="BudgetDetails" component={BudgetDetails} options={{ headerShown: false }} />
          <Stack.Screen name="SelectCategories" component={SelectCategories} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
          <Stack.Screen name="Savings" component={Savings} options={{ headerShown: false }} />
          <Stack.Screen name="NotificationSettings" component={NotificationSettings} options={{ headerShown: false }} />
          <Stack.Screen name="DataExport" component={DataExport} options={{ headerShown: false }} />
          <Stack.Screen name="Coaching" component={Coaching} options={{ headerShown: false }} />
          <Stack.Screen name="Support" component={Support} options={{ headerShown: false }} />
          <Stack.Screen name="FAQ" component={FAQ} options={{ headerShown: false }} />
          <Stack.Screen name="BankAccounts" component={BankAccounts} options={{ headerShown: false }} />
          <Stack.Screen name="CurrencySettings" component={CurrencySettings} options={{ headerShown: false }} />
          <Stack.Screen name="SecuritySettings" component={SecuritySettings} options={{ headerShown: false }} />
          <Stack.Screen name="Subscription" component={Subscription} options={{ headerShown: false }} />
          <Stack.Screen name="ProfileSettings" component={ProfileSettings} options={{ headerShown: false }} />
          <Stack.Screen name="SavingsHistory" component={SavingsHistory} options={{ headerShown: false }} />
          <Stack.Screen name="TransactionHistory" component={TransactionHistory} options={{ headerShown: false }} />
          <Stack.Screen name="Logout" component={Logout} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
