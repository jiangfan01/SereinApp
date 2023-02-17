import * as React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Cell, Section, TableView} from 'react-native-tableview-simple';
import Colors from '../../constants/Colors';

const HomeScreen = ({navigation}) => {
    return (
        <ScrollView style={styles.container}>
            <TableView appearance={'light'}>
                <Section header="浏览">
                    <Cell
                        title="技术站点"
                        titleTextColor={Colors.primary}
                        titleTextStyle={{textAlign: 'center'}}
                        onPress={() => navigation.navigate('Site')}
                    />
                </Section>

                <Section header="长乐未央" footer="All rights reserved.">
                    <Cell
                        title="关于「长乐未央」"
                        titleTextColor={Colors.primary}
                        onPress={() => navigation.navigate('Details', )}
                        titleTextStyle={{textAlign: 'center'}}
                    />
                </Section>
            </TableView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EFEFF4',
    },
});

export default HomeScreen;