sap.ui.define([
    "sap/ui/demo/wt/controller/BaseController"
], function (BaseController) {
    "use strict";
    return BaseController.extend("sap.ui.demo.wt.controller.App", {
        listFactory: function (sId) {
            var oUIControl;

            oUIControl = this.byId("item").clone(sId);
            console.log(sId);
            return oUIControl;
        },
        goToDetails: function (oEvent) {
            var oSelectedItem = oEvent.getSource();
            var context = encodeURIComponent(oSelectedItem.getBindingContext('People').getPath());
            console.log(context);
            this.getRouter().navTo("details", {
                id: context
            });
        }
    });
});