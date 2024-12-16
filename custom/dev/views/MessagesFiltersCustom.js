//In custom_code/MessagesFiltersCustom.js ...
import React, { useState } from "react";
import { TextInput, View, Button, Text, Switch } from 'react-native'
import { useDispatch } from "react-redux";
import { messagesRequested } from "@src/actions/messages";
import { getExternalCodeSetup } from "@src/externalCode/externalRepo";
import withGlobalStyles from "@src/components/hocs/withGlobalStyles";

const hook = getExternalCodeSetup().messagesScreenApi;
const screenName = "messages";

getExternalCodeSetup().indexScreenApiHooks.setHeaderHeight((defaultHeaderHeight, filterType, navigation) => {
    return 250
});

const filter = "all";
const subfilters = ""

const refresh = true; //Set to true to refresh list
const searchTerm = ""


const MessagesFiltersCustom = (props) => {

   const { navigation, route, colors } = props;

   const dispatch = useDispatch();

   //If showing the matched screen, show custom filter before displaying list component
   if (route?.params?.item?.object === screenName) {

       const [isEnabled, setIsEnabled] = useState(false);

       const toggleSwitch = () => setIsEnabled(previousState => !previousState)

       const handleSubmit = () => {

           //Set custom parameters before fetching
           hook.setFetchParamsFilter((props) => {

               //You can add more parameters such as "subject", "keyword" etc...
               return {
                   ...props,
                   type: isEnabled ? "all" : "unread"
               }
           })

           //Dispatch redux action to call api using customized filters
           dispatch(messagesRequested(filter, subfilters, refresh, searchTerm));

       }

       return <View style={{ backgroundColor: colors.whiteColor, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>

           <Text style={{ color: colors.blackColor }}>Show All Messages</Text>
           <Switch
               trackColor={{ false: "#767577", true: "#81b0ff" }}
               thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
               ios_backgroundColor="#3e3e3e"
               onValueChange={toggleSwitch}
               value={isEnabled}
           />
           <Button
               onPress={() => handleSubmit()}
               title="Filter"
           />
       </View>
   }

   return null;

}

export default withGlobalStyles(MessagesFiltersCustom);