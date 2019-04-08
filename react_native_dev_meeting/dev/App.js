import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  TextInput,
  AsyncStorage,
  TouchableHighlight
} from "react-native";
import styles from "./Styles";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Constants } from "expo";
import Example from "./Example";

// Load Logo
//import { Ionicons } from "@expo/vector-icons";
//const expoLogo = require("./assets/snack-icon.png");

const textKey = "dev:text";

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Home"
  };
  state = {
    itemss: [{ idd: 1, name: "First page" }, { idd: 2, name: "Second page" }],

    items: new Array(5)
      .fill(0)
      .map((a, i) => i)
      .map(i => ({
        title: `Title ${i}`,
        key: i,
        content: `Content number ${i}. It's a bit longer than title. It's even long enough to force a line break`
      })),
    count: 0,

    input: ""
  };

  // componentDidMount() {
  //   AsyncStorage.getItem(textKey).then(items => {
  //     if (items) {
  //       this.setState({ items: JSON.parse(items) });
  //     }
  //   });
  // }

  render() {
    return (
      <View>
        <Text style={styles.header}>
          {" "}
          My application{"\n"}
          React-native devMeeting
        </Text>
        <Text style={{ textAlign: "center" }}>Counter: {this.state.count}</Text>
        <Button
          style={{ marginBotton: 30 }}
          title="Click me!"
          onPress={this.increaseCounter}
        />

        <Text style={{ marginTop: 20 }}>New title to add:</Text>
        <TextInput
          placeholder="Enter text"
          value={this.state.input}
          //returnKeyType="done"
          //autoFocus={true}
          onChangeText={this.textChanged}
        />

        <TouchableHighlight
          style={{ justifyContent: "space-around" }}
          title="Add title"
          onPress={this.handlePress}
          activeOpacity={0.25}
          underlayColor="tomato"
          style={styles.touchable}
        >
          <Text style={{ textAlign: "center" }}>Add title</Text>
        </TouchableHighlight>
        <FlatList
          style={{ textAlign: "center" }}
          data={this.state.items}
          renderItem={this.renderItem}
        />

        {/* <Image style={styles.logo} source={expoLogo} />
        <Ionicons name="md-checkmark-circle" size={32} color="green" /> */}
        {this.state.itemss.map(itemss => (
          <Button
            key={itemss.idd}
            title={`Show item ${itemss.idd}`}
            onPress={() => this.props.navigation.navigate("Item", itemss)}
          />
        ))}
      </View>
    );
  }

  renderItem = ({ item }) => (
    <View>
      <Text style={{ textAlign: "center" }}>{item.title}</Text>
    </View>
  );

  handlePress = () => {
    this.setState(state => {
      if (state.input.length) {
        return {
          items: [
            ...state.items,

            {
              title: state.input,
              key: state.items.length
            }
          ],
          input: ""
        };
      } else {
        return {
          items: [
            ...state.items,
            {
              title: `Title ${state.items.length}`,
              key: state.items.length
            }
          ]
        };
      }
    });
    AsyncStorage.setItem(textKey, JSON.stringify(this.state.items));
  };

  increaseCounter = () => this.setState(({ count }) => ({ count: count + 1 }));
  textChanged = text => {
    this.setState({ input: text });
  };
}

const ItemScreen = ({ navigation }) => (
  <View>
    <Text>Item #{navigation.state.params.idd}</Text>
    <Text>Item #{navigation.getParam("idd", "-")}</Text>
    <Text>{navigation.getParam("unknownParam", "Not found unknownParam")}</Text>
    <Button
      title="Rabbit hole"
      onPress={() => navigation.push("Item", navigation.state.params)}
    />
    <Button title="Go back" onPress={() => navigation.goBack()} />
  </View>
);
ItemScreen.navigationOptions = ({ navigation }) => ({
  title: `Top title for Item #${navigation.getParam("idd")}`
});

const Navigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Item: ItemScreen // Shorthand configuration
  },
  {
    initialRouteName: "Home"
  }
);
const AppContainer = createAppContainer(Navigator); // Create container using our navigator stack
//
//
//

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
