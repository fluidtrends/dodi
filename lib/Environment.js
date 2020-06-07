"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Environment = void 0;
var platformData = __importStar(require("platform"));
var Environment = /** @class */ (function () {
    function Environment(props) {
        this._props = Object.assign({}, props);
        this._userDir = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
        this._platform = Object.assign({}, platformData);
    }
    Object.defineProperty(Environment.prototype, "props", {
        get: function () {
            return this._props;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Environment.prototype, "userDir", {
        get: function () {
            return this._userDir;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Environment.prototype, "platform", {
        get: function () {
            return this._platform;
        },
        enumerable: false,
        configurable: true
    });
    return Environment;
}());
exports.Environment = Environment;
//# sourceMappingURL=Environment.js.map