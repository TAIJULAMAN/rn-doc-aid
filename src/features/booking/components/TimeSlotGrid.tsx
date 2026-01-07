import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { TimeSlot } from '../../../types';
import { formatTime12Hour } from '../../../utils/timeSlotUtils';
import theme from '../../../theme';

interface TimeSlotGridProps {
    slots: TimeSlot[];
    selectedSlot: string | null;
    onSlotSelect: (time: string) => void;
    title: string;
}

const TimeSlotSection: React.FC<TimeSlotGridProps> = ({
    slots,
    selectedSlot,
    onSlotSelect,
    title,
}) => {
    if (slots.length === 0) return null;

    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <View style={styles.grid}>
                {slots.map((slot, index) => {
                    const isSelected = selectedSlot === slot.time;
                    const isDisabled = slot.disabled || !slot.available;

                    return (
                        <Animated.View
                            key={slot.time}
                            entering={FadeIn.delay(index * 30)}
                            style={styles.slotWrapper}
                        >
                            <TouchableOpacity
                                onPress={() => !isDisabled && onSlotSelect(slot.time)}
                                disabled={isDisabled}
                                style={[
                                    styles.slot,
                                    isSelected && styles.slotSelected,
                                    isDisabled && styles.slotDisabled,
                                ]}
                                activeOpacity={0.7}
                            >
                                <Text
                                    style={[
                                        styles.slotText,
                                        isSelected && styles.slotTextSelected,
                                        isDisabled && styles.slotTextDisabled,
                                    ]}
                                >
                                    {formatTime12Hour(slot.time)}
                                </Text>
                            </TouchableOpacity>
                        </Animated.View>
                    );
                })}
            </View>
        </View>
    );
};

interface TimeSlotGridMainProps {
    morning: TimeSlot[];
    afternoon: TimeSlot[];
    evening: TimeSlot[];
    selectedSlot: string | null;
    onSlotSelect: (time: string) => void;
}

export const TimeSlotGrid: React.FC<TimeSlotGridMainProps> = ({
    morning,
    afternoon,
    evening,
    selectedSlot,
    onSlotSelect,
}) => {
    const hasAnySlots = morning.length > 0 || afternoon.length > 0 || evening.length > 0;

    if (!hasAnySlots) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyIcon}>📅</Text>
                <Text style={styles.emptyText}>No slots available for this date</Text>
                <Text style={styles.emptySubtext}>Please select another date</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Available Time Slots</Text>

            <TimeSlotSection
                title="🌅 Morning"
                slots={morning}
                selectedSlot={selectedSlot}
                onSlotSelect={onSlotSelect}
            />

            <TimeSlotSection
                title="☀️ Afternoon"
                slots={afternoon}
                selectedSlot={selectedSlot}
                onSlotSelect={onSlotSelect}
            />

            <TimeSlotSection
                title="🌙 Evening"
                slots={evening}
                selectedSlot={selectedSlot}
                onSlotSelect={onSlotSelect}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: theme.spacing.lg,
    },
    title: {
        ...theme.typography.h3,
        color: theme.colors.textPrimary,
        marginBottom: theme.spacing.md,
    },
    section: {
        marginBottom: theme.spacing.lg,
    },
    sectionTitle: {
        ...theme.typography.body,
        fontWeight: '600',
        color: theme.colors.textPrimary,
        marginBottom: theme.spacing.md,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -theme.spacing.xs,
    },
    slotWrapper: {
        width: '25%',
        padding: theme.spacing.xs,
    },
    slot: {
        backgroundColor: theme.colors.background,
        borderRadius: theme.borderRadius.sm,
        paddingVertical: theme.spacing.sm,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: theme.colors.border,
        minHeight: 44,
    },
    slotSelected: {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primaryDark,
        ...theme.shadows.small,
    },
    slotDisabled: {
        backgroundColor: theme.colors.border + '40',
        borderColor: theme.colors.border,
    },
    slotText: {
        ...theme.typography.bodySmall,
        color: theme.colors.textPrimary,
        fontWeight: '500',
    },
    slotTextSelected: {
        color: theme.colors.white,
        fontWeight: '700',
    },
    slotTextDisabled: {
        color: theme.colors.textLight,
        textDecorationLine: 'line-through',
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: theme.spacing.xxl,
    },
    emptyIcon: {
        fontSize: 48,
        marginBottom: theme.spacing.md,
    },
    emptyText: {
        ...theme.typography.h3,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.xs,
    },
    emptySubtext: {
        ...theme.typography.bodySmall,
        color: theme.colors.textLight,
    },
});
