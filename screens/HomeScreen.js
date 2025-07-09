import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { theme } from 'theme';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { CalendarDaysIcon, MapPinIcon } from 'react-native-heroicons/solid';

import { debounce } from 'lodash';
import { fetchLocations, fetchWeatherForecast } from 'api/weather';
import { weatherImages } from 'constants';

const HomeScreen = () => {
  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState([]);

  const [weather, setWeather] = useState({});

  const handlelocation = (loc) => {
    console.log('location:', loc);
    setLocations([]);
    toggleSearch(false);
    fetchWeatherForecast({
      cityName: loc.name,
      days: '7',
    }).then((data) => {
      setWeather(data);
      console.log('got forecast: ', data);
    });
  };

  const handleSearch = (value) => {
    // console.log('value: ', value);
    // fetch locations
    if (value.length > 2) {
      fetchLocations({ cityName: value }).then((data) => {
        // console.log('got locations: ', data);
        setLocations(data);
      });
    }
  };

  useEffect(() => {
    fetchMyWeatherData();
  }, []);
  const fetchMyWeatherData = async () => {
    fetchWeatherForecast({
      cityName: 'Dhaka',
      days: '7',
    }).then((data) => {
      setWeather(data);
    });
  };
  const handleTextDebounce = useCallback(debounce(handleSearch, 1000), []);

  const { current, location } = weather;

  return (
    <View className="relative flex-1">
      <StatusBar barStyle="light-content" />
      <Image
        blurRadius={2}
        source={require('../assets/images/bgdone.png')}
        //full screen image
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          resizeMode: 'cover',
        }}
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
                onChangeText={handleTextDebounce}
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
                    <Text className="ml-2 text-lg text-gray-700">
                      {loc?.name}, {loc?.country}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>

        {/* forecast section  */}
        <View className="mx-4 mb-1 flex flex-1 justify-around">
          {/* location */}
          <Text className="text-center text-2xl font-bold text-white">
            {location?.name},
            <Text className="text-lg font-semibold text-gray-200">{' ' + location?.country}</Text>
          </Text>

          {/* weather image  */}
          <View className="flex-row justify-center">
            <Image
              // source={{ uri: 'https:' + current?.condition?.icon }}
              source={weatherImages[current?.condition?.text]}
              style={{
                width: 110,
                height: 120,
                // marginTop: 20,
              }}
              resizeMode="contain"
            />
          </View>
          {/* degree celclus  */}
          <View className="space-y-2">
            <Text className="ml-5 text-center text-6xl font-bold text-white">
              {current?.temp_c}&#176;
            </Text>
            <Text className="text-center text-xl tracking-widest text-white">
              {current?.condition?.text}
            </Text>
          </View>
          {/* other stats  */}
          <View className="mx-4 flex-row justify-between">
            <View className="flex-row items-center space-x-2">
              <Image
                source={require('../assets/images/drop.png')}
                style={{
                  width: 23,
                  height: 24,
                }}
                resizeMode="contain"
              />
              <Text className="text-base font-semibold text-white">{current?.humidity}%</Text>
            </View>
            <View className="flex-row items-center space-x-2">
              <Image
                source={require('../assets/images/sun.png')}
                style={{
                  width: 22,
                  height: 24,
                }}
              />
              <Text className="text-base font-semibold text-white">6:05 AM</Text>
            </View>
            <View className="flex-row items-center space-x-2">
              <Image
                source={require('../assets/images/winds.png')}
                style={{
                  width: 23,
                  height: 24,
                }}
              />
              <Text className="text-base font-semibold text-white">{current?.wind_kph}km</Text>
            </View>
          </View>
        </View>

        {/* forecast for next days  */}

        <View className="mb-3 space-y-3">
          <View className="mx-5 flex-row items-center space-x-2">
            <CalendarDaysIcon size="22" color="white" />
            <Text className="text-base text-white"> Daily forecast</Text>
          </View>
          <ScrollView
            horizontal
            contentContainerStyle={{ paddingHorizontal: 15 }}
            showsHorizontalScrollIndicator={false}>
            {weather?.forecast?.forecastday?.map((item, index) => {
              let date = new Date(item.date);
              let options = { weekday: 'long' };
              let dayName = date.toLocaleDateString('en-US', options);
              dayName = dayName.split(',')[0];
              return (
                <View
                  key={index}
                  className="mr-4 flex w-24 items-center justify-center space-y-1 rounded-3xl py-3"
                  style={{ backgroundColor: theme.bgWhite(0.15) }}>
                  <Image
                    source={weatherImages[item?.day?.condition?.text]} // ideally use item.day.condition.text for dynamic icon
                    style={{ height: 32, width: 30 }}
                  />
                  <Text className="text-white">{dayName}</Text>
                  <Text className="text-xl font-semibold text-white">
                    {item?.day?.avgtemp_c}&#176;
                  </Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
