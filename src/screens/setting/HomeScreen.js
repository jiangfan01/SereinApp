import * as React from 'react';
import {Alert, ScrollView, StyleSheet} from 'react-native';
import {Cell, Section, TableView} from 'react-native-tableview-simple';
import Colors from '../../constants/Colors';
import AsyncStorage from "@react-native-async-storage/async-storage";
import SignOut from "../user/SignOut";
import {useEffect, useState} from "react";

const HomeScreen = ({navigation}) => {
    const [token, setToken] = useState("")
    const isToken = async () => {
        setToken(await AsyncStorage.getItem("token"))
    }
    useEffect(() => {
        isToken().then()
    }, [])
    const LoginOut = () => {
        Alert.alert('提醒', '确认退出？', [
            {
                text: '取消',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {text: '确定', onPress: () => navigation.navigate('UserStack', {screen: 'SignOut'})},
        ]);
    }

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

                <Section header="长乐未央">
                    <Cell
                        title="关于「长乐未央」"
                        titleTextColor={Colors.primary}
                        onPress={() => navigation.navigate('Details',)}
                        titleTextStyle={{textAlign: 'center'}}
                    />
                </Section>
                {token ? <Section header="退出登录" footer="All rights reserved.">
                    <Cell
                        title="退出登录"
                        titleTextColor={Colors.maintainer}
                        onPress={() => LoginOut()}
                        titleTextStyle={{textAlign: 'center'}}
                    />
                </Section> : ""}

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