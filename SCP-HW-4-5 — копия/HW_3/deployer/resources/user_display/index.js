sap.ui.require([
	"sap/ui/core/ComponentContainer"
], function (ComponentContainer) {
	"use strict";

	new ComponentContainer({
		name: "user_display",
		settings : {
			id : "wt"
		}
	}).placeAt("content");
});