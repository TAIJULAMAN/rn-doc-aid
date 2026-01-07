import React from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { Doctor, Specialty } from '../../../types';
import { DoctorCard } from '../../../components/DoctorCard';
import theme from '../../../theme';

interface HomeScreenProps {
    doctors: Doctor[];
    specialties: Specialty[];
    onDoctorPress: (doctor: Doctor) => void;
    onSpecialtyPress: (specialty: Specialty) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
    doctors,
    specialties,
    onDoctorPress,
    onSpecialtyPress,
}) => {
    return (
        <View style={styles.container}>
            {/* Header */}
            <LinearGradient
                colors={[theme.colors.primary, theme.colors.primaryDark]}
                style={styles.header}
            >
                <Animated.View entering={FadeInDown.duration(600)}>
                    <Text style={styles.greeting}>Welcome to</Text>
                    <Text style={styles.appName}>Doc Aid 🏥</Text>
                    <Text style={styles.tagline}>Your Health, Our Priority</Text>
                </Animated.View>

                {/* Search Bar */}
                <Animated.View entering={FadeInDown.delay(200).duration(600)}>
                    <View style={styles.searchContainer}>
                        <Text style={styles.searchIcon}>🔍</Text>
                        <TextInput
                            placeholder="Search doctor, symptoms, or clinic"
                            placeholderTextColor={theme.colors.textLight}
                            style={styles.searchInput}
                        />
                    </View>
                </Animated.View>
            </LinearGradient>

            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentContainer}
            >
                {/* Specialty Categories */}
                <Animated.View entering={FadeInDown.delay(300).duration(600)}>
                    <Text style={styles.sectionTitle}>Specialties</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.specialtiesContainer}
                    >
                        {specialties.map((specialty, index) => (
                            <Animated.View
                                key={specialty.id}
                                entering={FadeInRight.delay(300 + index * 50).duration(600)}
                            >
                                <TouchableOpacity
                                    onPress={() => onSpecialtyPress(specialty)}
                                    style={styles.specialtyCard}
                                    activeOpacity={0.7}
                                >
                                    <Text style={styles.specialtyIcon}>{specialty.icon}</Text>
                                    <Text style={styles.specialtyName}>{specialty.name}</Text>
                                </TouchableOpacity>
                            </Animated.View>
                        ))}
                    </ScrollView>
                </Animated.View>

                {/* Top Doctors */}
                <Animated.View entering={FadeInDown.delay(400).duration(600)}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Top Doctors Near You</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAll}>See All →</Text>
                        </TouchableOpacity>
                    </View>

                    {doctors.map((doctor, index) => (
                        <Animated.View
                            key={doctor.id}
                            entering={FadeInDown.delay(400 + index * 100).duration(600)}
                        >
                            <DoctorCard doctor={doctor} onPress={() => onDoctorPress(doctor)} />
                        </Animated.View>
                    ))}
                </Animated.View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        paddingTop: theme.spacing.xxl,
        paddingBottom: theme.spacing.xl,
        paddingHorizontal: theme.spacing.md,
        borderBottomLeftRadius: theme.borderRadius.xl,
        borderBottomRightRadius: theme.borderRadius.xl,
    },
    greeting: {
        ...theme.typography.body,
        color: theme.colors.white,
        opacity: 0.9,
    },
    appName: {
        ...theme.typography.h1,
        color: theme.colors.white,
        marginBottom: theme.spacing.xs,
    },
    tagline: {
        ...theme.typography.bodySmall,
        color: theme.colors.white,
        opacity: 0.8,
        marginBottom: theme.spacing.lg,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.white,
        borderRadius: theme.borderRadius.md,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        ...theme.shadows.medium,
    },
    searchIcon: {
        fontSize: 20,
        marginRight: theme.spacing.sm,
    },
    searchInput: {
        flex: 1,
        ...theme.typography.body,
        color: theme.colors.textPrimary,
    },
    content: {
        flex: 1,
    },
    contentContainer: {
        padding: theme.spacing.md,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.md,
    },
    sectionTitle: {
        ...theme.typography.h2,
        color: theme.colors.textPrimary,
    },
    seeAll: {
        ...theme.typography.bodySmall,
        color: theme.colors.primary,
        fontWeight: '600',
    },
    specialtiesContainer: {
        paddingBottom: theme.spacing.lg,
    },
    specialtyCard: {
        width: 100,
        height: 100,
        backgroundColor: theme.colors.white,
        borderRadius: theme.borderRadius.lg,
        marginRight: theme.spacing.md,
        alignItems: 'center',
        justifyContent: 'center',
        ...theme.shadows.small,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    specialtyIcon: {
        fontSize: 32,
        marginBottom: theme.spacing.sm,
    },
    specialtyName: {
        ...theme.typography.caption,
        color: theme.colors.textPrimary,
        fontWeight: '600',
        textAlign: 'center',
    },
});
