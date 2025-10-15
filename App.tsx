import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Screens
import MainScreen from './screens/MainScreen';
import SixMonthsScreen from './screens/SixMonthsScreen';
import SixWeeksScreen from './screens/SixWeeksScreen';
import FirstAidScreen from './screens/FirstAidScreen';
import TotalFeesScreen from './screens/TotalFeesScreen';
import ScreenNav from './screens/ScreenNav';



const App = () => {
  return (
    <NavigationContainer>
      <ScreenNav />
    </NavigationContainer>
  );
}
export default App;

