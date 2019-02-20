sap.ui.define([
    "fridge_display/controller/BaseController"
], function (BaseController) {
    "use strict";
    this.editOn = function(items, index) {
        items[index].getCells()[5].setEnabled(false);
        items[index].getCells()[6].setEnabled(true);
    },
    this.editOff = function(items, index) {
        for (var j = 0; j < 5; j++) {
            items[index].getCells()[j].setEditable(false);
        }
        items[index].getCells()[5].setEnabled(true);
        items[index].getCells()[6].setEnabled(false);
    }
    return BaseController.extend("fridge_display.controller.App", {
        onInit: function () {

        },
        listFactory: function (sId) {
            var oUIControl;
            oUIControl = this.byId("item").clone(sId);
            console.log(sId);
            return oUIControl;
        },
        goToDetails: function (oEvent) {
            var oTable = this.getView().byId('details');
            var selItem = oTable.getSelectedItem();
            var aItems = oTable.getItems();
            var index = oTable.indexOfItem(selItem);
            console.log(index);
            for (var j = 0; j < 3; j++) {
                aItems[index].getCells()[j].setEditable(aItems[index].getSelected());
                console.log(aItems[index].getSelected());
            }
            editOn(aItems, index);
            
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
            var oTable = this.getView().byId('details');
            var selItem = oTable.getSelectedItem();
            var aItems = oTable.getItems();
            var index = oTable.indexOfItem(selItem);
            var bname = aItems[index].getCells()[1].getValue();
            var cap = aItems[index].getCells()[2].getValue();
            var frid = selItem.getBindingContext("fridges").getObject().frid;
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
            $.ajax(settings).done(function (response) {
                console.log(response);
            });
            editOff(aItems, index);
        }
    });
});