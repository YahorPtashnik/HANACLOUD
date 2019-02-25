sap.ui.define([
    "fridge_display/controller/BaseController",
    "sap/ui/core/Fragment"
], function (BaseController, Fragment) {
    "use strict";

    return BaseController.extend("fridge_display.controller.App", {
        onInit: function () {
            this.oView = this.getView();
            this.mConfig = this.oView.getModel("config").getData();
            this.mFridge = this.oView.getModel("fridgeModel");
            this.fridges = this.oView.getModel(this.mConfig.mainTableModelName);
            this.mainTable = this.oView.byId(this.mConfig.mainTableId);

            this.oMapEnabled = {};
        },
        createUnvalidDataExceptionDialog: function () {
            var dialog = new sap.m.Dialog({
                title: 'Error',
                type: 'Message',
                state: 'Error',
                content: new sap.m.Text({
                    text: "Enter valid data"
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
        },
        createSuccessOnUpdateDialog: function () {
            var dialog = new sap.m.Dialog({
                title: 'Success',
                type: 'Message',
                state: 'Success',
                content: new sap.m.Text({
                    text: "Data is successfully changed"
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
        },
        createSuccessOnCreateDialog: function () {
            var dialog = new sap.m.Dialog({
                title: 'Success',
                type: 'Message',
                state: 'Success',
                content: new sap.m.Text({
                    text: "Data is successfully added"
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
        },
        ///ERROR HANDLING & VALIDATION
        checkModelObject: function (model) {
            if (!model.bname || !model.cap || model.bname.length > 100 || model.cap.length > 6) {
                this.createUnvalidDataExceptionDialog();
            } else {
                return true;
            }
        },
        ///ROW PROCESSING METHODS
        editMode: function (items, index, config) {
            if (items[index].getCells()[config.editBtnPosition].getEnabled()) {
                items[index].getCells()[config.editBtnPosition].setEnabled(false);
                items[index].getCells()[config.saveBtnPosition].setEnabled(true);
                items[index].getCells()[config.deleteBtnPosition].setEnabled(true);
                items[index].getCells()[config.brandNameInputPosition].setEditable(true);
                items[index].getCells()[config.capacityInputPosition].setEditable(true);
            } else {
                items[index].getCells()[config.editBtnPosition].setEnabled(true);
                items[index].getCells()[config.saveBtnPosition].setEnabled(false);
                items[index].getCells()[config.deleteBtnPosition].setEnabled(false);
                items[index].getCells()[config.brandNameInputPosition].setEditable(false);
                items[index].getCells()[config.capacityInputPosition].setEditable(false);
            }
        },
        ///CRUD METHODS
        sendPUT: function (model, obj) {
            model.update("/Fridges('" + obj.frid + "')", obj, {
                merge: false,
                success: function () {
                    this.createSuccessOnUpdateDialog();
                },
                error: function () {
                    jQuery.sap.log.error("Error at PUT request");
                }
            })
        },
        sendPOST: function (model, obj) {
            model.create("/Fridges", obj, {
                merge: false,
                success: function () {
                    this.createSuccessOnCreateDialog();
                },
                error: function () {
                    jQuery.sap.log.error("Error at POST request");
                }
            })
        },
        sendDEL: function (model, mId) {
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": this.mConfig.mainTableModelDeleteRequestURL + mId,
                "method": "DELETE",
                "headers": {
                    "content-type": "application/json"
                },
                "processData": false
            };
            $.ajax(settings).done(function () {
                model.refresh(true);
            });
        },
        createFridge: function (bModel, mModel) {
            var oModel = bModel.getData();
            delete oModel.ts_create;
            delete oModel.ts_update;
            //creating json model
            if (checkModelObject(oModel)) {
                this.sendPOST(mModel, oModel);
                return true;
            }
        },
        updateFridge: function (items, index, config, bModel, mModel) {
            var oModel = bModel.getData();
            var indexRow = items[index].getCells();
            //creating json model
            oModel.frid = indexRow[config.fridgeIdInputPosition].getValue();
            oModel.bname = indexRow[config.brandNameInputPosition].getValue();
            oModel.cap = indexRow[config.capacityInputPosition].getValue();
            oModel.ts_create = null;
            oModel.ts_update = null;
            if (this.checkModelObject(oModel)) {
                this.sendPUT(mModel, oModel);
                return true;
            }
        },
        deleteFridge: function (items, index, config, mModel) {
            var frid = items[index].getCells()[config.fridgeIdInputPosition].getValue();
            this.sendDEL(mModel, frid, config);
        },
        bnameEnabled: function (sFrid) {
            console.log(sFrid);
            console.log(!!this.oMapEnabled[sFrid]);
            
            return !!this.oMapEnabled[sFrid];
        },
        getTableRowIndex: function (oEvent) {
            var sId = oEvent.getSource().getParent();
            console.log(sId);
        },
        // ///FRAGMENTS
        showCreateDialog: function () {
            var view = this.oView;
            if (!view.byId('createDialog')) {
                Fragment.load({
                    id: view.getId(),
                    name: 'fridge_display.view.Create',
                    controller: this
                }).then(function (oDialog) {
                    view.addDependent(oDialog);
                    oDialog.open();
                });
            } else {
                view.byId('createDialog').open();
            }
        },
        closeDialog: function () {
            this.oView.byId('createDialog').close();
        },
        /// CRUD BUTTONS
        createButton: function () {
            this.createFridge(this.mFridge, this.fridges);
        },
        editButton: function (oEvent) {
            var index = this.getTableRowIndex(oEvent);
            var sId = oEvent.getSource().getBindingContext("fridges").getProperty("frid");
            this.oMapEnabled[sId] = !!!this.oMapEnabled[sId];
            console.log(sId);
            console.log(this.oMapEnabled[sId]);
            // this.oMapEnabled[sId] = false;
            // this.editMode(this.mainTable.getItems(), index, this.mConfig);
        },
        saveButton: function (oEvent) {
            var index = this.getTableRowIndex(oEvent, this.mainTable, this.mConfig.mainTableModelName, this.mConfig.idPropName);
            if (this.updateFridge(this.mainTable.getItems(), index, this.mConfig, this.mFridge, this.fridges)) {
                this.editMode(this.mainTable.getItems(), index, this.mConfig);
            }
        },
        deleteButton: function (oEvent) {
            var index = this.getTableRowIndex(oEvent, this.mainTable, this.mConfig.mainTableModelName, this.mConfig.idPropName);
            this.editMode(this.mainTable.getItems(), index, this.mConfig);
            this.deleteFridge(this.mainTable.getItems(), index, this.mConfig, this.fridges)
        }
    });
});