import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { Calculate } from './src/Calculate';
import { AppProvider } from './src/AppContext';
export default function App() {


  return (
    <View style={styles.container}>
      <AppProvider>
        <Calculate />
      </AppProvider>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
