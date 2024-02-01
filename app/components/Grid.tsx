import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  FlexAlignType,
} from "react-native"
import React from "react"

const Row = ({
  children,
  style,
}: {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
}) => {
  return <View style={[styles.row, style]}>{children}</View>
}

const Col = ({
  children,
  cols,
  align = "center",
}: {
  children: React.ReactNode
  cols: number
  align?: FlexAlignType
}) => {
  return <View style={{ flex: cols, alignItems: align }}>{children}</View>
}

export { Row, Col }

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    width: "100%",
  },
})
