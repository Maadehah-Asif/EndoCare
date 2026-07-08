import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AuthStack } from "./AuthStack";
import { MainTabs } from "./MainTabs";
import type { AppTheme } from "../shared/theme/theme";
import type { RootStackParamList } from "../types/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

type Props = {
  theme: AppTheme;
};

export function RootNavigator({ theme }: Props) {
  const isSignedIn = true;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isSignedIn ? (
        <Stack.Screen name="MainTabs">
          {() => <MainTabs theme={theme} />}
        </Stack.Screen>
      ) : (
        <Stack.Screen name="AuthStack">
          {() => <AuthStack theme={theme} />}
        </Stack.Screen>
      )}
    </Stack.Navigator>
  );
}

