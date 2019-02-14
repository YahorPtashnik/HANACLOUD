var user = function (connection) {

    const USER_TABLE = "HW_3::User";
    /*
            const USER = $.session.securityContext.userInfo.familyName ?
                $.session.securityContext.userInfo.familyName + " " + $.session.securityContext.userInfo.givenName :
                $.session.getUsername().toLocaleLowerCase(),
    */


    this.doPost = function (oUser) {
        //Get Next ID Number
        oUser.usid = getNextval("HW_3::usid");

        //generate query
        const statement = createPreparedInsertStatement(USER_TABLE, oUser);
        //execute update
        connection.executeUpdate(statement.sql, statement.aValues);

        connection.commit();
        $.response.status = $.net.http.CREATED;
        $.response.setBody(JSON.stringify(oUser));
    };
    this.doGet = function () {
        const result = connection.executeQuery('select * from "HW_3::User"');
        $.response.status = $.net.http.OK;
        $.response.setBody(JSON.stringify(result));
    };


    this.doPut = function (oUser) {

        const statement = createPreparedUpdateStatement(USER_TABLE, oUser);
        //execute update
        connection.executeUpdate(statement.sql, statement.aValues);

        connection.commit();
        $.response.status = $.net.http.CREATED;
        $.response.setBody(JSON.stringify(oUser));
    };


    this.doDelete = function (usid) {
        const statement = createPreparedDeleteStatement(USER_TABLE, {
            usid: usid
        });
        connection.executeUpdate(statement.sql, statement.aValues);

        connection.commit();
        $.response.status = $.net.http.OK;
        $.response.setBody(JSON.stringify({}));
    };



    function getNextval(sSeqName) {
        const statement = `select "${sSeqName}".NEXTVAL as "ID" from dummy`;
        const result = connection.executeQuery(statement);

        if (result.length > 0) {
            return result[0].ID;
        } else {
            throw new Error('ID was not generated');
        }
    }

    function createPreparedInsertStatement(sTableName, oValueObject) {
        let oResult = new Result();

        let sColumnList = '',
            sValueList = '';

        for (let key in oValueObject) {
            sColumnList += `"${key}",`;
            oResult.aParams.push(key);
            sValueList += "?, ";
            oResult.aValues.push(oValueObject[key]);
        }

        // Remove the last unnecessary comma and blank
        sColumnList = sColumnList.slice(0, -1);
        sValueList = sValueList.slice(0, -2);

        oResult.sql = `insert into "${sTableName}" (${sColumnList}) values (${sValueList})`;

        $.trace.error("sql to insert: " + oResult.sql);
        return oResult;
    };

    function createPreparedUpdateStatement(sTableName, oValueObject) {
        let oResult = new Result();

        let sColumnList = '',
            sValueList = '';

        for (let key in oValueObject) {
            sColumnList += `"${key}",`;
            oResult.aParams.push(key);
            sValueList += "?, ";
            oResult.aValues.push(oValueObject[key]);
        }

        // Remove the last unnecessary comma and blank
        sColumnList = sColumnList.slice(0, -1);
        sValueList = sValueList.slice(0, -2);

        oResult.sql = `update "${sTableName}" set (${sColumnList}) = (${sValueList}) where "${oResult.aParams[0]}" = '${oResult.aValues[0]}'`;

        $.trace.error("sql to insert: " + oResult.sql);
        return oResult;
    };

    function createPreparedDeleteStatement(sTableName, oConditionObject) {
        let oResult = {
            aParams: [],
            aValues: [],
            sql: "",
        };

        let sWhereClause = '';
        for (let key in oConditionObject) {
            sWhereClause += `"${key}"=? and `;
            oResult.aValues.push(oConditionObject[key]);
            oResult.aParams.push(key);
        }
        // Remove the last unnecessary AND
        sWhereClause = sWhereClause.slice(0, -5);
        if (sWhereClause.length > 0) {
            sWhereClause = " where " + sWhereClause;
        }

        oResult.sql = `delete from "${sTableName}" ${sWhereClause}`;

        $.trace.error("sql to delete: " + oResult.sql);
        return oResult;
    };
};