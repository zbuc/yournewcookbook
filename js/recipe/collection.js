(function ($) {
    $(function(){
        window.RecipeList = Backbone.Collection.extend({
            model: Recipe,
            url: "/recipes",
            nextOrder: function() {
                if (!this.length) return 1;
                return this.last().get('order') + 1;
            },
            comparator: function(recipe) {
                return recipe.get('order');
            }
        });

        window.collections.Recipes = new RecipeList;
    });
})(jQuery);
