// In App.js in a new project
import * as React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux'
import MovieList from '../Components/MovieList'




function CategoryMovies(props) {

  React.useEffect(() => {
    props.getCategoryMovies(props.route.params.tag)
  }, []);

  const loadMore = () => {
    if ( props.categoryMovies.next != null)
      props.getMoreCategoryMovies(props.categoryMovies.next)
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
        <FlatList
          data={props.categoryMovies.results}
          renderItem={MovieList}
          keyExtractor={item => ''+item.id+item.title}
          onEndReached={() => loadMore()}
        />
    </View>
  );
}
const mapStateToProps = (state) => ({
  categoryMovies: state.movies.categoryMovies || null,
  }); 

const mapDispatchToProps = (dispatch) => ({
  getCategoryMovies: (tag) => dispatch.movies.getCategoryMovies(tag),
  getMoreCategoryMovies: (link) => dispatch.movies.getMoreCategoryMovies(link)
  });


  
  export default connect(mapStateToProps, mapDispatchToProps)(CategoryMovies);