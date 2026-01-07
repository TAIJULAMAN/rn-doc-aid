import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import theme from '../theme';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
    loading?: boolean;
    disabled?: boolean;
    style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    loading = false,
    disabled = false,
    style,
}) => {
    if (variant === 'primary') {
        return (
            <TouchableOpacity
                onPress={onPress}
                disabled={disabled || loading}
                style={[styles.container, style]}
                activeOpacity={0.8}
            >
                <LinearGradient
                    colors={disabled ? ['#BDC3C7', '#95A5A6'] : [theme.colors.primary, theme.colors.primaryDark]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradient}
                >
                    {loading ? (
                        <ActivityIndicator color={theme.colors.white} />
                    ) : (
                        <Text style={styles.primaryText}>{title}</Text>
                    )}
                </LinearGradient>
            </TouchableOpacity>
        );
    }

    const buttonStyle = variant === 'secondary' ? styles.secondary : styles.outline;
    const textStyle = variant === 'secondary' ? styles.secondaryText : styles.outlineText;

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled || loading}
            style={[styles.container, buttonStyle, disabled && styles.disabled, style]}
            activeOpacity={0.7}
        >
            {loading ? (
                <ActivityIndicator color={variant === 'secondary' ? theme.colors.white : theme.colors.primary} />
            ) : (
                <Text style={textStyle}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: theme.borderRadius.md,
        overflow: 'hidden',
    },
    gradient: {
        paddingVertical: theme.spacing.md,
        paddingHorizontal: theme.spacing.lg,
        alignItems: 'center',
        justifyContent: 'center',
    },
    secondary: {
        backgroundColor: theme.colors.accent,
        paddingVertical: theme.spacing.md,
        paddingHorizontal: theme.spacing.lg,
        alignItems: 'center',
        justifyContent: 'center',
    },
    outline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: theme.colors.primary,
        paddingVertical: theme.spacing.md - 2,
        paddingHorizontal: theme.spacing.lg,
        alignItems: 'center',
        justifyContent: 'center',
    },
    disabled: {
        opacity: 0.5,
    },
    primaryText: {
        ...theme.typography.body,
        fontWeight: '600',
        color: theme.colors.white,
    },
    secondaryText: {
        ...theme.typography.body,
        fontWeight: '600',
        color: theme.colors.white,
    },
    outlineText: {
        ...theme.typography.body,
        fontWeight: '600',
        color: theme.colors.primary,
    },
});
