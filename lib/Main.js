"use strict";
var fs = require('fs-extra');
var path = require('path');
var Section = require('./Section');
var Environment = require('./Environment');
var _ = /** @class */ (function () {
    function _(props) {
        this._props = Object.assign({}, props);
        this._env = new Environment(this.props.env);
        this._name = this.props.name || 'dodi';
        this._dir = this.props.dir || this.env.userDir;
        this._path = path.resolve(this.dir, "." + this.name);
    }
    Object.defineProperty(_.prototype, "props", {
        get: function () {
            return this._props;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_.prototype, "env", {
        get: function () {
            return this._env;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_.prototype, "dir", {
        get: function () {
            return this._dir;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_.prototype, "path", {
        get: function () {
            return this._path;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_.prototype, "sections", {
        get: function () {
            return this._sections || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_.prototype, "exists", {
        get: function () {
            return this.path && fs.existsSync(path.resolve(this.path));
        },
        enumerable: true,
        configurable: true
    });
    _.prototype.initialize = function () {
        var _this = this;
        // Create the root first, if necessary
        this.exists || fs.mkdirsSync(this.path);
        // Let's allocate sections as needed
        this._sections = {};
        this.props.sections && this.props.sections.map(function (section) { _this._sections[section.id] = new Section(_this, section); });
        return Promise.all(Object.values(this.sections).map(function (section) { return section.initialize(); }));
    };
    _.prototype.installArchive = function (args) {
        var section = this.sections[args.section || _.DEFAULT_ARCHIVES_SECTION];
        if (!section) {
            return Promise.reject(new Error(_.ERRORS.CANNOT_FIND_SECTION('it does not exist')));
        }
        return section.installArchive({ silent: args.silent, id: args.id, version: args.version });
    };
    return _;
}());
_.ERRORS = {
    CANNOT_FIND_SECTION: function (reason) { return reason ? "Cannot find the section because " + reason : "Cannot find the section"; }
};
_.DEFAULT_ARCHIVES_SECTION = 'archives';
module.exports = _;
//# sourceMappingURL=Main.js.map