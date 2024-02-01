import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  Keyboard,
} from "react-native"
import React, { useEffect, useRef, useState } from "react"
import Animated, {
  useSharedValue,
  withSequence,
  withRepeat,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated"
import { authenticateAsync } from "expo-local-authentication"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { stackParams } from "../screen/screen"
import { useAppdispatch } from "../redux/store"
import { changeAuthenticationStatus } from "../redux/auth-slice"

const Authentication = ({
  navigation,
}: NativeStackScreenProps<stackParams, "auth">) => {
  const inputRefs: React.RefObject<TextInput>[] = [...Array(6)].map(
    (_, index) => useRef<TextInput>(null)
  )
  const dispatch = useAppdispatch()

  // ! states

  const [pass, setPass] = useState([...Array(6)])
  const [err, setErr] = useState(false)
  const [focusedInputs, setFocusedInputs] = useState(Array(6).fill(false))
  const offset = useSharedValue(0)

  //   ! functions

  const handleTextChange = (text: string, index: number) => {
    err ? setErr(false) : ""
    if (text.length === 1) {
      if (index < inputRefs.length - 1) {
        inputRefs[index + 1]?.current?.focus()
      }
      const arr = pass
      arr[index] = text
      if (arr.filter((i) => i != undefined).length === 6) {
        pass.reduce((curr, prev) => curr + prev) === `002725`
          ? dispatch(changeAuthenticationStatus(true))
          : setErr(true)
      } else {
        setPass(arr)
      }
    } else if (index > 0 && text.length === 0) {
      inputRefs[index - 1]?.current?.focus()
      const arr = pass
      ;(arr[index] = undefined), setPass(arr)
    }
  }

  const handleFocus = (index: number) => {
    const updatedFocusedInputs = [...focusedInputs]
    updatedFocusedInputs[index] = true
    setFocusedInputs(updatedFocusedInputs)
  }

  const handleBlur = (index: number) => {
    const updatedFocusedInputs = [...focusedInputs]
    updatedFocusedInputs[index] = false
    setFocusedInputs(updatedFocusedInputs)
  }
  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    const { nativeEvent } = e
    if (nativeEvent.key === "Backspace") {
      inputRefs[index - 1]?.current?.focus()
    }
  }

  // ! animation
  const animationStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }))

  // ! effect
  useEffect(() => {
    if (err) {
      offset.value = withSequence(
        withTiming(-30, { duration: 70 }),
        withRepeat(withTiming(30, { duration: 140 }), 2, true),
        withTiming(0, { duration: 70 })
      )
    }
  }, [err])
  useEffect(() => {
    ;(async () => {
      try {
        const biometricAuth = await authenticateAsync({
          promptMessage: "Enter With Biometrics",
          disableDeviceFallback: true,
          cancelLabel: "Cancel",
        })
        if (biometricAuth.success) {
          dispatch(changeAuthenticationStatus(true))
        }
      } catch {}
    })()
  }, [])

  return (
    <SafeAreaView style={styles.centerItem}>
      <Text style={styles.text}>Please Enter Password</Text>
      <View style={styles.inputHandler}>
        {inputRefs.map((ref, num) => (
          <TextInput
            inputMode="decimal"
            maxLength={1}
            key={num}
            ref={ref}
            style={[styles.input, focusedInputs[num] && styles.focus]}
            onChangeText={(text) => handleTextChange(text, num)}
            onKeyPress={(e) => handleKeyPress(e, num)}
            onFocus={() => handleFocus(num)}
            onBlur={() => handleBlur(num)}
          />
        ))}
      </View>
      {err && (
        <Animated.Text style={[styles.error, animationStyle]}>
          Please Enter Correct Password
        </Animated.Text>
      )}
    </SafeAreaView>
  )
}

export default Authentication

const styles = StyleSheet.create({
  text: {
    color: "white",
    marginBottom: 30,
  },
  centerItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    aspectRatio: 1,
    height: 40,
    borderColor: "white",
    borderWidth: 2,
    borderStyle: "solid",
    borderRadius: 5,
    color: "dodgerblue",
    textAlign: "center",
  },
  inputHandler: {
    flexDirection: "row",
    gap: 10,
  },
  error: {
    color: "crimson",
    marginTop: 32,
    fontWeight: "bold",
    fontSize: 16,
  },
  focus: {
    borderColor: "dodgerblue",
  },
})
