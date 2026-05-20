import React from 'react';
import { I18nManager, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// ─── Force RTL layout ─────────────────────────────────────────────────────────
I18nManager.forceRTL(true);

// ─── Screens ──────────────────────────────────────────────────────────────────
import HomeScreen          from './src/screens/HomeScreen';
import CourseDetailsScreen from './src/screens/CourseDetailsScreen';
import MyCoursesScreen     from './src/screens/MyCoursesScreen';
import ProfileScreen       from './src/screens/ProfileScreen';
import LectureContentScreen from './src/screens/LectureContentScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';
import LecturesListScreen  from './src/screens/LecturesListScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F5F7" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,          // All headers are custom-built per screen
            animation: 'slide_from_left', // RTL-friendly slide direction
            contentStyle: { backgroundColor: '#F4F5F7' },
          }}
        >
          {/* ── Main Tabs (share the persistent bottom nav bar) ── */}
          <Stack.Screen name="Home"           component={HomeScreen} />
          <Stack.Screen name="MyCourses"      component={MyCoursesScreen} />
          <Stack.Screen name="Profile"        component={ProfileScreen} />

          {/* ── Secondary Screens ── */}
          <Stack.Screen name="CourseDetails"  component={CourseDetailsScreen} />
          <Stack.Screen name="LecturesList"   component={LecturesListScreen} />
          <Stack.Screen name="LectureContent" component={LectureContentScreen} />
          <Stack.Screen name="Notifications"  component={NotificationsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
