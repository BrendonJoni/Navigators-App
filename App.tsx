import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Modal, TextInput, Switch, Alert, Linking } from 'react-native';

// ===== HOME SCREEN =====
function HomeScreen({ navigation }: any) {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Empowering The Nation</Text>
        <Text style={styles.subHeader}>Building Skills, Transforming Lives</Text>
      </View>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Courses', { courseType: 'sixMonth' })}
      >
        <Text style={styles.buttonText}>Explore 6-Month Courses</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Courses', { courseType: 'sixWeek' })}
      >
        <Text style={styles.buttonText}>View Short Courses</Text>
      </TouchableOpacity>

      <View style={styles.missionCard}>
        <Text style={styles.missionTitle}>Our Mission</Text>
        <Text style={styles.missionText}>
          Empowering The Nation was established in 2022 to provide skills training for 
          domestic workers and gardeners. We make them more marketable when seeking 
          employment and enable them to be paid at a higher rate because of these additional skills.
        </Text>
      </View>

      <TouchableOpacity 
        style={[styles.button, styles.greenButton]}
        onPress={() => navigation.navigate('Calculator')}
      >
        <Text style={styles.buttonText}>Get Instant Quote</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, styles.outlineButton]}
        onPress={() => navigation.navigate('Contact')}
      >
        <Text style={styles.outlineButtonText}>Contact Us</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// ===== COURSES SCREEN =====
function CoursesScreen({ navigation, route }: any) {
  const { courseType } = route.params || { courseType: 'sixMonth' };
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const courses = courseType === 'sixMonth' ? getSixMonthCourses() : getSixWeekCourses();
  const title = courseType === 'sixMonth' ? '6-Month Programs' : '6-Week Short Courses';

  const handleViewDetails = (course: any) => {
    setSelectedCourse(course);
    setModalVisible(true);
  };

  const handleAddToQuote = (course: any) => {
    navigation.navigate('Calculator', { 
      selectedCourseId: course.id,
      selectedCourseName: course.name,
      selectedCoursePrice: course.price
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{title}</Text>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {courses.map((course: any) => (
          <View key={course.id} style={styles.card}>
            <View style={styles.courseHeader}>
              <Text style={styles.courseIcon}>📚</Text>
              <View style={styles.courseInfo}>
                <Text style={styles.courseName}>{course.name}</Text>
                <Text style={styles.coursePrice}>R{course.price} • {course.duration}</Text>
              </View>
            </View>
            
            <Text style={styles.coursePurpose}>{course.purpose}</Text>
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={[styles.button, styles.outlineButton]}
                onPress={() => handleViewDetails(course)}
              >
                <Text style={styles.outlineButtonText}>Details</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.button, styles.primaryButton]}
                onPress={() => handleAddToQuote(course)}
              >
                <Text style={styles.buttonText}>Add Quote</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedCourse?.name}</Text>
            <Text style={styles.modalText}>
              <Text style={styles.bold}>Purpose:</Text> {selectedCourse?.purpose}
            </Text>
            <Text style={styles.bold}>Course Content:</Text>
            {selectedCourse?.content.map((item: string, index: number) => (
              <Text key={index} style={styles.modalText}>• {item}</Text>
            ))}
            
            <Text style={[styles.bold, { marginTop: 15 }]}>Discounts:</Text>
            <Text style={styles.modalText}>• 2 courses: 5% discount</Text>
            <Text style={styles.modalText}>• 3 courses: 10% discount</Text>
            <Text style={styles.modalText}>• 4+ courses: 15% discount</Text>

            <TouchableOpacity 
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// ===== CALCULATOR SCREEN =====
function CalculatorScreen({ navigation, route }: any) {
  const [selectedCourses, setSelectedCourses] = useState<any[]>([]);
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });

  // Check if coming from course selection
  React.useEffect(() => {
    const courseId = route.params?.selectedCourseId;
    const courseName = route.params?.selectedCourseName;
    const coursePrice = route.params?.selectedCoursePrice;

    if (courseId && courseName && coursePrice) {
      const course = { id: courseId, name: courseName, price: coursePrice, duration: '', purpose: '' };
      setSelectedCourses([course]);
    }
  }, [route.params]);

  const allCourses = [...getSixMonthCourses(), ...getSixWeekCourses()];

  const calculateTotal = () => {
    const subtotal = selectedCourses.reduce((sum: number, course: any) => sum + course.price, 0);
    const discountRate = calculateDiscount(selectedCourses.length);
    const discountAmount = subtotal * discountRate;
    const vat = (subtotal - discountAmount) * 0.15;
    const total = subtotal - discountAmount + vat;

    return { subtotal, discountRate, discountAmount, vat, total };
  };

  const calculateDiscount = (courseCount: number): number => {
    if (courseCount >= 4) return 0.15;
    if (courseCount === 3) return 0.10;
    if (courseCount === 2) return 0.05;
    return 0;
  };

  const toggleCourse = (course: any) => {
    if (selectedCourses.find((c: any) => c.id === course.id)) {
      setSelectedCourses(selectedCourses.filter((c: any) => c.id !== course.id));
    } else {
      setSelectedCourses([...selectedCourses, course]);
    }
  };

  const handleSubmit = () => {
    if (selectedCourses.length === 0) {
      Alert.alert('Error', 'Please select at least one course');
      return;
    }

    if (!contactInfo.name || !contactInfo.email || !contactInfo.phone) {
      Alert.alert('Error', 'Please fill in all contact details');
      return;
    }

    Alert.alert(
      'Success', 
      'Quote requested successfully! A consultant will contact you shortly.',
      [
        {
          text: 'OK',
          onPress: () => {
            setSelectedCourses([]);
            setContactInfo({ name: '', email: '', phone: '' });
          }
        }
      ]
    );
  };

  const { subtotal, discountRate, discountAmount, vat, total } = calculateTotal();

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.container}>
      <Text style={styles.header}>Calculate Your Quote</Text>

      <Text style={styles.sectionTitle}>Select Courses:</Text>
      
      {allCourses.map((course: any) => (
        <View key={course.id} style={styles.courseItem}>
          <Switch
            value={!!selectedCourses.find((c: any) => c.id === course.id)}
            onValueChange={() => toggleCourse(course)}
            trackColor={{ false: '#767577', true: '#2E86AB' }}
          />
          <View style={styles.courseInfo}>
            <Text style={styles.courseName}>{course.name}</Text>
            <Text style={styles.coursePrice}>R{course.price}</Text>
          </View>
        </View>
      ))}

      {selectedCourses.length > 0 && (
        <View style={styles.quoteContainer}>
          <Text style={styles.quoteTitle}>Quote Summary</Text>
          <Text style={styles.quoteText}>Subtotal: R{subtotal.toFixed(2)}</Text>
          <Text style={styles.quoteText}>
            Discount ({(discountRate * 100).toFixed(0)}%): -R{discountAmount.toFixed(2)}
          </Text>
          <Text style={styles.quoteText}>VAT (15%): +R{vat.toFixed(2)}</Text>
          <View style={styles.divider} />
          <Text style={styles.totalText}>Total: R{total.toFixed(2)}</Text>
        </View>
      )}

      <Text style={styles.sectionTitle}>Contact Details:</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={contactInfo.name}
        onChangeText={(text) => setContactInfo({...contactInfo, name: text})}
        placeholderTextColor="#999"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        keyboardType="email-address"
        value={contactInfo.email}
        onChangeText={(text) => setContactInfo({...contactInfo, email: text})}
        placeholderTextColor="#999"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={contactInfo.phone}
        onChangeText={(text) => setContactInfo({...contactInfo, phone: text})}
        placeholderTextColor="#999"
      />

      <TouchableOpacity 
        style={[styles.button, selectedCourses.length === 0 && styles.disabledButton]}
        onPress={handleSubmit}
        disabled={selectedCourses.length === 0}
      >
        <Text style={styles.buttonText}>
          {selectedCourses.length > 0 ? 'Request Quote' : 'Select Courses First'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// ===== CONTACT SCREEN =====
function ContactScreen() {
  const venues = [
    {
      name: 'Soweto Campus',
      address: '123 Vilakazi Street, Orlando West, Soweto',
      phone: '0111234567'
    },
    {
      name: 'Alexandra Campus',
      address: '456 London Road, Alexandra',
      phone: '0112345678'
    },
    {
      name: 'Johannesburg CBD Campus',
      address: '789 Main Street, Johannesburg CBD',
      phone: '0113456789'
    }
  ];

  const makePhoneCall = (phoneNumber: string) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const sendEmail = () => {
    Linking.openURL('mailto:empoweringnation@gmail.com?subject=Course Inquiry');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.container}>
      <Text style={styles.header}>Our Campuses</Text>

      {venues.map((venue, index) => (
        <View key={index} style={styles.campusCard}>
          <Text style={styles.campusName}>{venue.name}</Text>
          <Text style={styles.campusAddress}>📍 {venue.address}</Text>
          <Text style={styles.campusPhone}>📞 {venue.phone}</Text>
          
          <TouchableOpacity 
            style={styles.campusButton}
            onPress={() => makePhoneCall(venue.phone)}
          >
            <Text style={styles.campusButtonText}>Call Campus</Text>
          </TouchableOpacity>
        </View>
      ))}

      <View style={styles.mainContactCard}>
        <Text style={styles.contactTitle}>Main Contact</Text>
        <Text style={styles.contactInfo}>📞 062 662 0181</Text>
        <Text style={styles.contactInfo}>✉️ empoweringnation@gmail.com</Text>
        
        <TouchableOpacity 
          style={styles.contactButton}
          onPress={() => makePhoneCall('0626620181')}
        >
          <Text style={styles.contactButtonText}>Call Main Office</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.contactButton, styles.emailButton]}
          onPress={sendEmail}
        >
          <Text style={styles.contactButtonText}>Send Email</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// ===== COURSE DATA FUNCTIONS =====
function getSixMonthCourses() {
  return [
    {
      id: 1,
      name: 'First Aid',
      price: 1500,
      duration: '6 months',
      purpose: 'To provide first aid awareness and basic life support',
      content: ['Wounds and bleeding', 'Burns and fractures', 'Emergency scene management', 'CPR', 'Respiratory distress']
    },
    {
      id: 2,
      name: 'Sewing',
      price: 1500,
      duration: '6 months',
      purpose: 'To provide alterations and new garment tailoring services',
      content: ['Types of stitches', 'Threading a sewing machine', 'Sewing buttons, zips, hems', 'Alterations', 'Designing new garments']
    },
    {
      id: 3,
      name: 'Landscaping',
      price: 1500,
      duration: '6 months',
      purpose: 'To provide landscaping services for new and established gardens',
      content: ['Indigenous and exotic plants', 'Fixed structures', 'Garden layout and aesthetics', 'Plant balancing', 'Garden design']
    },
    {
      id: 4,
      name: 'Life Skills',
      price: 1500,
      duration: '6 months',
      purpose: 'To provide skills to navigate basic life necessities',
      content: ['Opening a bank account', 'Basic labour law rights', 'Reading and writing literacy', 'Numeric literacy']
    }
  ];
}

function getSixWeekCourses() {
  return [
    {
      id: 5,
      name: 'Child Minding',
      price: 750,
      duration: '6 weeks',
      purpose: 'To provide basic child and baby care',
      content: ['Birth to six-month old baby needs', 'Seven-month to one year old needs', 'Toddler needs', 'Educational toys']
    },
    {
      id: 6,
      name: 'Cooking',
      price: 750,
      duration: '6 weeks',
      purpose: 'To prepare and cook nutritious family meals',
      content: ['Nutritional requirements', 'Types of protein and carbohydrates', 'Meal planning', 'Tasty recipes', 'Meal preparation']
    },
    {
      id: 7,
      name: 'Garden Maintenance',
      price: 750,
      duration: '6 weeks',
      purpose: 'To provide basic knowledge of watering, pruning and planting',
      content: ['Water restrictions and requirements', 'Pruning and propagation', 'Planting techniques', 'Garden care']
    }
  ];
}

// ===== MAIN APP COMPONENT =====
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2E86AB',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'Empowering The Nation' }}
        />
        <Stack.Screen 
          name="Courses" 
          component={CoursesScreen}
          options={{ title: 'Our Courses' }}
        />
        <Stack.Screen 
          name="Calculator" 
          component={CalculatorScreen}
          options={{ title: 'Get a Quote' }}
        />
        <Stack.Screen 
          name="Contact" 
          component={ContactScreen}
          options={{ title: 'Contact Us' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// ===== STYLES =====
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E86AB',
    marginBottom: 10,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 18,
    color: '#28A745',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#2E86AB',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
    minHeight: 50,
    justifyContent: 'center',
  },
  greenButton: {
    backgroundColor: '#28A745',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#2E86AB',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  outlineButtonText: {
    color: '#2E86AB',
    fontWeight: 'bold',
    fontSize: 16,
  },
  missionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginVertical: 30,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  missionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E86AB',
    marginBottom: 10,
    textAlign: 'center',
  },
  missionText: {
    fontSize: 16,
    color: '#212529',
    lineHeight: 24,
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginVertical: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  courseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  courseIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  courseInfo: {
    flex: 1,
  },
  courseName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E86AB',
    marginBottom: 5,
  },
  coursePrice: {
    fontSize: 16,
    color: '#28A745',
    fontWeight: '600',
  },
  coursePurpose: {
    fontSize: 14,
    color: '#212529',
    marginBottom: 15,
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  primaryButton: {
    backgroundColor: '#2E86AB',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 25,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E86AB',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 14,
    color: '#212529',
    marginBottom: 5,
    lineHeight: 20,
  },
  bold: {
    fontWeight: 'bold',
    color: '#2E86AB',
  },
  modalButton: {
    backgroundColor: '#2E86AB',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2E86AB',
    marginBottom: 15,
  },
  courseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
  },
  quoteContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginVertical: 20,
    elevation: 3,
  },
  quoteTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E86AB',
    marginBottom: 15,
    textAlign: 'center',
  },
  quoteText: {
    fontSize: 16,
    marginBottom: 5,
  },
  divider: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    marginVertical: 10,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#28A745',
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: '#6C757D',
  },
  campusCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },
  campusName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E86AB',
    marginBottom: 10,
  },
  campusAddress: {
    fontSize: 14,
    marginBottom: 5,
    color: '#212529',
  },
  campusPhone: {
    fontSize: 14,
    marginBottom: 15,
    color: '#212529',
  },
  campusButton: {
    backgroundColor: '#2E86AB',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  campusButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  mainContactCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    elevation: 3,
  },
  contactTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E86AB',
    marginBottom: 15,
    textAlign: 'center',
  },
  contactInfo: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    color: '#212529',
  },
  contactButton: {
    backgroundColor: '#2E86AB',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  emailButton: {
    backgroundColor: '#28A745',
  },
  contactButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});