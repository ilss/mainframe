(function (window) {
    window["GLOBAL_FUNC_SIMPLEEDU"] = {
        /**
         * @desc    判断对象自身是否包含某些属性
         * @param {object} obj
         * @param {array} arg_array
         * @returns
         */
        objHasSomeProperty: function (obj, arg_array) {
            if (obj !== undefined && obj instanceof Object) {
                for (var _i = 0, _len = arg_array.length; _i < _len; _i++) {
                    if (!obj.hasOwnProperty(arg_array[_i])) {
                        return false;
                    }
                }
                return true;
            } else {
                return false;
            }
        },
        /**
         * @desc    从对象数组里找到某个key值相等的对象
         * @param {object} obj   目标对象
         * @param {string} obj_key  目标对象的key
         * @param {array} array    对象数组
         * @param {string} array_key    数组里对象对应的key
         * @returns 存在的对象下标  不存在返回-1
         */
        findObjFromArray: function (obj, obj_key, array, array_key) {
            return array.findIndex(function (item) {
                return item[array_key] === obj[obj_key];
            });
        },
        /**
         * @desc    计算两点角度
         * @param {object} pos1     cc.p(x,y)
         * @param {object} pos2     cc.p(x,y)
         * @returns     两点的角度
         */
        getRotate: function (pos1, pos2) {
            var o = pos1.x - pos2.x,
                a = pos1.y - pos2.y,
                _at = Math.atan(o / a) * 180 / Math.PI;
            if (a < 0) {
                if (o < 0)
                    _at = 180 + Math.abs(_at);
                else
                    _at = 180 - Math.abs(_at);
            }
            _at -= 90;
            return Math.round(_at);
        },
        distanceToActionTime: function (pos1, pos2, move_speed) {
            return cc.pDistance(pos1, pos2) / move_speed;
        },
        isArray: function (obj) {
            return Object.prototype.toString.call(obj) === '[object Array]';
        }
    }
}(window));