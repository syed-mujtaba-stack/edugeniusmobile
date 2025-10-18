import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, shadow } from '../constants/theme';

// Mock AI features data
const aiFeatures = [
  {
    id: 'tutor',
    title: 'AI Tutor',
    description: 'Get instant answers to your questions',
    icon: 'chatbubbles',
    color: '#8B5CF6',
  },
  {
    id: 'essay',
    title: 'Essay Evaluator',
    description: 'Get feedback on your writing',
    icon: 'document-text',
    color: '#EC4899',
  },
  {
    id: 'quiz',
    title: 'Quiz Generator',
    description: 'Generate practice quizzes',
    icon: 'help-circle',
    color: '#3B82F6',
  },
  {
    id: 'summarizer',
    title: 'Text Summarizer',
    description: 'Summarize long texts',
    icon: 'newspaper',
    color: '#10B981',
  },
  {
    id: 'code',
    title: 'Code Assistant',
    description: 'Get help with programming',
    icon: 'code',
    color: '#F59E0B',
  },
  {
    id: 'career',
    title: 'Career Advisor',
    description: 'Get career guidance',
    icon: 'briefcase',
    color: '#6366F1',
  },
];

// Mock chat messages
const initialMessages = [
  {
    id: '1',
    text: 'Hello! I\'m your AI learning assistant. How can I help you today?',
    sender: 'ai',
    timestamp: new Date().toISOString(),
  },
];

const AILearningScreen = () => {
  const [activeTab, setActiveTab] = useState('features'); // 'features' or 'chat'
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        text: `I understand you're asking about "${message}". I can help with that! Here's some information that might be useful...`,
        sender: 'ai',
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const renderFeatureCard = (feature: any) => (
    <TouchableOpacity
      key={feature.id}
      style={[styles.featureCard, { backgroundColor: `${feature.color}15` }]}
      onPress={() => {
        setActiveTab('chat');
        // You could also set a specific context for the AI based on the feature
      }}
    >
      <View style={[styles.featureIcon, { backgroundColor: feature.color }]}>
        <Ionicons name={feature.icon} size={24} color="white" />
      </View>
      <Text style={styles.featureTitle}>{feature.title}</Text>
      <Text style={styles.featureDescription} numberOfLines={2}>
        {feature.description}
      </Text>
    </TouchableOpacity>
  );

  const renderMessage = ({ item }: { item: any }) => (
    <View
      style={[
        styles.messageBubble,
        item.sender === 'user' ? styles.userBubble : styles.aiBubble,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
      <Text style={styles.timestamp}>
        {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>AI Learning Assistant</Text>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'features' && styles.activeTab]}
            onPress={() => setActiveTab('features')}
          >
            <Text style={[styles.tabText, activeTab === 'features' && styles.activeTabText]}>
              Features
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'chat' && styles.activeTab]}
            onPress={() => setActiveTab('chat')}
          >
            <Text style={[styles.tabText, activeTab === 'chat' && styles.activeTabText]}>
              Chat
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {activeTab === 'features' ? (
        <ScrollView 
          style={styles.content} 
          contentContainerStyle={styles.featuresContainer}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.sectionTitle}>AI-Powered Learning Tools</Text>
          <Text style={styles.sectionSubtitle}>
            Enhance your learning experience with our intelligent AI features
          </Text>
          
          <View style={styles.featuresGrid}>
            {aiFeatures.map(renderFeatureCard)}
          </View>

          <View style={styles.infoCard}>
            <Ionicons name="bulb" size={24} color={colors.warning} style={styles.infoIcon} />
            <View>
              <Text style={styles.infoTitle}>Pro Tip</Text>
              <Text style={styles.infoText}>
                Try asking our AI tutor to explain complex concepts in simple terms or to generate practice questions on any topic.
              </Text>
            </View>
          </View>
        </ScrollView>
      ) : (
        <View style={styles.chatContainer}>
          <ScrollView
            ref={scrollViewRef}
            style={styles.messagesContainer}
            contentContainerStyle={styles.messagesContent}
            onContentSizeChange={() => 
              scrollViewRef.current?.scrollToEnd({ animated: true })
            }
          >
            {messages.map((msg) => (
              <View key={msg.id} style={styles.messageContainer}>
                {renderMessage({ item: msg })}
              </View>
            ))}
            {isTyping && (
              <View style={[styles.messageBubble, styles.aiBubble]}>
                <View style={styles.typingIndicator}>
                  <View style={styles.typingDot} />
                  <View style={[styles.typingDot, { marginHorizontal: 4 }]} />
                  <View style={styles.typingDot} />
                </View>
              </View>
            )}
          </ScrollView>

          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.inputContainer}
            keyboardVerticalOffset={90}
          >
            <TextInput
              style={styles.input}
              placeholder="Ask me anything..."
              placeholderTextColor={colors.gray}
              value={message}
              onChangeText={setMessage}
              multiline
            />
            <TouchableOpacity 
              style={styles.sendButton}
              onPress={handleSendMessage}
              disabled={!message.trim()}
            >
              <Ionicons 
                name="send" 
                size={24} 
                color={message.trim() ? colors.primary : colors.gray} 
              />
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      )}
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
    ...typography.h2,
    color: colors.dark,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.lightGray,
    borderRadius: 10,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    backgroundColor: colors.white,
    ...shadow.sm,
  },
  tabText: {
    ...typography.body,
    fontWeight: '500',
    color: colors.gray,
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: spacing.md,
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.dark,
    marginBottom: spacing.md,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700' as const,
    lineHeight: 32,
  },
  sectionSubtitle: {
    ...typography.body,
    color: colors.gray,
    marginBottom: spacing.xl,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500' as const,
    lineHeight: 24,
  },
  featuresContainer: {
    paddingBottom: spacing.xxl,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  featureCard: {
    width: '48%',
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.md,
    backgroundColor: colors.white,
    ...shadow.sm,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  featureTitle: {
    ...typography.body,
    fontWeight: '600',
    color: colors.dark,
    marginBottom: spacing.xs,
  },
  featureDescription: {
    ...typography.small,
    color: colors.gray,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: `${colors.primary}10`,
    borderRadius: 12,
    padding: spacing.md,
    marginTop: spacing.sm,
  },
  infoIcon: {
    marginRight: spacing.md,
    marginTop: 2,
  },
  infoTitle: {
    ...typography.body,
    fontWeight: '600',
    color: colors.dark,
    marginBottom: spacing.xs,
  },
  infoText: {
    ...typography.small,
    color: colors.gray,
  },
  chatContainer: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
    padding: spacing.md,
  },
  messagesContent: {
    paddingBottom: spacing.xxl,
  },
  messageContainer: {
    marginBottom: spacing.md,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: spacing.md,
    borderRadius: 16,
    ...shadow.sm, // Using 'sm' shadow instead of 'xs' which doesn't exist in the theme
  },
  userBubble: {
    backgroundColor: colors.primary,
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: colors.white,
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    ...typography.body,
    color: colors.dark,
    marginBottom: spacing.xs,
  },
  userMessageText: {
    color: colors.white,
  },
  timestamp: {
    ...typography.small,
    color: colors.gray,
    fontSize: 10,
    textAlign: 'right',
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 24,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.gray,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
    backgroundColor: colors.white,
  },
  input: {
    flex: 1,
    backgroundColor: colors.lightGray,
    borderRadius: 20,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    maxHeight: 120,
    ...typography.body,
    color: colors.dark,
  },
  sendButton: {
    marginLeft: spacing.sm,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: `${colors.primary}20`,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AILearningScreen;
