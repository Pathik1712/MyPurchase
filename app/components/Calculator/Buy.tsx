import { View, StyleSheet, TextInput, ScrollView } from "react-native"
import React, { useMemo, useState } from "react"
import { Row, Col } from "../Grid"
import { Divider, MD3DarkTheme } from "react-native-paper"
import { Text } from "react-native-paper"
import { floatregex, numregex } from "../../global/regex"

const Buy = () => {
  const [val, setValue] = useState<{
    totalAmount: number
    sharePrice: string
  }>({
    totalAmount: 0,
    sharePrice: "0",
  })

  const noShares = useMemo(() => {
    const { sharePrice, totalAmount } = val
    if (parseFloat(sharePrice) === 0) {
      return 0
    }
    return (totalAmount / parseFloat(sharePrice)).toFixed(2)
  }, [val])

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}
      style={styles.box}
    >
      <View style={styles.container}>
        <Row style={{ alignItems: "center" }}>
          <Col
            cols={1}
            align="stretch"
          >
            <Text style={styles.text}>Amount to invest</Text>
          </Col>
          <TextInput
            value={val?.totalAmount.toString()}
            style={styles.input}
            onChangeText={(e) => {
              setValue({
                ...val,
                totalAmount:
                  e == ""
                    ? 0
                    : numregex.test(e)
                    ? parseInt(e)
                    : val?.totalAmount,
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
            <Text style={styles.text}>Price of share</Text>
          </Col>
          <TextInput
            style={styles.input}
            value={val.sharePrice}
            inputMode="numeric"
            onChangeText={(e) =>
              setValue({
                ...val,
                sharePrice:
                  e.startsWith("0") && numregex.test(e)
                    ? e[1]
                    : e == ""
                    ? "0"
                    : floatregex.test(e)
                    ? e
                    : val.sharePrice,
              })
            }
          />
        </Row>
        <Divider style={{ height: 1.5 }} />
        <Row style={{ alignItems: "center" }}>
          <Col
            cols={1}
            align="stretch"
          >
            <Text style={styles.text}>No. of shares</Text>
          </Col>
          <Text style={[styles.text, { paddingRight: 20 }]}>{noShares}</Text>
        </Row>
      </View>
    </ScrollView>
  )
}

export default Buy

const styles = StyleSheet.create({
  box: {
    flex: 1,
    marginTop: 20,
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 25,
    gap: 30,
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
