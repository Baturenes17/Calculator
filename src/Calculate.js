import { useContext, useEffect, useState } from "react";
import { Dimensions, StyleSheet, Switch, Text, View } from "react-native"
import Animated, { interpolateColor, useAnimatedStyle, useDerivedValue, withTiming } from "react-native-reanimated"
import { Keyboard } from "./Keyboard";
import { AppContext } from "./AppContext";

export const Calculate = () => {

    const { width, height } = Dimensions.get("window");
    const SIZE = Math.min(width, height);

    const [theme, setTheme] = useState("light");
    const {currentNumber} = useContext(AppContext);

    const progress = useDerivedValue(() => {
        return theme === "dark" ? withTiming(1) : withTiming(0);
    })

    const animatedBackground = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            progress.value,
            [0, 1],
            ["#FFFFFF", "#1F1F1F"]
        )
        return { backgroundColor };
    })

    const animatedResult = useAnimatedStyle(() => {
        const color = interpolateColor(
            progress.value,
            [0,1],
            ["black","white"]
        )
        return {color}
    })


    return (
        <Animated.View style={[styles.container, { width: SIZE, paddingTop: SIZE / 8 }, animatedBackground]} >
            <View style={[styles.header, { width: SIZE }]} >
                <Switch
                    value={theme === "dark"}
                    onValueChange={(toggled) => {
                        setTheme(toggled ? "dark" : "light")
                    }}
                    thumbColor={"#FFAE00"}
                    trackColor={{ true: "#DEDEDE", false: "#515251" }}
                />
            </View>

            <View style={[styles.resultA, { width: SIZE, height: SIZE / 1.6, paddingRight: SIZE / 15, paddingBottom: SIZE / 30 }]} >
                <Animated.Text style={[animatedResult,{ color: "white", fontSize: 40, fontWeight: "bold" }]} >{currentNumber}</Animated.Text>
            </View>

            <Keyboard theme={theme} setTheme={setTheme} progress={progress}/> 

        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    header: {
        alignItems: "flex-start",
    },
    resultA: {
        justifyContent: "flex-end",
        alignItems: "flex-end"
    },
})