templates.listItemView = "app/views/ListItemView.html";
////өнү
window.ListItemView = Backbone.View.extend({

    tagName: 'li',
    template: undefined,

    initialize: function () {

        this.template = _.template(templates.listItemView),
        this.render();
        this.view = this.$el;
    },

    events: {
    },

    render: function () {
        var model = this.model;
        console.log('Render list item view ' + JSON.stringify(this.model));
        var html = this.template(model);
        var $html = $(html);
        var $desc = $('#descriptions', $html);
        console.log($desc.html());
        _.each(this.model.descriptions, function (d) {
            $desc.append('<dt>' + d.description + ' <sup>' + d.language + '<sup></dt>');
            if (d.example) {
                $desc.append('<dd>' + d.example + '</dd>');
            }
        }, this);
        this.$el.html($html.html());
        this.$el.attr('id', model.factual_id);
        console.log('LV final html ' + this.$el.html());
        return this;
    }
});