import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";

import type { AppTheme } from "../shared/theme/theme";

type Props = {
  theme: AppTheme;
  onAuthenticated: () => void;
};

type AuthView = "landing" | "login" | "signup";

type LogoSize = "hero" | "compact";

type AuthFieldProps = {
  icon: string;
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address";
  autoComplete?: "email" | "password" | "new-password" | "name";
};

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
};

type SocialButtonProps = {
  brand: "Google" | "Apple";
};

export function AuthStack({ onAuthenticated }: Props) {
  const [activeView, setActiveView] = useState<AuthView>("landing");

  return (
    <SafeAreaView style={styles.safeArea}>
      <AuthBackground />
      {activeView === "landing" ? (
        <LandingScreen onLogin={() => setActiveView("login")} onGetStarted={() => setActiveView("signup")} />
      ) : activeView === "login" ? (
        <LoginScreen
          onBack={() => setActiveView("landing")}
          onSignup={() => setActiveView("signup")}
          onAuthenticated={onAuthenticated}
        />
      ) : (
        <SignupScreen
          onBack={() => setActiveView("landing")}
          onLogin={() => setActiveView("login")}
          onAuthenticated={onAuthenticated}
        />
      )}
    </SafeAreaView>
  );
}

function LandingScreen({
  onGetStarted,
  onLogin
}: {
  onGetStarted: () => void;
  onLogin: () => void;
}) {
  return (
    <View style={styles.landingContainer}>
      <View style={styles.landingContent}>
        <EndoCareLogo size="hero" />
        <View style={styles.messageBlock}>
          <Text style={styles.heroTitle}>You're not{"\n"}alone.</Text>
          <Text style={styles.heroBody}>Compassionate care for{"\n"}your endometriosis journey.</Text>
        </View>
      </View>

      <View style={styles.landingActions}>
        <PrimaryButton label="Get Started" onPress={onGetStarted} />
        <Text style={styles.footerText}>
          Already have an account?{" "}
          <Text style={styles.footerLink} onPress={onLogin}>
            Log in
          </Text>
        </Text>
      </View>
    </View>
  );
}

function LoginScreen({
  onBack,
  onSignup,
  onAuthenticated
}: {
  onBack: () => void;
  onSignup: () => void;
  onAuthenticated: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <AuthFormLayout onBack={onBack}>
      <View style={styles.loginHeader}>
        <EndoCareLogo size="compact" />
        <Text style={styles.screenTitle}>Welcome back!</Text>
        <Text style={styles.screenSubtitle}>Log in to continue your journey.</Text>
      </View>

      <View style={styles.form}>
        <AuthField
          icon="mail"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoComplete="email"
        />
        <AuthField
          icon="lock"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoComplete="password"
        />
        <Pressable style={styles.forgotButton} onPress={() => undefined}>
          <Text style={styles.forgotText}>Forgot password?</Text>
        </Pressable>
        <PrimaryButton label="Log In" onPress={onAuthenticated} />
      </View>

      <SocialAuthBlock />

      <Text style={styles.footerText}>
        Don't have an account?{" "}
        <Text style={styles.footerLink} onPress={onSignup}>
          Sign up
        </Text>
      </Text>
    </AuthFormLayout>
  );
}

function SignupScreen({
  onBack,
  onLogin,
  onAuthenticated
}: {
  onBack: () => void;
  onLogin: () => void;
  onAuthenticated: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <AuthFormLayout onBack={onBack}>
      <View style={styles.loginHeader}>
        <EndoCareLogo size="compact" />
        <Text style={styles.screenTitle}>Create account</Text>
        <Text style={styles.screenSubtitle}>Start a care space made for you.</Text>
      </View>

      <View style={styles.form}>
        <AuthField icon="user" placeholder="Full name" value={name} onChangeText={setName} autoComplete="name" />
        <AuthField
          icon="mail"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoComplete="email"
        />
        <AuthField
          icon="lock"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoComplete="new-password"
        />
        <PrimaryButton label="Sign Up" onPress={onAuthenticated} />
      </View>

      <SocialAuthBlock />

      <Text style={styles.footerText}>
        Already have an account?{" "}
        <Text style={styles.footerLink} onPress={onLogin}>
          Log in
        </Text>
      </Text>
    </AuthFormLayout>
  );
}

function AuthFormLayout({
  children,
  onBack
}: {
  children: React.ReactNode;
  onBack: () => void;
}) {
  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Pressable style={styles.backButton} onPress={onBack} hitSlop={12}>
        <Text style={styles.backButtonText}>‹</Text>
      </Pressable>
      <ScrollView
        contentContainerStyle={styles.formContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function EndoCareLogo({ size }: { size: LogoSize }) {
  const isHero = size === "hero";

  return (
    <View style={[styles.logo, isHero ? styles.logoHero : styles.logoCompact]}>
      <View style={styles.logoLine}>
        <Text style={[styles.logoText, isHero ? styles.logoTextHero : styles.logoTextCompact, styles.logoPink]}>
          ENDO
        </Text>
        <View style={[styles.logoMark, isHero ? styles.logoMarkHero : styles.logoMarkCompact]}>
          <View style={[styles.logoMarkDot, styles.logoMarkDotLeft]} />
          <View style={[styles.logoMarkDot, styles.logoMarkDotRight]} />
          <View style={styles.logoMarkStem} />
        </View>
      </View>
      <View style={styles.logoLine}>
        <Text style={[styles.logoText, isHero ? styles.logoTextHero : styles.logoTextCompact, styles.logoPink]}>
          C
        </Text>
        <View style={[styles.logoLotus, isHero ? styles.logoLotusHero : styles.logoLotusCompact]}>
          <View style={[styles.logoLotusLeaf, styles.logoLotusLeafLeft]} />
          <View style={[styles.logoLotusLeaf, styles.logoLotusLeafCenter]} />
          <View style={[styles.logoLotusLeaf, styles.logoLotusLeafRight]} />
        </View>
        <Text style={[styles.logoText, isHero ? styles.logoTextHero : styles.logoTextCompact, styles.logoPurple]}>
          ARE
        </Text>
        <View style={[styles.logoSpark, isHero ? styles.logoSparkHero : styles.logoSparkCompact]}>
          <View style={styles.logoSparkBar} />
          <View style={[styles.logoSparkBar, styles.logoSparkBarCross]} />
        </View>
      </View>
      <View style={[styles.logoSmile, isHero ? styles.logoSmileHero : styles.logoSmileCompact]} />
    </View>
  );
}

function AuthField({
  icon,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = "default",
  autoComplete
}: AuthFieldProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPasswordField = secureTextEntry;

  return (
    <View style={styles.inputShell}>
      <FieldIcon icon={icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#9D94B8"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry && !isPasswordVisible}
        keyboardType={keyboardType}
        autoCapitalize="none"
        autoComplete={autoComplete}
      />
      {isPasswordField ? (
        <Pressable
          style={styles.visibilityButton}
          onPress={() => setIsPasswordVisible((current) => !current)}
          hitSlop={8}
        >
          <Text style={styles.visibilityText}>{isPasswordVisible ? "hide" : "view"}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

function FieldIcon({ icon }: { icon: string }) {
  if (icon === "mail") {
    return (
      <View style={styles.mailIcon}>
        <View style={styles.mailIconFlapLeft} />
        <View style={styles.mailIconFlapRight} />
      </View>
    );
  }

  if (icon === "lock") {
    return (
      <View style={styles.lockIcon}>
        <View style={styles.lockIconShackle} />
        <View style={styles.lockIconBody} />
      </View>
    );
  }

  return (
    <View style={styles.userIcon}>
      <View style={styles.userIconHead} />
      <View style={styles.userIconBody} />
    </View>
  );
}

function SocialAuthBlock() {
  return (
    <View style={styles.socialBlock}>
      <View style={styles.dividerRow}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>or continue with</Text>
        <View style={styles.divider} />
      </View>
      <View style={styles.socialRow}>
        <SocialButton brand="Google" />
        <SocialButton brand="Apple" />
      </View>
    </View>
  );
}

function SocialButton({ brand }: SocialButtonProps) {
  const isGoogle = brand === "Google";

  return (
    <Pressable style={styles.socialButton} onPress={() => undefined}>
      <Text style={[styles.socialIcon, isGoogle ? styles.googleIcon : styles.appleIcon]}>
        {isGoogle ? "G" : "A"}
      </Text>
      <Text style={styles.socialText}>{brand}</Text>
    </Pressable>
  );
}

function PrimaryButton({ label, onPress }: PrimaryButtonProps) {
  return (
    <Pressable style={styles.primaryButton} onPress={onPress}>
      <View style={styles.primaryButtonLeft} />
      <View style={styles.primaryButtonRight} />
      <Text style={styles.primaryButtonText}>{label}</Text>
    </Pressable>
  );
}

function AuthBackground() {
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <View style={[styles.glow, styles.glowTopLeft]} />
      <View style={[styles.glow, styles.glowCenter]} />
      <Sparkle style={styles.sparkleTopLeft} color="#DCA7FF" />
      <Sparkle style={styles.sparkleTopRight} color="#74DDE6" />
      <Sparkle style={styles.sparkleMidLeft} color="#E4A7FF" />
      <Sparkle style={styles.sparkleMidRight} color="#76DCE5" />
      <Heart style={styles.heartTop} />
      <Heart style={styles.heartMid} />
      <FlowerSide side="left" />
      <FlowerSide side="right" />
      <View style={styles.bottomWave} />
    </View>
  );
}

function Sparkle({ color, style }: { color: string; style: object }) {
  return (
    <View style={[styles.sparkle, style]}>
      <View style={[styles.sparkleVertical, { backgroundColor: color }]} />
      <View style={[styles.sparkleHorizontal, { backgroundColor: color }]} />
    </View>
  );
}

function Heart({ style }: { style: object }) {
  return (
    <View style={[styles.heart, style]}>
      <View style={[styles.heartLobe, styles.heartLobeLeft]} />
      <View style={[styles.heartLobe, styles.heartLobeRight]} />
      <View style={styles.heartPoint} />
    </View>
  );
}

function FlowerSide({ side }: { side: "left" | "right" }) {
  const isLeft = side === "left";

  return (
    <View style={[styles.flower, isLeft ? styles.flowerLeft : styles.flowerRight]}>
      <View style={[styles.flowerLeaf, styles.flowerLeafTall, isLeft ? styles.flowerLeafLeftA : styles.flowerLeafRightA]} />
      <View style={[styles.flowerLeaf, styles.flowerLeafWide, isLeft ? styles.flowerLeafLeftB : styles.flowerLeafRightB]} />
      <View style={[styles.flowerLeaf, styles.flowerLeafSmall, isLeft ? styles.flowerLeafLeftC : styles.flowerLeafRightC]} />
      <View style={[styles.flowerStem, isLeft ? styles.flowerStemLeft : styles.flowerStemRight]} />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF7FC"
  },
  landingContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 28,
    paddingTop: 92,
    paddingBottom: 46
  },
  landingContent: {
    alignItems: "center",
    gap: 46
  },
  messageBlock: {
    alignItems: "center"
  },
  heroTitle: {
    color: "#FFA4C8",
    fontSize: 30,
    fontWeight: "800",
    lineHeight: 38,
    textAlign: "center"
  },
  heroBody: {
    color: "#7D7899",
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 24,
    marginTop: 18,
    textAlign: "center"
  },
  landingActions: {
    gap: 22
  },
  keyboardView: {
    flex: 1
  },
  formContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 28,
    paddingTop: 48,
    paddingBottom: 34
  },
  backButton: {
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.72)",
    borderColor: "rgba(222, 190, 242, 0.48)",
    borderRadius: 20,
    borderWidth: 1,
    height: 40,
    justifyContent: "center",
    left: 22,
    position: "absolute",
    top: Platform.select({ ios: 12, android: 24, default: 24 }),
    width: 40,
    zIndex: 3
  },
  backButtonText: {
    color: "#B96EE9",
    fontSize: 30,
    lineHeight: 32
  },
  loginHeader: {
    alignItems: "center",
    marginBottom: 28
  },
  screenTitle: {
    color: "#A45CF4",
    fontSize: 28,
    fontWeight: "800",
    marginTop: 24,
    textAlign: "center"
  },
  screenSubtitle: {
    color: "#727098",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 8,
    textAlign: "center"
  },
  form: {
    gap: 12
  },
  inputShell: {
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.88)",
    borderColor: "rgba(245, 217, 236, 0.9)",
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: "row",
    height: 56,
    paddingHorizontal: 14,
    shadowColor: "#F5A6C8",
    shadowOffset: { width: 0, height: 9 },
    shadowOpacity: 0.08,
    shadowRadius: 20
  },
  input: {
    color: "#545077",
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    height: "100%",
    paddingHorizontal: 12
  },
  visibilityButton: {
    alignItems: "center",
    minWidth: 38
  },
  visibilityText: {
    color: "#A892D2",
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase"
  },
  forgotButton: {
    alignSelf: "flex-end",
    paddingBottom: 8,
    paddingTop: 4
  },
  forgotText: {
    color: "#B96EE9",
    fontSize: 12,
    fontWeight: "700"
  },
  primaryButton: {
    alignItems: "center",
    borderRadius: 14,
    height: 58,
    justifyContent: "center",
    marginTop: 4,
    overflow: "hidden",
    shadowColor: "#B96EE9",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.24,
    shadowRadius: 16
  },
  primaryButtonLeft: {
    backgroundColor: "#FFA0BE",
    bottom: 0,
    left: 0,
    position: "absolute",
    top: 0,
    width: "57%"
  },
  primaryButtonRight: {
    backgroundColor: "#B65BE9",
    bottom: 0,
    position: "absolute",
    right: 0,
    top: 0,
    width: "58%"
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800"
  },
  socialBlock: {
    marginTop: 24
  },
  dividerRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12
  },
  divider: {
    backgroundColor: "rgba(211, 194, 223, 0.58)",
    flex: 1,
    height: 1
  },
  dividerText: {
    color: "#7E789E",
    fontSize: 12,
    fontWeight: "700"
  },
  socialRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 18
  },
  socialButton: {
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.92)",
    borderColor: "rgba(247, 226, 242, 0.9)",
    borderRadius: 13,
    borderWidth: 1,
    flex: 1,
    flexDirection: "row",
    gap: 8,
    height: 48,
    justifyContent: "center",
    shadowColor: "#F6B5CF",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 14
  },
  socialIcon: {
    fontSize: 18,
    fontWeight: "900"
  },
  googleIcon: {
    color: "#4285F4"
  },
  appleIcon: {
    color: "#222033"
  },
  socialText: {
    color: "#595474",
    fontSize: 13,
    fontWeight: "800"
  },
  footerText: {
    color: "#7D7899",
    fontSize: 13,
    fontWeight: "700",
    marginTop: 22,
    textAlign: "center"
  },
  footerLink: {
    color: "#B96EE9",
    fontWeight: "900"
  },
  logo: {
    alignItems: "center"
  },
  logoHero: {
    transform: [{ scale: 1 }]
  },
  logoCompact: {
    transform: [{ scale: 1 }]
  },
  logoLine: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center"
  },
  logoText: {
    fontWeight: "900",
    letterSpacing: 0
  },
  logoTextHero: {
    fontSize: 64,
    lineHeight: 62
  },
  logoTextCompact: {
    fontSize: 33,
    lineHeight: 32
  },
  logoPink: {
    color: "#FFB1CA"
  },
  logoPurple: {
    color: "#B66AE5"
  },
  logoMark: {
    alignItems: "center",
    borderColor: "#B66AE5",
    borderWidth: 4,
    justifyContent: "center"
  },
  logoMarkHero: {
    borderRadius: 23,
    height: 46,
    marginLeft: 2,
    width: 46
  },
  logoMarkCompact: {
    borderRadius: 13,
    height: 27,
    marginLeft: 1,
    width: 27
  },
  logoMarkDot: {
    backgroundColor: "#FF9BBB",
    borderRadius: 999,
    position: "absolute"
  },
  logoMarkDotLeft: {
    height: 9,
    left: 12,
    top: 14,
    width: 9
  },
  logoMarkDotRight: {
    height: 9,
    right: 12,
    top: 14,
    width: 9
  },
  logoMarkStem: {
    backgroundColor: "#FF9BBB",
    borderRadius: 999,
    height: 16,
    marginTop: 9,
    width: 5
  },
  logoLotus: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: -4
  },
  logoLotusHero: {
    height: 40,
    width: 42
  },
  logoLotusCompact: {
    height: 24,
    width: 24
  },
  logoLotusLeaf: {
    backgroundColor: "#C57AEA",
    borderBottomLeftRadius: 999,
    borderBottomRightRadius: 999,
    borderTopLeftRadius: 999,
    position: "absolute"
  },
  logoLotusLeafLeft: {
    height: 26,
    transform: [{ rotate: "-40deg" }],
    width: 13
  },
  logoLotusLeafCenter: {
    backgroundColor: "#F7A2C1",
    height: 30,
    transform: [{ translateY: -4 }],
    width: 14
  },
  logoLotusLeafRight: {
    height: 26,
    transform: [{ rotate: "40deg" }],
    width: 13
  },
  logoSpark: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8
  },
  logoSparkHero: {
    height: 25,
    width: 25
  },
  logoSparkCompact: {
    height: 15,
    width: 15
  },
  logoSparkBar: {
    backgroundColor: "#FF9EC1",
    borderRadius: 999,
    height: 24,
    position: "absolute",
    width: 5
  },
  logoSparkBarCross: {
    transform: [{ rotate: "90deg" }]
  },
  logoSmile: {
    borderBottomColor: "#FFA6BE",
    borderBottomWidth: 3,
    borderRadius: 999,
    transform: [{ rotate: "8deg" }]
  },
  logoSmileHero: {
    height: 30,
    marginLeft: 42,
    marginTop: -12,
    width: 158
  },
  logoSmileCompact: {
    height: 16,
    marginLeft: 24,
    marginTop: -6,
    width: 84
  },
  mailIcon: {
    borderColor: "#A996CF",
    borderRadius: 3,
    borderWidth: 1.7,
    height: 15,
    width: 18
  },
  mailIconFlapLeft: {
    backgroundColor: "#A996CF",
    height: 1.5,
    left: 1,
    position: "absolute",
    top: 5,
    transform: [{ rotate: "32deg" }],
    width: 9
  },
  mailIconFlapRight: {
    backgroundColor: "#A996CF",
    height: 1.5,
    position: "absolute",
    right: 1,
    top: 5,
    transform: [{ rotate: "-32deg" }],
    width: 9
  },
  lockIcon: {
    height: 20,
    width: 18
  },
  lockIconShackle: {
    borderColor: "#A996CF",
    borderRadius: 7,
    borderTopWidth: 1.8,
    borderLeftWidth: 1.8,
    borderRightWidth: 1.8,
    height: 10,
    left: 3,
    position: "absolute",
    top: 0,
    width: 12
  },
  lockIconBody: {
    borderColor: "#A996CF",
    borderRadius: 4,
    borderWidth: 1.8,
    bottom: 0,
    height: 13,
    position: "absolute",
    width: 18
  },
  userIcon: {
    alignItems: "center",
    height: 20,
    justifyContent: "center",
    width: 18
  },
  userIconHead: {
    borderColor: "#A996CF",
    borderRadius: 999,
    borderWidth: 1.8,
    height: 8,
    marginBottom: 2,
    width: 8
  },
  userIconBody: {
    borderColor: "#A996CF",
    borderRadius: 999,
    borderTopWidth: 1.8,
    height: 8,
    width: 16
  },
  glow: {
    backgroundColor: "#FFFFFF",
    borderRadius: 999,
    position: "absolute"
  },
  glowTopLeft: {
    height: 180,
    left: -48,
    opacity: 0.86,
    top: 42,
    width: 180
  },
  glowCenter: {
    height: 290,
    opacity: 0.42,
    right: -96,
    top: 128,
    width: 290
  },
  sparkle: {
    alignItems: "center",
    height: 22,
    justifyContent: "center",
    position: "absolute",
    width: 22
  },
  sparkleVertical: {
    borderRadius: 999,
    height: 19,
    opacity: 0.9,
    position: "absolute",
    width: 4
  },
  sparkleHorizontal: {
    borderRadius: 999,
    height: 4,
    opacity: 0.9,
    position: "absolute",
    width: 19
  },
  sparkleTopLeft: {
    left: 26,
    top: 26,
    transform: [{ rotate: "45deg" }]
  },
  sparkleTopRight: {
    right: 34,
    top: 38,
    transform: [{ rotate: "45deg" }]
  },
  sparkleMidLeft: {
    left: 45,
    top: "45%",
    transform: [{ rotate: "45deg" }]
  },
  sparkleMidRight: {
    right: 34,
    top: "47%",
    transform: [{ rotate: "45deg" }]
  },
  heart: {
    height: 20,
    position: "absolute",
    width: 22
  },
  heartTop: {
    left: 36,
    top: 68
  },
  heartMid: {
    left: 38,
    top: "54%"
  },
  heartLobe: {
    backgroundColor: "#FFA8C8",
    borderRadius: 999,
    height: 13,
    position: "absolute",
    top: 0,
    width: 13
  },
  heartLobeLeft: {
    left: 1
  },
  heartLobeRight: {
    right: 1
  },
  heartPoint: {
    backgroundColor: "#FFA8C8",
    height: 14,
    left: 4,
    position: "absolute",
    top: 5,
    transform: [{ rotate: "45deg" }],
    width: 14
  },
  flower: {
    bottom: 0,
    height: 130,
    position: "absolute",
    width: 118
  },
  flowerLeft: {
    left: -18
  },
  flowerRight: {
    right: -18,
    transform: [{ scaleX: -1 }]
  },
  flowerLeaf: {
    backgroundColor: "rgba(238, 166, 233, 0.42)",
    borderBottomLeftRadius: 999,
    borderTopLeftRadius: 999,
    borderTopRightRadius: 999,
    position: "absolute"
  },
  flowerLeafTall: {
    height: 68,
    width: 30
  },
  flowerLeafWide: {
    height: 58,
    width: 34
  },
  flowerLeafSmall: {
    height: 42,
    width: 24
  },
  flowerLeafLeftA: {
    bottom: 32,
    left: 28,
    transform: [{ rotate: "-12deg" }]
  },
  flowerLeafLeftB: {
    bottom: 18,
    left: 54,
    transform: [{ rotate: "44deg" }]
  },
  flowerLeafLeftC: {
    bottom: 12,
    left: 8,
    transform: [{ rotate: "-42deg" }]
  },
  flowerLeafRightA: {
    bottom: 32,
    left: 28,
    transform: [{ rotate: "-12deg" }]
  },
  flowerLeafRightB: {
    bottom: 18,
    left: 54,
    transform: [{ rotate: "44deg" }]
  },
  flowerLeafRightC: {
    bottom: 12,
    left: 8,
    transform: [{ rotate: "-42deg" }]
  },
  flowerStem: {
    backgroundColor: "rgba(240, 155, 225, 0.44)",
    borderRadius: 999,
    bottom: 2,
    height: 90,
    position: "absolute",
    width: 4
  },
  flowerStemLeft: {
    left: 50,
    transform: [{ rotate: "16deg" }]
  },
  flowerStemRight: {
    left: 50,
    transform: [{ rotate: "16deg" }]
  },
  bottomWave: {
    backgroundColor: "rgba(255, 227, 244, 0.62)",
    borderTopLeftRadius: 220,
    borderTopRightRadius: 220,
    bottom: -58,
    height: 112,
    left: -40,
    position: "absolute",
    right: -40
  }
});
