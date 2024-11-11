import React from "react";

export const applyCustomCode = (externalCodeSetup: any) => {
	// call custom code api here
	externalCodeSetup.indexJsApi.addIndexJsFunction(() => {
		console.log("function from external set upo");
	});
	
	externalCodeSetup.cssApi.addGlobalStyle("container", {
		backgroundColor: "red"
	});
};