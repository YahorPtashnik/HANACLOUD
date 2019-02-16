var user = function (connection) {
    const CRUD = $.import('xsjs.user', 'usersCRUD').usersCRUD;
    const crud = new CRUD(connection);
    const USER_TABLE = "testApp3::User";
    const USER_ID = "testApp3::usid";

    this.doGet = function (obj) {
        const result = connection.executeQuery('SELECT * FROM "' + USER_TABLE + '"');

        result.forEach(x => traceErr(JSON.stringify(x)));
        $.response.status = $.net.http.OK;
        $.response.setBody(JSON.stringify(result));
    };

    this.doPost = function (oUser) {

        oUser.usid = crud.getNextval("testApp3::usid");

        const statement = crud.createPreparedInsertStatement(USER_TABLE, oUser);
        connection.executeUpdate(statement.sql, statement.aValues);

        connection.commit();
        $.response.status = $.net.http.CREATED;
        $.response.setBody(JSON.stringify(oUser));
    };

    this.doPut = function (obj) {

      const statement = crud.createPreparedUpdateStatement(USER_TABLE, obj);
      connection.executeUpdate(statement.sql, statement.aValues);

      connection.commit();
      $.response.status = $.net.http.OK;
      $.response.setBody(JSON.stringify(obj));
    };

    this.doDelete = function (usid) {
            const statement = crud.createPreparedDeleteStatement(USER_TABLE, {usid: usid});
            connection.executeUpdate(statement.sql, statement.aValues);

            connection.commit();
            $.response.status = $.net.http.OK;
            $.response.setBody(JSON.stringify({}));
        };

    function traceErr(value)
    {
      $.trace.error(value);
    }
};
