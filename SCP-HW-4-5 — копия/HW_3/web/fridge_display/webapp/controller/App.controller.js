sap.ui.define([
    "fridge_display/controller/BaseController",
    'sap/m/MessageToast',
    "sap/ui/core/Fragment"
], function (BaseController, MessageToast, Fragment) {
    "use strict";
    this.createUnvalidDataExceptionDialog = function () {
            let dialog = new sap.m.Dialog({
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
        this.createSuccessOnUpdateDialog = function () {
            let dialog = new sap.m.Dialog({
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
        this.createSuccessOnCreateDialog = function () {
            let dialog = new sap.m.Dialog({
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
        this.checkModelObject = function (model) {
            console.log(model);

            if (!model.bname || !model.cap || model.bname.length > 100 || model.cap.length > 6) {
                createUnvalidDataExceptionDialog();
            } else {
                return true;
            }
        },
        ///ROW PROCESSING METHODS
        this.getTableRowIndex = function (oEvent, table, modelName, idPropName) {
            let frid = oEvent.getSource().getBindingContext(modelName).getProperty(idPropName);
            let tItems = table.getItems();
            for (let i = 0; i < tItems.length; i++) {
                if (frid === tItems[i].getCells()[0].getValue()) {
                    return i;
                }
            }
        },
        this.editMode = function (items, index, config) {
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
        this.sendPUT = function (model, obj) {
            model.update("/Fridges('" + obj.frid + "')", obj, {
                merge: false,
                success: function () {
                    createSuccessOnUpdateDialog();
                },
                error: function () {
                    jQuery.sap.log.error("Error at PUT request");
                }
            })
        },
        this.sendPOST = function (model, obj) {
            model.create("/Fridges", obj, {
                merge: false,
                success: function () {
                    createSuccessOnCreateDialog();
                },
                error: function () {
                    jQuery.sap.log.error("Error at POST request");
                }
            })
        },
        this.sendDEL = function (model, mId, config) {
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": config.mainTableModelDeleteRequestURL + mId,
                "method": "DELETE",
                "headers": {
                    "content-type": "application/json"
                },
                "processData": false
            };
            $.ajax(settings).done(function () {
                model.refresh(true);
            });
        }
    this.createFridge = function (bModel, mModel) {
            let oModel = bModel.getData();
            delete oModel.ts_create;
            delete oModel.ts_update;
            //creating json model
            if (checkModelObject(oModel)) {
                sendPOST(mModel, oModel);
                return true;
            }
        },
        this.updateFridge = function (items, index, config, bModel, mModel) {
            let oModel = bModel.getData();
            let indexRow = items[index].getCells();
            //creating json model
            oModel.frid = indexRow[config.fridgeIdInputPosition].getValue();
            oModel.bname = indexRow[config.brandNameInputPosition].getValue();
            oModel.cap = indexRow[config.capacityInputPosition].getValue();
            oModel.ts_create = null;
            oModel.ts_update = null;
            if (checkModelObject(oModel)) {
                sendPUT(mModel, oModel);
                return true;
            }
        }
    this.deleteFridge = function (items, index, config, mModel) {
        let frid = items[index].getCells()[config.fridgeIdInputPosition].getValue();
        sendDEL(mModel, frid, config);
    }
    return BaseController.extend("fridge_display.controller.App", {
        onInit: function () {
            this.oView = this.getView();
            this.mConfig = this.oView.getModel("config").getData();
            this.mFridge = this.oView.getModel("fridgeModel");
            this.fridges = this.oView.getModel(this.mConfig.mainTableModelName);
            this.mainTable = this.oView.byId(this.mConfig.mainTableId);
        },
        ///FRAGMENTS
        showCreateDialog: function () {
            let view = this.oView;
            if (!view.byId("createDialog")) {
                Fragment.load({
                    id: view.getId(),
                    name: "fridge_display.view.Create",
                    controller: this
                }).then(function (oDialog) {
                    view.addDependent(oDialog);
                    oDialog.open();
                });
            } else {
                view.byId("createDialog").open();
            }
        },
        closeDialog: function () {
            this.oView.byId("createDialog").close();
        },

        /// CRUD BUTTONS
        createButton: function () {
            createFridge(this.mFridge, this.fridges);
        },
        editButton: function (oEvent) {
            let index = this.getTableRowIndex(oEvent, this.mainTable, this.mConfig.mainTableModelName, this.mConfig.idPropName);
            editMode(this.mainTable.getItems(), index, this.mConfig);
        },

        saveButton: function (oEvent) {
            let index = getTableRowIndex(oEvent, this.mainTable, this.mConfig.mainTableModelName, this.mConfig.idPropName);
            if (updateFridge(this.mainTable.getItems(), index, this.mConfig, this.mFridge, this.fridges)) {
                editMode(this.mainTable.getItems(), index, this.mConfig);
            }
        },

        deleteButton: function (oEvent) {
            let index = getTableRowIndex(oEvent, this.mainTable, this.mConfig.mainTableModelName, this.mConfig.idPropName);
            deleteFridge(this.mainTable.getItems(), index, this.mConfig, this.fridges)
        }
    });
});