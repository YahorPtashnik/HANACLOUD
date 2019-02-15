jQuery.sap.registerPreloadedModules({version:"2.0",name:"user_display/Component-preload",modules:{"user_display/Component.js":'sap.ui.define(["sap/ui/core/UIComponent"],function(t){"use strict";return t.extend("user_display.Component",{metadata:{manifest:"json"},init:function(){t.prototype.init.apply(this,arguments),this.getRouter().initialize()}})});',"user_display/controller/App.controller.js":'sap.ui.define(["user_display/controller/BaseController"],function(e){"use strict";return e.extend("user_display.controller.App",{listFactory:function(e){var t;return t=this.byId("item").clone(e),console.log(e),t},goToDetails:function(e){var t=e.getSource(),o=encodeURIComponent(t.getBindingContext("Users").getPath());console.log(o),this.getRouter().navTo("details",{id:o})}})});',"user_display/controller/BaseController.js":'sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/core/routing/History","sap/ui/core/UIComponent"],function(o,e,t){"use strict";return o.extend("user_display.controller.BaseController",{getRouter:function(){return t.getRouterFor(this)},onNavBack:function(){var o,t;o=e.getInstance(),t=o.getPreviousHash(),void 0!==t?window.history.go(-1):this.getRouter().navTo("appHome",{},!0)}})});',"user_display/controller/Details.controller.js":'sap.ui.define(["user_display/controller/BaseController","sap/m/MessageBox"],function(e,t){"use strict";return e.extend("user_display.controller.Details",{onInit:function(){sap.ui.core.UIComponent.getRouterFor(this).getRoute("details").attachPatternMatched(this._onObjectMatched,this)},_onObjectMatched:function(e){this.getView().bindElement({path:decodeURIComponent(e.getParameter("arguments").id),model:"Users"})}})});',"user_display/controller/NotFound.controller.js":'sap.ui.define(["sap/ui/demo/wt/controller/BaseController"],function(t){"use strict";return t.extend("user_display.controller.NotFound",{onInit:function(){var t,a;t=this.getRouter(),a=t.getTarget("notFound"),a.attachDisplay(function(t){this._oData=t.getParameter("data")},this)},onNavBack:function(){if(this._oData&&this._oData.fromTarget)return this.getRouter().getTargets().display(this._oData.fromTarget),void delete this._oData.fromTarget;t.prototype.onNavBack.apply(this,arguments)}})});',"user_display/index.js":'sap.ui.require(["sap/ui/core/ComponentContainer"],function(e){"use strict";new e({name:"user_display",settings:{id:"wt"}}).placeAt("content")});',"user_display/view/App.view.xml":'<mvc:View \r\n    controllerName="user_display.controller.App" \r\n    xmlns="sap.m" \r\n    xmlns:l="sap.ui.layout" \r\n    xmlns:mvc="sap.ui.core.mvc"\r\n    ><Shell><App id = "app"><Page\r\n        id="mainPage"\r\n        title = "{i18n>mainPageTitle}"\r\n        class = "sapUiResponsiveContentPadding"><content><List\r\n                id="userList"\r\n\t\t\t\theaderText="{i18n>listHeader}"\r\n\t\t\t\titems="{\r\n\t\t\t\t\tpath: \'users>/Users\',\r\n\t\t\t\t\tfactory: \'.listFactory\'\r\n\t\t\t\t}"><ObjectListItem\r\n\t\t\t\t\tid="item"\r\n                    type = "Active"\r\n                    title = "{users>usid}"\r\n                    number = "UserName: {users>name}"\r\n                    press = ".goToDetails"></ObjectListItem></List></content></Page></App></Shell></mvc:View>',"user_display/view/Details.view.xml":'<mvc:View \r\n    controllerName="user_display.controller.Details" \r\n    xmlns="sap.m" \r\n    xmlns:l="sap.ui.layout" \r\n    xmlns:mvc="sap.ui.core.mvc"\r\n    ><Shell><App id="details"><pages><Page \r\n    showNavButton = "true"\r\n    navButtonPress = ".onNavBack"\r\n    title = "{users>usid}"><Panel id="PeopleDetailPanel" headerText="Details" class="sapUiResponsiveMargin" width="auto"><content><Table><columns><Column id="userNameColumn"><Text text="{i18n>userNameLabelText}" /></Column><Column id="firstNameColumn"><Text text="{i18n>firstNameLabelText}" /></Column><Column id="lastNameColumn"><Text text="{i18n>lastNameLabelText}" /></Column><Column id="GenderColumn"><Text text="{i18n>genderLabelText}" /></Column><Column id="EmailsColumn"><Text text="{i18n>emailsLabelText}" /></Column></columns><items><ColumnListItem><cells><Label text="{People>UserName}" /></cells><cells><Label text="{People>FirstName}" /></cells><cells><Label text="{People>LastName}" /></cells><cells><Label text="{People>Gender}" /></cells><cells><FormattedText htmlText="{People>Emails/0}&lt;br&gt;{People>Emails/1}" /></cells></ColumnListItem></items></Table></content></Panel></Page></pages></App></Shell></mvc:View>',"user_display/view/NotFound.view.xml":'<mvc:View\r\n    controllerName = "user_display.controller.NotFound"\r\n    xmlns = "sap.m"\r\n    xmlns:mvc = "sap.ui.core.mvc"><MessagePage\r\n        title = "{i18n>notFound}"\r\n        text = "{i18n>notFoundText}"\r\n        description = "{i18n>notFoundDesc}"\r\n        showNavButton = "true"\r\n        navButtonPress = ".onNavBack"></mvc:View>',"user_display/i18n/i18n.properties":"mainPageTitle = Users List\r\nlistHeader = Users\r\nappTitle = My UI5 Application\r\nappDescription = Ptashnik Yahor HW_10\r\nuserNameLabelText=User Name\r\nfirstNameLabelText=First Name\r\nlastNameLabelText=Last Name\r\ngenderLabelText=Gender\r\nemailsLabelText=Emails\r\naddressLabelText=Address","user_display/manifest.json":'{"_version":"1.12.0","sap.app":{"id":"user_display","type":"application","i18n":"i18n/i18n.properties","title":"{{appTitle}}","description":"{{appDescription}}","applicationVersion":{"version":"1.0.0"},"dataSources":{"xsoDataService":{"uri":"https://p2001081083trial-trial-dev-service.cfapps.eu10.hana.ondemand.com/xsodata/HW_3.xsodata/","type":"OData","settings":{"odataVersion":"2.0"}}}},"sap.ui":{"technology":"UI5","deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"rootView":{"viewName":"user_display.view.App","type":"XML","async":true,"id":"app"},"dependencies":{"minUI5Version":"1.30","libs":{"sap.m":{},"sap.ui.core":{}}},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"user_display.i18n.i18n"}},"users":{"dataSource":"xsoDataService","settings":{"defaultBindingMode":"TwoWay","defaultCountMode":"Inline","useBatch":false,"disableHeadRequestForToken":true}}},"routing":{"config":{"routerClass":"sap.m.routing.Router","viewType":"XML","viewPath":"user_display.view","controlId":"app","controlAggregation":"pages","transition":"slide","bypassed":{"target":"notFound"},"async":true},"routes":[{"pattern":"","name":"appHome","target":"app"},{"pattern":"details/{id}","name":"details","target":"details"}],"targets":{"app":{"viewID":"app","viewName":"App","viewLevel":1},"details":{"viewID":"details","viewName":"Details","viewLevel":2},"notFound":{"viewId":"notFound","viewName":"NotFound","transition":"show"}}}}}'}});