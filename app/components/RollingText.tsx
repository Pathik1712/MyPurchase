import { View, Text, StyleSheet, Animated, Easing } from "react-native"
import { useEffect, useRef } from "react"

type Props = {
  num: string
  size: number
  fontSize: number
  color: string
  BeforeSymbol?: React.ReactNode
  gap?: number
}

const RollingText = ({
  num,
  size,
  fontSize,
  color,
  BeforeSymbol,
  gap = 2,
}: Props) => {
  const position = useRef(new Animated.Value(0)).current
  useEffect(() => {
    position.setValue(0)
    Animated.timing(position, {
      toValue: size * 10,
      useNativeDriver: true,
      easing: Easing.linear,
      delay: 250,
      duration: 850,
    }).start()
  }, [num])
  return (
    <View style={[styles.box, { height: size, gap }]}>
      {BeforeSymbol != null && (
        <View
          style={{
            height: size,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {BeforeSymbol}
        </View>
      )}
      {num.split("").map((item, index) => (
        <Animated.View
          key={`roll-view-${index}`}
          style={{
            transform: [
              {
                translateY: position.interpolate({
                  inputRange: [0, size * 10],
                  outputRange: [0, item === "," ? 0 : -parseInt(item) * size],
                }),
              },
            ],
          }}
        >
          {item === "," ? (
            <Text
              style={{
                color,
                height: size,
                fontSize: fontSize,
              }}
            >
              ,
            </Text>
          ) : (
            [...Array(10)].map((_, num) => (
              <Text
                style={{
                  color,
                  height: size,
                  fontSize: fontSize,
                  textAlignVertical: "center",
                }}
                key={`roll-${index}-${num}`}
              >
                {num}
              </Text>
            ))
          )}
        </Animated.View>
      ))}
    </View>
  )
}

export default RollingText

const styles = StyleSheet.create({
  box: {
    flexDirection: "row",
    overflow: "hidden",
  },
  numContainer: {
    overflow: "hidden",
  },
})
