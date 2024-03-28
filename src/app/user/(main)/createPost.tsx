import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import * as ImagePicker from 'expo-image-picker';

const createPost = () => {
  const selectImage = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: "All"
    })
    // const result = await ImagePicker.launchCameraAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.Images,
    // })
    console.log(result);
  }
  return (
    <View className='mt-10'>
      <Text onPress={()=> selectImage()}>createPost</Text>
    </View>
  )
}

export default createPost

const styles = StyleSheet.create({})