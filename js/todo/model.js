(function ($) {

    $(function(){
        window.Todo = Backbone.Model.extend({
            defaults: function() {
                return {
                    done: false,
                    order: Todos.nextOrder()
                };
            },

            toggle: function() {
                this.save({done: !this.get("done")});
            }
        });
    });
})(jQuery);
