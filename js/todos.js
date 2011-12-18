(function ($) {

    $(function(){
        Backbone.couch_connector.config.base_url = "/couchdb";
        Backbone.couch_connector.config.db_name = "todos-app";
        Backbone.couch_connector.config.ddoc_name = "todos-app";
        Backbone.couch_connector.config.global_changes = true;

        Todo = Backbone.Model.extend();

        window.TodoList = Backbone.Collection.extend({
            model: Todo,
            //localStorage: new Store('todos'),
            url: "/todos",
        });

        window.Todos = new TodoList;

        window.TodoView = Backbone.View.extend({
            tagName: "li",
            render: function(){
                var content = this.model.get('content');
                $(this.el).html(content);
                return this;
            },
        });

        AppView = Backbone.View.extend({
            initialize: function() {
                _.bindAll(this, 'addOne', 'addAll');

                this.input = this.$("#new-todo");

                Todos.bind('add', this.addOne);
                Todos.bind('refresh', this.addAll);

                Todos.fetch();
            },
            addOne: function(todo){
                var view = new TodoView({model: todo});
                this.$("#todo-list").append(view.render().el);
            },
            addAll: function(){
                Todos.each(this.addOne);
            },
            el: $(".content"),
            events: {
                "keypress #new-todo": "createOnEnter",
            },
            createOnEnter: function(e) {
                if(e.keyCode != 13) return;
                Todos.create({content: this.input.val()});
                $("#new-todo").val('');
            }
        });
        console.log("as");
        App = new AppView;
    });
})(jQuery);
