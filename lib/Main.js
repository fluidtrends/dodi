"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Index = void 0;
var fs_extra_1 = __importDefault(require("fs-extra"));
var path_1 = __importDefault(require("path"));
var _1 = require(".");
var Index = /** @class */ (function () {
    function Index(props) {
        this._props = Object.assign({}, props);
        this._env = new _1.Environment(this.props.env);
        this._name = this.props.name || 'dodi';
        this._dir = this.props.dir || this.env.userDir;
        this._path = path_1.default.resolve(this.dir, "." + this.name);
    }
    Object.defineProperty(Index.prototype, "props", {
        get: function () {
            return this._props;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Index.prototype, "env", {
        get: function () {
            return this._env;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Index.prototype, "dir", {
        get: function () {
            return this._dir;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Index.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Index.prototype, "path", {
        get: function () {
            return this._path;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Index.prototype, "sections", {
        get: function () {
            return this._sections || {};
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Index.prototype, "exists", {
        get: function () {
            return this.path && fs_extra_1.default.existsSync(path_1.default.resolve(this.path));
        },
        enumerable: false,
        configurable: true
    });
    Index.prototype.initialize = function () {
        var _this = this;
        // Create the root first, if necessary
        this.exists || fs_extra_1.default.mkdirsSync(this.path);
        // Let's allocate sections as needed
        this._sections = {};
        this.props.sections && this.props.sections.map(function (section) { _this._sections[section.id] = new _1.Section(_this, section); });
        return Promise.all(Object.values(this.sections).map(function (section) { return section.initialize(); }));
    };
    Index.prototype.installArchive = function (args) {
        var section = this.sections[args.section || Index.DEFAULT_ARCHIVES_SECTION];
        if (!section) {
            return Promise.reject(new Error(Index.ERRORS.CANNOT_FIND_SECTION('it does not exist')));
        }
        return section.installArchive({ silent: args.silent, id: args.id, version: args.version });
    };
    Index.ERRORS = {
        CANNOT_FIND_SECTION: function (reason) { return reason ? "Cannot find the section because " + reason : "Cannot find the section"; }
    };
    Index.DEFAULT_ARCHIVES_SECTION = 'archives';
    return Index;
}());
exports.Index = Index;
//# sourceMappingURL=Main.js.map