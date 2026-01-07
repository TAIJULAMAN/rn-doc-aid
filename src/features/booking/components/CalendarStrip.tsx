import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { format, addDays, isToday, isSameDay } from 'date-fns';
import Animated, { FadeInRight } from 'react-native-reanimated';
import theme from '../../../theme';

interface CalendarStripProps {
    selectedDate: Date;
    onDateSelect: (date: Date) => void;
    daysToShow?: number;
}

export const CalendarStrip: React.FC<CalendarStripProps> = ({
    selectedDate,
    onDateSelect,
    daysToShow = 14,
}) => {
    const dates = Array.from({ length: daysToShow }, (_, i) => addDays(new Date(), i));

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select Date</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {dates.map((date, index) => {
                    const isSelected = isSameDay(date, selectedDate);
                    const isCurrentDay = isToday(date);

                    return (
                        <Animated.View
                            key={date.toISOString()}
                            entering={FadeInRight.delay(index * 50)}
                        >
                            <TouchableOpacity
                                onPress={() => onDateSelect(date)}
                                style={[
                                    styles.dateItem,
                                    isSelected && styles.dateItemSelected,
                                ]}
                                activeOpacity={0.7}
                            >
                                <Text style={[styles.dayText, isSelected && styles.dayTextSelected]}>
                                    {format(date, 'EEE')}
                                </Text>
                                <Text style={[styles.dateText, isSelected && styles.dateTextSelected]}>
                                    {format(date, 'd')}
                                </Text>
                                {isCurrentDay && !isSelected && (
                                    <View style={styles.todayDot} />
                                )}
                            </TouchableOpacity>
                        </Animated.View>
                    );
                })}
            </ScrollView>
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
    scrollContent: {
        paddingRight: theme.spacing.md,
    },
    dateItem: {
        width: 60,
        height: 80,
        backgroundColor: theme.colors.background,
        borderRadius: theme.borderRadius.md,
        marginRight: theme.spacing.sm,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'transparent',
    },
    dateItemSelected: {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primaryDark,
        ...theme.shadows.medium,
    },
    dayText: {
        ...theme.typography.caption,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.xs,
        textTransform: 'uppercase',
    },
    dayTextSelected: {
        color: theme.colors.white,
        fontWeight: '600',
    },
    dateText: {
        ...theme.typography.h3,
        color: theme.colors.textPrimary,
    },
    dateTextSelected: {
        color: theme.colors.white,
        fontWeight: '700',
    },
    todayDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: theme.colors.accent,
        marginTop: theme.spacing.xs,
    },
});
