import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Doctor } from '../types';
import { Card } from './Card';
import theme from '../theme';

interface DoctorCardProps {
    doctor: Doctor;
    onPress: () => void;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
            <Card style={styles.card}>
                <View style={styles.content}>
                    <Image source={{ uri: doctor.photo }} style={styles.photo} />

                    <View style={styles.info}>
                        <Text style={styles.name}>{doctor.name}</Text>
                        <Text style={styles.specialty}>{doctor.specialty}</Text>

                        <View style={styles.stats}>
                            <View style={styles.statItem}>
                                <Text style={styles.statIcon}>⭐</Text>
                                <Text style={styles.statText}>{doctor.rating}</Text>
                                <Text style={styles.statLabel}>({doctor.reviewCount})</Text>
                            </View>

                            <View style={styles.statItem}>
                                <Text style={styles.statIcon}>💼</Text>
                                <Text style={styles.statText}>{doctor.experience} yrs</Text>
                            </View>
                        </View>

                        <View style={styles.footer}>
                            <Text style={styles.fee}>${doctor.consultationFee}</Text>
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>Available</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Card>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        marginBottom: theme.spacing.md,
    },
    content: {
        flexDirection: 'row',
    },
    photo: {
        width: 80,
        height: 80,
        borderRadius: theme.borderRadius.md,
        backgroundColor: theme.colors.border,
    },
    info: {
        flex: 1,
        marginLeft: theme.spacing.md,
    },
    name: {
        ...theme.typography.h3,
        color: theme.colors.textPrimary,
        marginBottom: theme.spacing.xs,
    },
    specialty: {
        ...theme.typography.bodySmall,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.sm,
    },
    stats: {
        flexDirection: 'row',
        marginBottom: theme.spacing.sm,
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: theme.spacing.md,
    },
    statIcon: {
        fontSize: 14,
        marginRight: 4,
    },
    statText: {
        ...theme.typography.bodySmall,
        color: theme.colors.textPrimary,
        fontWeight: '600',
        marginRight: 4,
    },
    statLabel: {
        ...theme.typography.caption,
        color: theme.colors.textSecondary,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    fee: {
        ...theme.typography.h3,
        color: theme.colors.primary,
        fontWeight: '700',
    },
    badge: {
        backgroundColor: theme.colors.success + '20',
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: theme.spacing.xs,
        borderRadius: theme.borderRadius.sm,
    },
    badgeText: {
        ...theme.typography.caption,
        color: theme.colors.success,
        fontWeight: '600',
    },
});
