sap.ui.define([
    "fridge_display/controller/BaseController",
    'sap/m/MessageBox',
    'sap/m/MessageToast',
    "sap/ui/core/Fragment"
], function (BaseController, MessageBox, MessageToast, Fragment) {
    "use strict";
    this.editOn = function (eItems, eIndex) {
        eItems[eIndex].getCells()[5].setEnabled(false);
        eItems[eIndex].getCells()[6].setEnabled(true);
    };

    this.editOff = function (wItems, wIndex) {
        for (let j = 0; j < 5; j++) {
            wItems[wIndex].getCells()[j].setEditable(false);
        }
        wItems[wIndex].getCells()[5].setEnabled(true);
        wItems[wIndex].getCells()[6].setEnabled(false);
    };

    this.disableRowFields = function (aItems) {
        for (let i = 0; i < aItems.length; i++) {
            for (let j = 5; j < 8; j++) {
                aItems[i].getCells()[j].setEnabled(false);
                aItems[i].getCells()[1].setEditable(false);
                aItems[i].getCells()[2].setEditable(false);
            }
        }
    };

    this.getTableSelectedComponent = function (table) {
        let oResult = {
            selItem: table.getSelectedItem(),
            aItems: table.getItems(),
            index: table.indexOfItem(table.getSelectedItem())
        };
        return oResult;
    }

    return BaseController.extend("fridge_display.controller.App", {
        onInit: function () {

        },
        goToDetails: function () {
            let oTable = this.getView().byId('details');
            let obj = getTableSelectedComponent(oTable);
            for (let j = 1; j < 3; j++) {
                obj.aItems[obj.index].getCells()[j].setEditable(obj.aItems[obj.index].getSelected());
            }
            editOn(obj.aItems, obj.index, obj.oTable);
        },
        showCreateDialog: function () {
            let oView = this.getView();
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
            let Name = this.byId("newBrandNameInput").getValue();
            let Cap = this.byId("newCapInput").getValue();
            if (!Name || !Cap) {
                let dialog = new sap.m.Dialog({
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
                    afterClose: function () {
                        dialog.destroy();
                    }
                });
                dialog.open();
            } else {
                let oTable = this.getView().byId('details');
                let settings = {
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
                    oTable.getModel("fridges").refresh(true);
                });
                this.byId("createDialog").close();
            }
        },
        updateFridge: function () {
            let oTable = this.getView().byId('details');
            let obj = getTableSelectedComponent(oTable);
            let bname = obj.aItems[obj.index].getCells()[1].getValue();
            let cap = obj.aItems[obj.index].getCells()[2].getValue();
            let frid = obj.selItem.getBindingContext("fridges").getObject().frid;
            let settings = {
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
                obj.selItem.getBindingContext("fridges").getModel().refresh(true);
            });
            editOff(obj.aItems, obj.index, oTable);
            let bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
            MessageBox.success(
                "Fridge number " + frid + " has been changed!", {
                    styleClass: bCompact ? "sapUiSizeCompact" : ""
                }
            );
        },
        selectFridge: function () {
            let oTable = this.getView().byId('details');
            let obj = getTableSelectedComponent(oTable);
            disableRowFields(obj.aItems);
            if (!obj.aItems[obj.index].getCells()[6].getEnabled()) {
                for (let i = 0; i < obj.aItems.length; i++) {
                    obj.aItems[i].getCells()[5].setEnabled(obj.aItems[i].getSelected());
                    obj.aItems[i].getCells()[7].setEnabled(obj.aItems[i].getSelected());
                }
            }
        },
        deleteFridge: function () {
            let oTable = this.getView().byId('details');
            let obj = getTableSelectedComponent(oTable);
            let frid = obj.selItem.getBindingContext("fridges").getObject().frid;
            let settings = {
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
                obj.selItem.getBindingContext("fridges").getModel().refresh(true);
            });
        }
    });
});