"use strict";
// abstract class
//  can't be used to create an object directly
//  only used as a parent class
//  can contain real implementation for some methods
// the implemented methods can refer to other methods that don't actually exist yet (we still have to provide names and types for the un-implemented methods)
// can make child classes promise to implement some other method
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sorter = void 0;
var Sorter = /** @class */ (function () {
    function Sorter() {
    }
    Sorter.prototype.sort = function () {
        var length = this.length;
        for (var i = 0; i < length; i++) {
            for (var j = 0; j < length - i - 1; j++) {
                if (this.compare(j, j + 1)) {
                    this.swap(j, j + 1);
                }
            }
        }
    };
    return Sorter;
}());
exports.Sorter = Sorter;
