templates.searchView = "app/views/SearchView.html";

window.SearchView = Backbone.View.extend({

    title: "Тып тур бис...",

    initialize: function (options) {

        this.render();
        this.view = this.$el;
        var self = this;
        this.searchString = options.searchString;

        this.onSearchResult = function (result) {
            self.searchResult(result);
        };
        this.onSearchError = function (error) {
            self.searchError(error);
        };

        //delay long enough for transition to complete
        setTimeout(function () {
            console.log('do search');
            SearchManager.search(self.searchString, self.onSearchResult, self.onSearchError);
        }, 200);
    },

    events: {
    },

    render: function () {
        console.log('Render SearchView');
        this.$el.html(templates.searchView);

        this.$el.css("height", "100%");
        return this;
    },

    searchResult: function (result) {
        console.log('searchResults ' + JSON.stringify(result));

        try {
            console.log('move to results view');
            var view = new SearchResultsView({ model: result, searchString: this.searchString });
            window.viewNavigator.replaceView(view);
        }
        catch (e) {
            alert(e.toString());
        }
    },

    searchError: function (error) {
        console.log('searchResults error ' + error);
        var self = this;

        //wait for transition to finish, then cleanup once removed from view
        setTimeout(function () {
            var view = new SearchResultsView({ model: { 'version': '0.0.1', 'words': [] }, searchString: self.searchString });
            window.viewNavigator.replaceView(view);
        }, 550);
    }



});