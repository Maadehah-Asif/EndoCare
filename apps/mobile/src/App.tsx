import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

import { mobileModules } from "./modules/registry";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.kicker}>EndoCare</Text>
          <Text style={styles.title}>Frontend connected</Text>
          <Text style={styles.body}>
            The React Native app loaded successfully in Expo. This confirms the mobile project is running.
          </Text>
        </View>

        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>Current status</Text>
          <Text style={styles.bannerBody}>
            Mobile UI is working. Start the backend separately if you want live API health checks next.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Planned modules</Text>
          {mobileModules.map((module) => (
            <View key={module.slug} style={styles.card}>
              <Text style={styles.cardTitle}>{module.name}</Text>
              <Text style={styles.cardBody}>{module.description}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F1EA"
  },
  content: {
    padding: 20,
    paddingBottom: 32
  },
  hero: {
    backgroundColor: "#FFF9F3",
    borderColor: "#E1CBB8",
    borderWidth: 1,
    borderRadius: 24,
    padding: 20,
    marginBottom: 16
  },
  kicker: {
    color: "#9B4D2F",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 1
  },
  title: {
    color: "#2D1F18",
    fontSize: 30,
    fontWeight: "800",
    marginBottom: 10
  },
  body: {
    color: "#7A6255",
    fontSize: 15,
    lineHeight: 22
  },
  banner: {
    backgroundColor: "#FFF9F3",
    borderColor: "#E1CBB8",
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
    marginBottom: 20
  },
  bannerTitle: {
    color: "#2D1F18",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6
  },
  bannerBody: {
    color: "#7A6255",
    fontSize: 14,
    lineHeight: 20
  },
  section: {
    gap: 12
  },
  sectionTitle: {
    color: "#2D1F18",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4
  },
  card: {
    backgroundColor: "#FFF9F3",
    borderColor: "#E1CBB8",
    borderWidth: 1,
    borderRadius: 16,
    padding: 16
  },
  cardTitle: {
    color: "#2D1F18",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 6
  },
  cardBody: {
    color: "#7A6255",
    fontSize: 14,
    lineHeight: 20
  }
});
