import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

  detailPageOuterBoxContainer: {
    flexDirection: 'row',
    marginLeft: 128,
    marginRight: 128,
    marginTop: 70,
  },

  mainImage: {
    // empty - can add styles if needed
  },

  mainImageDisplay: {
    width: '100%',
    maxWidth: 555,
    height: 355,
    backgroundColor: 'aqua',
  },

  detailPictureRowContainer: {
    flexDirection: 'row',
  },

  // check size
  detailPictureRowImage: {
    width: 50,
    height: 50,
  },

  imageContainerIndex: {
    width: 120,
    height: 120,
  },

  // check font size here
  detailItemName: {
    fontSize: 30,
    fontFamily: 'Inter_700Bold', 

  detailItemDescription: {
    marginTop: 7,
    fontFamily: 'Inter_400Regular',
    color: 'rgb(93, 93, 93)',
  },

  detailPictureContainerText: {
    marginLeft: 70,
  },

  starRating: {
    marginTop: 7,
  },
});
