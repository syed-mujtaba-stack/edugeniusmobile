import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  TextStyle, 
  ViewStyle, 
  ImageStyle,
  StyleProp
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, shadow } from '../constants/theme';

type FontWeight = 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

type MenuItem = {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
};

// Define style types
interface Styles {
  [key: string]: ViewStyle | TextStyle | ImageStyle;
  container: ViewStyle;
  header: ViewStyle;
  avatarContainer: ViewStyle;
  avatar: ImageStyle;
  editButton: ViewStyle;
  userName: TextStyle;
  userEmail: TextStyle;
  joinedDate: TextStyle;
  statsContainer: ViewStyle;
  statItem: ViewStyle;
  statValue: TextStyle;
  statLabel: TextStyle;
  statDivider: ViewStyle;
  menuContainer: ViewStyle;
  menuItem: ViewStyle & { borderBottomColor?: string };
  menuIconContainer: ViewStyle;
  menuText: TextStyle;
  versionContainer: ViewStyle;
  versionText: TextStyle;
}

const ProfileScreen = () => {
  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    joinedDate: 'Joined October 2023',
    stats: {
      courses: 12,
      hours: 45,
      certificates: 5,
    },
  };

  const menuItems: MenuItem[] = [
    { id: 'settings', icon: 'settings-outline', label: 'Settings', onPress: () => {} },
    { id: 'bookmark', icon: 'bookmark-outline', label: 'Saved Courses', onPress: () => {} },
    { id: 'document', icon: 'document-text-outline', label: 'My Certificates', onPress: () => {} },
    { id: 'time', icon: 'time-outline', label: 'Learning History', onPress: () => {} },
    { id: 'card', icon: 'card-outline', label: 'Payment Methods', onPress: () => {} },
    { id: 'help', icon: 'help-circle-outline', label: 'Help & Support', onPress: () => {} },
    { id: 'logout', icon: 'log-out-outline', label: 'Sign Out', onPress: () => {} },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
            <TouchableOpacity style={styles.editButton}>
              <Ionicons name="camera" size={16} color={colors.white} />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          <Text style={styles.joinedDate}>{user.joinedDate}</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.stats.courses}</Text>
              <Text style={styles.statLabel}>Courses</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.stats.hours}</Text>
              <Text style={styles.statLabel}>Hours</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.stats.certificates}</Text>
              <Text style={styles.statLabel}>Certificates</Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.menuItem}
              onPress={item.onPress}
            >
              <View style={styles.menuIconContainer}>
                <Ionicons name={item.icon} size={20} color={colors.primary} />
              </View>
              <Text style={styles.menuText}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={20} color={colors.gray} />
            </TouchableOpacity>
          ))}
        </View>

        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>EduGenius v1.0.0</Text>
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
    alignItems: 'center',
    padding: spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: spacing.md,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: colors.primary,
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.white,
  },
  userName: {
    fontSize: 24,
    fontWeight: '600' as const,
    lineHeight: 32,
    color: colors.dark,
    marginTop: spacing.sm,
  },
  userEmail: {
    ...typography.body,
    color: colors.gray,
    marginTop: spacing.xs,
  },
  joinedDate: {
    ...typography.small,
    color: colors.gray,
    marginTop: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: spacing.xl,
    paddingHorizontal: spacing.xl,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    ...typography.h3,
    color: colors.primary,
    fontWeight: '700' as const,
  } as TextStyle,
  statLabel: {
    ...typography.small,
    color: colors.gray,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: colors.lightGray,
  },
  menuContainer: {
    padding: spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: `${colors.lightGray}80`,
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: `${colors.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  menuText: {
    ...typography.body,
    flex: 1,
    color: colors.dark,
  },
  versionContainer: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  versionText: {
    ...typography.small,
    color: colors.gray,
  },
});

export default ProfileScreen;
