import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  ImageStyle, 
  ViewStyle, 
  TextStyle,
  StyleProp
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, shadow, borderRadius } from '../constants/theme';

type FontWeight = 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

// Extend ViewStyle to include scroll overflow
declare module 'react-native' {
  interface ViewStyle {
    overflow?: 'visible' | 'hidden' | 'scroll';
  }
}

// Define style types
interface Styles {
  [key: string]: ViewStyle | TextStyle | ImageStyle;
  container: ViewStyle;
  header: ViewStyle;
  greeting: TextStyle;
  subtitle: TextStyle;
  notificationButton: ViewStyle;
  searchBar: ViewStyle;
  searchIcon: ViewStyle;
  searchText: TextStyle;
  section: ViewStyle;
  sectionHeader: ViewStyle;
  sectionTitle: TextStyle;
  seeAll: TextStyle;
  featuresGrid: ViewStyle;
  featureCard: ViewStyle;
  featureIcon: ViewStyle;
  featureText: TextStyle;
  courseCard: ViewStyle;
  courseThumbnail: ImageStyle;
  courseInfo: ViewStyle;
  courseTitle: TextStyle;
  progressContainer: ViewStyle;
  progressBar: ViewStyle;
  progressFill: ViewStyle;
  progressText: TextStyle;
  courseMeta: ViewStyle;
  courseMetaText: TextStyle;
  recommendedContainer: ViewStyle;
  recommendedCard: ViewStyle;
  recommendedThumbnail: ViewStyle;
  recommendedTitle: TextStyle;
  recommendedInstructor: TextStyle;
  ratingContainer: ViewStyle;
  ratingText: TextStyle;
  ratingCount: TextStyle;
}

const HomeScreen = ({ navigation }: any) => {
  const features: Array<{
    id: string;
    title: string;
    icon: keyof typeof Ionicons.glyphMap;
    color: string;
    onPress: () => void;
  }> = [
    {
      id: 'ai-tutor',
      title: 'AI Tutor',
      icon: 'school-outline',
      color: colors.primary,
      onPress: () => navigation.navigate('AITutor'),
    },
    {
      id: 'courses',
      title: 'My Courses',
      icon: 'book-outline',
      color: colors.secondary,
      onPress: () => navigation.navigate('Courses'),
    },
    {
      id: 'progress',
      title: 'Progress',
      icon: 'trending-up-outline',
      color: colors.success,
      onPress: () => navigation.navigate('Progress'),
    },
    {
      id: 'collaborate',
      title: 'Collaborate',
      icon: 'people-outline',
      color: colors.warning,
      onPress: () => navigation.navigate('Collaborate'),
    },
  ];

  const recentCourses = [
    {
      id: '1',
      title: 'Introduction to AI',
      progress: 75,
      thumbnail: 'https://via.placeholder.com/150',
    },
    {
      id: '2',
      title: 'Web Development',
      progress: 40,
      thumbnail: 'https://via.placeholder.com/150',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, User!</Text>
            <Text style={styles.subtitle}>What would you like to learn today?</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color={colors.dark} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <TouchableOpacity style={styles.searchBar} onPress={() => navigation.navigate('Search')}>
          <Ionicons name="search" size={20} color={colors.gray} style={styles.searchIcon} />
          <Text style={styles.searchText}>Search courses, lessons, or topics</Text>
        </TouchableOpacity>

        {/* Features Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Access</Text>
          <View style={styles.featuresGrid}>
            {features.map((feature) => (
              <TouchableOpacity
                key={feature.id}
                style={[styles.featureCard, { backgroundColor: `${feature.color}15` }]}
                onPress={feature.onPress}
              >
                <View style={[styles.featureIcon, { backgroundColor: feature.color }]}>
                  <Ionicons name={feature.icon} size={24} color="white" />
                </View>
                <Text style={styles.featureText}>{feature.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Continue Learning */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Continue Learning</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {recentCourses.map((course) => (
            <TouchableOpacity key={course.id} style={styles.courseCard}>
              <Image 
                source={{ uri: course.thumbnail }} 
                style={styles.courseThumbnail as ImageStyle}
                resizeMode="cover"
              />
              <View style={styles.courseInfo}>
                <Text style={styles.courseTitle}>{course.title}</Text>
                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View 
                      style={[styles.progressFill, { width: `${course.progress}%` }]} 
                    />
                  </View>
                  <Text style={styles.progressText}>{course.progress}%</Text>
                </View>
                <View style={styles.courseMeta}>
                  <Text style={styles.courseMetaText}>Continue</Text>
                  <Ionicons name="play-circle" size={20} color={colors.primary} />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recommended For You */}
        <View style={[styles.section, { marginBottom: spacing.xxl }]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommended For You</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.recommendedContainer}
          >
            {[1, 2, 3].map((item) => (
              <View key={item} style={styles.recommendedCard}>
                <View style={styles.recommendedThumbnail} />
                <Text style={styles.recommendedTitle}>Course Title {item}</Text>
                <Text style={styles.recommendedInstructor}>Instructor Name</Text>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={16} color="#F59E0B" />
                  <Text style={styles.ratingText}>4.8</Text>
                  <Text style={styles.ratingCount}>(128)</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
  },
  greeting: {
    ...typography.h2,
    color: colors.dark,
    marginBottom: spacing.xs,
    fontWeight: '600' as FontWeight,
  },
  subtitle: {
    ...typography.body,
    color: colors.gray,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    borderRadius: 10,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchText: {
    ...typography.body,
    color: colors.gray,
  },
  section: {
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.dark,
    fontWeight: '600' as FontWeight,
  },
  seeAll: {
    ...typography.small,
    color: colors.primary,
    fontWeight: '500' as FontWeight,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: '48%',
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.md,
    ...shadow.sm,
    backgroundColor: colors.white,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  featureText: {
    ...typography.body,
    fontWeight: '500' as FontWeight,
    color: colors.dark,
  },
  courseCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden' as const,
    marginBottom: spacing.md,
    ...shadow.sm,
  },
  courseThumbnail: {
    width: 100,
    height: '100%',
  },
  courseInfo: {
    flex: 1,
    padding: spacing.md,
  },
  courseTitle: {
    ...typography.body,
    fontWeight: '600' as FontWeight,
    marginBottom: spacing.sm,
    color: colors.dark,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: colors.lightGray,
    borderRadius: 3,
    marginRight: spacing.sm,
    overflow: 'hidden' as const,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  progressText: {
    ...typography.small,
    color: colors.gray,
  },
  courseMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  courseMetaText: {
    ...typography.small,
    color: colors.primary,
    fontWeight: '500' as FontWeight,
  },
  recommendedContainer: {
    paddingBottom: spacing.sm,
  },
  recommendedCard: {
    width: 200,
    marginRight: spacing.md,
  },
  recommendedThumbnail: {
    width: '100%',
    height: 120,
    backgroundColor: colors.lightGray,
    borderRadius: 12,
    marginBottom: spacing.sm,
  },
  recommendedTitle: {
    ...typography.body,
    fontWeight: '600' as FontWeight,
    marginBottom: 2,
    color: colors.dark,
  },
  recommendedInstructor: {
    ...typography.small,
    color: colors.gray,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    ...typography.small,
    fontWeight: '600' as FontWeight,
    marginLeft: 4,
    marginRight: 4,
    color: colors.dark,
  },
  ratingCount: {
    ...typography.small,
    color: colors.gray,
  },
});

export default HomeScreen;
