templates.searchResults = "app/views/SearchResultsView.html";
////өнү
window.SearchResultsView = Backbone.View.extend({

    destructionPolicy: 'never',
    title: "Тывылган сөстер?",
    backLabel: "Дээдир",

    initialize: function (options) {

        //this.model = options.result;
        this.searchString = options.searchString;

        this.render();
        this.view = this.$el;
    },

    events: {
    },

    render: function () {
        console.log('Render SRV');
        var template = _.template(templates.searchResults);
        this.$el.css("background", "white");
        this.$el.html(template({ searchString: this.searchString, words: this.model.words }));
        var $list = this.$el.find("#list");

        _.each(this.model.words, function (word) {
            $list.append(new ListItemView({ model: word }).render().el);
        }, this);

        return this;
    }
});