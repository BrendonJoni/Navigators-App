// TotalFeesScreen — select courses and view total
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';


const courses = [
  { name: 'First Aid', price: 1200 },
  { name: 'Sewing', price: 1000 },
  { name: 'Landscaping', price: 1100 },
  { name: 'Life Skills', price: 950 },
  { name: 'Child Minding', price: 1050 },
  { name: 'Cooking', price: 1150 },
  { name: 'Garden Maintenance', price: 980 },
];

/*
  TotalFeesScreen
  - Lets the user pick from a list of available courses and shows the running total.
  - Includes a small user avatar menu (Contact/Settings) and a back button.
  - Uses local component state to track selected courses; total is computed on the fly.
*/
const TotalFeesScreen = ({ navigation }: { navigation: any }) => {
  // Controls visibility of the tiny avatar dropdown menu
  const [menuVisible, setMenuVisible] = useState(false);
  // Tracks which course names the user has tapped/selected
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  const toggleCourse = (courseName: string) => {
    setSelectedCourses(prev =>
      prev.includes(courseName)
        ? prev.filter(name => name !== courseName)
        : [...prev, courseName]
    );
  };

  const total = selectedCourses.reduce((sum, name) => {
    const course = courses.find(c => c.name === name);
    return sum + (course?.price || 0);
  }, 0);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <LinearGradient colors={['#f7b733', '#fc4a1a', '#2c3e50']} style={styles.gradient}>

        {/* Header / Back button
            - Small back control placed top-left to return to the previous screen.
            - Uses navigation.goBack() so it will work whether pushed or presented.
        */}
        <View style={styles.headerWrapper}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
        </View>



    {/* Avatar + dropdown menu
      - Tapping the user avatar toggles a blurred menu with quick links.
      - Kept visually subtle with a blur overlay to match the glass UI.
    */}
    <View style={styles.userMenuWrapper}>
          <TouchableOpacity style={styles.userImgContainer} onPress={() => setMenuVisible(!menuVisible)}                  >
            <Image source={require('../img/trump2030.webp')} style={styles.userImg} />

          </TouchableOpacity>

          {/* Dropdown Menu with a blur effect */}
          {menuVisible && (
            <BlurView intensity={80} tint="light" style={styles.dropdownMenu}>
              <TouchableOpacity style={styles.menuItem} onPress={() => {
                setMenuVisible(false); navigation.navigate('ContactScreen');
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



    {/* Selectable course list (glass card)
      - Uses a blurred, rounded container that holds the list of courses.
      - Each course is tappable and toggles selection. Selected items update the total.
    */}
    <View style={styles.glassWrapper}>
          <BlurView intensity={80} tint="light" style={styles.glassBox}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
              <Text style={styles.title}>Select Courses</Text>

              {courses.map(course => {
                const isSelected = selectedCourses.includes(course.name);
                return (
                  <TouchableOpacity
                    key={course.name}
                    style={styles.courseItem}
                    onPress={() => toggleCourse(course.name)}
                  >
                    <View style={styles.courseRow}>
                      <View style={styles.dotWrapper}>
                        <View style={[styles.dot, isSelected && styles.dotSelected]} />
                      </View>
                      <Text style={styles.courseName}>{course.name}</Text>
                      <Text style={styles.coursePrice}>R{course.price}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}

              {/* Summary area inside the scroll box
                  - Shows a quick message about how many courses are selected.
              */}
              <View style={styles.totalWrapper}>
                {selectedCourses.length === 0 ? (
                  <Text style={styles.totalText}>No course selected</Text>
                ) : (
                  <Text style={styles.totalText}>Courses selected: {selectedCourses.length}</Text>
                )}
              </View>

            </ScrollView>
          </BlurView>
        </View>

        {/* Bottom total bar
            - Persistent total shown below the glass card. Useful for quick screenshots or confirmations.
        */}
        <View style={styles.bottomTotal}>
          <Text style={styles.bottomTotalText}>
            {selectedCourses.length === 0 ? 'No course Selected' : `Your Total is: R${total}`}
          </Text>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default TotalFeesScreen;

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
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  glassBox: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 40,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    maxHeight: '60%',
    marginTop: 300,
    overflow: 'hidden',
  },
  scrollContent: {
    paddingBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  courseItem: {
    marginBottom: 15,
  },
  courseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dotWrapper: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'transparent',
  },
  dotSelected: {
    backgroundColor: '#fff',
  },
  courseName: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  coursePrice: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  totalWrapper: {
    marginTop: 30,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  bottomTotal: {
    alignItems: 'center',
    marginTop: 10,
  },
  bottomTotalText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 50,
  },
});