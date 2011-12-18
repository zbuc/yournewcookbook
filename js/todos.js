(function ($) {

    $(function(){
        window.AppView = Backbone.View.extend({
            el: $("#todoapp"),
            statsTemplate: _.template($('#stats-template').html()),
            events: {
                "keypress #new-todo": "createOnEnter",
                "keyup #new-todo": "showTooltip",
                "click .todo-clear a": "clearCompleted"
            },
            initialize: function() {
                this.input = this.$("#new-todo");

                Todos.bind('add', this.addOne, this);
                Todos.bind('reset', this.addAll, this);
                Todos.bind('all', this.render, this);

                Todos.fetch();
            },
            render: function() {
                this.$('#todo-stats').html(this.statsTemplate({
                    total: Todos.length,
                    done: Todos.done().length,
                    remaining: Todos.remaining().length
                }));
            },
            addOne: function(todo){
                var view = new TodoView({model: todo});
                this.$("#todo-list").append(view.render().el);
            },
            addAll: function(){
                Todos.each(this.addOne);
            },
            createOnEnter: function(e) {
                var text = this.input.val();
                if (!text || e.keyCode != 13) return;
                Todos.create({text: text});
                this.input.val('');
            },
            clearCompleted: function() {
                _.each(Todos.done(), function(todo){ todo.destroy(); });
                return false;
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
    });
})(jQuery);
