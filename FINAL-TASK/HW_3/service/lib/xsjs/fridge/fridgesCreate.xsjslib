const _TOJSON = $.import('xsjs.fridge', 'toJSON').toJSON;
const toJSON = new _TOJSON();

const FRIDGE_TABLE = "HW_3::Fridge";
const FRIDGE_ID = "HW_3::frid";

function fridgesCreate(param) {
	$.trace.error(JSON.stringify(param));
	var after = param.afterTableName;

	//Get Input New Record Values
	var pStmt = param.connection.prepareStatement("select * from \"" + after + "\"");
	var oResult = pStmt.executeQuery();

	var oFridgeItems = toJSON.recordSetToJSON(oResult, "items");
	var oFridge = oFridgeItems.items[0];
	$.trace.error(JSON.stringify(oFridge));

	//Get Next Personnel Number
	pStmt = param.connection.prepareStatement(`select "${FRIDGE_ID}".NEXTVAL from dummy`);
	var result = pStmt.executeQuery();	

	while (result.next()) {
		oFridge.frid = result.getString(1);
	}
	console.log("POST_METHOD");
	$.trace.error(JSON.stringify(oFridge));
	pStmt.close();
	//Insert Record into DB Table and Temp Output Table
	pStmt = param.connection.prepareStatement(`insert into "${FRIDGE_TABLE}" values(?,?,?,?,?,?)`);
	fillAndExecute(pStmt, oFridge);
	pStmt = param.connection.prepareStatement("TRUNCATE TABLE \"" + after + "\"");
	pStmt.executeUpdate();
	pStmt.close();
	pStmt = param.connection.prepareStatement("insert into \"" + after + "\" values(?,?,?,?,?,?)");
	fillAndExecute(pStmt, oFridge);
}

function fillAndExecute(pStmt, oFridge) {
	pStmt.setString(1, oFridge.frid.toString());
	pStmt.setString(2, oFridge.bname.toString());
	pStmt.setString(3, oFridge.cap.toString());
	pStmt.setTimestamp(4, (new Date()).toISOString());
	pStmt.setTimestamp(5, (new Date()).toISOString());
	pStmt.setInteger(6, parseInt(oFridge.edit_mode);
	pStmt.executeUpdate();
	pStmt.close();
}