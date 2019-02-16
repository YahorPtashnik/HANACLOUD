const Fridgelib = $.import('xsjs.fridge', 'fridge').fridge;
const fridgeLib = new Fridgelib($.hdb.getConnection({
    treatDateAsUTC: true
}));

(function () {
    (function handleRequest() {
        try {
            switch ($.request.method) {
                case $.net.http.PUT:
                    {
                        fridgeLib.doPut(JSON.parse($.request.body.asString()));
                        break;
                    }
                case $.net.http.POST:
                    {
                        fridgeLib.doPost(JSON.parse($.request.body.asString()));
                        break;
                    }
                case $.net.http.DEL:
                    {
                        fridgeLib.doDelete($.request.parameters.get("frid"));
                        break;
                    }
                case $.net.http.GET:
                    {
                        fridgeLib.doGet();
                        break;
                    }
                default:
                    {
                        $.response.status = $.net.http.METHOD_NOT_ALLOWED;
                    }
            }
        } catch (e) {
            $.response.status = $.net.http.BAD_REQUEST;
            $.response.setBody(e.message);
        }
    }());
}());