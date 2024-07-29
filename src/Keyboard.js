import { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text, Dimensions, Pressable } from "react-native"
import Animated, { interpolateColor, useAnimatedStyle } from "react-native-reanimated";
import { AppContext } from "./AppContext";


export const Keyboard = ({ theme, setTheme, progress, resultVariable }) => {

    const { width, height } = Dimensions.get("window");
    const SIZE = Math.min(width, height);

    const [prevNumber, setPrevNumber] = useState("");
    const [resultNumber, setResultNumber] = useState(0);
    const [operation, setOperation] = useState("");

    const { currentNumber, setCurrentNumber } = useContext(AppContext);

    const buttonColor = {
        blue: "#5487F6",
        orange: "#FF9F0A",
        gray: "#333333",
        silver: "#CDD0CA"
    }

    const animatedOperationButton = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            progress.value,
            [0, 1],
            [buttonColor.blue, buttonColor.orange]
        )
        return { backgroundColor }
    })

    const animatedButtonText = useAnimatedStyle(() => {
        const color = interpolateColor(
            progress.value,
            [0, 1],
            ["black", "white"]
        )
        return { color }
    })

    const animatedNumberButton = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            progress.value,
            [0, 1],
            [buttonColor.silver, buttonColor.gray]
        )
        return { backgroundColor }
    })

    const handleNumber = (e) => {
        setCurrentNumber(currentNumber === "0" ? e + "" : currentNumber + e + "");
    }

    const handleReset = () => {
        setCurrentNumber("0");
        setOperation("");
        setResultNumber(0);
        setPrevNumber("");
    }

    const handleOperation = (e) => {
        const currentNum = parseInt(currentNumber);
        const prevNum = prevNumber !== "" ? parseInt(prevNumber) : currentNum;

        if (operation) {
            switch (operation) {
                case "+":
                    setResultNumber(prevNum + currentNum);
                    break;
                case "-":
                    setResultNumber(prevNum - currentNum);
                    break;
                case "X":
                    setResultNumber(prevNum * currentNum);
                    break;
                case "/":
                    setResultNumber(prevNum / currentNum);
                    break;
            }
        } else {
            setResultNumber(currentNum);
        }

        setPrevNumber(resultNumber !== 0 ? resultNumber : currentNum);
        setCurrentNumber("0");
        setOperation(e + "");
    }

    const handleResult = () => {
        const currentNum = parseInt(currentNumber);
        let finalResult = resultNumber;

        switch (operation) {
            case "+":
                finalResult = resultNumber + currentNum;
                break;
            case "-":
                finalResult = resultNumber - currentNum;
                break;
            case "X":
                finalResult = resultNumber * currentNum;
                break;
            case "/":
                finalResult = resultNumber / currentNum;
                break;
        }

        setCurrentNumber(finalResult.toString());
        setPrevNumber("");
        setOperation("");
        setResultNumber(0);
    }

    return (
        <View style={[styles.container, { width: SIZE }]} >
            <View style={styles.buttonA} >
                <Pressable onPress={() => handleReset()} >
                    <Animated.View style={[styles.button, { width: SIZE / 4, height: SIZE / 4, backgroundColor: "#A5A5A5" }]} >
                        <Animated.Text style={[animatedButtonText, styles.buttonText]} >AC</Animated.Text>
                    </Animated.View>
                </Pressable>

                <Pressable>
                    <Animated.View style={[styles.button, { width: SIZE / 4, height: SIZE / 4, backgroundColor: "#A5A5A5" }]} >
                        <Animated.Text style={[animatedButtonText, styles.buttonText]} >#</Animated.Text>
                    </Animated.View>
                </Pressable>

                <Pressable>
                    <Animated.View style={[styles.button, { width: SIZE / 4, height: SIZE / 4, backgroundColor: "#A5A5A5" }]} >
                        <Animated.Text style={[animatedButtonText, styles.buttonText]} >%</Animated.Text>
                    </Animated.View>
                </Pressable>

                <Pressable onPress={() => handleOperation("/")} >
                    <Animated.View style={[styles.button, animatedOperationButton, { width: SIZE / 4, height: SIZE / 4 }]} >
                        <Animated.Text style={[animatedButtonText, styles.buttonText]} >/</Animated.Text>
                    </Animated.View>
                </Pressable>

            </View>

            <View style={styles.buttonA} >
                <Pressable onPress={() => handleNumber(7)} >
                    <Animated.View style={[animatedNumberButton, styles.button, { width: SIZE / 4, height: SIZE / 4 }]} >
                        <Animated.Text style={[animatedButtonText, styles.buttonText]} >7</Animated.Text>
                    </Animated.View>
                </Pressable>

                <Pressable onPress={() => handleNumber(8)} >
                    <Animated.View style={[animatedNumberButton, styles.button, { width: SIZE / 4, height: SIZE / 4 }]} >
                        <Animated.Text style={[animatedButtonText, styles.buttonText]} >8</Animated.Text>
                    </Animated.View>
                </Pressable>

                <Pressable onPress={() => handleNumber(9)} >
                    <Animated.View style={[animatedNumberButton, styles.button, { width: SIZE / 4, height: SIZE / 4 }]} >
                        <Animated.Text style={[animatedButtonText, styles.buttonText]} >9</Animated.Text>
                    </Animated.View>
                </Pressable>

                <Pressable onPress={() => handleOperation("X")} >
                    <Animated.View style={[styles.button, animatedOperationButton, { width: SIZE / 4, height: SIZE / 4 }]} >
                        <Animated.Text style={[animatedButtonText, styles.buttonText]} >X</Animated.Text>
                    </Animated.View>
                </Pressable>

            </View>

            <View style={styles.buttonA} >

                <Pressable onPress={() => handleNumber(4)} >
                    <Animated.View style={[animatedNumberButton, styles.button, { width: SIZE / 4, height: SIZE / 4 }]} >
                        <Animated.Text style={[animatedButtonText, styles.buttonText]} >4</Animated.Text>
                    </Animated.View>
                </Pressable>

                <Pressable onPress={() => handleNumber(5)} >
                    <Animated.View style={[animatedNumberButton, styles.button, { width: SIZE / 4, height: SIZE / 4 }]} >
                        <Animated.Text style={[animatedButtonText, styles.buttonText]} >5</Animated.Text>
                    </Animated.View>
                </Pressable>

                <Pressable onPress={() => handleNumber(6)} >
                    <Animated.View style={[animatedNumberButton, styles.button, { width: SIZE / 4, height: SIZE / 4 }]} >
                        <Animated.Text style={[animatedButtonText, styles.buttonText]} >6</Animated.Text>
                    </Animated.View>
                </Pressable>

                <Pressable onPress={() => handleOperation("-")} >
                    <Animated.View style={[styles.button, animatedOperationButton, { width: SIZE / 4, height: SIZE / 4 }]} >
                        <Animated.Text style={[animatedButtonText, styles.buttonText]} >-</Animated.Text>
                    </Animated.View>
                </Pressable>

            </View>

            <View style={styles.buttonA} >

                <Pressable onPress={() => handleNumber(1)} >
                    <Animated.View style={[animatedNumberButton, styles.button, { width: SIZE / 4, height: SIZE / 4 }]} >
                        <Animated.Text style={[animatedButtonText, styles.buttonText]} >1</Animated.Text>
                    </Animated.View>
                </Pressable>

                <Pressable onPress={() => handleNumber(2)} >
                    <Animated.View style={[animatedNumberButton, styles.button, { width: SIZE / 4, height: SIZE / 4 }]} >
                        <Animated.Text style={[animatedButtonText, styles.buttonText]} >2</Animated.Text>
                    </Animated.View>
                </Pressable>

                <Pressable onPress={() => handleNumber(3)} >
                    <Animated.View style={[animatedNumberButton, styles.button, { width: SIZE / 4, height: SIZE / 4 }]} >
                        <Animated.Text style={[animatedButtonText, styles.buttonText]} >3</Animated.Text>
                    </Animated.View>
                </Pressable>

                <Pressable onPress={() => handleOperation("+")} >
                    <Animated.View style={[styles.button, animatedOperationButton, { width: SIZE / 4, height: SIZE / 4 }]} >
                        <Animated.Text style={[animatedButtonText, styles.buttonText]} >+</Animated.Text>
                    </Animated.View>
                </Pressable>

            </View>

            <View style={styles.buttonA} >
                <Pressable onPress={() => handleNumber(0)} >
                    <Animated.View style={[animatedNumberButton, styles.button, { width: SIZE / 2, height: SIZE / 4 }]} >
                        <Animated.Text style={[animatedButtonText, styles.buttonText]} >0</Animated.Text>
                    </Animated.View>
                </Pressable>

                <Pressable>
                    <Animated.View style={[animatedNumberButton, styles.button, { width: SIZE / 4, height: SIZE / 4 }]} >
                        <Animated.Text style={[animatedButtonText, styles.buttonText]} >.</Animated.Text>
                    </Animated.View>
                </Pressable>

                <Pressable onPress={() => handleResult()} >
                    <Animated.View style={[styles.button, animatedOperationButton, { width: SIZE / 4, height: SIZE / 4 }]} >
                        <Animated.Text style={[animatedButtonText, styles.buttonText]} >=</Animated.Text>
                    </Animated.View>
                </Pressable>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
    buttonA: {
        flexDirection: "row",
        flex: 1
    },
    button: {
        backgroundColor: "#333333",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonText: {
        fontSize: 20,
        fontWeight: "500"
    }
})