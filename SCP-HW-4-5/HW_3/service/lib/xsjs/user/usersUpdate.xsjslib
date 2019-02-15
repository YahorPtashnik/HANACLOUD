const _TOJSON = $.import('xsjs.user', 'toJSON').toJSON;
const toJSON = new _TOJSON();

const USER_TABLE = "HW_3::User";

function usersUpdate(param){
    var after = param.afterTableName;

    var pStmt = param.connection.prepareStatement("select * from \"" + after + "\"");
    var oResult = pStmt.executeQuery();

    var oUserItems = toJSON.recordSetToJSON(oResult, "items");
    var oUser = oUserItems.items[0];
    $.trace.error("Update oUser :" + JSON.stringify(oUser));

    pStmt.close();
    pStmt = param.connection.prepareStatement(`UPDATE \"${USER_TABLE}\" SET "name"='${oUser.name}' WHERE "usid"=${oUser.usid}`);   
    exucuteAndClose(pStmt);
    pStmt = param.connection.prepareStatement("TRUNCATE TABLE \"" + after + "\"" );
	exucuteAndClose(pStmt);
	pStmt = param.connection.prepareStatement("insert into \"" + after + "\" values(?,?)" );
    pStmt.setString(1, oUser.usid.toString());
	pStmt.setString(2, oUser.name.toString());
    exucuteAndClose(pStmt);
}

function exucuteAndClose(pStmt) {
    pStmt.executeUpdate();
    pStmt.close();
}