sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/thirdparty/jquery"
], function (Controller, jQuery) {
    "use strict";

    return Controller.extend("fridge_create.controller.App", {
        onInit: function () {
        },
        onExit: function () {
        },
				sendPost: function(){
            jQuery.ajax({
                type: "POST",
                url: "/api/xsjs/fridge/fridge.xsjs",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify({
                    name: 'Joker'
								}),
                success: function (data) {
									alert("success");
                },
								error: function (){
									alert("error");
                }
            });
				}
    });

});