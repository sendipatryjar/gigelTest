import React, { Component } from 'react';
import colors from '../values/colors';
import styles from '../values/styles';
import {Alert,
    Linking,
    View, FlatList, Text,
    TouchableOpacity
} from 'react-native';
import { getList, firstTime, loadmore } from '../actions/getListAction';
import { connect } from 'react-redux';
import { Card, CardTitle, CardContent, CardImage } from 'react-native-material-cards';
var Spinner = require('react-native-spinkit');

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { dataSource: [] }
        this.page = 2;
    }
    componentWillReceiveProps(newProps) {
        if (newProps.listNews != this.props.listNews) {

            if (newProps.listNews.length > 0) {
                this.setState({ dataSource: this.state.dataSource.concat(newProps.listNews) })
            } else {
                this.setState({ dataSource: [] })
            }

        }
    }
    componentWillMount() {
        this.props.getList()
    }
    loadMoreData = () => {
        this.page = this.page+8;
        this.props.loadmore(this.page);

    };

    renderButtonLoadMore() {
        if (!this.props.loading && this.props.listNews.length > 0) {
            return (
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={this.loadMoreData}
                    //On Click of button calling loadMoreData function to load more data
                    style={styles.loadMoreBtn}>
                    <Text style={styles.loadmoreBtnText}>Load More</Text>
                    {this.props.loadingLoadmore ? (
                        <ActivityIndicator color={color.white} style={{ marginLeft: 8 }} />
                    ) : null}
                </TouchableOpacity>
            );
        }
    }

    renderFooter() {
        return (
            //Footer View with Load More button
            <View style={styles.footer}>

                {this.renderButtonLoadMore()}

            </View>
        );
    }
    actionClick(url) {
        Alert.alert(
            'Confirm',
            'Apakah kamu ingin melihat detail berita ?',
            [

                { text: 'Tidak', onPress: () => console.log('Cancel Pressed') },
                { text: 'Ya', onPress: () => this.detailPage(url) },
            ],
            { cancelable: false },
        );
       

    }
    detailPage(url){
        return (
            Linking.openURL(url)
        );
    }


    render() {
        return (

            <View style={styles.container}>
            <Spinner 
                       style={styles.spinnerKotak} 
                       isVisible={this.props.loading}
                       size={100}
                       type='Wave'
                       color={colors.b}
           />

                <FlatList
                    data={this.state.dataSource}
                    showsVerticalScrollIndicator={false}
                    extraData={this.state.dataSource}
                    renderItem={({ item }) =>

                        <TouchableOpacity onPress={() => this.actionClick(item.url)}>
                            <View>

                                <Card styles={styles.flatview}>
                                    <CardImage
                                        source={{ uri: item.urlToImage }}
                                        title={item.sourceName}

                                    />
                                    <CardTitle
                                        title={item.title}
                                    />
                                    <CardContent text={item.description} />
                                </Card>
                            </View>



                        </TouchableOpacity>


                    }
                 
                    ListFooterComponent={this.renderFooter.bind(this)}

                    keyExtractor={item => "" + item.title}
                />
            </View>
        );
    }
}
const mapStateToProps = ({ listData }) => {
    const { listNews, error, loading, Loadmore } = listData;

    return { listNews, error, loading, Loadmore };
};
export default connect(mapStateToProps, { getList, firstTime, loadmore })(Home); 