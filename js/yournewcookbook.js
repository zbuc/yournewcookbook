(function ($) {

    $(function(){
        var recenter = function(e){
            var wHeight = $(window).height();
            var wWidth = $(window).width();
            var aHeight = $('#yournewcookbookapp').height();
            var aWidth = $('#yournewcookbookapp').width();
            
            var ync = $("#yournewcookbookapp");
    
            //if(aWidth < wWidth){
                // app smaller than window
                // no need to resize
                //$("#yournewcookbookapp").css('left', 
            //}

            //if(aHeight < wHeight){
                console.log("wHeight:"+wHeight);
                console.log("wWidth:"+wWidth);
                console.log("aHeight:"+aHeight);
                console.log("aWidth:"+aWidth);
                ync.css('margin-top', -0.5 * aHeight);
                ync.css('margin-left', (wWidth - aWidth)/2);
            //}
        };

        $(window).bind('resize', recenter);

        var Ingredients = window.collections.Ingredients;

        window.AppView = Backbone.View.extend({
            el: $("#yournewcookbookapp"),
            events: {
                "keypress #new-ingredient": "createOnEnter",
                "keyup #new-ingredient": "showTooltip",
            },
            initialize: function() {
                this.input = this.$("#new-ingredient");
                
                Ingredients.bind('add', this.addOne, this);
                Ingredients.bind('reset', this.addAll, this);
                Ingredients.bind('all', this.render, this);

                Ingredients.fetch();
            },
            addOne: function(ingredient){
                var view = new IngredientView({model: ingredient});
                this.$("#ingredient-list").append(view.render().el);
            },
            addAll: function(){
                Ingredients.each(this.addOne);
            },
            createOnEnter: function(e) {
                var text = this.input.val();
                if (!text || e.keyCode != 13) return;
                Ingredients.create({text: text});
                this.input.val('');
            },
            showTooltip: function(e) {
                var tooltip = this.$(".ui-tooltip-top");
                var val = this.input.val();
                tooltip.fadeOut();
                if (this.tooltipTimeout) clearTimeout(this.tooltipTimeout);
                if (val == '' || val == this.input.attr('placeholder')) return;
                var show = function(){ tooltip.show().fadeIn(); };
                this.tooltipTimeout = _.delay(show, 1000);
            }
        });
        window.App = new AppView;

        recenter();
    });
})(jQuery);
