YourNewCookBook.com
===================

Prerequisites
-------------

You will want [CouchDB 1.1](http://wiki.apache.org/couchdb/Installation) or greater.

You will also need [lessc](http://lesscss.org/) and [uglifyjs](https://github.com/mishoo/UglifyJS) for the build step.

Since browsers don't allow cross-domain AJAX requests, you will probably need to configure
some sort of reverse proxy so your web application can make requests to the CouchDB server.
For Apache 2, enabling mod\_proxy and using a ProxyPass rule like so may work:

    ProxyPass /couchdb/ http://yournewcookbook:5984/

Building
--------

YourNewCookBook.com has a build script called "make.sh" in the
root directory of the application.

If you have all prerequisites available on your PATH, you should
just be able to run `./make.sh` and it will create a new \_site/
directory containing the "ready" site. Loading \_site/index.html
in your web browser should work if your CouchDB instance and web
server is configured properly.

Layout
------

The application layout is as such:

    .
    ├── index.html
    ├── js
    │   ├── common
    │   ├── ingredient
    │   │   ├── collection.js
    │   │   ├── model.js
    │   │   └── view.js
    │   ├── recipe
    │   │   ├── collection.js
    │   │   ├── model.js
    │   │   └── view.js
    │   ├── setup.js
    │   └── yournewcookbook.js
    ├── less
    │   ├── common
    │   │   ├── layout.less
    │   │   └── reset.less
    │   └── ingredient.less
    ├── make.sh
    ├── README.md
    ├── \_site
    │   ├── css.css
    │   ├── index.html
    │   └── js.js
    └── templates
        ├── ingredient.html
        └── recipe.html

*The \_site directory is the build directory and contains only built
code. The workflow is to make changes in the general project directories,
run `make.sh`, and then open the built application in \_site/.*

### index.html
index.html is the base template for the application. It contains references
to the various JavaScript files, LESS files, and Underscore templates it
pulls in. It also contains the basic HTML layout for the application wrapper.

You can see in the file blocks like such:

    [JS]
        common/jquery
    [/JS]

This block tells `make.sh` to include the `js/common/jquery.js` file, minified,
in the project's \_site/js.js file. The JS includes are handled in the order they
are encountered.

Similar are the [LESS] and [TEMPLATES] directives.

### js/
js/ is the directory in which the project's JavaScript libraries exist. They are included
in the project by the import directives in index.html. 

By convention, there is a js/common/ directory. This directory should contain general purpose
JS libraries -- jQuery, Backbone, that kind of thing.

js/setup.js contains non-application-specific setup of the various libraries we use -- I've used
it to monkey patch in some handy features into Backbone.js, for example.

js/yournewcookbook.js is the application startup script. This should contain the logic to return
the main application view, set to window.AppView.

There are subdirectories in js/ as well, ex. js/ingredient and js/recipe. These are Backbone elements
consisting of model/view/collection.

### less/
less/ is the directory in which the project's LESS templates exist. They are included
in the project by the import directives in index.html.

These are also laid out similarly to the JS albeit with only one LESS file per element at the moment
rather than directories. *This may change.*

### make.sh
The build script.

### README.md
This

### \_site/
The directory containing the built site.

### templates/
A directory containing Underscore templates. They should be named similarly to the element for which
they render.
