// MainScreen — Dashboard / landing
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {useState} from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Circle } from 'react-native-progress';

/*
  MainScreen
  - Top-level landing/dashboard for the app once a user logs in.
  - Shows user avatar with a small dropdown menu, app logo, a welcome message,
    a progress indicator placeholder, and navigation buttons to summary pages.
  - navigation prop is typed as `any` here as a quick solution to TypeScript strict mode.
*/
const MainScreen = ({navigation}: { navigation: any }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <LinearGradient  
              colors={['#582c92ff','#2a5298', '#ff4e50']}
              style={styles.gradient}
        >
          {/*
            User/avatar area (top-right)
            - Tapping the avatar toggles `menuVisible` and shows a blurred dropdown
              with quick actions (Contact, Settings).
            - Kept compact so it doesn't interfere with the main layout.
          */}
          <View style={styles.userMenuWrapper}>
          <TouchableOpacity style={styles.userImgContainer} onPress={() => setMenuVisible(!menuVisible)}
  >
         <Image source={require('../img/trump2030.webp')} style={styles.userImg} />
    
        </TouchableOpacity>

           {menuVisible && (
           <BlurView intensity={80}  tint="light" style={styles.dropdownMenu}>
           <TouchableOpacity style={styles.menuItem} onPress={() => {setMenuVisible(false);
           navigation.navigate('ContactScreen');
       }}
      >
        <Text style={styles.menuText}>Contact</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => { setMenuVisible(false);navigation.navigate('SettingsScreen');}}
      >
        <Text style={styles.menuText}>Settings</Text>
      </TouchableOpacity>
       </BlurView>
  )}
       </View>

        

    {/* App logo area
      - Central brand/logo placement. Keep this small and centered.
    */}
    <View style={styles.logoContainer}>
          <Image source={require('../img/empower theNation.png')} style={styles.logo} />
        </View>

    {/* Welcome/message box
      - A small glass-like card with a short tagline introducing the app.
    */}
    <View style={styles.welcomeBox}>
          <Text style={styles.welcomeText}>Empower the Nation where skills are elevated</Text>
        </View>

        {/* Progress indicator
            - Shows course completion (placeholder Circle). Replace progress value
              with real data when available.
        */}
        <View style={styles.progressContainer}>
               <Text style={styles.progressLabel}>Course Completion</Text>
               <Circle
                 size={120}
                 progress={0} // 60% complete
                 showsText={true}
                 color="#2a5298"
                 unfilledColor="#ccc"
                 borderWidth={0}
                 thickness={8}
                 formatText={() => '0%'}
               />
             </View> 

    {/* Navigation buttons
      - Quick links to the 6 month and 6 week summary screens for screenshots/demo.
    */}
    <TouchableOpacity style={styles.sixMonthBtn} onPress={() => navigation.navigate('SixMonthsScreen')}>
          <Text style={styles.sixMonthBtnTxt}>6 Month summary</Text>
        </TouchableOpacity>

  <TouchableOpacity style={styles.sixWeekBtn} onPress={() => navigation.navigate('SixWeeksScreen')}>
          <Text style={styles.sixWeekBtnTxt}>6 Weeks summary</Text>
        </TouchableOpacity>

       
      </LinearGradient>
    </SafeAreaView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
 safeAreaView: {
        flex: 1,
        position: 'relative',
},
  gradient: {
        flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
},
userMenuWrapper: {
  position: 'absolute',
  top: 20,
  right: 20,
  zIndex: 20,
  alignItems: 'flex-end',
},

  userImgContainer: {
    marginTop: 40,
        marginBottom: 10,
  },
 userImg: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.4)',
            
        
 },
 dropdownMenu: {
  backgroundColor: 'rgba(255, 255, 255, 0.27)',
  borderRadius: 15,
  paddingVertical: 10,
  width: 140,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.2,
  shadowRadius: 6,
  overflow: 'hidden',
 },
  menuItem: {
    paddingVertical: 12,
  paddingHorizontal: 15,
  },
  menuText: {
    color: '#2a5298',
  fontSize: 16,
  fontWeight: '500',

  },
 logoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
 },
 logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        borderRadius: 30,
 },
 welcomeBox: {
       backgroundColor: 'rgba(255, 255, 255, 0.08)', 
       paddingVertical: 20,
       paddingHorizontal: 25,
       borderRadius: 15,
       marginBottom: 100,
       marginHorizontal: 20,
       borderWidth: 1,
       borderColor: 'rgba(255,255,255,0.15)',
       shadowColor: '#000',
       shadowOffset: { width: 0, height: 4 },
       shadowOpacity: 0.2,
       shadowRadius: 6,
       elevation: 5,
},
welcomeText: {
      color: '#ffffff',
      fontSize: 20,
      fontWeight: '700',
      marginBottom: 10,
      textAlign: 'center',
},
 sixMonthBtn: {
    backgroundColor: '#007aff',
    paddingVertical: 12,
    paddingHorizontal:40,
    borderRadius: 10,
    marginBottom: 20,
    alignSelf: 'center',
 },
    sixMonthBtnTxt: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
 },
    sixWeekBtn: {
    backgroundColor: '#007aff',
    paddingVertical: 12,
    paddingHorizontal:40,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 20,
 },
     sixWeekBtnTxt: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    
 },
 
progressContainer: {
    marginTop: 0,
    marginBottom: 40,
    alignItems: 'center',
  },
  progressLabel: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  progressPercent: {
    color: '#fff',
    fontSize: 14,
    marginTop: 6,
  },
});      