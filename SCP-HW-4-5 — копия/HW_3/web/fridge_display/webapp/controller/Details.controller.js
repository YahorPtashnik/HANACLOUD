sap.ui.define([
	"fridge_display/controller/BaseController",
	"sap/m/MessageBox"
], function (AppController, MessageBox) {
	"use strict";
	return AppController.extend("fridge_display.controller.Details", {
		onInit: function(){
		var fridge = this.getOwnerComponent().getModel("fridges");
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		oRouter.getRoute("details").attachPatternMatched(this._onObjectMatched, this);
		console.log(oRouter);
		},
		_onObjectMatched: function (oEvent) {
			this.getView().bindElement({
				path: decodeURIComponent(oEvent.getParameter("arguments").id),
				model: "fridges"
            }
		);
		}
	});
});