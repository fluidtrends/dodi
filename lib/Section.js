"use strict";
var path = require('path');
var Cassi = require('cassi');
var Archive = require('rara').Archive;
var fs = require('fs-extra');
var _ = /** @class */ (function () {
    function _(index, props) {
        this._index = index;
        this._props = Object.assign({}, props);
        this._path = (index && index.dir && this.props.id) ? path.resolve(this.index.path, "" + (this.props.secure ? '.' : '') + this.props.id) : null;
    }
    Object.defineProperty(_.prototype, "isSecure", {
        get: function () {
            return this.props.secure;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_.prototype, "index", {
        get: function () {
            return this._index;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_.prototype, "props", {
        get: function () {
            return this._props;
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
    Object.defineProperty(_.prototype, "id", {
        get: function () {
            return this.props.id;
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
    Object.defineProperty(_.prototype, "vault", {
        get: function () {
            return this._vault;
        },
        enumerable: true,
        configurable: true
    });
    _.prototype.findArchive = function (args) {
        var archiveArgs = Object.assign({}, { dir: this.path }, args);
        var archive = new Archive(archiveArgs);
        return archive.initialize()
            .then(function () { return archive.exists ? (args.load ? archive.load() : archive) : null; });
    };
    _.prototype.installArchive = function (args) {
        var archiveArgs = Object.assign({}, { dir: this.path }, args);
        var archive = new Archive(archiveArgs);
        // First check if it's cached
        return this.findArchive(archiveArgs)
            .then(function (_archive) {
            return _archive ? (args.load ? _archive.load() : _archive) : archive.download().then(function () { return args.load ? archive.load() : archive; });
        });
    };
    _.prototype.initialize = function () {
        if (!this.path) {
            // First make sure the path exists
            return Promise.reject(new Error(_.ERRORS.CANNOT_INIT('no location was specified')));
        }
        // Create it first if necessary
        this.exists || fs.mkdirsSync(this.path);
        // Let's look up the vault
        var service = this.index.name + "." + this.id;
        this._vault = new Cassi.Vault({ service: service, name: _.VAULT_NAME, root: path.resolve(this.path) });
        // Create the vault if necessary
        return this._vault.initialize();
    };
    return _;
}());
_.ERRORS = {
    CANNOT_INIT: function (reason) { return reason ? "Cannot initialize section because " + reason : "Cannot initialize section"; }
};
_.VAULT_NAME = '.data';
module.exports = _;
//# sourceMappingURL=Section.js.map