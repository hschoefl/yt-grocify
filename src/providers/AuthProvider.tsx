import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { ActivityIndicator, View } from "react-native";

const AuthContext = createContext({
  isAuthenticated: undefined as boolean | undefined,
  signIn: () => {},
  signOut: () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  // at the beginning, we don't know if the user is authenticated or not, so we set it to undefined.
  // This way we can show a loading state while we check the authentication status
  // (e.g. from AsyncStorage or a backend)

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(
    undefined,
  );

  useEffect(() => {
    // simulate checking authentication status from AsyncStorage or a backend
    const checkAuthStatus = async () => {
      // here you would check the authentication status, e.g. by checking a token in AsyncStorage
      // for this example, we'll just simulate a delay and then set it to false or true
      // (not authenticated or authenticated)
      await new Promise((resolve) => setTimeout(resolve, 700));
      setIsAuthenticated(true); // set to true or false based on your logic
    };

    checkAuthStatus();
  }, []);

  const signIn = () => {
    setIsAuthenticated(true);
  };

  const signOut = () => {
    setIsAuthenticated(false);
  };

  // show a loading state while we check the authentication status return{" "}
  if (isAuthenticated === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={"blue"} />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// helper hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
