import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import colors from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';


const SplashScreen = () => {

  return (
    <SafeAreaView style={{ backgroundColor: colors.PRIMARY }} className='flex h-full items-center justify-between py-3 pb-10'>
      
      <View className='flex items-start w-full'>
        <Text className='text-start p-3 pl-5 font-semibold text-white text-2xl'>
          Passengers Feedback
        </Text>
      </View>

      <View className='flex items-center mt-[-110]'>
        <Image
          source={require('@/assets/images/bus.jpg')}
          style={{ width: 400, height: 650 }}
          resizeMode='contain'
          className='ml-[-30]'
        />
      </View>

      
      <View className='flex items-center mt-[-70]'>
     <Text className='text-center text-white text-4xl px-7 font-bold'>
      Welcome to our Passenger Portal
     </Text>
  
  <Text className='text-center text-white text-lg mt-2 px-7'>
    Share Your Feedback Regarding Our Services.
  </Text>
  </View>

    <TouchableOpacity
        className='flex items-center justify-center bg-white px-4 p-4 rounded-full mt-auto w-[70%]' 
        onPress={() => {
          router.push('/data/form');
        }}
      >
        <Text style={{ color: colors.PRIMARY }} className='font-bold text-lg'>
          Get Started
        </Text>
      </TouchableOpacity>
      
    </SafeAreaView>
  );
};

export default SplashScreen;
