sap.ui.define([
    "fridge_display/controller/BaseController"
], function (BaseController) {
    "use strict";
    return BaseController.extend("fridge_display.controller.App", {
        onInit: function() {
            this.getView().byId("idIconTabBarFiori2").setVisible(false);
            this.getView().byId("updateSomePanel").setVisible(false);
            this.getView().byId("createSomePanel").setVisible(false);
        },
        listFactory: function (sId) {
            var oUIControl;
            oUIControl = this.byId("item").clone(sId);
            console.log(sId);
            return oUIControl;
        },
        goToDetails: function (oEvent) {
            var oTable = this.getView().byId("details");
            var fridge = oTable.getSelectedItem().getBindingContext("fridges").getObject();
            this.getView().byId("fridInput_U").setValue(fridge.frid);
            this.getView().byId("brandNameInput_U").setValue(fridge.bname);
            this.getView().byId("capNameInput_U").setValue(fridge.cap);
            this.getView().byId("idIconTabBarFiori2").setVisible(true);
            this.getView().byId("createSomePanel").setVisible(false);
            this.getView().byId("updateSomePanel").setVisible(true);
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
            $.ajax(settings).done(function (response) {
                console.log(response);
            });
        },
        updateFridge: function () {
            var oTable = this.getView().byId("details");
            var oSelectedItem = oTable.getSelectedItem();
            var index = oTable.indexOfItem(oSelectedItem);
            console.log(index);
            var bname = this.getView().byId("brandNameInput_U").getValue();
            var cap = this.getView().byId("capNameInput_U").getValue();
            if (!index) {
                sap.m.MessageToast.show("Fridge is not selected!");
            } else if (!bname || !cap) {
                sap.m.MessageToast.show("Insert all required fields with data!");
            } else {
                var frid = oSelectedItem.getBindingContext("fridges").getObject().frid;
                var settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": "https://p2001081083trial-trial-dev-router.cfapps.eu10.hana.ondemand.com/api/xsodata/HW_3.xsodata/Fridges('" + frid + "')",
                    "method": "PUT",
                    "headers": {
                        "content-type": "application/json"
                    },
                    "processData": false,
                    "data": "{\"bname\": \"" + bname + "\", \"cap\": \"" + cap + "\", \"ts_update\":null, \"ts_create\":null}"
                };
                console.log(bname);
                console.log(cap);
                console.log(settings.url);
                $.ajax(settings).done(function (response) {
                    console.log(response);
                });
                window.location.reload();
            }
        }
    });
});