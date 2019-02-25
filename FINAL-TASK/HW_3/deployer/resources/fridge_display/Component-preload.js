jQuery.sap.registerPreloadedModules({version:"2.0",name:"fridge_display/Component-preload",modules:{"fridge_display/Component.js":'sap.ui.define(["sap/ui/core/UIComponent"],function(t){"use strict";return t.extend("fridge_display.Component",{metadata:{manifest:"json"},init:function(){t.prototype.init.apply(this,arguments),this.getRouter().initialize()}})});',"fridge_display/controller/App.controller.js":'sap.ui.define(["fridge_display/controller/BaseController","sap/ui/core/Fragment"],function(e,t){"use strict";return this.createUnvalidDataExceptionDialog=function(){var e=new sap.m.Dialog({title:"Error",type:"Message",state:"Error",content:new sap.m.Text({text:"Enter valid data"}),beginButton:new sap.m.Button({text:"OK",press:function(){e.close()}}),afterClose:function(){e.destroy()}});e.open()},this.createSuccessOnUpdateDialog=function(){var e=new sap.m.Dialog({title:"Success",type:"Message",state:"Success",content:new sap.m.Text({text:"Data is successfully changed"}),beginButton:new sap.m.Button({text:"OK",press:function(){e.close()}}),afterClose:function(){e.destroy()}});e.open()},this.createSuccessOnCreateDialog=function(){var e=new sap.m.Dialog({title:"Success",type:"Message",state:"Success",content:new sap.m.Text({text:"Data is successfully added"}),beginButton:new sap.m.Button({text:"OK",press:function(){e.close()}}),afterClose:function(){e.destroy()}});e.open()},this.checkModelObject=function(e){if(!(!e.bname||!e.cap||e.bname.length>100||e.cap.length>6))return!0;createUnvalidDataExceptionDialog()},this.getTableRowIndex=function(e,t,i,n){for(var s=e.getSource().getBindingContext(i).getProperty(n),a=t.getItems(),o=0;o<a.length;o++)if(s===a[o].getCells()[0].getValue())return o},this.editMode=function(e,t,i){e[t].getCells()[i.editBtnPosition].getEnabled()?(e[t].getCells()[i.editBtnPosition].setEnabled(!1),e[t].getCells()[i.saveBtnPosition].setEnabled(!0),e[t].getCells()[i.deleteBtnPosition].setEnabled(!0),e[t].getCells()[i.brandNameInputPosition].setEditable(!0),e[t].getCells()[i.capacityInputPosition].setEditable(!0)):(e[t].getCells()[i.editBtnPosition].setEnabled(!0),e[t].getCells()[i.saveBtnPosition].setEnabled(!1),e[t].getCells()[i.deleteBtnPosition].setEnabled(!1),e[t].getCells()[i.brandNameInputPosition].setEditable(!1),e[t].getCells()[i.capacityInputPosition].setEditable(!1))},this.sendPUT=function(e,t){e.update("/Fridges(\'"+t.frid+"\')",t,{merge:!1,success:function(){createSuccessOnUpdateDialog()},error:function(){jQuery.sap.log.error("Error at PUT request")}})},this.sendPOST=function(e,t){e.create("/Fridges",t,{merge:!1,success:function(){createSuccessOnCreateDialog()},error:function(){jQuery.sap.log.error("Error at POST request")}})},this.sendDEL=function(e,t,i){var n={async:!0,crossDomain:!0,url:i.mainTableModelDeleteRequestURL+t,method:"DELETE",headers:{"content-type":"application/json"},processData:!1};$.ajax(n).done(function(){e.refresh(!0)})},this.createFridge=function(e,t){var i=e.getData();if(delete i.ts_create,delete i.ts_update,checkModelObject(i))return sendPOST(t,i),!0},this.updateFridge=function(e,t,i,n,s){var a=n.getData(),o=e[t].getCells();if(a.frid=o[i.fridgeIdInputPosition].getValue(),a.bname=o[i.brandNameInputPosition].getValue(),a.cap=o[i.capacityInputPosition].getValue(),a.ts_create=null,a.ts_update=null,checkModelObject(a))return sendPUT(s,a),!0},this.deleteFridge=function(e,t,i,n){var s=e[t].getCells()[i.fridgeIdInputPosition].getValue();sendDEL(n,s,i)},e.extend("fridge_display.controller.App",{onInit:function(){this.oView=this.getView(),this.mConfig=this.oView.getModel("config").getData(),this.mFridge=this.oView.getModel("fridgeModel"),this.fridges=this.oView.getModel(this.mConfig.mainTableModelName),this.mainTable=this.oView.byId(this.mConfig.mainTableId)},showCreateDialog:function(){var e=this.oView;e.byId("createDialog")?e.byId("createDialog").open():t.load({id:e.getId(),name:"fridge_display.view.Create",controller:this}).then(function(t){e.addDependent(t),t.open()})},closeDialog:function(){this.oView.byId("createDialog").close()},createButton:function(){createFridge(this.mFridge,this.fridges)},editButton:function(e){var t=this.getTableRowIndex(e,this.mainTable,this.mConfig.mainTableModelName,this.mConfig.idPropName);editMode(this.mainTable.getItems(),t,this.mConfig)},saveButton:function(e){var t=getTableRowIndex(e,this.mainTable,this.mConfig.mainTableModelName,this.mConfig.idPropName);updateFridge(this.mainTable.getItems(),t,this.mConfig,this.mFridge,this.fridges)&&editMode(this.mainTable.getItems(),t,this.mConfig)},deleteButton:function(e){var t=getTableRowIndex(e,this.mainTable,this.mConfig.mainTableModelName,this.mConfig.idPropName);deleteFridge(this.mainTable.getItems(),t,this.mConfig,this.fridges)}})});',"fridge_display/controller/BaseController.js":'sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/core/routing/History","sap/ui/core/UIComponent"],function(e,r,o){"use strict";return e.extend("fridge_display.controller.BaseController",{})});',"fridge_display/controller/NotFound.controller.js":'sap.ui.define(["fridge_display/controller/BaseController"],function(t){"use strict";return t.extend("fridge_display.controller.NotFound",{onInit:function(){var t,a;t=this.getRouter(),a=t.getTarget("notFound"),a.attachDisplay(function(t){this._oData=t.getParameter("data")},this)},onNavBack:function(){if(this._oData&&this._oData.fromTarget)return this.getRouter().getTargets().display(this._oData.fromTarget),void delete this._oData.fromTarget;t.prototype.onNavBack.apply(this,arguments)}})});',"fridge_display/index.js":'sap.ui.require(["sap/ui/core/ComponentContainer"],function(e){"use strict";new e({name:"fridge_display",settings:{id:"wt"}}).placeAt("content")});',"fridge_display/view/Create.fragment.xml":'<core:FragmentDefinition\r\n   xmlns="sap.m"\r\n   xmlns:core="sap.ui.core"\r\n   xmlns:l="sap.ui.layout"\r\n   xmlns:tnt="sap.tnt"><Dialog title="{i18n>createDialogTitle}" id="createDialog"><l:VerticalLayout><Label text="{i18n>userNameLabelText}" class="sapUiSmallMarginBegin"/><Input value="{fridgeModel>/bname}" required="true" width="300px" class="sapUiSmallMarginBegin sapUiSmallMarginEnd"/><Label text="{i18n>fridgeCapacityText}" class="sapUiSmallMarginBegin"/><Input value="{fridgeModel>/cap}" required="true" width="300px" class="sapUiSmallMarginBegin sapUiSmallMarginEnd"/></l:VerticalLayout><beginButton><Button icon="sap-icon://accept" type="Accept" press=".createButton" class="roundClass"/></beginButton><endButton><Button icon="sap-icon://decline" type="Reject" press=".closeDialog" class="roundClass"/></endButton></Dialog></core:FragmentDefinition>',"fridge_display/view/App.view.xml":'<mvc:View \r\n    controllerName="fridge_display.controller.App" \r\n    xmlns="sap.m" \r\n    xmlns:l="sap.ui.layout" \r\n    xmlns:mvc="sap.ui.core.mvc"\r\n    xmlns:tnt="sap.tnt"\r\n    ><App id = "app"><Page\r\n        id="mainPage"\r\n        class = "sapUiResponsiveContentPadding"\r\n        title="{i18n>fridgesText}"><content><Table id="details" items = "{\r\n              path: \'fridges>/Fridges\'\r\n              }"><headerToolbar><Toolbar><Title text="{i18n>mainPageTitle}" level="H2"/></Toolbar></headerToolbar><columns><Column><Text text="{i18n>fridgeIdText}" /></Column><Column><Text text="{i18n>fridgeBrandNameText}" /></Column><Column><Text text="{i18n>fridgeCapacityText}" /></Column><Column><Text text="{i18n>fridgeCreateText}"/></Column><Column><Text text="{i18n>fridgeUpdateText}"/></Column><Column width="60px"></Column><Column width="60px"></Column><Column width="60px"><Button icon="sap-icon://create" press=".showCreateDialog" class="roundClass"/></Column></columns><items><ColumnListItem><cells><Input value="{fridges>frid}" editable="false" class="minInput"/></cells><cells><Input value="{fridges>bname}" editable="false"/></cells><cells><Input value="{fridges>cap}" editable="false"/></cells><cells><Input value="{fridges>ts_create}" editable="false" /></cells><cells><Input value="{fridges>ts_update}" editable="false" /></cells><cells><Button icon="sap-icon://edit" press=".editButton"  class="roundClass" type="Default" enabled="true"/></cells><cells><Button icon="sap-icon://save" press=".saveButton" class="roundClass" type="Accept"  enabled="false"/></cells><cells><Button icon="sap-icon://delete" press=".deleteButton" class="roundClass" type="Reject"  enabled="false"/></cells></ColumnListItem></items></Table></content></Page></App></mvc:View>',"fridge_display/view/NotFound.view.xml":'<mvc:View\r\n    controllerName = "fridge_display.controller.NotFound"\r\n    xmlns = "sap.m"\r\n    xmlns:mvc = "sap.ui.core.mvc"><MessagePage\r\n        title = "{i18n>notFound}"\r\n        text = "{i18n>notFoundText}"\r\n        description = "{i18n>notFoundDesc}"\r\n        showNavButton = "true"\r\n        navButtonPress = ".onNavBack"></mvc:View>',"fridge_display/i18n/i18n.properties":"mainPageTitle=Fridges List\r\nlistHeader=Fridges\r\nappTitle=My UI5 Application\r\nappDescription = Ptashnik Yahor HW_10\r\nuserNameLabelText=Brand Name\r\nfirstNameLabelText=First Name\r\nlastNameLabelText=Last Name\r\ngenderLabelText=Gender\r\nemailsLabelText=Emails\r\naddressLabelText=Address\r\nfridgeIdText=Fridge ID\r\nfridgeBrandNameText=Brand name\r\nfridgeCreateText=Created\r\nfridgeUpdateText=Updated\r\nfridgeCapacityText=Capacity\r\nfridgesText=Fridges\r\ncreateDialogTitle=Create New Fridge","fridge_display/manifest.json":'{"_version":"1.12.0","sap.app":{"id":"fridge_display","type":"application","i18n":"i18n/i18n.properties","title":"{{appTitle}}","description":"{{appDescription}}","applicationVersion":{"version":"1.0.0"},"dataSources":{"xsoDataService":{"uri":"https://p2001081083trial-trial-dev-router.cfapps.eu10.hana.ondemand.com/api/xsodata/HW_3.xsodata","type":"OData","settings":{"odataVersion":"2.0"}}}},"sap.ui":{"technology":"UI5","deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"rootView":{"viewName":"fridge_display.view.App","type":"XML","async":true,"id":"app"},"dependencies":{"minUI5Version":"1.30","libs":{"sap.m":{},"sap.ui.core":{}}},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"fridge_display.i18n.i18n"}},"fridges":{"dataSource":"xsoDataService","settings":{"defaultBindingMode":"TwoWay","defaultCountMode":"Inline","useBatch":true,"disableHeadRequestForToken":true}},"config":{"type":"sap.ui.model.json.JSONModel","uri":"./model/config.json"},"fridgeModel":{"type":"sap.ui.model.json.JSONModel","uri":"./model/fridgeModel.json"}},"routing":{"config":{"routerClass":"sap.m.routing.Router","viewType":"XML","viewPath":"fridge_display.view","controlId":"app","controlAggregation":"pages","transition":"slide","bypassed":{"target":"notFound"},"async":true},"routes":[{"pattern":"","name":"appHome","target":"app"},{"pattern":"details/{id}","name":"details","target":"details"}],"targets":{"app":{"viewID":"app","viewName":"App","viewLevel":1},"details":{"viewID":"details","viewName":"Details","viewLevel":2},"notFound":{"viewId":"notFound","viewName":"NotFound","transition":"show"}},"resources":{"css":[{"uri":"css/style.css"}]}}}}'}});