import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import InformationStackScreen from '././stacks/InformationStackScreen';
import TeacherHomeScreen from '../screens/teacher/HomeScreen';
import SearchStackScreen from './stacks/SearchStackScreen';
import SettingStackScreen from './stacks/SettingStackScreen';
import ChapterStackScreen from './stacks/ChapterStackScreen';
import TabScreen from './TabScreen';
import ModalOption from './options/ModalOption';
import React from "react";
import {StatusBar} from "react-native";
import Colors from "../constants/Colors";

const RootStack = createNativeStackNavigator();

/**
 * 根stack
 * @returns {JSX.Element}
 * @constructor
 */
const RootStackScreen = ({navigation}) => {
    return (
        <>
            <NavigationContainer>
                <RootStack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}>
                    <RootStack.Group>
                        <RootStack.Screen name="Tab" component={TabScreen}/>
                        <RootStack.Screen name="SearchStack" component={SearchStackScreen}/>
                        <RootStack.Screen name="SettingStack" component={SettingStackScreen}/>
                        <RootStack.Screen name="ChapterStack" component={ChapterStackScreen}/>
                    </RootStack.Group>

                    <RootStack.Group>
                        <RootStack.Screen
                            name="InformationStack"
                            component={InformationStackScreen}
                            options={{
                                presentation: 'fullScreenModal',
                            }}
                        />
                        <RootStack.Screen
                            name="Teacher"
                            component={TeacherHomeScreen}
                            options={({navigation, route}) => ({
                                presentation: 'modal',
                                title: route.params.title,
                                ...ModalOption(navigation),
                            })}
                        />
                    </RootStack.Group>
                </RootStack.Navigator>
            </NavigationContainer>
        </>
    );
}

export default RootStackScreen;