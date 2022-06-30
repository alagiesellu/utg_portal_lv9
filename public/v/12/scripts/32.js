(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[32],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Options.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/Options.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "Options",
  data: function data() {
    return {
      info_options: {},
      db_options: {},
      option: null,
      form: {
        key: null,
        value: null //*pass password: null,

      }
    };
  },
  mounted: function mounted() {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this.$store.state.page = 'System Configurations';

              _this.get_info_options();

              _this.get_db_options();

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  methods: {
    submitForm: function submitForm(e) {
      var _this2 = this;

      e.preventDefault();
      axios.post('/admin/options/update', this.form).then(function (res) {
        _this2.$root.post_success(res.data.success);

        _this2.db_options = res.data.options;
        _this2.option = null;

        _this2.$modal.hide('option');

        _this2.form = {
          value: null,
          key: null //*pass password: null,

        };
      });
    },
    view_option: function view_option(option) {
      this.option = option;
      this.$modal.show('option');
      this.form = {
        value: option.value,
        key: option.key //*pass password: null,

      };
    },
    get_info_options: function get_info_options() {
      var _this3 = this;

      axios.get('/admin/options/get/info').then(function (res) {
        _this3.info_options = res.data.options;
      });
    },
    get_db_options: function get_db_options() {
      var _this4 = this;

      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      axios.get('/admin/options/get/db?page=' + page).then(function (res) {
        _this4.db_options = res.data.options;
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Options.vue?vue&type=template&id=62b926fa&scoped=true&":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/Options.vue?vue&type=template&id=62b926fa&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "div",
        { staticClass: "card shadow mb-4 mb-xl-0" },
        [
          _c("h2", { staticClass: "card-header bg-transparent" }, [
            _vm._v("\n                System Configurations\n            "),
          ]),
          _vm._v(" "),
          _c("table", { staticClass: "table align-items-center table-flush" }, [
            _vm._m(0),
            _vm._v(" "),
            _c(
              "tbody",
              _vm._l(_vm.db_options.data, function (option) {
                return _c("tr", [
                  _c("td", [
                    _vm._v(_vm._s(_vm.info_options[option.key].info.name)),
                  ]),
                  _vm._v(" "),
                  _c("td", { staticClass: "font-weight-600" }, [
                    _vm._v(_vm._s(option.value)),
                  ]),
                  _vm._v(" "),
                  _c("td", [
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-primary btn-sm",
                        on: {
                          click: function ($event) {
                            return _vm.view_option(option)
                          },
                        },
                      },
                      [_c("i", { staticClass: "ni ni-bullet-list-67" })]
                    ),
                  ]),
                ])
              }),
              0
            ),
          ]),
          _vm._v(" "),
          _c("laravel-vue-pagination", {
            attrs: { limit: 5, data: _vm.db_options, align: "center" },
            on: { "pagination-change-page": _vm.get_db_options },
          }),
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "modal",
        { attrs: { scrollable: true, name: "option", height: "auto" } },
        [
          _vm.option
            ? _c("div", [
                _c("div", { staticClass: "modal-header h2" }, [
                  _vm._v(
                    "\n                    " +
                      _vm._s(_vm.info_options[_vm.option.key].info.name) +
                      "\n                "
                  ),
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "modal-body" }, [
                  _c("small", [
                    _c("p", [
                      _vm._v("Last Updated at "),
                      _c("span", { staticClass: "text-underline" }, [
                        _vm._v(_vm._s(_vm.$root.moment(_vm.option.updated_at))),
                      ]),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c(
                    "form",
                    { on: { submit: _vm.submitForm } },
                    [
                      _c("fake-form-input"),
                      _vm._v(" "),
                      _c("div", { staticClass: "form-group mb-3" }, [
                        _c("div", { staticClass: "input-group" }, [
                          _c("div", { staticClass: "input-group-prepend" }, [
                            _c("span", { staticClass: "input-group-text" }, [
                              _c("i", {
                                staticClass: "ni ni-settings-gear-65",
                              }),
                            ]),
                          ]),
                          _vm._v(" "),
                          _vm.info_options[_vm.option.key].info.type ===
                          "checkbox"
                            ? _c("input", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.form.value,
                                    expression: "form.value",
                                  },
                                ],
                                ref: "option_value",
                                staticClass: "form-control",
                                attrs: {
                                  placeholder: "Option value",
                                  min: _vm.info_options[_vm.option.key].info
                                    .min,
                                  max: _vm.info_options[_vm.option.key].info
                                    .max,
                                  step: _vm.info_options[_vm.option.key].info
                                    .step,
                                  required: "",
                                  type: "checkbox",
                                },
                                domProps: {
                                  checked: Array.isArray(_vm.form.value)
                                    ? _vm._i(_vm.form.value, null) > -1
                                    : _vm.form.value,
                                },
                                on: {
                                  change: function ($event) {
                                    var $$a = _vm.form.value,
                                      $$el = $event.target,
                                      $$c = $$el.checked ? true : false
                                    if (Array.isArray($$a)) {
                                      var $$v = null,
                                        $$i = _vm._i($$a, $$v)
                                      if ($$el.checked) {
                                        $$i < 0 &&
                                          _vm.$set(
                                            _vm.form,
                                            "value",
                                            $$a.concat([$$v])
                                          )
                                      } else {
                                        $$i > -1 &&
                                          _vm.$set(
                                            _vm.form,
                                            "value",
                                            $$a
                                              .slice(0, $$i)
                                              .concat($$a.slice($$i + 1))
                                          )
                                      }
                                    } else {
                                      _vm.$set(_vm.form, "value", $$c)
                                    }
                                  },
                                },
                              })
                            : _vm.info_options[_vm.option.key].info.type ===
                              "radio"
                            ? _c("input", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.form.value,
                                    expression: "form.value",
                                  },
                                ],
                                ref: "option_value",
                                staticClass: "form-control",
                                attrs: {
                                  placeholder: "Option value",
                                  min: _vm.info_options[_vm.option.key].info
                                    .min,
                                  max: _vm.info_options[_vm.option.key].info
                                    .max,
                                  step: _vm.info_options[_vm.option.key].info
                                    .step,
                                  required: "",
                                  type: "radio",
                                },
                                domProps: {
                                  checked: _vm._q(_vm.form.value, null),
                                },
                                on: {
                                  change: function ($event) {
                                    return _vm.$set(_vm.form, "value", null)
                                  },
                                },
                              })
                            : _c("input", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.form.value,
                                    expression: "form.value",
                                  },
                                ],
                                ref: "option_value",
                                staticClass: "form-control",
                                attrs: {
                                  placeholder: "Option value",
                                  min: _vm.info_options[_vm.option.key].info
                                    .min,
                                  max: _vm.info_options[_vm.option.key].info
                                    .max,
                                  step: _vm.info_options[_vm.option.key].info
                                    .step,
                                  required: "",
                                  type: _vm.info_options[_vm.option.key].info
                                    .type,
                                },
                                domProps: { value: _vm.form.value },
                                on: {
                                  input: function ($event) {
                                    if ($event.target.composing) {
                                      return
                                    }
                                    _vm.$set(
                                      _vm.form,
                                      "value",
                                      $event.target.value
                                    )
                                  },
                                },
                              }),
                        ]),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "modal-footer" }, [
                        _c(
                          "button",
                          {
                            staticClass: "btn btn-primary",
                            attrs: { type: "submit" },
                          },
                          [_vm._v("Save changes")]
                        ),
                      ]),
                    ],
                    1
                  ),
                ]),
              ])
            : _vm._e(),
        ]
      ),
    ],
    1
  )
}
var staticRenderFns = [
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", { staticClass: "thead-light" }, [
      _c("tr", [
        _c("th", { attrs: { scope: "col" } }, [_vm._v("Configuration")]),
        _vm._v(" "),
        _c("th", { attrs: { scope: "col" } }, [_vm._v("Value")]),
        _vm._v(" "),
        _c("th", { attrs: { scope: "col" } }),
      ]),
    ])
  },
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/admin/Options.vue":
/*!***************************************************!*\
  !*** ./resources/js/components/admin/Options.vue ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Options_vue_vue_type_template_id_62b926fa_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Options.vue?vue&type=template&id=62b926fa&scoped=true& */ "./resources/js/components/admin/Options.vue?vue&type=template&id=62b926fa&scoped=true&");
/* harmony import */ var _Options_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Options.vue?vue&type=script&lang=js& */ "./resources/js/components/admin/Options.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Options_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Options_vue_vue_type_template_id_62b926fa_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Options_vue_vue_type_template_id_62b926fa_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "62b926fa",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/admin/Options.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/admin/Options.vue?vue&type=script&lang=js&":
/*!****************************************************************************!*\
  !*** ./resources/js/components/admin/Options.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Options_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Options.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Options.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Options_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/admin/Options.vue?vue&type=template&id=62b926fa&scoped=true&":
/*!**********************************************************************************************!*\
  !*** ./resources/js/components/admin/Options.vue?vue&type=template&id=62b926fa&scoped=true& ***!
  \**********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Options_vue_vue_type_template_id_62b926fa_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Options.vue?vue&type=template&id=62b926fa&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Options.vue?vue&type=template&id=62b926fa&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Options_vue_vue_type_template_id_62b926fa_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Options_vue_vue_type_template_id_62b926fa_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);