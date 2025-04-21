import { Tabs } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';

// import { HapticTab } from '@/components/HapticTab';
// import { IconSymbol } from '@/components/ui/IconSymbol';
// import TabBarBackground from '@/components/ui/TabBarBackground';
// import { Colors } from '@/constants/Colors';
// import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  // const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Anasayfa',
          tabBarIcon: ({ color, focused }) => (
            <Text style={{ color: color }}>🏠</Text>
          ),
        }}
      />
      {/* <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <Text style={{ color: color }}>🔍</Text>
          ),
        }}
      /> */}
      {/* Diğer sekmeler buraya eklenebilir (örn. cart, profile) */}
      {/* Örnek: Cart sekmesi */}
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Sepet',
          tabBarIcon: ({ color, focused }) => (
            <Text style={{ color: color }}>🛒</Text>
          ),
        }}
      />
    </Tabs>
  );
}
