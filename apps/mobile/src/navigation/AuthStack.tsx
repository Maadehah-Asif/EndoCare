import { SafeAreaView, StyleSheet, Text } from "react-native";

import type { AppTheme } from "../shared/theme/theme";

type Props = {
  theme: AppTheme;
};

export function AuthStack({ theme }: Props) {
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Auth Stack Placeholder</Text>
      <Text style={[styles.body, { color: theme.colors.muted }]}>
        Put login, signup, and onboarding gate screens here.
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8
  },
  body: {
    fontSize: 14,
    lineHeight: 20
  }
});

