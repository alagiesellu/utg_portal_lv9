(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[35],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/students/Finance.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/students/Finance.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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
  name: "Finance",
  data: function data() {
    return {
      payments: [],
      payment: null,
      receipt: null,
      term_receipts: [],
      balance: 0,
      currency: ''
    };
  },
  created: function created() {
    this.get_user();
  },
  watch: {
    '$route': 'get_user'
  },
  methods: {
    view_receipt: function view_receipt(receipt) {
      var _this = this;

      this.$modal.show('view');
      this.payment = this.receipt = null;
      axios.get('/students/finance/get/receipt/' + receipt.id).then(function (res) {
        _this.receipt = res.data.receipt;
      });
    },
    view_payment: function view_payment(payment) {
      var _this2 = this;

      this.$modal.show('view');
      this.payment = this.receipt = null;
      axios.get('/students/finance/get/payment/' + payment.id).then(function (res) {
        _this2.payment = res.data.payment;
      });
    },
    load_data: function load_data(data) {
      this.balance = 0;
      this.user = data.user;
      this.profile = data.profile;
      this.currency = this.user.nationality === 'GM' ? 'GMD' : '$';
      this.payments = data.profile.payments;

      var _iterator = _createForOfIteratorHelper(this.payments),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var payment = _step.value;
          if (payment.cancelled_by_admin_profile_id === null) this.balance += payment.amount;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      this.term_receipts = data.profile.term_receipts;

      var _iterator2 = _createForOfIteratorHelper(this.term_receipts),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var term_receipt = _step2.value;
          if (term_receipt.cancelled_by_admin_profile_id === null) this.balance -= term_receipt.amount;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    },
    get_user: function get_user() {
      var _this3 = this;

      axios.get('/students/finance').then(function (res) {
        _this3.load_data(res.data);
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/students/Finance.vue?vue&type=template&id=99fd51e4&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/students/Finance.vue?vue&type=template&id=99fd51e4&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************/
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
  return _c("div", [
    _c("div", { staticClass: "row" }, [
      _c("div", { staticClass: "col-12" }, [
        _c("div", { staticClass: "card shadow" }, [
          _c("div", { staticClass: "table-responsive" }, [
            _c(
              "table",
              { staticClass: "table align-items-center table-flush" },
              [
                _vm._m(0),
                _vm._v(" "),
                _c(
                  "tbody",
                  [
                    _vm._l(_vm.payments, function (payment) {
                      return _c(
                        "tr",
                        {
                          class: [
                            payment.cancelled_by_admin_profile_id == null
                              ? ""
                              : "text-danger",
                          ],
                        },
                        [
                          _c("td", [
                            _vm._v(
                              "\n                                " +
                                _vm._s(
                                  _vm.$root.format_date(payment.created_at)
                                ) +
                                "\n                            "
                            ),
                          ]),
                          _vm._v(" "),
                          _c("td", [
                            _vm._v(
                              _vm._s(payment.currency_key) +
                                " " +
                                _vm._s(_vm.$root.amount(payment.amount))
                            ),
                          ]),
                        ]
                      )
                    }),
                    _vm._v(" "),
                    !_vm.payments.length
                      ? _c("tr", [
                          _c("td", { staticClass: "text-danger" }, [
                            _vm._v("No payment records.."),
                          ]),
                        ])
                      : _vm._e(),
                  ],
                  2
                ),
                _vm._v(" "),
                _vm._m(1),
                _vm._v(" "),
                _c(
                  "tbody",
                  [
                    _vm._l(_vm.term_receipts, function (receipt) {
                      return _c(
                        "tr",
                        {
                          class: [
                            receipt.cancelled_by_admin_profile_id == null
                              ? ""
                              : "text-danger",
                          ],
                        },
                        [
                          _c("td", [
                            _vm._v(
                              "\n                                " +
                                _vm._s(receipt.term.name) +
                                "\n                            "
                            ),
                          ]),
                          _vm._v(" "),
                          _c("td", [
                            _vm._v(
                              _vm._s(receipt.currency_key) +
                                " " +
                                _vm._s(_vm.$root.amount(receipt.amount))
                            ),
                          ]),
                        ]
                      )
                    }),
                    _vm._v(" "),
                    !_vm.term_receipts.length
                      ? _c("tr", [
                          _c("td", { staticClass: "text-danger" }, [
                            _vm._v("No term receipts records.."),
                          ]),
                        ])
                      : _vm._e(),
                  ],
                  2
                ),
                _vm._v(" "),
                _c("thead", [
                  _c("tr", { staticClass: "text-underline" }, [
                    _vm._m(2),
                    _vm._v(" "),
                    _c("th", [
                      _c("h4", [
                        _vm._v(
                          _vm._s(_vm.currency) +
                            " " +
                            _vm._s(_vm.$root.amount(_vm.balance))
                        ),
                      ]),
                    ]),
                  ]),
                ]),
              ]
            ),
          ]),
        ]),
      ]),
    ]),
  ])
}
var staticRenderFns = [
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("tr", [
        _c("th", { staticClass: "text-center", attrs: { colspan: "2" } }, [
          _c("h4", [_vm._v("Payments")]),
        ]),
      ]),
      _vm._v(" "),
      _c("tr", [
        _c("th", [_vm._v("Date")]),
        _vm._v(" "),
        _c("th", [_vm._v("Amount")]),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("tr", [
        _c("th", { staticClass: "text-center", attrs: { colspan: "2" } }, [
          _c("h4", [_vm._v("Term Receipts (Clearances)")]),
        ]),
      ]),
      _vm._v(" "),
      _c("tr", [
        _c("th", [_vm._v("Term")]),
        _vm._v(" "),
        _c("th", [_vm._v("Amount")]),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("th", [_c("h4", [_vm._v("Balance")])])
  },
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/students/Finance.vue":
/*!******************************************************!*\
  !*** ./resources/js/components/students/Finance.vue ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Finance_vue_vue_type_template_id_99fd51e4_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Finance.vue?vue&type=template&id=99fd51e4&scoped=true& */ "./resources/js/components/students/Finance.vue?vue&type=template&id=99fd51e4&scoped=true&");
/* harmony import */ var _Finance_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Finance.vue?vue&type=script&lang=js& */ "./resources/js/components/students/Finance.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Finance_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Finance_vue_vue_type_template_id_99fd51e4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Finance_vue_vue_type_template_id_99fd51e4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "99fd51e4",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/students/Finance.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/students/Finance.vue?vue&type=script&lang=js&":
/*!*******************************************************************************!*\
  !*** ./resources/js/components/students/Finance.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Finance_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Finance.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/students/Finance.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Finance_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/students/Finance.vue?vue&type=template&id=99fd51e4&scoped=true&":
/*!*************************************************************************************************!*\
  !*** ./resources/js/components/students/Finance.vue?vue&type=template&id=99fd51e4&scoped=true& ***!
  \*************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Finance_vue_vue_type_template_id_99fd51e4_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Finance.vue?vue&type=template&id=99fd51e4&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/students/Finance.vue?vue&type=template&id=99fd51e4&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Finance_vue_vue_type_template_id_99fd51e4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Finance_vue_vue_type_template_id_99fd51e4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);