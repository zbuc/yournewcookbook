(function ($) {

    $(function(){
        window.RecipeView = Backbone.View.extend({
            tagName: "div",
            template: _.template($('#recipe-template').html()),
            events: {
                //"dblclick div.ingredient-text": "edit",
                //"click span.ingredient-destroy": "clear",
                //"keypress .ingredient-input": "updateOnEnter"
            },
            initialize: function() {
                this.model.bind('change', this.render, this);
                this.model.bind('destroy', this.remove, this);
            },
            render: function(){
                console.log($(this.el));
                console.log("render i guess");
                $(this.el).html(this.template(this.model.toJSON()));
                // set the inputs to the jQuery objects corresponding to elements on the DOM
                this.inputs = this.$('.recipe-title, .recipe-description');
                this.setText();

                return this;
            },
            setText: function() {
                var title = this.model.get('title');
                var description = this.model.get('description');

                this.$('.recipe-title').text(title);
                this.$('.recipe-description').text(description);

                //this.inputs.bind('blur', _.bind(this.closeIfNotEditing, this));
                this.getInput('.recipe-title-input').val(title);
                this.getInput('.recipe-description-input').val(description);
            },
            editTitle: function() {
                $(this.el).addClass("editing");
                this.getInput('.recipe-title-input').focus();
                $('html').unbind('click.recipe').bind('click.recipe', _.bind(this.closeIfNotEditing, this));
            },
            editDescription: function() {
                $(this.el).addClass("editing");
                this.getInput('.recipe-description-input').focus();
                $('html').unbind('click.recipe').bind('click.recipe', _.bind(this.closeIfNotEditing, this));
            },
            close: function() {
                this.model.save({
                    title: this.getInput('.recipe-title-input').val(),
                    description: this.getInput('.recipe-description-input').val(),
                });

                $(this.el).removeClass("editing");
                $('html').unbind('click.recipe');
            },
            closeIfNotEditing: function(e) {
                // if what they clicked on wasn't one of our inputs...
                if(!this.inputs.filter($(e.toElement)).length){
                    this.close();
                }
            },
            updateOnEnter: function(e) {
                if (e.keyCode == 13) this.close();
            },
            remove: function() {
                $(this.el).remove();
            },
            clear: function() {
                this.model.destroy();
            },
        });
    });
})(jQuery);
