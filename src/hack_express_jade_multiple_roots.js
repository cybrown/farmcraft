/*
    Monkey path pour express et jade pour pouvoir utiliser plusieurs
    dossiers pour la recherche de template.

    Attention !! La surcharge des templates n'est pas prise en compte,
    le premier fichier trouve sera celui utilise !!
*/

/*jslint stupid: true */
/*global require */
(function () {
    "use strict";
    var path = require('path'),
        fs = require('fs'),
        utils = require('express/lib/utils'),
        dirname = path.dirname,
        basename = path.basename,
        exists = fs.existsSync || path.existsSync,
        join = path.join,
        View = require('express/lib/view'),
        Parser = require('jade/lib/parser'),
        nodes = require('jade/lib/nodes');

    View.prototype.lookup = function (path) {
        var ext = this.ext,
            i = 0,
            max = 0,
            oldPath = '';

        // <path>.<engine>
        if (typeof this.root === 'string') {
            if (!utils.isAbsolute(path)) {
                path = join(this.root, path);
            }
            if (exists(path)) {
                this.viewPath = this.root;
                return path;
            }
        } else {
            for (i = 0, max = this.root.length; i < max; i += 1) {
                oldPath = path;
                if (!utils.isAbsolute(path)) {
                    path = join(this.root[i], path);
                }
                if (exists(path)) {
                    this.viewPath = this.root[i];
                    return path;
                }
                path = oldPath;
            }
        }


        // <path>/index.<engine>
        path = join(dirname(path), basename(path, ext), 'index' + ext);
        if (exists(path)) {
            return path;
        }
    };

    View.prototype.render = function(options, fn){
        options.viewPath = this.viewPath;
        this.engine(this.path, options, fn);
    };

    Parser.prototype.parseExtends = function () {
        var path = require('path');
        var fs = require('fs');
        var dirname = path.dirname;
        var join = path.join;
        var exists = fs.existsSync || path.existsSync;
        var relative = path.relative;

        if (!this.filename)
            throw new Error('the "filename" option is required to extend templates');

        path = this.expect('extends').val.trim();

        var i, v, path2;
        path += '.jade';
        for (i in this.options.settings.views) {
            v = this.options.settings.views[i];
            path2 = join(v, dirname(relative(this.options.viewPath, this.filename)), path);
            if (exists(path2)) {
                path = path2;
                break;
            }
        }

        var str = fs.readFileSync(path, 'utf8');
        var parser = new Parser(str, path, this.options);

        parser.blocks = this.blocks;
        parser.contexts = this.contexts;
        this.extending = parser;

        return new nodes.Literal('');
    };
}());
