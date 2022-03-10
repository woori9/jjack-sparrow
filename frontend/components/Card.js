import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  View
} from 'react-native';

const Card = ({ review }) => {
  const { author, rating, description } = review;

  const ratingContent = [];
  for (let i = 0; i < parseInt(rating); i++) {
    ratingContent.push(<Image
      source={require('../assets/heart.png')}
      style={{ width: 20, height: 20 }}
      key={i}
    />);
  }

  return (
    <View style={{ height: 170, width: 260, marginLeft: 20, borderWidth: 0.5, borderColor: '#dddddd' }}>
      <View style={{ flex: 1, backgroundColor: 'beige' }}>
        <View style={{ flexDirection: 'row' }}>
          <Image source={{ uri: author.picture }}
            style={{ width: 50, height: 50, marginLeft: 5, marginTop: 5, resizeMode: 'cover', borderRadius: 100 }}
          />
          <View style={{ paddingLeft: 8, paddingTop: 22 }}>
            <Text>{author.username}</Text>
          </View>
        </View>
        <View style={{ flex: 1, marginLeft: 60, marginRight: 3, bottom: 5 }}>
          <Text style={{ flex: 3, paddingLeft: 2, marginTop: 10, lineHeight: 25 }}>{description}</Text>
          <View style={{ flexDirection: 'row' }}>
            {[ratingContent]}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
});

export default Card;
