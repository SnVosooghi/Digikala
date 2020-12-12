import * as React from 'react';
import { TouchableOpacity, Text, View} from 'react-native'
import styles from './Styles/MovieListStyles.js'



export default MovieList = ({ item }) => (
    <TouchableOpacity style={styles.item} >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.descriptoin}>{item.date_of_release}</Text>
      <Text style={styles.descriptoin}>director: {item.director.replace(/[0-9]|:|/g, '')}</Text>
      <Text style={styles.meta}>rate: {item.rating}</Text>
      <View style={styles.genres}>
        {item.tags.map( genre => <Text key={"genre" + genre} style= {styles.meta} >{genre}  </Text> )}
      </View>
    </TouchableOpacity>
  );