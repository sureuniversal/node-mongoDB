"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var mongodb_1 = __importDefault(require("mongodb"));
var MongoDbManager = /** @class */ (function () {
    function MongoDbManager() {
    }
    MongoDbManager.init = function (dbServer) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = MongoDbManager;
                        return [4 /*yield*/, mongodb_1.default.connect(dbServer)];
                    case 1:
                        _a.client = _b.sent();
                        return [4 /*yield*/, MongoDbManager.initDb()];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MongoDbManager.find = function (dbName, collectionName, filter, project) {
        if (project === void 0) { project = []; }
        return __awaiter(this, void 0, void 0, function () {
            var collection, projectFilter, docs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        collection = MongoDbManager.getCollection(dbName, collectionName);
                        projectFilter = project.length > 0 ? MongoDbManager.buildProjectFilter(project) : {};
                        return [4 /*yield*/, collection.find(filter, projectFilter).toArray()];
                    case 1:
                        docs = _a.sent();
                        return [2 /*return*/, docs];
                }
            });
        });
    };
    MongoDbManager.findOne = function (dbName, collectionName, filter, project) {
        if (project === void 0) { project = []; }
        return __awaiter(this, void 0, void 0, function () {
            var collection, projectFilter, docs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        collection = MongoDbManager.getCollection(dbName, collectionName);
                        projectFilter = project.length > 0 ? MongoDbManager.buildProjectFilter(project) : {};
                        return [4 /*yield*/, collection.findOne(filter, projectFilter)];
                    case 1:
                        docs = _a.sent();
                        return [2 /*return*/, docs];
                }
            });
        });
    };
    MongoDbManager.insertMany = function (dbName, collectionName, insertDocs) {
        return __awaiter(this, void 0, void 0, function () {
            var collection, docs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        collection = MongoDbManager.getCollection(dbName, collectionName);
                        return [4 /*yield*/, collection.insertMany(insertDocs)];
                    case 1:
                        docs = _a.sent();
                        return [2 /*return*/, docs];
                }
            });
        });
    };
    MongoDbManager.insert = function (dbName, collectionName, document) {
        return __awaiter(this, void 0, void 0, function () {
            var collection, docs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        collection = MongoDbManager.getCollection(dbName, collectionName);
                        return [4 /*yield*/, collection.insert(document)];
                    case 1:
                        docs = _a.sent();
                        return [2 /*return*/, docs];
                }
            });
        });
    };
    MongoDbManager.deleteMany = function (dbName, collectionName, document) {
        return __awaiter(this, void 0, void 0, function () {
            var collection, docs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        collection = MongoDbManager.getCollection(dbName, collectionName);
                        return [4 /*yield*/, collection.deleteMany(document)];
                    case 1:
                        docs = _a.sent();
                        return [2 /*return*/, docs];
                }
            });
        });
    };
    MongoDbManager.update = function (dbName, collectionName, filter, set) {
        return __awaiter(this, void 0, void 0, function () {
            var collection, updateQuery, updateOneOptions, docs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        collection = MongoDbManager.getCollection(dbName, collectionName);
                        updateQuery = {
                            $set: set,
                        };
                        updateOneOptions = {
                            upsert: true
                        };
                        return [4 /*yield*/, collection.update(filter, updateQuery, updateOneOptions)];
                    case 1:
                        docs = _a.sent();
                        return [2 /*return*/, docs];
                }
            });
        });
    };
    MongoDbManager.getCollection = function (dbName, collectionName) {
        var db = MongoDbManager.client.db(dbName);
        var collection = db.collection(collectionName);
        return collection;
    };
    MongoDbManager.buildProjectFilter = function (params) {
        var project = {};
        for (var _i = 0, params_1 = params; _i < params_1.length; _i++) {
            var entry = params_1[_i];
            project[entry] = 1;
        }
        var projection = {
            projection: project
        };
        return projection;
    };
    MongoDbManager.buildInFilter = function (params) {
        return { "$in": this.buildFilter(params) };
    };
    MongoDbManager.buildAndFilter = function (params) {
        return { "$and": this.buildFilter(params) };
    };
    MongoDbManager.buildOrFilter = function (params) {
        return { "$or": this.buildFilter(params) };
    };
    MongoDbManager.buildFilter = function (params) {
        var filters = [];
        for (var _i = 0, params_2 = params; _i < params_2.length; _i++) {
            var entry = params_2[_i];
            filters.push(entry);
        }
        return filters;
    };
    MongoDbManager.initDb = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return MongoDbManager;
}());
module.exports = MongoDbManager;
//# sourceMappingURL=index.js.map