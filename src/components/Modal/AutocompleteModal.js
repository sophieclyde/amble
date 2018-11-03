import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Modal } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default class AutocompleteModal extends React.Component {
    render() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.props.modalVisible}
                onRequestClose={() => {
                    // alert('Local escolhido.');
                }}>
                <View style={styles.modal}>
                    <View style={styles.modalHeader}>
                        <Text>{this.props.text}</Text>
                        <TouchableOpacity onPress={() => this.props.setModalVisible(false)}>
                            <Text style={styles.textCloseModal}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                    <GooglePlacesAutocomplete
                        placeholder='Search'
                        minLength={2} // minimum length of text to search
                        autoFocus={false}
                        returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                        listViewDisplayed='auto'    // true/false/undefined
                        fetchDetails={true}
                        renderDescription={row => row.description} // custom description render
                        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                            this.props.save(details.geometry.location, details.formatted_address)
                            // console.log(details.geometry.location);
                        }}
                        
                        getDefaultValue={() => ''}
                        
                        query={{
                            // available options: https://developers.google.com/places/web-service/autocomplete
                            key: this.props.googleKey,
                            language: 'en', // language of the results
                            types: ['address', 'establishment','geocode'] // default: 'geocode'
                        }}
                        
                        styles={{
                            textInputContainer: {
                            width: '100%'
                            },
                            description: {
                            fontWeight: 'bold'
                            },
                            predefinedPlacesDescription: {
                            color: '#1faadb'
                            }
                        }}
                        
                        currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                        currentLocationLabel="Current location"
                        nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                        GoogleReverseGeocodingQuery={{
                            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                        }}
                        GooglePlacesSearchQuery={{
                            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                            rankby: 'distance',
                            types: 'food'
                        }}
                    
                        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                    
                        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                        />

                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        backgroundColor: 'white',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10
    },
    textCloseModal: {
        color: 'red'
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10
    }
});