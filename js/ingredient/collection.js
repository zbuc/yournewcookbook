(function ($) {

    $(function(){
        window.IngredientList = Backbone.Collection.extend({
            model: Ingredient,
            url: "/ingredients",
            onhand: function() {
                return this.filter(function(ingredient){ return ingredient.get('onhand'); });
            },
            remaining: function() {
                return this.without.apply(this, this.onhand());
            },
            nextOrder: function() {
                if (!this.length) return 1;
                return this.last().get('order') + 1;
            },
            comparator: function(ingredient) {
                return ingredient.get('order');
            }
        });

        window.collections.Ingredients = new IngredientList;
    });
})(jQuery);
