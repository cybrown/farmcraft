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
        join = path.join;

    require('express/lib/view').prototype.lookup = function (path) {
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
                return path;
            }
        } else {
            for (i = 0, max = this.root.length; i < max; i += 1) {
                oldPath = path;
                if (!utils.isAbsolute(path)) {
                    path = join(this.root[i], path);
                }
                if (exists(path)) {
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
}());
