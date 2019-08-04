import { StyleSheet, Dimensions } from 'react-native';
import color from './colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.silver,
    },
    containerMenu: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.greenBlack,
    },
   
 
    listMenu:{
        flex: 3,
        backgroundColor: color.greySoft,
    },
    spinnerKotak: {
        alignSelf: 'center',
        marginTop: 50,
    },
    flatview: {
        
        marginRight:10,
        marginLeft:10,
        paddingTop: 10,
        borderRadius: 50,
    },
    imageThumbnail: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: 300,
    },
    loadMoreBtn: {
        padding: 10,
        backgroundColor: '#800000',
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadmoreBtnText: {
        color: color.white,
        fontSize: 15,
        textAlign: 'center',
    },
    footer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
 
})
export default styles;