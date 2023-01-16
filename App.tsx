import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
} from 'react-native';
import axios from 'axios';

const App = () => {
  const baseURL = 'https://jsonplaceholder.typicode.com';

  let [users, setUsers] = useState<any>([]);
  let [posts, setPosts] = useState<any>([]);

  let axiosInstance = axios.create({baseURL});

  let get_users = () => {
    axiosInstance.get('/users').then(({data}) => {
      setUsers(data);
    });
  };

  let get_posts = () => {
    axiosInstance.get('/posts').then(({data}) => {
      setPosts(data);
    });
  };

  let renderUsers = ({item}: any) => {
    return (
      <View>
        <Text>ID - {item.id}</Text>
        <Text>Name - {item.name}</Text>
      </View>
    );
  };

  let renderPosts = ({item}: any) => {
    return (
      <View>
        <Text>ID - {item.id}</Text>
        <Text>Title - {item.title}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.wrap}>
        <View style={styles.container}>
          {!users.length ? (
            <View style={styles.btn}>
              <Button title={'Get users'} onPress={() => get_users()} />
            </View>
          ) : (
            <View style={styles.btn}>
              <Button title={'Hide users'} onPress={() => setUsers([])} />
            </View>
          )}
        </View>
        {!!users.length && (
          <View>
            <Text style={styles.header}>Users</Text>
            <FlatList
              data={users}
              renderItem={renderUsers}
              style={styles.flatlist}
            />
          </View>
        )}

        <View style={styles.postsBtnDiv}>
          {posts.length ? (
            <View style={styles.postsBtn}>
              <Button title={'Hide posts'} onPress={() => setPosts([])} />
            </View>
          ) : (
            <View style={styles.postsBtn}>
              <Button title={'Show posts'} onPress={() => get_posts()} />
            </View>
          )}
        </View>

        {!!posts.length && <FlatList data={posts} renderItem={renderPosts} />}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: 'lightskyblue',
    alignItems: 'center',
  },
  container: {
    padding: 10,
  },
  btn: {
    backgroundColor: 'silver',
    borderStyle: 'solid',
    borderColor: 'darkblue',
    borderRadius: 5,
    borderWidth: 3,
    margin: 5,
  },
  header: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '600',
    marginBottom: 10,
    color: 'black',
    borderBottomWidth: 3,
    borderBottomColor: 'darkblue',
    width: '30%',
  },
  usersContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'black',
    padding: 10,
  },
  flatlist: {
    height: 500,
  },
  postsBtn: {
    backgroundColor: 'silver',
    borderStyle: 'solid',
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 3,
    width: 200,
    padding: 10,
    color: 'white',
  },
  postsBtnDiv: {
    backgroundColor: 'lightgray',
    borderRadius: 5,
    borderColor: 'silver',
    borderWidth: 2,
  },
});

export default App;
