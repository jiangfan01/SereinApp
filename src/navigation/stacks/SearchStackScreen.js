import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../../screens/search/HomeScreen';
import ResultsScreen from '../../screens/search/ResultsScreen';
import CardOption from '../options/CardOption';
import ModalOption from "../options/ModalOption";

const SearchStack = createNativeStackNavigator();

const SearchStackScreen = () => {
    return (
        <SearchStack.Navigator
            screenOptions={({route, navigation}) => ({
                ...CardOption(route, navigation),
            })}>
            <SearchStack.Screen options={({navigation,route}) => ({
                title:"搜索",
                ...ModalOption(navigation),
            })} name="Home" component={HomeScreen}/>
            <SearchStack.Screen name="Results" component={ResultsScreen} options={({navigation,route}) => ({
                title:"搜索结果",
                ...ModalOption(navigation),
            })}/>
        </SearchStack.Navigator>
    );
};

export default SearchStackScreen;