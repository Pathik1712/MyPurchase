import { StyleSheet, SafeAreaView, View, Text } from "react-native"
import React, { useRef, useState } from "react"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { stackParams } from "../screen/screen"
import { SegmentedButtons, useTheme } from "react-native-paper"
import PagerView from "react-native-pager-view"
import Average from "../components/Calculator/Average"
import Sell from "../components/Calculator/Sell"
import Buy from "../components/Calculator/Buy"

const Calculater = ({
  navigation,
}: NativeStackScreenProps<stackParams, "calculator">) => {
  const theme = useTheme()
  const [value, setValue] = useState<"average" | "sell" | "buy">("average")
  const pageNo = useRef<PagerView>(null)

  return (
    <SafeAreaView style={styles.box}>
      <SegmentedButtons
        value={value}
        onValueChange={(e) => {
          setValue(e as "average" | "sell" | "buy")
          const page = e === "average" ? 0 : e === "sell" ? 1 : 2
          pageNo.current?.setPage(page)
        }}
        style={{
          marginTop: 40,
          marginHorizontal: 20,
        }}
        buttons={[
          {
            value: "average",
            label: "Average",
            style: {
              borderColor: "#1DA5E3",
              backgroundColor:
                value === "average" ? "#1DA5E366" : theme.colors.background,
            },
            checkedColor: "#1DA5E3",
          },
          {
            value: "sell",
            label: "Sell",
            style: {
              borderColor: "#1DA5E3",
              backgroundColor:
                value === "sell" ? "#1DA5E366" : theme.colors.background,
            },
            checkedColor: "#1DA5E3",
          },
          {
            value: "buy",
            label: "Buy",
            style: {
              borderColor: "#1DA5E3",
              backgroundColor:
                value === "buy" ? "#1DA5E366" : theme.colors.background,
            },
            checkedColor: "#1DA5E3",
          },
        ]}
      ></SegmentedButtons>
      <PagerView
        style={{ flex: 1 }}
        ref={pageNo}
        initialPage={0}
        onPageSelected={(e) => {
          e.nativeEvent.position === 0
            ? setValue("average")
            : e.nativeEvent.position === 1
            ? setValue("sell")
            : setValue("buy")
        }}
      >
        <View
          style={{ flex: 1 }}
          key={"1"}
        >
          <Average />
        </View>
        <View
          style={{ flex: 1 }}
          key={"2"}
        >
          <Sell />
        </View>
        <View
          style={{ flex: 1 }}
          key={"3"}
        >
          <Buy />
        </View>
      </PagerView>
    </SafeAreaView>
  )
}

export default Calculater

const styles = StyleSheet.create({
  box: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
})
