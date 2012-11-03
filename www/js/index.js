/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var app = {
    // Application Constructor
    initialize: function () {
        jQuery.support.cors = true;
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // `load`, `deviceready`, `offline`, and `online`.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of `this` is the event. In order to call the `receivedEvent`
    // function, we must explicity call `app.receivedEvent(...);`
    onDeviceReady: function () {
        var handle = function (e) {
            e.preventDefault();
            console.log('Submit search');
            app.search($('#q').val());
            return false;
        };
        $('form')
        //.submit(handle)
        .click(handle);
        app.search();
    },
    renderResult: function (data) {
        var word = '<h3>' + data.word + ' <small>' + data.descriptions.join(', ') + '</small></h3>';
        console.log('show: ' + word);
        return word;
    },
    counter: 0,
    search: function (term) {
        console.log('Search ' + term + ' ' + (++app.counter));
        $.ajax({
            //            url: 'http://localhost:59468/api/word',
            url: 'http://tyvalib.ru/api/word',
            data: { term: term || '' },
            type: "GET",
            //contentType: "application/json;charset=utf-8",
            crossDomain: true,
            statusCode: {
                200: function (result) {
                    console.log('Recent result: ' + JSON.stringify(result));
                    var $results = $('#results').empty();
                    $.each(result.words, function () {
                        var renderResult = app.renderResult(this);
                        console.log('Render: ' + renderResult);
                        $results.append(renderResult);
                    });
                },
                404: function () {
                    $('#results').html('Not found!');
                }
            },
            error: function (request, error) {
                alert('Request: ' + JSON.stringify(request) + ' Error: ' + JSON.stringify(error));
            }
        });
    }
};
