// LoginScreen — authentication / entry
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image,} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {LinearGradient} from 'expo-linear-gradient';
import {BlurView} from 'expo-blur';






const LoginScreen = ({ navigation }: { navigation: any }) => {
    

return ( 
    <SafeAreaView style={styles.safeAreaView}>
      <LinearGradient  
        colors={['#582c92ff','#2a5298', '#ff4e50']}
        style={styles.gradient}
      >
       <View style={styles.logoContainer}>
       <Image source={require('../img/empower theNation.png')} style={styles.logo} 
        resizeMode="contain"
        />
        </View>

      
        <BlurView intensity={50} tint="light" style={styles.journeyBox}>
          <Text style={styles.journeyText}>A journey of a thousand miles begins with a single step.</Text>
        </BlurView>
      

     

      <TouchableOpacity style={styles.startBtn} onPress={() => navigation.navigate('MainScreen')}>
        <Text style={styles.signUpTxt}>Start</Text>
      </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default LoginScreen

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
  logoContainer: {
    marginTop: 40,
    marginBottom: 30,
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    width: '70%',
    height: '60%',
    borderRadius: 40,
  },
  journeyBox: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 20,
    borderRadius: 20,
    marginBottom: 30,
    width: '85%',
    overflow: 'hidden',
    alignItems: 'center',
    borderColor: 'rgba(255,255,255,0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  journeyText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },  
    
  startBtn: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  signUpTxt: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },  
});


