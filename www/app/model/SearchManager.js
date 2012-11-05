
window.SearchManager = {

//  apiUrl: 'http://localhost:59468/api/word',//өнү
    apiUrl: 'http://tyvalib.ru/api/word',
    
    search:function (searchString, successCallback, errorCallback) {
        $.ajax({
            timeout: 20000,
            url: this.apiUrl,
            //data: { term: encodeURIComponent(searchString) || '' },
            data: { term: searchString || '' },
            type: "GET",
            contentType: "application/json;charset=utf-8",
            crossDomain: true,
            success: function (result) {
                    console.log('Search result: ' + JSON.stringify(result));
                    if (successCallback) {
                        successCallback(result);
                    }
            },
            error: function (request, error) {
                console.log('Request: ' + JSON.stringify(request) + ' Error: ' + JSON.stringify(error));
                if (errorCallback) {
                    errorCallback(error);
                }
            }
        });
    },

    findPointById:function (id, collection) {
        for (var x=0; x<collection.length; x++) {
            var poi = collection[x];
            if (poi.factual_id == id){
                return poi;
            }
        }
        return null;
    }
}
