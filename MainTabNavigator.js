import React from 'react';
import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator, createDrawerNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import * as Screens from '../screens/index';
import { DrawerNav } from '../components';
import IconIcon from '../components/IonIcon';

const LoginStack = createStackNavigator({
    SignInScreen: Screens.SignInScreen,
}, {
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
}
);
/////////////////////////////////////////////
///////////// HOME STACK ///////////////////

//////////////////FOLLOW TABS///////////////////
const FollowTabs = createMaterialTopTabNavigator(
    {
        "My Followings": { screen: props => <Screens.TabFollowing {...props} /> },
        "My Followers": { screen: props => <Screens.TabFollower {...props} /> }
    },
    {
        initialRouteName: "My Followings",
        //tabBarComponent : MyFollowScreen,
        tabBarOptions: {
            activeTintColor: "black",
            inactiveTintColor: "gray",
            upperCaseLabel: false,
            labelStyle: {
                fontSize: 13,
                fontWeight: 'bold',
            },
            indicatorStyle: {
                backgroundColor: '#5DADE2' // underline color
            },
            style: {
                backgroundColor: 'white',
            }
        },
        tabBarIcon: {
            focussed: true
        }
    }
)
/////////////////////

const HomeStack = createStackNavigator({
    HomeScreen: Screens.HomeScreen,
    MyScoreScreen: { screen: Screens.MyScoreScreen, navigationOptions: { header: null } },
}
);

HomeStack.navigationOptions = ({ navigation }) => {
    console.log("navigation: ", navigation);

    let tabBarVisible = true;

    console.log("log log log ====  ", navigation.state.routes[navigation.state.index]);

    if (navigation.state.routes[navigation.state.index].routeName === "ViewProfileScreen") {
        tabBarVisible = false;
    }
    return {
        tabBarVisible,
        tabBarLabel: 'Home',
        tabBarOptions: {
            activeTintColor: '#a8a8a8',
            inactiveTintColor: '#a8a8a8',
        },
        tabBarIcon: ({ focused }) => (
            <TabBarIcon
                focused={focused}
                name="home"
            />
        ),
    };
};
/////////////////////////////////////////////
///////////// CHAT STACK ///////////////////
const ChatStack = createStackNavigator({
    ChatListScreen: { screen: Screens.ChatListScreen, navigationOptions: { header: null } },
    ChatScreen: { screen: Screens.ChatScreen, navigationOptions: { header: null } },
});


ChatStack.navigationOptions = ({ navigation }) => {
    // for fullscreen
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }
    return {
        tabBarVisible,
        tabBarLabel: 'Chat',
        tabBarOptions: {
            activeTintColor: '#a8a8a8',
            inactiveTintColor: '#a8a8a8',
        },
        tabBarIcon: ({ focused }) => (
            <TabBarIcon
                focused={focused}
                name="chatbubbles"
            />
        )
    };
};

/////////////////////////////////////////////
///////////// NOTIFICATION STACK ///////////
const NotificationStack = createStackNavigator({
    Notification: { screen: Screens.NotificationScreen, navigationOptions: { header: null } }
});

NotificationStack.navigationOptions = {
    tabBarLabel: 'Notification',
    tabBarOptions: {
        activeTintColor: '#a8a8a8',
        inactiveTintColor: '#a8a8a8',
    },
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name="notifications"
        />
    ),
};

/////////////////////////////////////////////
///////////// PROFILE STACK ////////////////
const ProfileStack = createStackNavigator({
    Profile: { screen: Screens.MyProfileScreen, navigationOptions: { header: null } },
});

ProfileStack.navigationOptions = {
    tabBarLabel: 'Profile',
    tabBarOptions: {
        activeTintColor: '#a8a8a8',
        inactiveTintColor: '#a8a8a8',
    },
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name="contact"
        />
    ),
};
/////////////////////////////////////////////////


const DashboardTabNavigator = createBottomTabNavigator(
    {
        HomeStack,
        ChatStack,
        NotificationStack,
        ProfileStack
    },
    {
        navigationOptions: ({ navigation }) => {
            const { routeName } = navigation.state.routes[navigation.state.index];
            return {
                headerTitle: routeName
            };
        }
    }
);

const DashboardStackNavigator = createStackNavigator(
    {
        DashboardTabNavigator: DashboardTabNavigator
    }, {
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false
    }
},
    {
        defaultNavigationOptions: ({ navigation }) => {
            return {
                headerLeft: (
                    <IconIcon
                        style={{ paddingLeft: 10 }}
                        onPress={() => navigation.openDrawer()}
                        name="menu"
                        size={30}
                    />
                )
            };
        }
    }
);

const AppDrawerNavigator = createDrawerNavigator({
    Dashboard: {
        screen: DashboardStackNavigator
    }
}, {
    contentComponent: DrawerNav,
    drawerType: "slide",
    drawerWidth: 280,
});

export default createSwitchNavigator({
    LoginStack: { screen: LoginStack },
    Dashboard: { screen: AppDrawerNavigator }
});
