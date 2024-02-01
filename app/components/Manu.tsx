import { View, StyleSheet, Animated } from "react-native"
import React, { useContext, useEffect, useRef } from "react"
import { Icon, useTheme, TouchableRipple, Text } from "react-native-paper"
import { Row, Col } from "./Grid"
import { NavigationContext, useNavigation } from "@react-navigation/native"

const Btn = ({
  children,
  val,
  to,
}: {
  children: React.ReactNode
  val: Animated.Value
  to: string
}) => {
  const navigate = useContext(NavigationContext)
  return (
    <View
      style={{
        borderWidth: 1.5,
        borderRadius: 10,
        borderColor: "dodgerblue",
        position: "relative",
      }}
    >
      <Animated.View
        style={{
          transform: [
            {
              rotate: val.interpolate({
                inputRange: [0, 1],
                outputRange: ["-45deg", "0deg"],
              }),
            },
          ],
        }}
      >
        <TouchableRipple
          rippleColor={"rgba(208,188,255,0.4)"}
          onPress={() => {
            navigate?.navigate(to)
          }}
          style={styles.btn}
          borderless={true}
        >
          {children}
        </TouchableRipple>
      </Animated.View>
    </View>
  )
}

const Manu = () => {
  const theme = useTheme()
  const value = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(value, {
      toValue: 1,
      useNativeDriver: true,
      delay: 250,
      duration: 850,
    }).start()
  }, [])

  return (
    <View style={styles.box}>
      <Text variant="titleLarge">Menu</Text>
      <Animated.View
        style={[
          styles.container,
          {
            transform: [
              {
                rotate: value.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["45deg", "0deg"],
                }),
              },
            ],
          },
        ]}
      >
        <Row>
          <Col cols={1}>
            <Btn
              val={value}
              to={"calculator"}
            >
              <Icon
                source={"chart-arc"}
                size={35}
                color={theme.colors.primary}
              />
            </Btn>
          </Col>
          <Col cols={1}>
            <Btn
              val={value}
              to={"calculator"}
            >
              <Icon
                source={"calculator-variant"}
                size={35}
                color={theme.colors.primary}
              />
            </Btn>
          </Col>
        </Row>
        <Row>
          <Col cols={1}>
            <Btn
              val={value}
              to={"calculator"}
            >
              <Icon
                source={"folder-lock"}
                size={35}
                color={theme.colors.primary}
              />
            </Btn>
          </Col>
          <Col cols={1}>
            <Btn
              val={value}
              to={"settings"}
            >
              <Icon
                source={"cog"}
                size={35}
                color={theme.colors.primary}
              />
            </Btn>
          </Col>
        </Row>
      </Animated.View>
    </View>
  )
}

export default Manu

const styles = StyleSheet.create({
  box: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    marginTop: 30,
  },
  container: {
    marginTop: 50,
    width: "70%",
    gap: 80,
  },
  btn: {
    borderRadius: 10,
    padding: 15,
  },
})
