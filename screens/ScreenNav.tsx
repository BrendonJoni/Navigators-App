// ScreenNav — app navigator (stack)
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './LoginScreen';
import MainScreen from './MainScreen';
import SixMonthsScreen from './SixMonthsScreen';
import SixWeeksScreen from './SixWeeksScreen';
import FirstAidScreen from './FirstAidScreen';
import SewingScreen from './SewingScreen';
import LandScapingScreen from './LandScapingScreen';
import LifeSkillsScreen from './LifeSkillsScreen';
import ChildMindingScreen from './ChildMindingScreen';
import CookingScreen from './CookingScreen';
import GardenMaintenanceScreen from './GardenMaintenanceScreen';
import ContactScreen from './ContactScreen';
import TotalFeesScreen from './TotalFeesScreen';

const Stack = createNativeStackNavigator();

export default function ScreenNav() {
  return (
    <Stack.Navigator initialRouteName="LoginScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen name="SixMonthsScreen" component={SixMonthsScreen} />
      <Stack.Screen name="SixWeeksScreen" component={SixWeeksScreen} />
      <Stack.Screen name="FirstAidScreen" component={FirstAidScreen} />
      <Stack.Screen name="SewingScreen" component={SewingScreen} />
      <Stack.Screen name="LandScapingScreen" component={LandScapingScreen} />
      <Stack.Screen name="LifeSkillsScreen" component={LifeSkillsScreen} />
      <Stack.Screen name="ChildMindingScreen" component={ChildMindingScreen} />
      <Stack.Screen name="CookingScreen" component={CookingScreen} />
      <Stack.Screen name="GardenMaintenanceScreen" component={GardenMaintenanceScreen} />
      <Stack.Screen name="ContactScreen" component={ContactScreen} />
      <Stack.Screen name="TotalFeesScreen" component={TotalFeesScreen} />
    </Stack.Navigator>
  );
}