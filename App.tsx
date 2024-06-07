import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from './screens/Signup';
import Login from './screens/Login';
import Home from './screens/Home';
import Footer from './components/Footer';
import Profile from './screens/Profile';
import Budgets from './screens/Budgets';
import AddBudget from './screens/AddBudget';
import Settings from './screens/Settings';
import BudgetDetails from './screens/BudgetDetails';
import SelectCategories from './screens/SelectCategories';
import ForgotPassword from './screens/ForgotPassword';
import Savings from './screens/Savings';
import NotificationsAlerts from './screens/NotificationsAlerts';
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
import './screens/PushNotificationConfig';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
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
        <Stack.Screen name="NotificationsAlerts" component={NotificationsAlerts} options={{ headerShown: false }} />
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
      <Footer />
    </NavigationContainer>
  );
};

export default App;
