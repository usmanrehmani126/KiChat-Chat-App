import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen, LoginScreen, RegisterScreen } from "./screens";
import SplashScreen from "./screens/SplashScreen";
import { Provider } from "react-redux";
import store from "./context/store";
import AddToChatScreen from "./screens/AddToChatScreen";
import ChatScreen from "./screens/ChatScreen";
import ProfileScreen from "./screens/ProfileScreen";
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AddToChatScreen" component={AddToChatScreen} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}
