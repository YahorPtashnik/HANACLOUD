sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/core/routing/History",
  "sap/ui/core/UIComponent"
], function (Controller, History, UIComponent) {
  "use strict";

  return Controller.extend("fridge_display.controller.BaseController", {
    createUnvalidDataExceptionDialog: function () {
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
    createSuccessOnUpdateDialog: function () {
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
    createSuccessOnCreateDialog: function () {
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
    checkFridgeUpdateObject: function (model, c) {
      console.log(model);
      
      if (!model.bname || !model.cap || model.bname.length > 100 || model.cap.length > 6) {
        c.createUnvalidDataExceptionDialog();
      } else {
        return true;
      }
    },
    ///ROW PROCESSING METHODS
    getTableRowIndex: function (oEvent, table, modelName, idPropName) {
      let frid = oEvent.getSource().getBindingContext(modelName).getProperty(idPropName);
      let tItems = table.getItems();
      for (let i = 0; i < tItems.length; i++) {
        if (frid === tItems[i].getCells()[0].getValue()) {
          return i;
        }
      }
    },
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
    createFridge: function (bModel, mModel) {
      let oModel = bModel.getData();
      delete oModel.ts_create;
      delete oModel.ts_update;
      //creating json model
      if (this.checkFridgeUpdateObject(oModel)) {
        this.sendPOST(mModel, oModel);
        return true;
      }
    },
    updateFridge: function (items, index, config, bModel, mModel) {
      let oModel = bModel.getData();
      let indexRow = items[index].getCells();
      //creating json model
      oModel.frid = indexRow[config.fridgeIdInputPosition].getValue();
      oModel.bname = indexRow[config.brandNameInputPosition].getValue();
      oModel.cap = indexRow[config.capacityInputPosition].getValue();
      oModel.ts_create = null;
      oModel.ts_update = null;
      if (this.checkFridgeUpdateObject(oModel)) {
        this.sendPUT(mModel, oModel);
        return true;
      }
    }
  });
});