import {
  PaperProvider,
  MD3DarkTheme as darkTheme,
  adaptNavigationTheme,
} from "react-native-paper"
import { NavigationContainer, DefaultTheme } from "@react-navigation/native"
import { Provider } from "react-redux"
import { store } from "./app/redux/store"
import Screen from "./app/screen/screen"
import { View } from "react-native"
import { StatusBar } from "expo-status-bar"
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context"

const { DarkTheme } = adaptNavigationTheme({
  reactNavigationDark: DefaultTheme,
})

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={darkTheme}>
        <SafeAreaProvider>
          <StatusBar style="inverted" />
          <View
            style={{
              flex: 1,
              backgroundColor: darkTheme.colors.background,
            }}
          >
            <NavigationContainer theme={DarkTheme}>
              <Screen />
            </NavigationContainer>
          </View>
        </SafeAreaProvider>
      </PaperProvider>
    </Provider>
  )
}
