import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";

import { mobileModules } from "../modules/registry";
import type { AppTheme } from "../shared/theme/theme";
import { apiClient, getApiBaseUrl } from "../services/apiClient";

type Props = {
  theme: AppTheme;
};

type HealthResponse = {
  app: string;
  status: string;
  environment: string;
  database?: string;
};

export function MainTabs({ theme }: Props) {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [isLoadingHealth, setIsLoadingHealth] = useState(true);
  const [healthError, setHealthError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadHealth() {
      try {
        const response = await apiClient<HealthResponse>("/health");

        if (!isMounted) {
          return;
        }

        setHealth(response);
        setHealthError(null);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setHealth(null);
        setHealthError(error instanceof Error ? error.message : "Unable to reach backend");
      } finally {
        if (isMounted) {
          setIsLoadingHealth(false);
        }
      }
    }

    loadHealth();

    return () => {
      isMounted = false;
    };
  }, []);

  const statusColor = health?.status === "ok" ? theme.colors.success : theme.colors.warning;
  const statusLabel = isLoadingHealth ? "Checking backend..." : health ? "Project connected" : "Frontend only";

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>EndoCare</Text>
        <Text style={[styles.subtitle, { color: theme.colors.muted }]}>
          Mobile app is running. This screen confirms the project loaded successfully.
        </Text>
      </View>
      <FlatList
        data={mobileModules}
        keyExtractor={(item) => item.slug}
        ListHeaderComponent={
          <View
            style={[
              styles.banner,
              {
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.border
              }
            ]}
          >
            <View style={styles.bannerRow}>
              <Text style={[styles.bannerTitle, { color: theme.colors.text }]}>Status</Text>
              <View style={[styles.statusPill, { backgroundColor: statusColor }]}>
                <Text style={styles.statusPillText}>{statusLabel}</Text>
              </View>
            </View>

            {isLoadingHealth ? (
              <View style={styles.loadingRow}>
                <ActivityIndicator color={theme.colors.accent} />
                <Text style={[styles.bannerBody, { color: theme.colors.muted }]}>
                  Trying {getApiBaseUrl()}/health
                </Text>
              </View>
            ) : health ? (
              <>
                <Text style={[styles.bannerBody, { color: theme.colors.muted }]}>
                  Frontend is connected to {health.app} in {health.environment}.
                </Text>
                <Text style={[styles.bannerMeta, { color: theme.colors.text }]}>
                  API status: {health.status} | Database: {health.database ?? "unknown"}
                </Text>
              </>
            ) : (
              <>
                <Text style={[styles.bannerBody, { color: theme.colors.muted }]}>
                  The mobile app loaded, but the backend could not be reached at {getApiBaseUrl()}.
                </Text>
                <Text style={[styles.bannerMeta, { color: theme.colors.warning }]}>
                  {healthError ?? "Start the backend and reload the app."}
                </Text>
              </>
            )}
          </View>
        }
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
            <Text style={[styles.cardTitle, { color: theme.colors.text }]}>{item.name}</Text>
            <Text style={[styles.cardBody, { color: theme.colors.muted }]}>{item.description}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12
  },
  banner: {
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderRadius: 18
  },
  bannerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    marginBottom: 10
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: "700"
  },
  bannerBody: {
    fontSize: 14,
    lineHeight: 20
  },
  bannerMeta: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: "600"
  },
  loadingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  statusPill: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6
  },
  statusPillText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700"
  },
  title: {
    fontSize: 28,
    fontWeight: "700"
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14
  },
  card: {
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
    borderWidth: 1,
    borderRadius: 16
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6
  },
  cardBody: {
    fontSize: 14,
    lineHeight: 20
  }
});
