// In App.js in a new project
import * as React from 'react';
import { View, Text, FlatList } from 'react-native';
import {connect} from 'react-redux';
import { SearchBar } from 'react-native-elements';
import {Metrics} from '../Themes'
import {getCookie} from '../lib/cookies';
import MovieList from '../Components/MovieList';
import styles from './Styles/HomeStyles'

function HomeScreen(props) {

  //componentDidMount
  React.useEffect(() => {
    checkAuth()
  }, []);

  //hooks
  const [search, setSearch]= React.useState('')

  //functions
  const checkAuth= async () =>{
    const token= await getCookie( 'Auth:Token');
    if (!token)
      props.navigation.navigate('Login')
  }

  const onSearch = (value) => {
    setSearch(value);
    props.search(value);
  }

  const loadMore = () => {
    if ( props.searchList.next != null)
      props.getMoreSearch(props.searchList.next)
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      
      <View style={styles.nav}>
        <Text style={styles.title} onPress={ () => props.navigation.navigate('Login')}>
          Logout
        </Text>
        <Text style={styles.title} onPress={ () => props.navigation.navigate('CategoryList')}>
          Categories
        </Text>
      </View>

      <SearchBar
        placeholder="Type Here..."
        onChangeText={onSearch}
        value={search}
        containerStyle={{
          width: Metrics.fullWidth,
          alignSelf: 'center'
        }}
      />
      <FlatList
          data={props.searchList.results}
          renderItem={MovieList}
          keyExtractor={item => ''+item.id+item.title}
          onEndReached={() => loadMore()}
        />
    </View>
  );
}


const mapStateToProps = (state) => ({
    searchList: state.search ,
  }); 

const mapDispatchToProps = (dispatch) => ({
    search: (phrase) => dispatch.search.getSearch( phrase),
    getMoreSearch : (link) => dispatch.search.getMoreSearch(link)
  
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);