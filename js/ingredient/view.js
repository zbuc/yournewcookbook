(function ($) {

    $(function(){
        window.IngredientView = Backbone.View.extend({
            tagName: "li",
            template: _.template($('#ingredient-template').html()),
            events: {
                "click .check": "toggleDone",
                "dblclick div.ingredient-text": "edit",
                "click span.ingredient-destroy": "clear",
                "keypress .ingredient-input": "updateOnEnter"
            },
            initialize: function() {
                this.model.bind('change', this.render, this);
                this.model.bind('destroy', this.remove, this);
            },
            render: function(){
                $(this.el).html(this.template(this.model.toJSON()));
                // set the inputs to the jQuery objects corresponding to elements on the DOM
                this.inputs = this.$('.ingredient-quantity, .ingredient-measurement, .ingredient-input');
                this.setText();
                return this;
            },
            setText: function() {
                var text = this.model.get('text');
                var quantity = this.model.get('quantity');
                var measurement = this.model.get('measurement');

                this.$('.ingredient-text').text(quantity + " " + measurement + " " + text);

                //this.inputs.bind('blur', _.bind(this.closeIfNotEditing, this));
                this.getInput('.ingredient-input').val(text);
                this.getInput('.ingredient-quantity').val(quantity);
                this.getInput('.ingredient-measurement').val(measurement);
            },
            toggleDone: function() {
                this.model.toggle();
            },
            edit: function() {
                $(this.el).addClass("editing");
                this.getInput('.ingredient-input').focus();
                $('html').unbind('click.ingredients').bind('click.ingredients', _.bind(this.closeIfNotEditing, this));
            },
            close: function() {
                this.model.save({
                    text: this.getInput('.ingredient-input').val(),
                    quantity: this.getInput('.ingredient-quantity').val(),
                    measurement: this.getInput('.ingredient-measurement').val()
                });

                $(this.el).removeClass("editing");
                $('html').unbind('click.ingredients');
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
