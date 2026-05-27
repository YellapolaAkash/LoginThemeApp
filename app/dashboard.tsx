import React from 'react';
import { ScrollView, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { CustomButton } from '../src/components/CustomButton';
import { useAppTheme } from '../src/hooks/redux';

export default function Dashboard() {
  const router = useRouter();
  const theme = useAppTheme();

  const handleLogout = () => {
    router.replace({ pathname: '/' } as const);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}> 
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.card, { backgroundColor: theme.colors.surface, shadowColor: theme.colors.textPrimary }]}> 
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>Premium Vision</Text>
          </View>
          <Text style={[styles.heading, { color: theme.colors.textPrimary }]}>Welcome to OKULR</Text>
          <Text style={[styles.subtitle, { color: theme.colors.secondary }]}>Connecting vision to sense, making sense of seeing</Text>
          <Text style={[styles.body, { color: theme.colors.textSecondary }]}>Welcome to OKULR! We’re a young team of vision computing geeks who believe that it’s the data that’s important in the video, and not just the video. At Okulr we replicate the amazing connectivity between the eye and the brain to see and interpret the data from what we see, thus making sense of seeing in a camera.</Text>
          <CustomButton title="Logout" onPress={handleLogout} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
    minHeight: '100%',
  },
  card: {
    borderRadius: 32,
    borderWidth: 1,
    borderColor: '#D5B76B22',
    padding: 30,
    shadowOpacity: 0.18,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 16 },
    elevation: 16,
    backgroundColor: '#0F172A',
  },
  badgeContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#F4E8C1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 18,
  },
  badgeText: {
    color: '#3F2E1A',
    fontWeight: '700',
    fontSize: 12,
    letterSpacing: 0.5,
  },
  heading: {
    fontSize: 34,
    fontWeight: '900',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 20,
    lineHeight: 26,
  },
  body: {
    fontSize: 16,
    lineHeight: 28,
    marginBottom: 30,
  },
});
