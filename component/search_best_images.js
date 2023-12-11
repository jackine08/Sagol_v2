import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const SearchBestImages = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const [tfMatrix, setTFMatrix] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const items = await AsyncStorage.multiGet(keys);
        const tokenizedItems = items.map(([key, value]) => ({
          key,
          tokens: tokenize(JSON.parse(value)["en"]),
        }));

        setTFMatrix(tokenizedItems);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const tokenize = (text) => {
    // 모든 영어 문자를 소문자로 변환하고, 쉼표와 마침표를 제거
    const cleanedText = text.toLowerCase().replace(/[.,]/g, '');
    // 공백을 기준으로 문자열을 분리하여 배열로 반환
    return cleanedText.split(' ');
  };

  const handleQuery = async () => {
    if (query.trim() === '') {
      setResults(['Query is empty']);
      return;
    }
    const translationResponse = await axios.post('http://minigpt4.hcailab.uos.ac.kr/translate', {
        query: query
      });
    
    // 번역된 텍스트를 토큰화
    const queryTokens = tokenize(translationResponse.data);
    console.log('Tokenized Response:', queryTokens);
    
    // 가장 유사한 키 찾기
    const sortedResults = tfMatrix.map((item) => ({
      key: item.key,
      similarity: calculateSimilarity(queryTokens, item.tokens),
    })).sort((a, b) => b.similarity - a.similarity);
  
    // 상위 10개 결과 저장
    const topResults = sortedResults.slice(0, 10).map(result => result.key);
  
    setResults(topResults);
    // 페이지 전환
    navigation.navigate('Page_Results', { results: topResults });
  };  

  const calculateSimilarity = (queryTokens, itemTokens) => {
    const commonTokens = itemTokens.filter((token) => queryTokens.includes(token));
    return commonTokens.length / Math.sqrt(queryTokens.length * itemTokens.length);
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="검색어를 입력해주세요"
        value={query}
        onChangeText={(text) => setQuery(text)}
      />
      <Button title="검색" onPress={() => {handleQuery(navigation)}}/>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  result: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultItem: {
    fontSize: 14,
    color: 'green',
  },
});

export default SearchBestImages;
