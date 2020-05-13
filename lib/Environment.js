"use strict";
var platformData = require('platform');
var _ = /** @class */ (function () {
    function _(props) {
        this._props = Object.assign({}, props);
        this._userDir = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
        this._platform = Object.assign({}, platformData);
    }
    Object.defineProperty(_.prototype, "props", {
        get: function () {
            return this._props;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_.prototype, "userDir", {
        get: function () {
            return this._userDir;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_.prototype, "platform", {
        get: function () {
            return this._platform;
        },
        enumerable: true,
        configurable: true
    });
    return _;
}());
module.exports = _;
//# sourceMappingURL=Environment.js.map