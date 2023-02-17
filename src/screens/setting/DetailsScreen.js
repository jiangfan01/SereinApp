import {View, Text, StyleSheet} from 'react-native';
import Colors from "../../constants/Colors";
const DetailsScreen = () => {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>
                    长乐未央
                    是什么意思？

                </Text>
                <Text style={styles.mean}>
                    “长乐”的乐 ,最早出自周公旦制’礼”作”乐”的乐, ”乐者，天地之和也”《礼记·乐记》, "乐"的本质是"和"，天代表天子,地代表诸侯. 《乐记》又说：乐也者，圣人之所乐也，而可以善民心，其感人深，其移风易俗，故先王著其教焉。周公以礼乐文明把当时居住在中原地区的虞、夏、商、周各族紧密地结合在了一起。“礼乐”是西周一种亲和力的治国方式,以“礼”来区别诸侯等级,以“乐”的亲和力来落实“礼”的等级秩序制度，礼是下对上应遵从的规范,较刚, 乐是上对下的亲和力,较柔,两者相辅相成,
                </Text>
            </View>
            <View>
                <Text style={styles.content}></Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingTop:30,
        paddingLeft:15,
        paddingRight:15
    },
    title:{
        fontSize:18,
        fontWeight:"bold",
    },
    mean:{
        paddingTop:15,
    }
});

export default DetailsScreen;