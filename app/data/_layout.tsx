
import { Stack } from 'expo-router';

export default function FormLayout() {
    return (
        <Stack>
        <Stack.Screen name="form" options={{ headerShown: false }} />
        <Stack.Screen name="confirmation" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    )
}
      
  