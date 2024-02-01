import { StyleSheet, TextInput, ScrollView, View } from "react-native"
import { Divider, MD3DarkTheme, Text } from "react-native-paper"
import React, { useEffect, useMemo, useState } from "react"
import { Col, Row } from "../Grid"
import { floatregex, numregex } from "../../global/regex"

const Sell = () => {
  const [val, setValue] = useState<{
    qty: number
    buy: string
    sell: string
  }>({
    qty: 0,
    buy: "0",
    sell: "0",
  })

  const tax = useMemo(() => {
    const { buy, sell, qty } = val
    const totalValue = parseFloat(buy) * qty + parseFloat(sell) * qty
    let charges = (totalValue * 0.05) / 100
    charges = charges + Math.ceil((totalValue * 0.1) / 100)

    charges = charges + (parseFloat(buy) * qty * 0.015) / 100
    charges = charges + (totalValue * 0.00325) / 100
    charges = charges + (totalValue * 0.0001) / 100
    charges = charges + (totalValue * 0.0096) / 100
    return charges.toFixed(2)
  }, [val])

  const netReturn = useMemo(() => {
    const { buy, sell, qty } = val
    return (
      parseFloat(sell) * qty -
      parseFloat(buy) * qty -
      parseFloat(tax)
    ).toFixed(2)
  }, [tax])

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}
      style={{ flex: 1, marginTop: 20 }}
    >
      <View style={styles.box}>
        <Row style={{ alignItems: "center" }}>
          <Col
            cols={1}
            align="stretch"
          >
            <Text style={styles.text}>Qty</Text>
          </Col>
          <TextInput
            value={val.qty.toString()}
            style={styles.input}
            onChangeText={(e) => {
              setValue({
                ...val,
                qty: e == "" ? 0 : numregex.test(e) ? parseInt(e) : val.qty,
              })
            }}
            inputMode="numeric"
          />
        </Row>
        <Row style={{ alignItems: "center" }}>
          <Col
            cols={1}
            align="stretch"
          >
            <Text style={styles.text}>Buy price</Text>
          </Col>
          <TextInput
            value={val.buy}
            style={styles.input}
            inputMode="numeric"
            onChangeText={(e) => {
              setValue({
                ...val,
                buy:
                  e.startsWith("0") && numregex.test(e)
                    ? e[1]
                    : e == ""
                    ? "0"
                    : floatregex.test(e)
                    ? e
                    : val.buy,
              })
            }}
          />
        </Row>
        <Row style={{ alignItems: "center" }}>
          <Col
            cols={1}
            align="stretch"
          >
            <Text style={styles.text}>Sell Price</Text>
          </Col>
          <TextInput
            style={styles.input}
            value={val.sell.toString()}
            inputMode="numeric"
            onChangeText={(e) =>
              setValue({
                ...val,
                sell:
                  e.startsWith("0") && numregex.test(e)
                    ? e[1]
                    : e == ""
                    ? "0"
                    : floatregex.test(e)
                    ? e
                    : val.sell,
              })
            }
          />
        </Row>
        <Row style={{ alignItems: "center" }}>
          <Col
            cols={1}
            align="stretch"
          >
            <Text style={styles.text}>Tax & charges</Text>
          </Col>
          <Text style={[styles.text, { paddingRight: 20 }]}>
            {" "}
            {parseFloat(tax) !== 0 ? "-" : ""}
            {"\u20B9"}
            {tax}
          </Text>
        </Row>
        <Divider style={{ height: 1.5 }} />
        <Row style={{ alignItems: "center" }}>
          <Col
            cols={1}
            align="stretch"
          >
            <Text style={styles.text}>Net P&L</Text>
          </Col>
          <Text style={[styles.text, { paddingRight: 20 }]}>
            {" "}
            {"\u20B9"}
            {netReturn}
          </Text>
        </Row>
      </View>
    </ScrollView>
  )
}

export default Sell

const styles = StyleSheet.create({
  box: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 20,
    gap: 30,
    marginBottom: 20,
  },
  input: {
    minWidth: 130,
    textAlign: "right",
    backgroundColor: "rgba(73,69,79,1)",
    height: 50,
    color: MD3DarkTheme.colors.primary,
    fontSize: 20,
    paddingRight: 15,
    borderRadius: 7,
  },
  text: {
    fontSize: 20,
  },
})
