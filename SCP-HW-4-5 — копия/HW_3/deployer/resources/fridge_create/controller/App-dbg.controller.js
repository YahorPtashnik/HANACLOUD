sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/thirdparty/jquery"
], function (Controller, jQuery) {
    "use strict";

    return Controller.extend("fridge_create.controller.App", {
        onInit: function () {},
        onExit: function () {},
        createFridge: function () {
            var Name = sap.ui.getCore().byId(this.getView().sId + "--brandNameInput").getValue();
            var Cap = sap.ui.getCore().byId(this.getView().sId + "--capNameInput").getValue();
            console.log(Name);
            console.log(Cap);
            var settings = {
                "async": true,
                "crossDomain": true,
                "uri": "https://p2001081083trial-trial-dev-service.cfapps.eu10.hana.ondemand.com/xsodata/HW_3.xsodata/Fridges",
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
        }
    });

});