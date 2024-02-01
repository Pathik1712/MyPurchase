import { View, StyleSheet, Dimensions, Text } from "react-native"
import React from "react"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { stackParams } from "../screen/screen"
import { Icon, useTheme } from "react-native-paper"
import RollingText from "../components/RollingText"
import Manu from "../components/Manu"
import { NavigationContext, useNavigation } from "@react-navigation/native"

const Home = ({ navigation }: NativeStackScreenProps<stackParams, "Home">) => {
  const theme = useTheme()
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <View style={[styles.box, { borderColor: theme.colors.primary }]}>
        <View>
          <Text
            style={[
              {
                fontSize: 15,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 30,
              },
              styles.primaryColor,
            ]}
          >
            Invested
          </Text>
          <Text
            style={{
              color: theme.colors.onPrimaryContainer,
              marginTop: 5,
            }}
          >
            <RollingText
              num="12,523"
              color={theme.colors.onPrimaryContainer}
              size={35}
              fontSize={30}
              BeforeSymbol={
                <Text
                  style={{
                    color: theme.colors.onPrimaryContainer,
                    marginTop: "auto",
                  }}
                >
                  {"\u20B9"}
                </Text>
              }
            />
          </Text>
        </View>
        <View style={styles.container}>
          <View style={styles.containerModule}>
            <Text>
              <Icon
                source={"chart-line-variant"}
                size={25}
                color="dodgerblue"
              />
            </Text>
            <View style={{ gap: 3 }}>
              <Text style={[styles.primaryColor]}>Profit</Text>
              <RollingText
                num="20,524"
                color="dodgerblue"
                size={25}
                fontSize={15}
                gap={0.5}
                BeforeSymbol={
                  <Text
                    style={{
                      color: "dodgerblue",
                    }}
                  >
                    {"\u20B9"}
                  </Text>
                }
              />
            </View>
          </View>
          <View style={styles.containerModule}>
            <Text style={{ transform: [{ rotate: "85deg" }] }}>
              <Icon
                source={"chart-line-variant"}
                size={25}
                color="crimson"
              />
            </Text>
            <View style={{ gap: 3 }}>
              <Text style={[styles.primaryColor]}>Loss</Text>
              <RollingText
                num="656"
                color="crimson"
                size={20}
                fontSize={15}
                gap={0.5}
                BeforeSymbol={
                  <Text
                    style={{
                      color: "crimson",
                    }}
                  >
                    {"\u20B9"}
                  </Text>
                }
              />
            </View>
          </View>
        </View>
      </View>
      <NavigationContext.Provider value={navigation}>
        <Manu />
      </NavigationContext.Provider>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  box: {
    marginTop: 32,
    borderRadius: 10,
    aspectRatio: 16 / 10,
    borderWidth: 0.6,
    width: (Dimensions.get("screen").width * 90) / 100,
    paddingHorizontal: 20,
  },
  primaryColor: {
    color: "white",
  },
  container: {
    marginTop: 30,
    flexDirection: "row",
  },
  containerModule: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
})
