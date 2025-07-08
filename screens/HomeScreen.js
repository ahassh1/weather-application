import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { theme } from 'theme';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
const HomeScreen = () => {
  return (
    <View className="relative flex-1">
      <StatusBar style="light" />
      <Image
        blurRadius={5}
        source={require('../assets/images/bgdone.png')}
        className="absolute h-full w-full"
      />
      <SafeAreaView className="flex flex-1">
        {/* search section  */}
        <View style={{ height: '7%' }} className="relative z-50 mx-4">
          <View
            className="flex-row items-center justify-end rounded-full"
            style={{ backgroundColor: theme.bgWhite(0.2) }}>
            <TextInput
              placeholder="Search City"
              placeholderTextColor={'lightgray'}
              className="relative h-10 flex-1 border border-gray-50 pl-6 text-base text-white"
            />
            <TouchableOpacity
              style={{ backgroundColor: theme.bgWhite(0.3) }}
              className="m-1 rounded-full p-3"
            />
            <MagnifyingGlassIcon size={25} color="white" className="absolute" />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
