var user = function (connection) {
    const CRUD = $.import('xsjs.fridge', 'fridgesCRUD').fridgesCRUD;
    const crud = new CRUD(connection);
    const FRIDGE_TABLE = "HW_3::Fridge";
    const FRIDGE_ID = "HW_3::frid";

    this.doGet = function () {
        const result = connection.executeQuery('SELECT * FROM "' + FRIDGE_TABLE + '"');

        result.forEach(x => traceErr(JSON.stringify(x)));
        $.response.status = $.net.http.OK;
        $.response.setBody(JSON.stringify(result));
    };

    this.doPost = function (oFridge) {

        oFridge.frid = crud.getNextval("HW_3::frid");

        const statement = crud.createPreparedInsertStatement(FRIDGE_TABLE, oFridge);
        connection.executeUpdate(statement.sql, statement.aValues);

        connection.commit();
        $.response.status = $.net.http.CREATED;
        $.response.setBody(JSON.stringify(oFridge));
    };

    this.doPut = function (oFridge) {

      const statement = crud.createPreparedUpdateStatement(FRIDGE_TABLE, oFridge);
      connection.executeUpdate(statement.sql, statement.aValues);

      connection.commit();
      $.response.status = $.net.http.OK;
      $.response.setBody(JSON.stringify(oFridge));
    };

    this.doDelete = function (frid) {
            const statement = crud.createPreparedDeleteStatement(FRIDGE_TABLE, {frid: frid});
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
