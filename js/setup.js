(function ($) {

    $(function(){
        window.collections = {};
        window.views = {};
        window.models = {};

        Backbone.couch_connector.config.db_name = "yournewcookbook";
        Backbone.couch_connector.config.ddoc_name = "yournewcookbook";
        Backbone.couch_connector.config.global_changes = true;
        Backbone.couch_connector.config.base_url = "couchdb";

        // set up some input field finding utility methods
        Backbone.View.prototype.getInput = function(sel) {
            return this.inputs.filter(sel);
        };
    });
})(jQuery);
