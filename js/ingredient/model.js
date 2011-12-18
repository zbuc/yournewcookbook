(function ($) {

    $(function(){
        window.Ingredient = Backbone.Model.extend({
            defaults: function() {
                return {
                    onhand: false,
                    quantity: "",
                    measurement: "",
                    order: window.collections.Ingredients.nextOrder()
                };
            },

            toggle: function() {
                this.save({onhand: !this.get("onhand")});
            }
        });
    });
})(jQuery);
