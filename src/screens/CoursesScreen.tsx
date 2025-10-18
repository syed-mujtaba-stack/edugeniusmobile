import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  TextInput, 
  ImageStyle, 
  TextStyle, 
  ViewStyle 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, shadow } from '../constants/theme';

type FontWeight = 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

// Define style types
interface Styles {
  [key: string]: ViewStyle | TextStyle | ImageStyle;
  container: ViewStyle;
  header: ViewStyle;
  title: TextStyle;
  searchContainer: ViewStyle;
  searchInput: TextStyle;
  categoriesContainer: ViewStyle;
  categoryItem: ViewStyle;
  categoryText: TextStyle;
  activeCategoryText: TextStyle;
  courseCard: ViewStyle;
  courseImageContainer: ViewStyle;
  courseImage: ImageStyle;
  featuredBadge: ViewStyle;
  featuredText: TextStyle;
  courseInfo: ViewStyle;
  courseTitle: TextStyle;
  courseInstructor: TextStyle;
  ratingContainer: ViewStyle;
  rating: ViewStyle;
  ratingText: TextStyle;
  ratingCount: TextStyle;
  priceContainer: ViewStyle;
  price: TextStyle;
  addToCartButton: ViewStyle;
  sectionTitle: TextStyle;
  sectionHeader: ViewStyle;
  seeAll: TextStyle;
}

const categories = [
  { id: 'all', name: 'All' },
  { id: 'programming', name: 'Programming' },
  { id: 'design', name: 'Design' },
  { id: 'business', name: 'Business' },
  { id: 'marketing', name: 'Marketing' },
  { id: 'data-science', name: 'Data Science' },
];

const courses = [
  {
    id: '1',
    title: 'Complete React Native Development',
    instructor: 'John Doe',
    rating: 4.8,
    students: 1245,
    duration: '12 hours',
    thumbnail: 'https://via.placeholder.com/300x200',
    category: 'programming',
    price: 49.99,
    isFeatured: true,
  },
  {
    id: '2',
    title: 'UI/UX Design Fundamentals',
    instructor: 'Jane Smith',
    rating: 4.7,
    students: 987,
    duration: '8 hours',
    thumbnail: 'https://via.placeholder.com/300x200',
    category: 'design',
    price: 39.99,
    isFeatured: true,
  },
  {
    id: '3',
    title: 'Data Science for Beginners',
    instructor: 'Alex Johnson',
    rating: 4.9,
    students: 1567,
    duration: '15 hours',
    thumbnail: 'https://via.placeholder.com/300x200',
    category: 'data-science',
    price: 59.99,
    isFeatured: false,
  },
  {
    id: '4',
    title: 'Digital Marketing Masterclass',
    instructor: 'Sarah Williams',
    rating: 4.6,
    students: 876,
    duration: '10 hours',
    thumbnail: 'https://via.placeholder.com/300x200',
    category: 'marketing',
    price: 44.99,
    isFeatured: true,
  },
  {
    id: '5',
    title: 'Business Strategy & Management',
    instructor: 'Michael Brown',
    rating: 4.5,
    students: 654,
    duration: '9 hours',
    thumbnail: 'https://via.placeholder.com/300x200',
    category: 'business',
    price: 49.99,
    isFeatured: false,
  },
];

const CoursesScreen = ({ navigation }: any) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = courses.filter(course => {
    const matchesCategory = activeCategory === 'all' || course.category === activeCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const renderCategory = ({ item }: { item: { id: string; name: string } }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        activeCategory === item.id && styles.activeCategoryItem,
      ]}
      onPress={() => setActiveCategory(item.id)}
    >
      <Text
        style={[
          styles.categoryText,
          activeCategory === item.id && styles.activeCategoryText,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderCourse = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.courseCard}
      onPress={() => navigation.navigate('CourseDetails', { courseId: item.id })}
    >
      <View style={styles.courseImageContainer}>
        <Image 
          source={{ uri: item.thumbnail }} 
          style={styles.courseImage as ImageStyle}
          resizeMode="cover"
        />
        {item.isFeatured && (
          <View style={styles.featuredBadge}>
            <Text style={styles.featuredText}>Featured</Text>
          </View>
        )}
      </View>
      <View style={styles.courseInfo}>
        <Text style={styles.courseTitle} numberOfLines={2} ellipsizeMode="tail">
          {item.title}
        </Text>
        <Text style={styles.courseInstructor} numberOfLines={1} ellipsizeMode="tail">
          {item.instructor}
        </Text>
        <View style={styles.ratingContainer}>
          <View style={styles.rating}>
            <Ionicons name="star" size={16} color="#F59E0B" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
          <Text style={styles.studentsCount}>({item.students})</Text>
          <Text style={styles.duration}>{item.duration}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
          <TouchableOpacity style={styles.addToCartButton}>
            <Ionicons name="add" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Find Your Course</Text>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={colors.gray} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search courses, instructors..."
            placeholderTextColor={colors.gray}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={colors.gray} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      <View style={styles.coursesContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {activeCategory === 'all' ? 'All Courses' : activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Courses
          </Text>
          <Text style={styles.resultsCount}>{filteredCourses.length} results</Text>
        </View>

        <FlatList
          data={filteredCourses}
          renderItem={renderCourse}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.coursesList}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  title: {
    ...typography.h3,
    marginBottom: spacing.md,
    color: colors.dark,
    fontWeight: '600' as FontWeight,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    borderRadius: 10,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    ...typography.body,
    color: colors.dark,
    padding: 0,
  },
  categoriesContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  categoriesList: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  categoryItem: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    marginRight: spacing.sm,
    backgroundColor: colors.lightGray,
  },
  activeCategoryItem: {
    backgroundColor: colors.primary,
  },
  categoryText: {
    ...typography.body,
    color: colors.gray,
    fontWeight: '500',
  },
  activeCategoryText: {
    color: colors.white,
  },
  coursesContainer: {
    flex: 1,
    padding: spacing.md,
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
    marginBottom: spacing.md,
    fontWeight: '600' as FontWeight,
  },
  resultsCount: {
    ...typography.small,
    color: colors.gray,
  },
  coursesList: {
    paddingBottom: spacing.xxl,
  },
  courseCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: spacing.md,
    ...shadow.sm,
    overflow: 'hidden',
  },
  courseImageContainer: {
    width: 120,
    height: 120,
    position: 'relative',
  },
  courseImage: {
    width: '100%',
    height: '100%',
  },
  featuredBadge: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: 4,
  },
  featuredText: {
    ...typography.small,
    color: colors.white,
    fontWeight: '600',
    fontSize: 10,
  },
  courseInfo: {
    flex: 1,
    padding: spacing.md,
    justifyContent: 'space-between',
  },
  courseTitle: {
    ...typography.body,
    fontWeight: '600',
    color: colors.dark,
    marginBottom: 4,
  },
  courseInstructor: {
    ...typography.small,
    color: colors.gray,
    marginBottom: spacing.sm,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  ratingText: {
    ...typography.small,
    fontWeight: '600',
    marginLeft: 2,
    color: colors.dark,
  },
  studentsCount: {
    ...typography.small,
    color: colors.gray,
    marginRight: spacing.sm,
  },
  duration: {
    ...typography.small,
    color: colors.gray,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    ...typography.h3,
    color: colors.primary,
    fontWeight: '600' as FontWeight,
  },
  addToCartButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: `${colors.primary}20`,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CoursesScreen;
