import React from "react";

export const applyCustomCode = (externalCodeSetup: any) => {
	// call custom code api here
	externalCodeSetup.indexJsApi.addIndexJsFunction(async () => {
		console.log("function from external set upo");
	});
	
	externalCodeSetup.cssApi.addGlobalStyle("container", {
		backgroundColor: "red"
	});
	
	externalCodeSetup.navigationApi.replaceScreenComponent("messages", () => (
		<View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
			<Text>Hello from custom Single Message Screen</Text>
		</View>
	));
};