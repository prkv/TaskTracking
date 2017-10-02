"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var date_value_accessor_1 = require("./date-value-accessor");
var DateValueAccessorModule = (function () {
    function DateValueAccessorModule() {
    }
    return DateValueAccessorModule;
}());
DateValueAccessorModule = __decorate([
    core_1.NgModule({
        declarations: [date_value_accessor_1.DateValueAccessor],
        exports: [date_value_accessor_1.DateValueAccessor]
    })
], DateValueAccessorModule);
exports.DateValueAccessorModule = DateValueAccessorModule;
//# sourceMappingURL=module.js.map