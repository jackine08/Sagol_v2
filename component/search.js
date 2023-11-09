import React, { useState } from 'react';
import { View, Button, Text, TextInput } from 'react-native';
import axios from 'axios';

const ApiButton = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleApiCall = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://bf.hcailab.uos.ac.kr/images/search?userText=${query}`);
    //   setResult(response.data); // API 응답을 처리
    } catch (error) {
      console.error('API 호출 중 에러 발생:', error);
      setResult('API 호출 중 에러 발생');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="검색어 입력"
        value={query}
        onChangeText={(text) => setQuery(text)}
      />
      <Button title="API 호출" onPress={handleApiCall} disabled={loading} />
      {loading ? <Text>로딩 중...</Text> : <Text>API 결과: {result}</Text>}
    </View>
  );
};

export default ApiButton;