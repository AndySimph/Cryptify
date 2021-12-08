import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Linking } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

// const WEB_SCRAPING_SCRIPT = "../web_scraping.py"

// Run the web scraping python script to get new articles
// NEEDS WORK
// const {PythonShell} = require('python-shell');

// PythonShell.run(WEB_SCRAPING_SCRIPT, null, function (err) {
//   if (err) throw err;
//   console.log('finished');
// });

// Retrieve the current recommended articles
var articles = require("../articles.json");

export default function RecommendedScreen({ navigation }: RootTabScreenProps<'Recommended'>) {
    //Uses
    var link1: string = articles[0]['url'];
    var link2: string = articles[1]['url'];
    var link3: string = articles[2]['url'];
    var link4: string = articles[3]['url'];
    var link5: string = articles[4]['url'];

    var title1: string = articles[0]['title'];
    var title2: string = articles[1]['title'];
    var title3: string = articles[2]['title'];
    var title4: string = articles[3]['title'];
    var title5: string = articles[4]['title'];

    var desc1: string = articles[0]['description'];
    var desc2: string = articles[1]['description'];
    var desc3: string = articles[2]['description'];
    var desc4: string = articles[3]['description'];
    var desc5: string = articles[4]['description'];

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
        margin: 7.5,
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    link: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'blue',
    },
    description: {
        fontSize: 12,
    },
});
