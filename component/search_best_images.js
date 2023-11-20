import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
          tokens: tokenize(value),
        }));

        setTFMatrix(tokenizedItems);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const tokenize = (text) => {
    return text.split(' ');
  };

  const handleQuery = async () => {
    if (query.trim() === '') {
      setResults(['Query is empty']);
      return;
    }
  
    const queryTokens = tokenize(query);
  
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
        placeholder="Enter your query"
        value={query}
        onChangeText={(text) => setQuery(text)}
      />
      <Button title="Search" onPress={() => {handleQuery(navigation)}}/>
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
