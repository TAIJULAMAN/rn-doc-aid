import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    Image,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Doctor } from '../../../types';
import { CalendarStrip } from '../../booking/components/CalendarStrip';
import { TimeSlotGrid } from '../../booking/components/TimeSlotGrid';
import { Button } from '../../../components/Button';
import { Card } from '../../../components/Card';
import { generateTimeSlots, categorizeTimeSlots } from '../../../utils/timeSlotUtils';
import theme from '../../../theme';

interface DoctorDetailScreenProps {
    doctor: Doctor;
    onBookAppointment: (date: Date, time: string, paymentMode: 'clinic' | 'online') => void;
}

export const DoctorDetailScreen: React.FC<DoctorDetailScreenProps> = ({
    doctor,
    onBookAppointment,
}) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [paymentMode, setPaymentMode] = useState<'clinic' | 'online'>('clinic');

    const timeSlots = generateTimeSlots(selectedDate, doctor.availability);
    const { morning, afternoon, evening } = categorizeTimeSlots(timeSlots);

    const handleBooking = () => {
        if (selectedSlot) {
            onBookAppointment(selectedDate, selectedSlot, paymentMode);
        }
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header with Doctor Photo */}
            <Animated.View entering={FadeInUp.duration(600)}>
                <LinearGradient
                    colors={[theme.colors.primary, theme.colors.primaryDark]}
                    style={styles.header}
                >
                    <Image source={{ uri: doctor.photo }} style={styles.photo} />
                    <Text style={styles.name}>{doctor.name}</Text>
                    <Text style={styles.specialty}>{doctor.specialty}</Text>
                </LinearGradient>
            </Animated.View>

            <View style={styles.content}>
                {/* Stats Cards */}
                <Animated.View entering={FadeInDown.delay(200).duration(600)}>
                    <View style={styles.statsContainer}>
                        <Card style={styles.statCard}>
                            <Text style={styles.statValue}>{doctor.experience}</Text>
                            <Text style={styles.statLabel}>Years Exp.</Text>
                        </Card>
                        <Card style={styles.statCard}>
                            <Text style={styles.statValue}>{doctor.patientsTreated}+</Text>
                            <Text style={styles.statLabel}>Patients</Text>
                        </Card>
                        <Card style={styles.statCard}>
                            <Text style={styles.statValue}>⭐ {doctor.rating}</Text>
                            <Text style={styles.statLabel}>{doctor.reviewCount} Reviews</Text>
                        </Card>
                    </View>
                </Animated.View>

                {/* About Section */}
                <Animated.View entering={FadeInDown.delay(300).duration(600)}>
                    <Card style={styles.section}>
                        <Text style={styles.sectionTitle}>About</Text>
                        <Text style={styles.aboutText}>{doctor.about}</Text>
                    </Card>
                </Animated.View>

                {/* Booking Section */}
                <Animated.View entering={FadeInDown.delay(400).duration(600)}>
                    <Card style={styles.section}>
                        <Text style={styles.sectionTitle}>Book Appointment</Text>

                        <CalendarStrip
                            selectedDate={selectedDate}
                            onDateSelect={setSelectedDate}
                        />

                        <TimeSlotGrid
                            morning={morning}
                            afternoon={afternoon}
                            evening={evening}
                            selectedSlot={selectedSlot}
                            onSlotSelect={setSelectedSlot}
                        />

                        {/* Payment Mode */}
                        <View style={styles.paymentSection}>
                            <Text style={styles.paymentTitle}>Payment Mode</Text>
                            <View style={styles.paymentOptions}>
                                <TouchableOpacity
                                    onPress={() => setPaymentMode('clinic')}
                                    style={[
                                        styles.paymentOption,
                                        paymentMode === 'clinic' && styles.paymentOptionSelected,
                                    ]}
                                    activeOpacity={0.7}
                                >
                                    <Text
                                        style={[
                                            styles.paymentOptionText,
                                            paymentMode === 'clinic' && styles.paymentOptionTextSelected,
                                        ]}
                                    >
                                        💳 Pay at Clinic
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => setPaymentMode('online')}
                                    style={[
                                        styles.paymentOption,
                                        paymentMode === 'online' && styles.paymentOptionSelected,
                                    ]}
                                    activeOpacity={0.7}
                                >
                                    <Text
                                        style={[
                                            styles.paymentOptionText,
                                            paymentMode === 'online' && styles.paymentOptionTextSelected,
                                        ]}
                                    >
                                        💰 Pay Online
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Consultation Fee */}
                        <View style={styles.feeContainer}>
                            <Text style={styles.feeLabel}>Consultation Fee</Text>
                            <Text style={styles.feeValue}>${doctor.consultationFee}</Text>
                        </View>

                        <Button
                            title="Confirm Booking"
                            onPress={handleBooking}
                            disabled={!selectedSlot}
                            style={styles.bookButton}
                        />
                    </Card>
                </Animated.View>

                {/* Patient Reviews */}
                <Animated.View entering={FadeInDown.delay(500).duration(600)}>
                    <Card style={styles.section}>
                        <Text style={styles.sectionTitle}>Patient Reviews</Text>
                        {doctor.reviews.map((review) => (
                            <View key={review.id} style={styles.review}>
                                <View style={styles.reviewHeader}>
                                    <Text style={styles.reviewName}>{review.patientName}</Text>
                                    <View style={styles.reviewRating}>
                                        <Text style={styles.reviewRatingText}>⭐ {review.rating}</Text>
                                    </View>
                                </View>
                                <Text style={styles.reviewComment}>{review.comment}</Text>
                                <Text style={styles.reviewDate}>{review.date}</Text>
                            </View>
                        ))}
                    </Card>
                </Animated.View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        alignItems: 'center',
        paddingTop: theme.spacing.xxl,
        paddingBottom: theme.spacing.xl,
        borderBottomLeftRadius: theme.borderRadius.xl,
        borderBottomRightRadius: theme.borderRadius.xl,
    },
    photo: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 4,
        borderColor: theme.colors.white,
        marginBottom: theme.spacing.md,
    },
    name: {
        ...theme.typography.h1,
        color: theme.colors.white,
        marginBottom: theme.spacing.xs,
    },
    specialty: {
        ...theme.typography.body,
        color: theme.colors.white,
        opacity: 0.9,
    },
    content: {
        padding: theme.spacing.md,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: theme.spacing.md,
    },
    statCard: {
        flex: 1,
        marginHorizontal: theme.spacing.xs,
        alignItems: 'center',
        paddingVertical: theme.spacing.md,
    },
    statValue: {
        ...theme.typography.h2,
        color: theme.colors.primary,
        marginBottom: theme.spacing.xs,
    },
    statLabel: {
        ...theme.typography.caption,
        color: theme.colors.textSecondary,
        textAlign: 'center',
    },
    section: {
        marginBottom: theme.spacing.md,
    },
    sectionTitle: {
        ...theme.typography.h2,
        color: theme.colors.textPrimary,
        marginBottom: theme.spacing.md,
    },
    aboutText: {
        ...theme.typography.body,
        color: theme.colors.textSecondary,
        lineHeight: 24,
    },
    paymentSection: {
        marginBottom: theme.spacing.lg,
    },
    paymentTitle: {
        ...theme.typography.body,
        fontWeight: '600',
        color: theme.colors.textPrimary,
        marginBottom: theme.spacing.md,
    },
    paymentOptions: {
        flexDirection: 'row',
        gap: theme.spacing.sm,
    },
    paymentOption: {
        flex: 1,
        backgroundColor: theme.colors.background,
        borderRadius: theme.borderRadius.md,
        paddingVertical: theme.spacing.md,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: theme.colors.border,
    },
    paymentOptionSelected: {
        backgroundColor: theme.colors.primary + '15',
        borderColor: theme.colors.primary,
    },
    paymentOptionText: {
        ...theme.typography.bodySmall,
        color: theme.colors.textSecondary,
        fontWeight: '500',
    },
    paymentOptionTextSelected: {
        color: theme.colors.primary,
        fontWeight: '700',
    },
    feeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: theme.spacing.md,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
        marginBottom: theme.spacing.md,
    },
    feeLabel: {
        ...theme.typography.body,
        color: theme.colors.textSecondary,
    },
    feeValue: {
        ...theme.typography.h2,
        color: theme.colors.primary,
        fontWeight: '700',
    },
    bookButton: {
        marginTop: theme.spacing.sm,
    },
    review: {
        paddingVertical: theme.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    reviewHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.sm,
    },
    reviewName: {
        ...theme.typography.body,
        fontWeight: '600',
        color: theme.colors.textPrimary,
    },
    reviewRating: {
        backgroundColor: theme.colors.warning + '20',
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: theme.spacing.xs,
        borderRadius: theme.borderRadius.sm,
    },
    reviewRatingText: {
        ...theme.typography.caption,
        color: theme.colors.warning,
        fontWeight: '600',
    },
    reviewComment: {
        ...theme.typography.bodySmall,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.sm,
        lineHeight: 20,
    },
    reviewDate: {
        ...theme.typography.caption,
        color: theme.colors.textLight,
    },
});
