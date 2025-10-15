// LandScapingScreen — landscaping course details
import React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

const LandScapingScreen = ({ navigation }: { navigation: any }) => {
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

        <View style={styles.glassWrapper}>
          <BlurView intensity={80} tint="light" style={styles.glassBox}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
              <Text style={styles.courseTitle}>Landscaping & Outdoor Design</Text>

              <Text style={styles.sectionTitle}>Overview</Text>
              <Text style={styles.sectionText}>
                Learn the art and science of landscaping, including garden planning, soil preparation, plant selection, and outdoor aesthetics. Ideal for aspiring landscapers and garden enthusiasts.
              </Text>

              <Text style={styles.sectionTitle}>Modules</Text>
              <Text style={styles.sectionText}>
                • Landscape Design Principles{"\n"}
                • Soil & Irrigation Systems{"\n"}
                • Planting Techniques{"\n"}
                • Hardscaping & Pathways{"\n"}
                • Maintenance & Seasonal Planning
              </Text>

              <Text style={styles.sectionTitle}>Duration</Text>
              <Text style={styles.sectionText}>6 Months (Outdoor practical sessions included)</Text>

              <Text style={styles.sectionTitle}>Certification</Text>
              <Text style={styles.sectionText}>Certified by the National Horticulture Board.</Text>

              <Text style={styles.sectionTitle}>Requirements</Text>
              <Text style={styles.sectionText}>Comfortable outdoor clothing recommended. No prior experience needed.</Text>
            </ScrollView>
          </BlurView>
        </View>

        <TouchableOpacity style={styles.feesBtn} onPress={() => navigation.navigate('TotalFeesScreen')}>
          <Text style={styles.feesText}>Total Fees</Text>
        </TouchableOpacity>








      </LinearGradient>
    </SafeAreaView>

  )
};
export default LandScapingScreen

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
  
  glassWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  glassBox: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 40,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    maxHeight: '65%',
    marginTop: 150,
    overflow: 'hidden',

    marginLeft: 30,
    marginRight: 30,
  },
  scrollContent: {
    paddingBottom: 30,
  },

  courseTitle: {
  fontSize: 22,
  fontWeight: 'bold',
  color: '#fff',
  marginBottom: 15,
  textAlign: 'center',
},

sectionTitle: {
  fontSize: 18,
  fontWeight: '600',
  color: '#fff',
  marginTop: 20,
  marginBottom: 8,
},

sectionText: {
  fontSize: 16,
  color: '#fff',
  lineHeight: 24,
},

  feesBtn: {
     backgroundColor: '#007aff',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 80,
    alignSelf: 'center'
  },
  feesText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

