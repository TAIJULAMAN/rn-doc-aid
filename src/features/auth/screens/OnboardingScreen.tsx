import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
    useAnimatedScrollHandler,
    useSharedValue,
    useAnimatedStyle,
    interpolate,
} from 'react-native-reanimated';
import { Button } from '../../../components/Button';
import theme from '../../../theme';

const { width } = Dimensions.get('window');

const slides = [
    {
        id: '1',
        icon: '🔍',
        title: 'Find Doctors',
        description: 'Search and discover the best doctors near you across all specialties',
    },
    {
        id: '2',
        icon: '📅',
        title: 'Book Appointments',
        description: 'Schedule appointments easily with real-time availability and instant confirmation',
    },
    {
        id: '3',
        icon: '💻',
        title: 'Video Consult',
        description: 'Connect with doctors remotely through secure video consultations',
    },
];

interface OnboardingScreenProps {
    onComplete: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useSharedValue(0);
    const scrollViewRef = useRef<Animated.ScrollView>(null);

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollX.value = event.contentOffset.x;
        },
    });

    const handleNext = () => {
        if (currentIndex < slides.length - 1) {
            const nextIndex = currentIndex + 1;
            scrollViewRef.current?.scrollTo({ x: width * nextIndex, animated: true });
            setCurrentIndex(nextIndex);
        } else {
            onComplete();
        }
    };

    const handleSkip = () => {
        onComplete();
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[theme.colors.primary, theme.colors.primaryDark]}
                style={styles.gradient}
            >
                {/* Skip Button */}
                {currentIndex < slides.length - 1 && (
                    <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
                        <Text style={styles.skipText}>Skip</Text>
                    </TouchableOpacity>
                )}

                {/* Slides */}
                <Animated.ScrollView
                    ref={scrollViewRef}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={scrollHandler}
                    scrollEventThrottle={16}
                    onMomentumScrollEnd={(event) => {
                        const index = Math.round(event.nativeEvent.contentOffset.x / width);
                        setCurrentIndex(index);
                    }}
                >
                    {slides.map((slide, index) => (
                        <View key={slide.id} style={styles.slide}>
                            <Text style={styles.icon}>{slide.icon}</Text>
                            <Text style={styles.title}>{slide.title}</Text>
                            <Text style={styles.description}>{slide.description}</Text>
                        </View>
                    ))}
                </Animated.ScrollView>

                {/* Pagination Dots */}
                <View style={styles.pagination}>
                    {slides.map((_, index) => {
                        const dotStyle = useAnimatedStyle(() => {
                            const inputRange = [
                                (index - 1) * width,
                                index * width,
                                (index + 1) * width,
                            ];

                            const dotWidth = interpolate(
                                scrollX.value,
                                inputRange,
                                [8, 24, 8],
                                'clamp'
                            );

                            const opacity = interpolate(
                                scrollX.value,
                                inputRange,
                                [0.3, 1, 0.3],
                                'clamp'
                            );

                            return {
                                width: dotWidth,
                                opacity,
                            };
                        });

                        return (
                            <Animated.View
                                key={index}
                                style={[styles.dot, dotStyle]}
                            />
                        );
                    })}
                </View>

                {/* Next Button */}
                <View style={styles.buttonContainer}>
                    <Button
                        title={currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
                        onPress={handleNext}
                        variant="secondary"
                    />
                </View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
    },
    skipButton: {
        position: 'absolute',
        top: theme.spacing.xxl,
        right: theme.spacing.md,
        zIndex: 10,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
    },
    skipText: {
        ...theme.typography.body,
        color: theme.colors.white,
        fontWeight: '600',
    },
    slide: {
        width,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: theme.spacing.xl,
    },
    icon: {
        fontSize: 120,
        marginBottom: theme.spacing.xl,
    },
    title: {
        ...theme.typography.h1,
        color: theme.colors.white,
        marginBottom: theme.spacing.md,
        textAlign: 'center',
    },
    description: {
        ...theme.typography.body,
        color: theme.colors.white,
        opacity: 0.9,
        textAlign: 'center',
        lineHeight: 24,
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: theme.spacing.xl,
    },
    dot: {
        height: 8,
        borderRadius: 4,
        backgroundColor: theme.colors.white,
        marginHorizontal: 4,
    },
    buttonContainer: {
        paddingHorizontal: theme.spacing.xl,
        paddingBottom: theme.spacing.xxl,
    },
});
