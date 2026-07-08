import type { Theme } from "@react-navigation/native";

export type AppTheme = {
  colors: {
    background: string;
    card: string;
    border: string;
    text: string;
    muted: string;
    accent: string;
    success: string;
    warning: string;
  };
};

export const appTheme: AppTheme = {
  colors: {
    background: "#F7F1EA",
    card: "#FFF9F3",
    border: "#E1CBB8",
    text: "#2D1F18",
    muted: "#7A6255",
    accent: "#9B4D2F",
    success: "#2F7D4A",
    warning: "#C84B31"
  }
};

export const navigationTheme: Theme = {
  dark: false,
  colors: {
    primary: appTheme.colors.accent,
    background: appTheme.colors.background,
    card: appTheme.colors.card,
    text: appTheme.colors.text,
    border: appTheme.colors.border,
    notification: appTheme.colors.warning
  },
  fonts: {
    regular: {
      fontFamily: "System",
      fontWeight: "400"
    },
    medium: {
      fontFamily: "System",
      fontWeight: "500"
    },
    bold: {
      fontFamily: "System",
      fontWeight: "700"
    },
    heavy: {
      fontFamily: "System",
      fontWeight: "800"
    }
  }
};
