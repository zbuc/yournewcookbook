(function ($) {
    $(function(){
        window.Recipe = Backbone.Model.extend({
            defaults: function() {
                return {
                    title: "A new recipe",
                    description: "A description of a new recipe",
                    ingredients: [],
                    steps: [],
                    order: window.collections.Recipes.nextOrder()
                };
            },
        });
    });
})(jQuery);
