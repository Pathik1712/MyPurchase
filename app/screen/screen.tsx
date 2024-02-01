import React from "react"
import Home from "../main/Home"
import Authentication from "../main/Authentication"
import { useAppselector } from "../redux/store"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Calculater from "../main/Calculater"
import Settings from "../main/Settings"

export type stackParams = {
  Home: undefined
  auth: undefined
  calculator: undefined
  settings: undefined
}

const stack = createNativeStackNavigator<stackParams>()

const screen = () => {
  const isAuthenticated = useAppselector(
    (state) => state.authSlice.isAuthenticated
  )
  return (
    <stack.Navigator>
      {!isAuthenticated ? (
        <stack.Screen
          name="auth"
          component={Authentication}
          options={{
            headerShown: false,
          }}
        />
      ) : (
        <>
          <stack.Screen
            name="Home"
            component={Home}
          />
          <stack.Screen
            name="calculator"
            component={Calculater}
            options={{
              headerTitle: "Calculator",
            }}
          />
          <stack.Screen
            name="settings"
            component={Settings}
            options={{ headerTitle: "Settings" }}
          />
        </>
      )}
    </stack.Navigator>
  )
}

export default screen
