import React, { Component } from 'react';
import styles from '../values/styles';
import {
    Linking,
    View, FlatList, Text,
    TouchableOpacity
} from 'react-native';
import { getList, firstTime, loadmore } from '../actions/getListAction';
import { connect } from 'react-redux';
import { Card, CardTitle, CardContent, CardImage } from 'react-native-material-cards';
import colors from '../values/colors';
var Spinner = require('react-native-spinkit');

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { dataSource: [] }
        this.page = 1;
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
        //this.props.firstTime()
        this.props.getList()
    }
    loadMoreData = () => {
        this.page = this.page + 1;
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
                       color={colors.green}
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
                    // numColumns={2}
                    ListFooterComponent={this.renderFooter.bind(this)}

                    //Adding Load More button as footer component
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