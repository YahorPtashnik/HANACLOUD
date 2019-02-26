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
        editMode: function (cells, config) {
            if (cells[config.editBtnPosition].getEnabled()) {
                cells[config.editBtnPosition].setEnabled(false);
                cells[config.saveBtnPosition].setEnabled(true);
                cells[config.deleteBtnPosition].setEnabled(true);
                cells[config.brandNameInputPosition].setEditable(true);
                cells[config.capacityInputPosition].setEditable(true);
            } else {
                cells[config.editBtnPosition].setEnabled(true);
                cells[config.saveBtnPosition].setEnabled(false);
                cells[config.deleteBtnPosition].setEnabled(false);
                cells[config.brandNameInputPosition].setEditable(false);
                cells[config.capacityInputPosition].setEditable(false);
            }
        },
        ///CRUD METHODS
        sendPUT: function (model, obj) {
            var that = this;
            model.update("/Fridges('" + obj.frid + "')", obj, {
                merge: false,
                success: function () {
                    that.createSuccessOnUpdateDialog();
                },
                error: function () {
                    jQuery.sap.log.error("Error at PUT request");
                }
            })
        },
        sendPOST: function (model, obj) {
            var that = this;
            model.create("/Fridges", obj, {
                merge: false,
                success: function () {
                    that.createSuccessOnCreateDialog();
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
            if (this.checkModelObject(oModel)) {
                this.sendPOST(mModel, oModel);
                return true;
            }
        },
        updateFridge: function (cells, config, bModel, mModel) {
            var oModel = bModel.getData();
            //creating json model
            oModel.frid = cells[config.fridgeIdInputPosition].getValue();
            oModel.bname = cells[config.brandNameInputPosition].getValue();
            oModel.cap = cells[config.capacityInputPosition].getValue();
            oModel.ts_create = null;
            oModel.ts_update = null;
            if (this.checkModelObject(oModel)) {
                this.sendPUT(mModel, oModel);
                return true;
            }
        },
        deleteFridge: function (cells, config, mModel) {
            var frid = cells[config.fridgeIdInputPosition].getValue();
            this.sendDEL(mModel, frid, config);
        },
        bnameEnabled: function (sFrid) {
            console.log(sFrid);

            console.log(!!this.oMapEnabled[sFrid]);
            
            return !!this.oMapEnabled[sFrid];
        },
        getTableRowIndex: function (oEvent) {
            return oEvent.getSource().getParent();
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
            var a = oEvent.getSource().getBindingContext("fridges");
            console.log(a.getMetadata());
            var b = this.getView().getModel("fridges");
            console.log(this.getView().getModel("fridges").getMetadata());
            

            // console.log(oEvent.getSource().getBindingContext("fridges").sPath.substring(1));
            // console.log(this.getView().getModel('fridges' + a));
            // this.getView().getModel('fridges').oData[a].getProperty("edit_mode");
            // }
            // else {
                // oEvent.getSource().getBindingContext("fridges").setProperty("edit_mode", 1);
            // }
            var cells = this.getTableRowIndex(oEvent).getCells();
            this.editMode(cells, this.mConfig);            
        },
        saveButton: function (oEvent) {
            var cells = this.getTableRowIndex(oEvent).getCells();
            if (this.updateFridge(cells, this.mConfig, this.mFridge, this.fridges)) {
                this.editMode(cells, this.mConfig);
            }
        },
        deleteButton: function (oEvent) {
            var cells = this.getTableRowIndex(oEvent).getCells();
            this.editMode(cells, this.mConfig);
            this.deleteFridge(cells, this.mConfig, this.fridges)
        }
    });
});