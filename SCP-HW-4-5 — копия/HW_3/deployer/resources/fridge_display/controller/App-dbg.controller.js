sap.ui.define([
    "fridge_display/controller/BaseController",
    'sap/m/MessageBox',
    'sap/m/MessageToast',
    "sap/ui/core/Fragment"
], function (BaseController, MessageBox, MessageToast, Fragment) {
    "use strict";
    this.editOn = function (items, index) {
            items[index].getCells()[5].setEnabled(false);
            items[index].getCells()[6].setEnabled(true);
        },
        this.editOff = function (items, index) {
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
            for (var j = 0; j < 3; j++) {
                aItems[index].getCells()[j].setEditable(aItems[index].getSelected());
                console.log(aItems[index].getSelected());
            }
            editOn(aItems, index);

        },
        showCreateDialog: function () {
            var oView = this.getView();
            if (!this.byId("createDialog")) {
                Fragment.load({
                    id: oView.getId(),
                    name: "fridge_display.view.Create",
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    oDialog.open();
                });
            } else {
                this.byId("createDialog").open();
            }
        },
        closeDialog: function () {
            this.getView().byId("createDialog").close();
        },
        createFridge: function () {
            var Name = this.byId("newBrandNameInput").getValue();
            var Cap = this.byId("newCapInput").getValue();
            if (!Name || !Cap) {
                var dialog = new sap.m.Dialog({
                    title: 'Error',
                    type: 'Message',
                    state: 'Error',
                    content: new sap.m.Text({
                        text: 'Enter all necessarry field'
                    }),
                    beginButton: new sap.m.Button({
                        text: 'OK',
                        press: function () {
                            dialog.close();
                        }
                    }),
                    afterClose: function() {
                        dialog.destroy();
                    }
                });
    
                dialog.open();
            } else {
                var oTable = this.getView().byId('details');
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
                    oTable.getModel("fridges").refresh(true);
                });
                this.byId("createDialog").close();
            }
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
                selItem.getBindingContext("fridges").getModel().refresh(true);
            });
            editOff(aItems, index);
            var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
            MessageBox.success(
                "Fridge number " + frid + " has been changed!", {
                    styleClass: bCompact ? "sapUiSizeCompact" : ""
                }
            );
        },
        selectFridge: function () {
            var oTable = this.getView().byId('details');
            var aItems = oTable.getItems();
            var index = oTable.indexOfItem(oTable.getSelectedItem());
            if (!aItems[index].getCells()[6].getEnabled()) {
                for (var i = 0; i < aItems.length; i++) {
                    aItems[i].getCells()[5].setEnabled(aItems[i].getSelected());
                    aItems[i].getCells()[7].setEnabled(aItems[i].getSelected());
                }
            }
        },
        deleteFridge: function () {
            var oTable = this.getView().byId('details');
            var selItem = oTable.getSelectedItem();
            var frid = selItem.getBindingContext("fridges").getObject().frid;
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://p2001081083trial-trial-dev-router.cfapps.eu10.hana.ondemand.com/api/xsjs/fridge/fridge.xsjs?frid=" + frid,
                "method": "DELETE",
                "headers": {
                    "content-type": "application/json"
                },
                "processData": false
            };
            $.ajax(settings).done(function (response) {
                console.log(response);
                selItem.getBindingContext("fridges").getModel().refresh(true);
            });
        }
    });
});