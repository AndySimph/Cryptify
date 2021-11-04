import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Linking } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function RecommendedScreen({ navigation }: RootTabScreenProps<'Recommended'>) {
    //to change the links, change link inside variables and add descriptions inside discription variables
    var link1:string = "http://google.com";
    var link2:string = "http://youtube.com";
    var link3:string = "http://google.com";
    var link4:string = "http://google.com";
    var link5:string = "http://google.com";
    var title1:string = "Goggle";
    var title2:string = "Youtube";
    var title3:string = "Goggle";
    var title4:string = "Goggle";
    var title5:string = "Goggle";
    var desc1:string = "\t\tdescription of website 1";
    var desc2:string = "\t\tdescription of website 2";
    var desc3:string = "\t\tdescription of website 3";
    var desc4:string = "\t\tdescription of website 4";
    var desc5:string = "\t\tdescription of website 5";
    return (
        <View style={styles.container}>
            <Text style={styles.link}
                onPress={() => Linking.openURL(link1)}>
                {title1}
            </Text>
            <Text style={styles.description}>{desc1}</Text>
            <Text style={styles.description}>   </Text>
            <Text style={styles.link}
                onPress={() => Linking.openURL(link2)}>
                {title2}
            </Text>
            <Text style={styles.description}>{desc2}</Text>
            <Text style={styles.description}>   </Text>
            <Text style={styles.link}
                onPress={() => Linking.openURL(link3)}>
                {title3}
            </Text>
            <Text style={styles.description}>{desc3}</Text>
            <Text style={styles.description}>   </Text>
            <Text style={styles.link}
                onPress={() => Linking.openURL(link4)}>
                {title4}
            </Text>
            <Text style={styles.description}>{desc4}</Text>
            <Text style={styles.description}>   </Text>
            <Text style={styles.link}
                onPress={() => Linking.openURL(link5)}>
                {title5}
            </Text>
            <Text style={styles.description}>{desc5}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    link: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'blue',
    },
    description: {
        fontSize: 15,
    },
});
