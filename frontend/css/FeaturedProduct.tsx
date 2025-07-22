import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'center', // center horizontally
  },

  titleTrending: {
    fontSize: 32,
    textAlign: 'center',
    fontFamily: 'Inter_700Bold', // check if there is a description
    color: 'rgb(98, 98, 98)',
  },

  /* 
  // potential description
  titleDescription:{
    fontSize: 16,
    fontFamily: Inter_400Regular,
    color: 'rgb(98, 98, 98)'}
  */

  underlineBar: {
    marginTop: 6,
    width: '7%',          // 7% of parent width
    height: 2,
    backgroundColor: 'rgb(255, 94, 13)',
    marginBottom: 50,
  },

  cardContainerAdvertis: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 105,
    marginRight: 105,
    gap: 16,             // React Native 0.71+ supports gap in Flexbox
  },

  cardInnerDiv: {
    width: 500,
    height: 500,
    alignItems: 'center',
    justifyContent: 'space-between',
    textAlign: 'center', 
  },

  cardImage: {
    width: '90%',
    height: '90%',
  },

  imageWrapper: {
    position: 'relative',
    width: 300,
    height: 300,
    overflow: 'hidden',
  },

  imageWrapperImage: {
    width: '90%',
    height: '90%',
  },

  grayOverlay: {
    position: 'absolute',
    top: 0,
    left: 22,
    width: '90%',
    height: '90%',
    backgroundColor: 'rgba(54, 54, 54, 0.2)', // semi-transparent gray
  },
});
