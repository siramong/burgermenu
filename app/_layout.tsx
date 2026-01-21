import { BurgerProvider } from '@/context/BurgerContext';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <BurgerProvider>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#050711' } }} />
    </BurgerProvider>
  );
}
