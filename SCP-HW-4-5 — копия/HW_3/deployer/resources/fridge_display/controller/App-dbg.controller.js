sap.ui.define([
    "fridge_display/controller/BaseController"
], function (BaseController) {
    "use strict";
    return BaseController.extend("fridge_display.controller.App", {
        listFactory: function (sId) {
            var oUIControl;

            oUIControl = this.byId("item").clone(sId);
            console.log(sId);
            return oUIControl;
        },
        goToDetails: function (oEvent) {
            var oSelectedItem = oEvent.getSource();
            var context = encodeURIComponent(oSelectedItem.getBindingContext('Fridges').getPath());
            console.log(context);
            this.getRouter().navTo("details", {
                id: context
            });
        },
        createFridge: function () {
            var Name = this.getView().byId("brandNameInput").getValue();
            var Cap = this.getView().byId("capNameInput").getValue();
            console.log(Name);
            console.log(Cap);
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://p2001081083trial-trial-dev-router.cfapps.eu10.hana.ondemand.com/api/xsodata/HW_3.xsodata/Fridges",
                "method": "POST",
                "headers": {
                    "content-type": "application/json"
                },
                "processData": false,
                "data": "{\"bname\": \"" + Name + "\", \"cap\": \"" + Cap + "\"}"
            };
        }
    });
});