import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { theme } from 'theme';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { MapPinIcon } from 'react-native-heroicons/solid';

const HomeScreen = () => {
  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState([1, 2, 3]);

  const handlelocation = (loc) => {
    console.log('location:', loc);
  };

  return (
    <View className="relative flex-1">
      <StatusBar barStyle="light-content" />
      <Image
        blurRadius={5}
        source={require('../assets/images/bgdone.png')}
        className="absolute h-full w-full"
      />
      <SafeAreaView className="flex flex-1">
        {/* Search section */}
        <View className="relative z-50 mx-4 mt-4">
          <View
            className="flex-row items-center justify-end rounded-full"
            style={{
              backgroundColor: showSearch ? theme.bgWhite(0.2) : 'transparent',
            }}>
            {showSearch && (
              <TextInput
                placeholder="Search City"
                placeholderTextColor="lightgray"
                className="h-10 flex-1 pl-6 text-base text-white"
              />
            )}
            <TouchableOpacity
              onPress={() => toggleSearch(!showSearch)}
              style={{ backgroundColor: theme.bgWhite(0.3) }}
              className="m-1 rounded-full p-3">
              <MagnifyingGlassIcon size={25} color="white" />
            </TouchableOpacity>
          </View>

          {/* Location Dropdown */}
          {locations.length > 0 && showSearch && (
            <View className="absolute top-16 z-40 w-full rounded-3xl bg-gray-200">
              {locations.map((loc, index) => {
                const showBorder = index + 1 !== locations.length;
                const borderClass = showBorder ? 'border-b-2 border-b-gray-400' : '';
                return (
                  <TouchableOpacity
                    onPress={() => handlelocation(loc)}
                    key={index}
                    className={`mb-1 flex-row items-center p-3 px-4 ${borderClass}`}>
                    <MapPinIcon size={20} color="gray" />
                    <Text className="ml-2 text-lg text-gray-700">London, United Kingdom</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
