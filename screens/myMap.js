import React from "react";
import {
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  SafeAreaView
} from "react-native";
import { connect } from "react-redux";
import { MapView } from "expo";
import {
  Ionicons,
  FontAwesome,
  Foundation,
  SimpleLineIcons
} from "@expo/vector-icons";

import { setLocation, setFilters, setRigs } from "../modules/campings";
import * as mock from "../mock/campings";

const { Marker } = MapView;
const { width, height } = Dimensions.get("screen");

class myMap extends React.Component {
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    this.props.setRigs(mock.campings);
  }

  handleTab = tabKey => {
    this.props.setFilters({ type: tabKey });
  };

  renderHeader() {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <View style={{ flex: 2, flexDirection: "row" }}>
            {/* <View style={styles.settings}>
              <View style={styles.location}>
                <FontAwesome name="location-arrow" size={14} color="white" />
              </View>
            </View> */}
            {/* <View style={styles.options}>
              <Text style={{ fontSize: 12, color: "#A5A5A5", marginBottom: 5 }}>
                Detected Location
              </Text>
              <Text style={{ fontSize: 14, fontWeight: "300" }}>
                Houston, Texas
              </Text>
            </View> */}
          </View>
          {/* <View style={styles.settings}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Settings")}
            >
              <Ionicons name="ios-settings" size={24} color="black" />
            </TouchableOpacity>
          </View> */}
        </View>
        {this.renderTabs()}
      </View>
    );
  }

  renderMap() {
    const campingMarker = ({ type }) => (
      <View style={[styles.marker, styles[`${type}Marker`]]}>
        {type === "rig" ? (
          <FontAwesome name="map-pin" size={18} color="#000" />
        ) : (
          <FontAwesome name="map-pin" size={18} color="#FF0000" />
        )}
      </View>
    );
    const { filters, campings } = this.props;
    const mapSpots =
      filters.type === "all"
        ? campings
        : campings.filter(camping => camping.type === filters.type);

    return (
      <View style={styles.map}>
        <MapView
          style={{ flex: 1, height: height * 0.5, width }}
          showsMyLocationButton
          initialRegion={{
            latitude: 29.3013,
            longitude: -94.7977,
            latitudeDelta: 8.0,
            longitudeDelta: 8.0
          }}
        >
          <Marker coordinate={this.props.mylocation}>
            <View style={styles.myMarker}>
              <View style={styles.myMarkerDot} />
            </View>
          </Marker>

          {mapSpots.map(marker => (
            <Marker key={`marker-${marker.id}`} coordinate={marker.latlng}>
              {campingMarker(marker)}
            </Marker>
          ))}
        </MapView>
      </View>
    );
  }

  renderTabs() {
    const { filters } = this.props;

    return (
      <View style={styles.tabs}>
        <View
          style={[styles.tab, filters.type === "all" ? styles.activeTab : null]}
        >
          <Text
            style={[
              styles.tabTitle,
              filters.type === "all" ? styles.activeTabTitle : null
            ]}
            onPress={() => this.handleTab("all")}
          >
            Display All
          </Text>
        </View>
        <View
          style={[
            styles.tab,
            filters.type === "platform" ? styles.activeTab : null
          ]}
        >
          <Text
            style={[
              styles.tabTitle,
              filters.type === "platform" ? styles.activeTabTitle : null
            ]}
            onPress={() => this.handleTab("platform")}
          >
            Oil Platforms
          </Text>
        </View>
        <View
          style={[styles.tab, filters.type === "rig" ? styles.activeTab : null]}
        >
          <Text
            style={[
              styles.tabTitle,
              filters.type === "rig" ? styles.activeTabTitle : null
            ]}
            onPress={() => this.handleTab("rig")}
          >
            Oil Rigs
          </Text>
        </View>
      </View>
    );
  }

  renderList() {
    const { filters, campings } = this.props;
    const mapSpots =
      filters.type === "all"
        ? campings
        : campings.filter(camping => camping.type === filters.type);

    return mapSpots.map(camping => {
      return (
        <View key={`camping-${camping.id}`} style={styles.camping}>
          <ImageBackground
            style={styles.campingImage}
            imageStyle={styles.campingImage}
            source={{ uri: camping.image }}
          />

          <View style={styles.campingDetails}>
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "center"
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                {camping.name}
              </Text>
              <Text style={{ fontSize: 12, color: "#A5A5A5", paddingTop: 5 }}>
                {camping.description}
              </Text>
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={styles.campingInfo}>
                <FontAwesome name="calendar" color="#FFBA5A" size={12} />
                <Text style={{ marginLeft: 4, color: "#FFBA5A" }}>
                  {camping.installDate}
                </Text>
              </View>
              <View style={styles.campingInfo}>
                <FontAwesome name="location-arrow" color="#FF7657" size={12} />
                <Text style={{ marginLeft: 4, color: "#FF7657" }}>
                  {camping.depth} feet
                </Text>
              </View>
              <View style={styles.campingInfo}>
                <Ionicons name="ios-add" color="black" size={12} />
                <Text style={{ marginLeft: 4, color: "black" }}>
                  {camping.status}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ flex: 0.2, justifyContent: "center" }}>
            <SimpleLineIcons
              name="options-vertical"
              color="#A5A5A5"
              size={24}
            />
          </View>
        </View>
      );
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.renderHeader()}
        <ScrollView style={styles.container}>
          {this.renderMap()}
          {this.renderList()}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const moduleState = state => ({
  campings: state.campings.spots,
  filters: state.campings.filters,
  mylocation: state.campings.mylocation
});

const moduleActions = {
  setLocation,
  setRigs,
  setFilters
};

export default connect(moduleState, moduleActions)(myMap);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  headerContainer: {
    top: 0,
    height: height * 0.15,
    width: width
  },
  header: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: height * 0.15,
    paddingHorizontal: 14
  },
  location: {
    height: 24,
    width: 24,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF7657"
  },
  marker: {
    width: 40,
    height: 40,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFF"
  },
  rvMarker: {
    backgroundColor: "#FFBA5A"
  },
  tentMarker: {
    backgroundColor: "#FF7657"
  },
  settings: {
    alignItems: "center",
    justifyContent: "center"
  },
  options: {
    flex: 1,
    paddingHorizontal: 14
  },
  tabs: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  tab: {
    paddingHorizontal: 14,
    marginHorizontal: 10,
    borderBottomWidth: 3,
    borderBottomColor: "transparent"
  },
  tabTitle: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 10
  },
  activeTab: {
    borderBottomColor: "#FF7657"
  },
  activeTabTitle: {
    color: "#FF7657"
  },
  map: {
    flex: 1
  },
  camping: {
    flex: 1,
    flexDirection: "row",
    borderBottomColor: "#A5A5A5",
    borderBottomWidth: 0.5,
    padding: 20
  },
  campingDetails: {
    flex: 2,
    paddingLeft: 20,
    flexDirection: "column",
    justifyContent: "space-around"
  },
  campingInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 14
  },
  campingImage: {
    width: width * 0.3,
    height: width * 0.25,
    borderRadius: 6
  },
  myMarker: {
    zIndex: 2,
    width: 60,
    height: 60,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(51, 83, 251, 0.2)"
  },
  myMarkerDot: {
    width: 12,
    height: 12,
    borderRadius: 12,
    backgroundColor: "#3353FB"
  }
});
