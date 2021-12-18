"use strict";
exports.__esModule = true;
exports.User = void 0;
var mongoose_1 = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');
//Change these to enforce unique email/username requirements
var REQUIRE_UNIQUE_EMAIL = false;
var REQUIRE_UNIQUE_USERNAME = false;
var UserSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: REQUIRE_UNIQUE_EMAIL },
    username: { type: String, required: true, unique: REQUIRE_UNIQUE_USERNAME },
    password: { type: String, required: true }
});
if (REQUIRE_UNIQUE_EMAIL || REQUIRE_UNIQUE_USERNAME) {
    UserSchema.plugin(uniqueValidator);
}
var User = (0, mongoose_1.model)('User', UserSchema);
exports.User = User;
