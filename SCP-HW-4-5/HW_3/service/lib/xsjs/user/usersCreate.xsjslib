const _TOJSON = $.import('xsjs.user', 'toJSON').toJSON;
const toJSON = new _TOJSON();

const USER_TABLE = "HW_3::User";
const USER_ID = "HW_3::usid";

function usersCreate(param) {
	$.trace.error(JSON.stringify(param));
	var after = param.afterTableName;

	//Get Input New Record Values
	var pStmt = param.connection.prepareStatement("select * from \"" + after + "\"");
	var oResult = pStmt.executeQuery();

	var oUserItems = toJSON.recordSetToJSON(oResult, "items");
	var oUser = oUserItems.items[0];
	$.trace.error(JSON.stringify(oUser));

	//Get Next Personnel Number
	pStmt = param.connection.prepareStatement(`select \"${USER_ID}\".NEXTVAL from dummy`);
	var result = pStmt.executeQuery();

	while (result.next()) {
		oUser.id = result.getString(1);
	}

	$.trace.error(JSON.stringify(oUser));
	pStmt.close();
	//Insert Record into DB Table and Temp Output Table
	pStmt = param.connection.prepareStatement(`insert into \"${USER_TABLE}\" values(?,?)`);
	fillAndExecute(pStmt, oUser);
	pStmt = param.connection.prepareStatement("TRUNCATE TABLE \"" + after + "\"");
	pStmt.executeUpdate();
	pStmt.close();
	pStmt = param.connection.prepareStatement("insert into \"" + after + "\" values(?,?)");
	fillAndExecute(pStmt, oUser);
}

function fillAndExecute(pStmt, oUser) {
	pStmt.setString(1, oUser.id.toString());
	pStmt.setString(2, oUser.name.toString());
	pStmt.executeUpdate();
	pStmt.close();
}