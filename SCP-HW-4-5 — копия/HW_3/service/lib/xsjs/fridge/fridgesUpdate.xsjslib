const _TOJSON = $.import('xsjs.fridge', 'toJSON').toJSON;
const toJSON = new _TOJSON();

const USER_TABLE = "HW_3::Fridge";

function fridgesUpdate(param){
    var after = param.afterTableName;

    var pStmt = param.connection.prepareStatement("select * from \"" + after + "\"");
    var oResult = pStmt.executeQuery();

    var oFridgeItems = toJSON.recordSetToJSON(oResult, "items");
    var oFridge = oFridgeItems.items[0];
    $.trace.error("Update oFridge :" + JSON.stringify(oFridge));

    pStmt.close();
    pStmt = param.connection.prepareStatement(`UPDATE \"${FRIDGE_TABLE}\" SET "bname"='${oFridge.bname}', "cap"='${oFridge.cap}' WHERE "frid"=${oFridge.frid}`);   
    exucuteAndClose(pStmt);
    pStmt = param.connection.prepareStatement("TRUNCATE TABLE \"" + after + "\"" );
		exucuteAndClose(pStmt);
		pStmt = param.connection.prepareStatement("insert into \"" + after + "\" values(?,?,?)" );
    pStmt.setString(1, oFridge.frid.toString());
		pStmt.setString(2, oFridge.bname.toString());
		pStmt.setString(3, oFridge.cap.toString());
    exucuteAndClose(pStmt);
}

function exucuteAndClose(pStmt) {
    pStmt.executeUpdate();
    pStmt.close();
}