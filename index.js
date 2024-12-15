import MessageSingleScreen from "./custom/prod/MessageSingleScreen"; // jeff update #1
import ThreadItemHeader from "./custom/prod/ThreadItemHeader"; // jeff update #2
import TopicTitle from "./custom/prod/TopicTitle"; // jeff update #3
import BlogHeaderAvatar from "./custom/prod/BlogHeaderAvatar"; // jeff update #4

// Custom views
import CustomView from "./custom/dev/views/CustomView";
import CustomCamera from "./custom/dev/views/CustomCamera";

// Extra Modal
import Modal from "react-native-modal";

import React, { useState } from "react";
import { Text, View, findNodeHandle, NativeModules } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
// to get the current loggedinUser
import { useSelector } from "react-redux";

export const applyCustomCode = (externalCodeSetup: any) => {
    const {
        messagesScreenApi,
        messagesSingleScreenApi,
        activitiesScreenApi,
        topicSingleApi,
        indexJsApi,
        navigationApi,
    } = externalCodeSetup;

    navigationApi.addNavigationRoute(
        "persistentview",
        "persistentview",
        CustomView,
        "All" // "Auth" | "noAuth" | "Main" | "All"
    );

	navigationApi.addNavigationRoute(
        "customcamera",
        "customcamera",
        CustomCamera,
        "All" // "Auth" | "noAuth" | "Main" | "All"
    );

    // ############################################################## //
    // Add previous custom code on buddy boss app
    messagesScreenApi.setMessageSingleComponent((props) => (
        <MessageSingleScreen {...props} />
    ));

    messagesSingleScreenApi.setThreadItemHeader((props) => (
        <ThreadItemHeader {...props} />
    ));

    externalCodeSetup.blogSingleApi.setBlogHeaderAvatar(BlogHeaderAvatar);
    topicSingleApi.setTopicTitleComponent(TopicTitle);
    activitiesScreenApi.setActivityToViewModelFilter(
        (viewModel, activity, depend) => {
            const hrefRegex = /href="([^"]+)"/;
            const match = viewModel.content.match(hrefRegex);
            // Extracted href value
            const hrefValue = match ? match[1] : null;
            return {
                ...viewModel,
                link: hrefValue,
            };
        }
    );
    //
    // ############################################################## //



    messagesSingleScreenApi.setActionsFilter((buttonConfig) => {
        //

        //

        const [isModalVisible, setModalVisible] = useState(false);

        const toggleModal = () => {
            setModalVisible(!isModalVisible);
        };

        // Get state of auth to get the token
        const allState = useSelector((state) => state);
        const auth = useSelector((state) => state.auth);

        const user = useSelector((state) => state.user);
        const thread = useSelector((state) => state.thread);

        const navigation = useNavigation();
        const route = useRoute();
        const newButton = {
            flow: [
                {
                    check: () => true, //Return `true` to show the button
                    buttons: [
                        // Open Custom Webview
                        {
                            icon: { fontIconName: "video", weight: "400" },
                            label: "Custom Webview",
                            isNavigation: true, //If set to true, the button will not be set to a "loading" state
                            useDispatch: false, //If this is not set, `doFunction` will be wrapped in a `dispatch` function which is used to call a redux function
                            doFunction: (data) => {
                                var test = "";
                                var user_id = data.currentUserId;
                                var user_link =
                                    data.recipients[user_id].user_link;
                                var convo_id = data.id;
                                var new_url =
                                    "https://property.inc?bbapp-call-jwt=video";
                                var convo_url = "&cID=" + convo_id;
                                var uid_url = "&uID=" + user_id;

                                // var name_url = "&name=" + user_link;

                                var rtoken_url = "&rtoken=" + auth.refreshToken;
                                var full_url =
                                    new_url + convo_url + uid_url + rtoken_url;

                                console.log(full_url);

                                // navigation.navigate("customwebview", {
                                //   url: full_url,
                                // });
                            },
                        },
                        {
                            icon: { fontIconName: "video", weight: "400" },
                            label: "Persistent Webview",
                            isNavigation: true, //If set to true, the button will not be set to a "loading" state
                            useDispatch: false, //If this is not set, `doFunction` will be wrapped in a `dispatch` function which is used to call a redux function
                            doFunction: (data) => {
                                navigation.navigate("persistentview");
                            },
                        },
						{
                            icon: { fontIconName: "video", weight: "400" },
                            label: "customcamera",
                            isNavigation: true, //If set to true, the button will not be set to a "loading" state
                            useDispatch: false, //If this is not set, `doFunction` will be wrapped in a `dispatch` function which is used to call a redux function
                            doFunction: (data) => {
                                navigation.navigate("customcamera");
                            },
                        },
                    ],
                },
            ],
        };
        /// remove archive  message button
        buttonConfig.splice(1, 1);
        return [...buttonConfig, newButton];
    });

    // call custom code api here
    // indexJsApi.addIndexJsFunction(async () => {
    //     console.log("function from external set upo");
    //     const keys = await AsyncStorage.getAllKeys();
    //     console.log(JSON.stringify(keys));
    // });

    // externalCodeSetup.cssApi.addGlobalStyle("container", {
    // 	backgroundColor: "red"
    // });

    // externalCodeSetup.navigationApi.replaceScreenComponent("messages", () => (
    // 	<View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
    // 		<Text>Hello from custom Single Message Screen</Text>
    // 	</View>
    // ));

    // messagesSingleScreenApi.setActionsFilter((buttonConfig) => {
    //     // Get state of auth to get the token
    //     const auth = useSelector((state) => state.auth);
    //     const navigation = useNavigation();
    //     const route = useRoute();
    //     const stack = [];

    //     const newButton = {
    //         flow: [
    //             {
    //                 check: () => true, //Return `true` to show the button
    //                 buttons: [
    //                     {
    //                         icon: { fontIconName: "video", weight: "400" },
    //                         label: "TEST",
    //                         isNavigation: true, //If set to true, the button will not be set to a "loading" state
    //                         useDispatch: false, //If this is not set, `doFunction` will be wrapped in a `dispatch` function which is used to call a redux function
    //                         doFunction: (data) => {
    // 							// const route = useRoute();
    // 							console.log(JSON.stringify(route));

    // 							// console.log(JSON.stringify(buttonConfig));
    //                             // console.log("TESTING FIND NODE HANDLE");
    //                             // const state = navigation.getState();
    //                             // console.log(state);

    //                             // navigation.setOptions({
    //                             //     headerRight: () => (
    //                             //         <Button
    //                             //             onPress={() =>
    //                             //                 alert("Button Pressed!")
    //                             //             }
    //                             //             title="Click Me"
    //                             //             color="#000"
    //                             //         />
    //                             //     ),
    //                             // });

    //                             //   // Get the handle for the current node
    //                             // const handle = findNodeHandle(this); // Adjust `this` to point to the correct ref or component
    //                             // if (!handle) {
    //                             // 	console.warn('Node handle could not be found.');
    //                             // 	// return stack;
    //                             // }

    //                             // const nativeModule = NativeModules.UIManager; // Corrected reference
    //                             // if (!nativeModule || typeof nativeModule.get_all_views !== 'function') {
    //                             // 	console.error('NativeModule or get_all_views function is unavailable.');
    //                             // 	// return stack;
    //                             // }

    //                             // var test = "";
    //                             // var user_id = data.currentUserId;
    //                             // var user_link =
    //                             //     data.recipients[user_id].user_link;
    //                             // var convo_id = data.id;
    //                             // var new_url =
    //                             //     "https://property.inc?bbapp-call-jwt=audio";
    //                             // var convo_url = "&convo-id=" + convo_id;
    //                             // var uid_url = "&user-id=" + user_id;
    //                             // var name_url = "&name=" + user_link;
    //                             // var rtoken_url = "&rtoken=" + auth.token;
    //                             // var full_url =
    //                             //     new_url +
    //                             //     convo_url +
    //                             //     uid_url +
    //                             //     name_url +
    //                             //     rtoken_url;
    //                             // console.log("URL : ", "TEST");
    //                         },
    //                     },
    //                 ],
    //             },
    //         ],
    //     };
    //     /// remove archive  message button
    //     buttonConfig.splice(1, 1);
    //     return [...buttonConfig, newButton];
    // });
};
