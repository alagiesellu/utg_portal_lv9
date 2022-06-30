(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[31],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Logs.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/Logs.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
  name: "Logs",
  data: function data() {
    return {
      db_logs: {},
      db_log: {},
      filter: {
        form: {
          user: null,
          model: null,
          model_id: null,
          user_id: null
        },
        data: {
          users: [],
          models: []
        }
      },
      models: [],
      infos: []
    };
  },
  mounted: function mounted() {
    this.$store.state.page = 'Activity Logs';
    this.get_logs();
  },
  watch: {
    //'filter.form.user': 'search_user',
    'filter.form.model': 'search_modal'
  },
  methods: {
    search_modal: function search_modal() {
      var _this = this;

      if (this.filter.form.model) {
        axios.post('/admin/logs/find-models', {
          search: this.filter.form.model
        }).then(function (res) {
          _this.filter.data.models = res.data.models;
        });
      } else this.filter.data.models = [];
    },
    search_user: function search_user() {
      var _this2 = this;

      axios.post('/admin/search/users', {
        search: this.filter.form.user
      }).then(function (res) {
        _this2.filter.data.users = res.data.users;
      });
    },
    filter_logs: function filter_logs(e) {
      var _this3 = this;

      e.preventDefault();
      axios.post('/admin/logs/filter', this.filter.form).then(function (res) {
        _this3.db_logs = res.data.db_logs;
        _this3.infos = res.data.db_infos;
      });
    },
    get_logs: function get_logs() {
      var _this4 = this;

      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      axios.post('/admin/logs?page=' + page, this.filter.form).then(function (res) {
        _this4.db_logs = res.data.db_logs;
        _this4.infos = res.data.db_infos;
      });
      axios.get('/admin/logs/models').then(function (res) {
        _this4.models = res.data.db_models;
      });
    },
    get_log: function get_log(log) {
      var _this5 = this;

      axios.get('/admin/logs/' + log.id).then(function (res) {
        _this5.db_log = res.data.db_log;

        _this5.$modal.show('modal');
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Logs.vue?vue&type=template&id=e5e17ccc&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/Logs.vue?vue&type=template&id=e5e17ccc&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************/
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
            _vm._v("\n            Logs\n        "),
          ]),
          _vm._v(" "),
          _c(
            "form",
            {
              staticClass: "card-footer col-md-12",
              on: { submit: _vm.filter_logs },
            },
            [
              _c("div", { staticClass: "form-group" }, [
                _c(
                  "div",
                  { staticClass: "input-group mb-4" },
                  [
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.filter.form.user,
                          expression: "filter.form.user",
                        },
                      ],
                      staticClass: "form-control",
                      attrs: {
                        placeholder: "Search user by email",
                        type: "text",
                      },
                      domProps: { value: _vm.filter.form.user },
                      on: {
                        change: _vm.search_user,
                        input: function ($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.filter.form, "user", $event.target.value)
                        },
                      },
                    }),
                    _vm._v(" "),
                    _c("v-select", {
                      staticClass: "form-control",
                      attrs: {
                        options: _vm.filter.data.users,
                        reduce: function (user) {
                          return user.id
                        },
                        label: "email",
                      },
                      scopedSlots: _vm._u([
                        {
                          key: "search",
                          fn: function (ref) {
                            var attributes = ref.attributes
                            var events = ref.events
                            return [
                              _c(
                                "input",
                                _vm._g(
                                  _vm._b(
                                    { staticClass: "vs__search" },
                                    "input",
                                    attributes,
                                    false
                                  ),
                                  events
                                )
                              ),
                            ]
                          },
                        },
                      ]),
                      model: {
                        value: _vm.filter.form.user_id,
                        callback: function ($$v) {
                          _vm.$set(_vm.filter.form, "user_id", $$v)
                        },
                        expression: "filter.form.user_id",
                      },
                    }),
                  ],
                  1
                ),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "form-group" }, [
                _c(
                  "div",
                  { staticClass: "input-group mb-4" },
                  [
                    _c("v-select", {
                      staticClass: "form-control",
                      attrs: {
                        options: _vm.models,
                        reduce: function (model) {
                          return model.model
                        },
                        label: "model",
                      },
                      scopedSlots: _vm._u([
                        {
                          key: "search",
                          fn: function (ref) {
                            var attributes = ref.attributes
                            var events = ref.events
                            return [
                              _c(
                                "input",
                                _vm._g(
                                  _vm._b(
                                    { staticClass: "vs__search" },
                                    "input",
                                    attributes,
                                    false
                                  ),
                                  events
                                )
                              ),
                            ]
                          },
                        },
                      ]),
                      model: {
                        value: _vm.filter.form.model,
                        callback: function ($$v) {
                          _vm.$set(_vm.filter.form, "model", $$v)
                        },
                        expression: "filter.form.model",
                      },
                    }),
                    _vm._v(" "),
                    _c("v-select", {
                      staticClass: "form-control",
                      attrs: {
                        options: _vm.infos,
                        reduce: function (info) {
                          return info.info
                        },
                        label: "info",
                      },
                      scopedSlots: _vm._u([
                        {
                          key: "search",
                          fn: function (ref) {
                            var attributes = ref.attributes
                            var events = ref.events
                            return [
                              _c(
                                "input",
                                _vm._g(
                                  _vm._b(
                                    { staticClass: "vs__search" },
                                    "input",
                                    attributes,
                                    false
                                  ),
                                  events
                                )
                              ),
                            ]
                          },
                        },
                      ]),
                      model: {
                        value: _vm.filter.form.info,
                        callback: function ($$v) {
                          _vm.$set(_vm.filter.form, "info", $$v)
                        },
                        expression: "filter.form.info",
                      },
                    }),
                    _vm._v(" "),
                    _c("v-select", {
                      staticClass: "form-control",
                      attrs: {
                        options: _vm.filter.data.models,
                        reduce: function (model) {
                          return model.id
                        },
                        label: "id",
                      },
                      scopedSlots: _vm._u([
                        {
                          key: "search",
                          fn: function (ref) {
                            var attributes = ref.attributes
                            var events = ref.events
                            return [
                              _c(
                                "input",
                                _vm._g(
                                  _vm._b(
                                    { staticClass: "vs__search" },
                                    "input",
                                    attributes,
                                    false
                                  ),
                                  events
                                )
                              ),
                            ]
                          },
                        },
                      ]),
                      model: {
                        value: _vm.filter.form.model_id,
                        callback: function ($$v) {
                          _vm.$set(_vm.filter.form, "model_id", $$v)
                        },
                        expression: "filter.form.model_id",
                      },
                    }),
                  ],
                  1
                ),
              ]),
              _vm._v(" "),
              _c(
                "button",
                {
                  staticClass: "btn btn-outline-primary float-right",
                  attrs: { type: "submit" },
                },
                [_vm._v("\n                Filter Logs\n            ")]
              ),
            ]
          ),
          _vm._v(" "),
          _c("table", { staticClass: "table align-items-center table-flush" }, [
            _vm._m(0),
            _vm._v(" "),
            _c(
              "tbody",
              _vm._l(_vm.db_logs.data, function (db_log) {
                return _c("tr", [
                  _c("td", [_vm._v(_vm._s(_vm.$root.full_name(db_log.user)))]),
                  _vm._v(" "),
                  _c("td", [_vm._v(_vm._s(db_log.model))]),
                  _vm._v(" "),
                  _c("td", [_vm._v(_vm._s(db_log.info))]),
                  _vm._v(" "),
                  _c("td", [
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-primary btn-sm",
                        on: {
                          click: function ($event) {
                            return _vm.get_log(db_log)
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
            attrs: { limit: 5, data: _vm.db_logs, align: "center" },
            on: { "pagination-change-page": _vm.get_logs },
          }),
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "modal",
        { attrs: { scrollable: true, name: "modal", height: "auto" } },
        [
          _c(
            "button",
            {
              staticClass: "btn btn-danger btn-sm float-right",
              on: {
                click: function ($event) {
                  return _vm.$modal.hide("modal")
                },
              },
            },
            [_vm._v("❌")]
          ),
          _vm._v(" "),
          _c("div", { staticClass: "modal-header" }, [_vm._v("Activity Log")]),
          _vm._v(" "),
          _c("div", { staticClass: "modal-body" }, [
            _c("table", { staticClass: "table" }, [
              _c("tbody", [
                _vm.db_log.user
                  ? _c("tr", [
                      _c("td", [_vm._v("User")]),
                      _vm._v(" "),
                      _c("th", [
                        _vm._v(_vm._s(_vm.$root.full_name(_vm.db_log.user))),
                      ]),
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _c("tr", [
                  _c("td", [_vm._v("Info")]),
                  _vm._v(" "),
                  _c("th", [_vm._v(_vm._s(_vm.db_log.info))]),
                ]),
                _vm._v(" "),
                _c("tr", [
                  _c("td", [_vm._v("Model")]),
                  _vm._v(" "),
                  _c("th", [_vm._v(_vm._s(_vm.db_log.model))]),
                ]),
                _vm._v(" "),
                _vm.db_log.data
                  ? _c("tr", [
                      _c("td", [_vm._v("Data")]),
                      _vm._v(" "),
                      _c(
                        "th",
                        _vm._l(Object.keys(_vm.db_log.data), function (key) {
                          return _c("li", [
                            _vm._v(
                              "\n                            " +
                                _vm._s(key) +
                                ": " +
                                _vm._s(_vm.db_log.data[key]) +
                                "\n                        "
                            ),
                          ])
                        }),
                        0
                      ),
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _c("tr", [
                  _c("td", [_vm._v("Timestamp")]),
                  _vm._v(" "),
                  _c("th", [_vm._v(_vm._s(_vm.db_log.created_at))]),
                ]),
              ]),
            ]),
          ]),
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
        _c("th", { attrs: { scope: "col" } }, [_vm._v("User")]),
        _vm._v(" "),
        _c("th", { attrs: { scope: "col" } }, [_vm._v("Model")]),
        _vm._v(" "),
        _c("th", { attrs: { scope: "col" } }, [_vm._v("Info")]),
        _vm._v(" "),
        _c("th", { attrs: { scope: "col" } }),
      ]),
    ])
  },
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/admin/Logs.vue":
/*!************************************************!*\
  !*** ./resources/js/components/admin/Logs.vue ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Logs_vue_vue_type_template_id_e5e17ccc_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Logs.vue?vue&type=template&id=e5e17ccc&scoped=true& */ "./resources/js/components/admin/Logs.vue?vue&type=template&id=e5e17ccc&scoped=true&");
/* harmony import */ var _Logs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Logs.vue?vue&type=script&lang=js& */ "./resources/js/components/admin/Logs.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Logs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Logs_vue_vue_type_template_id_e5e17ccc_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Logs_vue_vue_type_template_id_e5e17ccc_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "e5e17ccc",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/admin/Logs.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/admin/Logs.vue?vue&type=script&lang=js&":
/*!*************************************************************************!*\
  !*** ./resources/js/components/admin/Logs.vue?vue&type=script&lang=js& ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Logs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Logs.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Logs.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Logs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/admin/Logs.vue?vue&type=template&id=e5e17ccc&scoped=true&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/components/admin/Logs.vue?vue&type=template&id=e5e17ccc&scoped=true& ***!
  \*******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Logs_vue_vue_type_template_id_e5e17ccc_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Logs.vue?vue&type=template&id=e5e17ccc&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Logs.vue?vue&type=template&id=e5e17ccc&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Logs_vue_vue_type_template_id_e5e17ccc_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Logs_vue_vue_type_template_id_e5e17ccc_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);