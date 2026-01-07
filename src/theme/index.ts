// Medical Clean Design System

export const colors = {
    // Primary - Blue
    primary: '#2E86DE',
    primaryLight: '#54A0FF',
    primaryDark: '#1E5A9E',

    // Accent
    accent: '#00D2D3',
    accentLight: '#7FDBFF',

    // Neutrals
    white: '#FFFFFF',
    background: '#F8F9FA',
    cardBackground: '#FFFFFF',
    border: '#E1E8ED',

    // Text
    textPrimary: '#2C3E50',
    textSecondary: '#7F8C8D',
    textLight: '#95A5A6',

    // Status
    success: '#27AE60',
    warning: '#F39C12',
    error: '#E74C3C',
    info: '#3498DB',

    // Shadows
    shadowColor: '#000000',
};

export const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
};

export const borderRadius = {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
};

export const typography = {
    h1: {
        fontSize: 32,
        fontWeight: '700' as const,
        lineHeight: 40,
    },
    h2: {
        fontSize: 24,
        fontWeight: '700' as const,
        lineHeight: 32,
    },
    h3: {
        fontSize: 20,
        fontWeight: '600' as const,
        lineHeight: 28,
    },
    body: {
        fontSize: 16,
        fontWeight: '400' as const,
        lineHeight: 24,
    },
    bodySmall: {
        fontSize: 14,
        fontWeight: '400' as const,
        lineHeight: 20,
    },
    caption: {
        fontSize: 12,
        fontWeight: '400' as const,
        lineHeight: 16,
    },
};

export const shadows = {
    small: {
        shadowColor: colors.shadowColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    medium: {
        shadowColor: colors.shadowColor,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
        elevation: 4,
    },
    large: {
        shadowColor: colors.shadowColor,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
        elevation: 8,
    },
};

export const theme = {
    colors,
    spacing,
    borderRadius,
    typography,
    shadows,
};

export default theme;
