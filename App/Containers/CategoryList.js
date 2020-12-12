// In App.js in a new project
import * as React from 'react';
import { View, Text, FlatList, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux'
import styles from './Styles/CategoryListStyles'

function CategoryList(props) {

  React.useEffect(() => {
    props.getCategoryList()
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress= { () => props.navigation.navigate('CategoryMovies', { id: item.id, tag: item.name})}>
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
        <FlatList
          data={props.listFlat}
          renderItem={renderItem}
          keyExtractor={item => ''+item.id}
        />
    </View>
  );
}
const mapStateToProps = (state) => ({
    listFlat: state.movies.categoryList || null,
  }); 

const mapDispatchToProps = (dispatch) => ({
    getCategoryList: () => dispatch.movies.getCategoryList( ),

  
  });

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);