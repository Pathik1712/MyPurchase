import { Animated, Easing, ScrollView } from "react-native"
import React, { useEffect, useRef, useState } from "react"
import { Button, IconButton, TextInput, Text } from "react-native-paper"
import { Row, Col } from "../Grid"
import { numregex, floatregex } from "../../global/regex"

const Average = () => {
  const [list, setList] = useState<
    { qnty: string; price: string; isNew: boolean }[]
  >([{ qnty: "0", price: "0", isNew: false }])
  const [avg, setAvg] = useState<number>(0)
  const scrollView = useRef<ScrollView>(null)
  const scale = useRef(new Animated.Value(0.3)).current
  const transition = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (list.length > 0) {
      const value = list.reduce(
        (prev, curr) => {
          return {
            qnty: prev.qnty + parseInt(curr.qnty),
            price: prev.price + parseFloat(curr.price) * parseInt(curr.qnty),
          }
        },
        { qnty: 0, price: 0 }
      )
      const avgValue = (value.price / value.qnty).toFixed(2)
      const val =
        isNaN(parseInt(avgValue)) || parseFloat(avgValue) == 0
          ? avg
          : parseFloat(avgValue)
      setAvg(val)
    }
  }, [list])

  useEffect(() => {
    if (list.length > 0) {
      scale.setValue(0.3)
    } else {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
        bounciness: 20,
        speed: 10,
      }).start()
    }
  }, [scale, list.length])

  const animation = () => {
    Animated.timing(transition, {
      toValue: 1,
      duration: 350,
      useNativeDriver: true,
      easing: Easing.bounce,
    }).start()
    list.forEach((_, index) => {
      list[index].isNew = false
    })
  }
  useEffect(() => {
    animation()
  }, [list.length])

  return (
    <>
      <Button
        icon={"plus-box"}
        onPress={() => {
          const arr = [...list]
          arr.push({ qnty: "0", price: "0", isNew: true })
          setList([...arr])
          scrollView.current?.scrollToEnd({ animated: true })
          transition.setValue(0)
        }}
        style={{ alignSelf: "center", marginVertical: 25 }}
        mode="elevated"
      >
        Add
      </Button>
      {list.length > 0 ? (
        <ScrollView
          scrollEnabled={true}
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          ref={scrollView}
        >
          {list != null &&
            list.map((i, num) => (
              <Animated.View
                key={`list-${num}`}
                style={{
                  transform: [
                    {
                      translateY: i.isNew
                        ? transition.interpolate({
                            inputRange: [0, 1],
                            outputRange: [-70, 0],
                          })
                        : 0,
                    },
                  ],
                  // opacity: i.isNew
                  //   ? transition.interpolate({
                  //       inputRange: [0, 1],
                  //       outputRange: [0, 1],
                  //     })
                  //   : 1,
                }}
              >
                <Row
                  style={{ gap: 20, paddingHorizontal: 20, marginVertical: 20 }}
                >
                  <Col cols={0}>
                    <IconButton
                      icon={"minus-box"}
                      onPress={() => {
                        const arr = [...list]
                        arr.splice(num, 1)
                        setList(arr)
                      }}
                    />
                  </Col>
                  <Col
                    cols={1}
                    align="stretch"
                  >
                    <TextInput
                      label={"No Share"}
                      keyboardType="numeric"
                      value={i.qnty}
                      onChangeText={(e) => {
                        const arr = [...list]
                        ;(arr[num].qnty =
                          e.startsWith("0") && numregex.test(e)
                            ? e[1]
                            : e == ""
                            ? "0"
                            : numregex.test(e)
                            ? e
                            : arr[num].qnty),
                          setList(arr)
                      }}
                    />
                  </Col>
                  <Col
                    cols={1}
                    align="stretch"
                  >
                    <TextInput
                      label={"Price"}
                      keyboardType="numeric"
                      value={i.price}
                      onChangeText={(e) => {
                        const arr = [...list]
                        ;(arr[num].price =
                          e.startsWith("0") && numregex.test(e)
                            ? e[1]
                            : e == ""
                            ? "0"
                            : floatregex.test(e)
                            ? e
                            : arr[num].price),
                          setList(arr)
                      }}
                    />
                  </Col>
                </Row>
              </Animated.View>
            ))}
          <Row style={{ paddingHorizontal: 20, marginBottom: 30 }}>
            <Col
              cols={1}
              align="center"
            >
              <Text
                style={{
                  textTransform: "capitalize",
                  fontSize: 18,
                  letterSpacing: 1,
                  backgroundColor: "rgba(208,188,255,0.4)",
                  paddingHorizontal: 15,
                  paddingVertical: 5,
                  borderRadius: 5,
                  marginTop: 10,
                }}
              >
                avrage: {"\u20B9"}
                {avg}
              </Text>
            </Col>
          </Row>
        </ScrollView>
      ) : (
        <Animated.View
          style={{
            transform: [{ scale: scale }],
            justifyContent: "center",
            alignItems: "center",
            marginTop: 150,
          }}
        >
          <Text variant="displaySmall">List Is Empty!!!</Text>
        </Animated.View>
      )}
    </>
  )
}

export default Average
