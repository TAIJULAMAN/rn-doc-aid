import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { OnboardingScreen } from '../features/auth/screens/OnboardingScreen';
import { HomeScreen } from '../features/home/screens/HomeScreen';
import { DoctorDetailScreen } from '../features/doctors/screens/DoctorDetailScreen';
import { MOCK_DOCTORS, SPECIALTIES } from '../constants/mockData';
import { Doctor, Specialty } from '../types';
import theme from '../theme';

export type RootStackParamList = {
    Onboarding: undefined;
    Home: undefined;
    DoctorDetail: { doctor: Doctor };
};

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
    const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

    return (
        <NavigationContainer>
            <StatusBar style="light" />
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: theme.colors.primary,
                    },
                    headerTintColor: theme.colors.white,
                    headerTitleStyle: {
                        fontWeight: '700',
                    },
                }}
            >
                {!hasCompletedOnboarding ? (
                    <Stack.Screen
                        name="Onboarding"
                        options={{ headerShown: false }}
                    >
                        {(props) => (
                            <OnboardingScreen
                                {...props}
                                onComplete={() => setHasCompletedOnboarding(true)}
                            />
                        )}
                    </Stack.Screen>
                ) : (
                    <>
                        <Stack.Screen
                            name="Home"
                            options={{ headerShown: false }}
                        >
                            {({ navigation }) => (
                                <HomeScreen
                                    doctors={MOCK_DOCTORS}
                                    specialties={SPECIALTIES}
                                    onDoctorPress={(doctor) =>
                                        navigation.navigate('DoctorDetail', { doctor })
                                    }
                                    onSpecialtyPress={(specialty: Specialty) => {
                                        // Filter doctors by specialty
                                        console.log('Specialty pressed:', specialty.name);
                                    }}
                                />
                            )}
                        </Stack.Screen>

                        <Stack.Screen
                            name="DoctorDetail"
                            options={({ route }) => ({
                                title: route.params.doctor.name,
                            })}
                        >
                            {({ route, navigation }) => (
                                <DoctorDetailScreen
                                    doctor={route.params.doctor}
                                    onBookAppointment={(date, time, paymentMode) => {
                                        console.log('Booking:', { date, time, paymentMode });
                                        // Navigate to confirmation or appointments screen
                                        alert(
                                            `Appointment booked!\nDoctor: ${route.params.doctor.name}\nDate: ${date.toLocaleDateString()}\nTime: ${time}\nPayment: ${paymentMode}`
                                        );
                                        navigation.goBack();
                                    }}
                                />
                            )}
                        </Stack.Screen>
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};
