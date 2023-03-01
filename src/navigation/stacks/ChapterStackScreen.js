import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChaptersScreen from '../../screens/video/ChaptersScreen';
import CardOption from '../options/CardOption';

const ChapterStack = createNativeStackNavigator();

const ChapterStackScreen = () => {
    return (
        <ChapterStack.Navigator
            screenOptions={({route, navigation}) => ({
                ...CardOption(route, navigation),
            })}>
            <ChapterStack.Screen name="Chapters" component={ChaptersScreen} options={({route, navigation}) => ({
                headerTitleStyle: {
                    fontSize: 14,
                    color: 'black'
                }
            })}/>
        </ChapterStack.Navigator>
    );
};

export default ChapterStackScreen;