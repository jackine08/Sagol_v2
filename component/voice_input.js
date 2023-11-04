import React, { useState } from 'react';
import {Button, SafeAreaView, StyleSheet, Text, TextInput} from 'react-native';


const Voice_input = () => {
  const [text, onChangeText] = React.useState('예시) 손 위에 앉아있는 고슴도치');
  const [description, setDescription] = React.useState("default description");

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
      <Text>{description}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default Voice_input;