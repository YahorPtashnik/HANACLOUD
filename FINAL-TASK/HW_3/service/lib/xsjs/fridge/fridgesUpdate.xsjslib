const _TOJSON = $.import('xsjs.fridge', 'toJSON').toJSON;
const toJSON = new _TOJSON();

const FRIDGE_TABLE = "HW_3::Fridge";
const CURR_TIMESTAMP_FUN = "current_timestamp";

function fridgesUpdate(param){
    var after = param.afterTableName;

    var pStmt = param.connection.prepareStatement("select * from \"" + after + "\"");
    var oResult = pStmt.executeQuery();

    var oFridgeItems = toJSON.recordSetToJSON(oResult, "items");
    var oFridge = oFridgeItems.items[0];
    $.trace.error("Update oFridge :" + JSON.stringify(oFridge));

    pStmt.close();
    pStmt = param.connection.prepareStatement(`UPDATE "${FRIDGE_TABLE}" SET "bname"='${oFridge.bname}', "cap"='${oFridge.cap}', "ts_update"=${CURR_TIMESTAMP_FUN} WHERE "frid"=${oFridge.frid}`);   
    exucuteAndClose(pStmt);
}

function exucuteAndClose(pStmt) {
    pStmt.executeUpdate();
    pStmt.close();
}