// SixMonthsScreen — 6 month summary
import React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

const SixMonthsScreen = ({ navigation }: { navigation: any }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <LinearGradient
        colors={['#3a96bbff', '#285ebbff', '#bacbebff']}
        style={styles.gradient}        
      >  
       <View style={styles.headerWrapper}>
         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
           <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.motivationWrapper}>
           <Text style={styles.motivation}>“Every skill you master builds your future.”</Text>
       </View>


          {/* User Image with Dropdown Menu in a wrapper */}
          <View style={styles.userMenuWrapper}>
            <TouchableOpacity style={styles.userImgContainer} onPress={() => setMenuVisible(!menuVisible)}
            >
              <Image source={require('../img/trump2030.webp')} style={styles.userImg} />

            </TouchableOpacity>
            
            {/* Dropdown Menu with a blur effect */}
            {menuVisible && (
              <BlurView intensity={80} tint="light" style={styles.dropdownMenu}>
                <TouchableOpacity style={styles.menuItem} onPress={() => {
                  setMenuVisible(false);
                  navigation.navigate('ContactScreen');
                }}
                >
                  <Text style={styles.menuText}>Contact</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={() => { setMenuVisible(false); navigation.navigate('SettingsScreen'); }}
                >
                  <Text style={styles.menuText}>Settings</Text>
                </TouchableOpacity>
              </BlurView>
            )}
          </View>
        
         {/* GlassBox that contains buttons  */}
      <View style={styles.bottomBoxWrapper}>
        <BlurView intensity={80} tint="light" style={styles.glassBox}>
          <Text style={styles.boxTitle}>Choose Your Path</Text>

          <TouchableOpacity style={styles.firstAidBtn} onPress={() => navigation.navigate('FirstAidScreen')}>
            <Text style={styles.firstAidTxt}>First aid </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sewingBtn} onPress={() => navigation.navigate('SewingScreen')}>
            <Text style={styles.sewingTxt}>Sewing</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.landScapingBtn} onPress={() => navigation.navigate('LandScapingScreen')}>
            <Text style={styles.landScapingTxt}>Landscaping</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.lSkillsBtn} onPress={() => navigation.navigate('LifeSkillsScreen')}>
            <Text style={styles.lifeSkillsTxt}>Life skills</Text>
          </TouchableOpacity>
        </BlurView>
      </View>  
        



      </LinearGradient>

    </SafeAreaView>

  );
};
export default SixMonthsScreen;
const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    position: 'relative',
  },
  gradient: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
   headerWrapper: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
},
  motivationWrapper: {
    flex:1,
    justifyContent: 'center',
   alignItems: 'center', 
  },
  motivation: {
    color: '#fff',
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingHorizontal: 30,
  },
  bottomBoxWrapper: {
    position: 'absolute',
  bottom: 40,
  left: 20,
  right: 20,
},

backButton: {
  backgroundColor: 'rgba(255,255,255,0.2)',
  paddingVertical: 8,
  paddingHorizontal: 12,
  borderRadius: 8,
  alignSelf: 'flex-start',
  marginTop: 40,
  marginBottom: 10,
},

backText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
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
userMenuWrapper: {
  position: 'absolute',
  top: 20,
  right: 20,
  zIndex: 20,
  alignItems: 'flex-end',
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
//Lower section of the screen the box that contains the Buttons with the theme 

  glassBox: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    overflow: 'hidden',
  },
  boxTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },

  firstAidBtn: {
    backgroundColor: '#007aff',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 20,
    alignSelf: 'center',
  },
  firstAidTxt: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  sewingBtn: {
    backgroundColor: '#007aff',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 20,
    alignSelf: 'center',
  },
  sewingTxt: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',

  },
  landScapingBtn: {
    backgroundColor: '#007aff',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 20,
    alignSelf: 'center',
  },
  landScapingTxt: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',

  },
  lSkillsBtn: {
    backgroundColor: '#007aff',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 20,
    alignSelf: 'center',
  },
  lifeSkillsTxt: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  

});

