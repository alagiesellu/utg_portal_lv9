(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[29],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Finance.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/Finance.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************/
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
      user: null,
      profile: null,
      payments: [],
      payment: null,
      receipt: null,
      term_receipts: [],
      balance: 0,
      currency: '',
      filter: {
        search: null
      },
      form: {
        type: null,
        input: {
          term_id: null,
          amount: null //*pass password: null,

        },
        terms: []
      },
      cancel_form: {}
    };
  },
  created: function created() {
    this.fetchData();
  },
  watch: {
    '$route': 'fetchData'
  },
  mounted: function mounted() {
    this.$store.state.page = 'Finance';
  },
  methods: {
    cancelSubmit: function cancelSubmit(e) {
      var _this = this;

      e.preventDefault();
      axios.post(window.api_url + '/admin/finance/cancel/' + (this.cancel_form.type === 'c_p' ? 'payment' : 'receipt'), this.cancel_form).then(function (res) {
        _this.$root.post_success(res.data.success);

        _this.$modal.hide('view');

        _this.$modal.hide('cancel');

        _this.cancel_form = {};

        _this.get_user();
      });
    },
    cancel_this: function cancel_this(obj) {
      this.cancel_form = {
        type: obj.term_id ? 'c_tr' : 'c_p',
        id: obj.id,
        password: null
      };
      this.$modal.show('cancel');
    },
    view_receipt: function view_receipt(receipt) {
      var _this2 = this;

      this.$modal.show('view');
      this.payment = this.receipt = null;
      axios.get('/admin/finance/get/receipt/' + receipt.id).then(function (res) {
        _this2.receipt = res.data.receipt;
      });
    },
    view_payment: function view_payment(payment) {
      var _this3 = this;

      this.$modal.show('view');
      this.payment = this.receipt = null;
      axios.get('/admin/finance/get/payment/' + payment.id).then(function (res) {
        _this3.payment = res.data.payment;
      });
    },
    can_reg_terms: function can_reg_terms() {
      var _this4 = this;

      axios.get('/admin/get/can-register-terms').then(function (res) {
        _this4.form.terms = res.data.terms;
        if (res.data.terms.length === 1) // if only one term in list, then assign to selected term
          _this4.form.input.term_id = res.data.terms[0].id;
      });
    },
    submitForm: function submitForm(e) {
      var _this5 = this;

      e.preventDefault();
      this.form.input.student_profile_id = this.profile.id;
      this.form.input.currency = this.currency;
      axios.post('/admin/finance/' + this.form.type, this.form.input).then(function (res) {
        _this5.$root.post_success(res.data.success);

        _this5.$modal.hide(_this5.form.type);

        _this5.form = {
          type: null,
          input: {
            term_id: null,
            amount: null,
            password: null
          }
        };

        _this5.load_data(res.data);
      });
    },
    add_modal: function add_modal(modal) {
      this.$modal.show(modal);
      this.form.type = modal;
      if (modal === 'clearance') this.can_reg_terms();
    },
    fetchData: function fetchData() {
      if (this.$route.params.id === undefined) this.user = null;else if (this.user == null) this.get_user();
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
      var _this6 = this;

      axios.get('/admin/finance/' + this.$route.params.id).then(function (res) {
        _this6.load_data(res.data);
      });
    },
    filter_users: function filter_users(e) {
      var _this7 = this;

      e.preventDefault();
      axios.post('/admin/finance/search', {
        search: this.filter.search
      }).then(function (res) {
        _this7.filter.search = null;

        _this7.load_data(res.data);

        _this7.$router.push({
          name: 'ad.finance',
          params: {
            id: _this7.user.num
          }
        });
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Finance.vue?vue&type=template&id=38fb9082&scoped=true&":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/Finance.vue?vue&type=template&id=38fb9082&scoped=true& ***!
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
      _vm.user
        ? _c("div", [
            _c(
              "div",
              { staticClass: "row" },
              [
                _c("div", { staticClass: "col-6" }, [
                  _c("div", { staticClass: "card shadow" }, [
                    _c("div", { staticClass: "card-header bg-transparent" }, [
                      _c("h3", { staticClass: "mb-0" }, [
                        _c(
                          "div",
                          { staticClass: "float-left" },
                          [
                            _c(
                              "router-link",
                              {
                                staticClass:
                                  "btn btn-sm btn-outline-primary mb-3",
                                attrs: { to: { name: "ad.finance" } },
                              },
                              [
                                _c("i", { staticClass: "ni ni-bold-left" }),
                                _vm._v(
                                  " Back\n                                    "
                                ),
                              ]
                            ),
                          ],
                          1
                        ),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "table-responsive" }, [
                      _c(
                        "table",
                        { staticClass: "table align-items-center table-flush" },
                        [
                          _c("tbody", [
                            _c("tr", [
                              _c("td"),
                              _vm._v(" "),
                              _c("td", [
                                _c("img", {
                                  staticClass: "img-thumbnail",
                                  attrs: {
                                    src: "/storage/profiles/" + _vm.user["img"],
                                  },
                                }),
                              ]),
                            ]),
                            _vm._v(" "),
                            _c("tr", [
                              _c("td", [_vm._v("#")]),
                              _vm._v(" "),
                              _c("th", [
                                _vm._v(
                                  "\n                                        " +
                                    _vm._s(_vm.user.num) +
                                    "\n                                    "
                                ),
                              ]),
                            ]),
                            _vm._v(" "),
                            _c("tr", [
                              _c("td", [_vm._v("First Name")]),
                              _vm._v(" "),
                              _c("th", [
                                _vm._v(
                                  "\n                                        " +
                                    _vm._s(_vm.user.first_name) +
                                    "\n                                    "
                                ),
                              ]),
                            ]),
                            _vm._v(" "),
                            _c("tr", [
                              _c("td", [_vm._v("Middle Name")]),
                              _vm._v(" "),
                              _c("th", [
                                _vm._v(
                                  "\n                                        " +
                                    _vm._s(_vm.user.middle_name) +
                                    "\n                                    "
                                ),
                              ]),
                            ]),
                            _vm._v(" "),
                            _c("tr", [
                              _c("td", [_vm._v("Last Name")]),
                              _vm._v(" "),
                              _c("th", [
                                _vm._v(
                                  "\n                                        " +
                                    _vm._s(_vm.user.last_name) +
                                    "\n                                    "
                                ),
                              ]),
                            ]),
                            _vm._v(" "),
                            _c("tr", [
                              _c("td", [_vm._v("Email")]),
                              _vm._v(" "),
                              _c("th", [
                                _vm._v(
                                  "\n                                        " +
                                    _vm._s(_vm.user.email) +
                                    "\n                                    "
                                ),
                              ]),
                            ]),
                            _vm._v(" "),
                            _c("tr", [
                              _c("td", [_vm._v("Tel")]),
                              _vm._v(" "),
                              _c("th", [
                                _vm._v(
                                  "\n                                        " +
                                    _vm._s(_vm.user.tel) +
                                    "\n                                    "
                                ),
                              ]),
                            ]),
                            _vm._v(" "),
                            _c("tr", [
                              _c("td", [_vm._v("Address")]),
                              _vm._v(" "),
                              _c("th", [
                                _vm._v(
                                  "\n                                        " +
                                    _vm._s(_vm.user.address) +
                                    "\n                                    "
                                ),
                              ]),
                            ]),
                            _vm._v(" "),
                            _c("tr", [
                              _c("td", [_vm._v("Gender")]),
                              _vm._v(" "),
                              _c("th", [
                                _vm._v(
                                  "\n                                        " +
                                    _vm._s(this.$root.gender(_vm.user.gender)) +
                                    "\n                                    "
                                ),
                              ]),
                            ]),
                            _vm._v(" "),
                            _c("tr", [
                              _c("td", [_vm._v("Date of Birth")]),
                              _vm._v(" "),
                              _c("th", [
                                _vm._v(
                                  "\n                                        " +
                                    _vm._s(
                                      this.$root.format_date(_vm.user.dob)
                                    ) +
                                    "\n                                    "
                                ),
                              ]),
                            ]),
                            _vm._v(" "),
                            _c("tr", [
                              _c("td", [_vm._v("Nationality")]),
                              _vm._v(" "),
                              _c("th", [
                                _vm._v(
                                  "\n                                        " +
                                    _vm._s(
                                      this.$root.country(_vm.user.nationality)
                                    ) +
                                    "\n                                    "
                                ),
                              ]),
                            ]),
                          ]),
                        ]
                      ),
                    ]),
                  ]),
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "col-6" }, [
                  _c("div", { staticClass: "card shadow" }, [
                    _c("div", { staticClass: "card-header" }, [
                      _c(
                        "button",
                        {
                          directives: [
                            {
                              name: "show",
                              rawName: "v-show",
                              value: _vm.$store.state.auth.hasRole("ad-18"),
                              expression: "$store.state.auth.hasRole('ad-18')",
                            },
                          ],
                          staticClass: "btn btn-sm btn-primary mb-3",
                          on: {
                            click: function ($event) {
                              return _vm.add_modal("payment")
                            },
                          },
                        },
                        [
                          _c("i", { staticClass: "ni ni-money-coins" }),
                          _vm._v(
                            " Record Payment\n                            "
                          ),
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "button",
                        {
                          directives: [
                            {
                              name: "show",
                              rawName: "v-show",
                              value: _vm.$store.state.auth.hasRole("ad-19"),
                              expression: "$store.state.auth.hasRole('ad-19')",
                            },
                          ],
                          staticClass: "btn btn-sm btn-danger mb-3",
                          on: {
                            click: function ($event) {
                              return _vm.add_modal("clearance")
                            },
                          },
                        },
                        [
                          _c("i", { staticClass: "ni ni-check-bold" }),
                          _vm._v(
                            " Issue Clearance\n                            "
                          ),
                        ]
                      ),
                    ]),
                    _vm._v(" "),
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
                                      payment.cancelled_by_admin_profile_id ==
                                      null
                                        ? ""
                                        : "text-danger",
                                    ],
                                  },
                                  [
                                    _c("td", [
                                      _c(
                                        "button",
                                        {
                                          staticClass: "btn btn-sm btn-primary",
                                          on: {
                                            click: function ($event) {
                                              return _vm.view_payment(payment)
                                            },
                                          },
                                        },
                                        [
                                          _c("i", {
                                            staticClass: "ni ni-bold-right",
                                          }),
                                        ]
                                      ),
                                      _vm._v(
                                        "\n                                        " +
                                          _vm._s(
                                            _vm.$root.format_date(
                                              payment.created_at
                                            )
                                          ) +
                                          "\n                                    "
                                      ),
                                    ]),
                                    _vm._v(" "),
                                    _c("td", [
                                      _vm._v(
                                        _vm._s(payment.currency_key) +
                                          " " +
                                          _vm._s(
                                            _vm.$root.amount(payment.amount)
                                          )
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
                                      receipt.cancelled_by_admin_profile_id ==
                                      null
                                        ? ""
                                        : "text-danger",
                                    ],
                                  },
                                  [
                                    _c("td", [
                                      _c(
                                        "button",
                                        {
                                          staticClass: "btn btn-sm btn-primary",
                                          on: {
                                            click: function ($event) {
                                              return _vm.view_receipt(receipt)
                                            },
                                          },
                                        },
                                        [
                                          _c("i", {
                                            staticClass: "ni ni-bold-right",
                                          }),
                                        ]
                                      ),
                                      _vm._v(
                                        "\n                                        " +
                                          _vm._s(receipt.term.name) +
                                          "\n                                    "
                                      ),
                                    ]),
                                    _vm._v(" "),
                                    _c("td", [
                                      _vm._v(
                                        _vm._s(receipt.currency_key) +
                                          " " +
                                          _vm._s(
                                            _vm.$root.amount(receipt.amount)
                                          )
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
                _vm._v(" "),
                _c(
                  "modal",
                  {
                    attrs: {
                      scrollable: true,
                      name: "payment",
                      height: "auto",
                    },
                  },
                  [
                    _c("h2", { staticClass: "modal-header" }, [
                      _vm._v("Record Payment"),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "modal-body" }, [
                      _c(
                        "form",
                        { on: { submit: _vm.submitForm } },
                        [
                          _c("fake-form-input"),
                          _vm._v(" "),
                          _c("div", { staticClass: "form-group mb-3" }, [
                            _c("div", { staticClass: "input-group" }, [
                              _c(
                                "div",
                                { staticClass: "input-group-prepend" },
                                [
                                  _c(
                                    "strong",
                                    {
                                      staticClass:
                                        "input-group-text text-danger",
                                    },
                                    [
                                      _vm._v(
                                        "\n                                            Amount in " +
                                          _vm._s(_vm.currency) +
                                          " :\n                                        "
                                      ),
                                    ]
                                  ),
                                ]
                              ),
                              _vm._v(" "),
                              _c("input", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.form.input.amount,
                                    expression: "form.input.amount",
                                  },
                                ],
                                staticClass: "form-control",
                                attrs: {
                                  placeholder: "Amount",
                                  min: "0",
                                  type: "number",
                                  step: "0.01",
                                  required: "",
                                },
                                domProps: { value: _vm.form.input.amount },
                                on: {
                                  input: function ($event) {
                                    if ($event.target.composing) {
                                      return
                                    }
                                    _vm.$set(
                                      _vm.form.input,
                                      "amount",
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
                  ]
                ),
                _vm._v(" "),
                _c(
                  "modal",
                  {
                    attrs: {
                      scrollable: true,
                      name: "clearance",
                      height: "auto",
                    },
                  },
                  [
                    _c("h2", { staticClass: "modal-header" }, [
                      _vm._v("Issue Clearance"),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "modal-body" }, [
                      _c(
                        "form",
                        { on: { submit: _vm.submitForm } },
                        [
                          _c("fake-form-input"),
                          _vm._v(" "),
                          _c(
                            "div",
                            { staticClass: "form-group mb-3" },
                            [
                              _c("v-select", {
                                staticClass: "form-control",
                                attrs: {
                                  options: _vm.form.terms,
                                  reduce: function (term) {
                                    return term.id
                                  },
                                  label: "name",
                                },
                                scopedSlots: _vm._u(
                                  [
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
                                  ],
                                  null,
                                  false,
                                  411681397
                                ),
                                model: {
                                  value: _vm.form.input.term_id,
                                  callback: function ($$v) {
                                    _vm.$set(_vm.form.input, "term_id", $$v)
                                  },
                                  expression: "form.input.term_id",
                                },
                              }),
                            ],
                            1
                          ),
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
                  ]
                ),
              ],
              1
            ),
          ])
        : _c("div", [
            _c("div", { staticClass: "col-md-8" }, [
              _c("div", { staticClass: "card shadow mb-4 mb-xl-0" }, [
                _vm._m(3),
                _vm._v(" "),
                _c(
                  "form",
                  {
                    staticClass: "card-body col-md-12",
                    on: { submit: _vm.filter_users },
                  },
                  [
                    _c("div", { staticClass: "form-group" }, [
                      _c("div", { staticClass: "input-group mb-4" }, [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.filter.search,
                              expression: "filter.search",
                            },
                          ],
                          staticClass: "form-control",
                          attrs: {
                            placeholder: "Search by MAT number",
                            type: "number",
                          },
                          domProps: { value: _vm.filter.search },
                          on: {
                            input: function ($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.filter,
                                "search",
                                $event.target.value
                              )
                            },
                          },
                        }),
                        _vm._v(" "),
                        _vm._m(4),
                      ]),
                    ]),
                  ]
                ),
              ]),
            ]),
          ]),
      _vm._v(" "),
      _c(
        "modal",
        { attrs: { scrollable: true, name: "view", height: "auto" } },
        [
          _vm.receipt
            ? _c("div", { staticClass: "modal-body" }, [
                !_vm.receipt.cancelled_by_admin_profile_id
                  ? _c(
                      "button",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: _vm.$store.state.auth.hasRole("ad-21"),
                            expression: "$store.state.auth.hasRole('ad-21')",
                          },
                        ],
                        staticClass:
                          "btn btn-sm btn-outline-danger float-right",
                        on: {
                          click: function ($event) {
                            return _vm.cancel_this(_vm.receipt)
                          },
                        },
                      },
                      [
                        _vm._v(
                          "\n                    Cancel Clearance\n                "
                        ),
                      ]
                    )
                  : _vm._e(),
                _vm._v(" "),
                _c("h3", [
                  _c("small", [_vm._v("Academic Term: ")]),
                  _vm._v(_vm._s(_vm.receipt.term.name) + "\n                "),
                ]),
                _vm._v(" "),
                _vm.receipt.admin_profile_id
                  ? _c("h3", [
                      _c("small", [_vm._v("Issued By: ")]),
                      _vm._v(
                        _vm._s(
                          _vm.$root.full_name(_vm.receipt.admin_profile.user)
                        ) + "\n                "
                      ),
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm.receipt.cancelled_by_admin_profile_id
                  ? _c("h3", { staticClass: "text-danger" }, [
                      _c("small", [_vm._v("Cancelled By: ")]),
                      _vm._v(
                        _vm._s(
                          _vm.$root.full_name(
                            _vm.receipt.cancelled_by_admin_profile.user
                          )
                        ) + "\n                "
                      ),
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _c("h3", [
                  _c("small", [_vm._v("Amount: ")]),
                  _vm._v(
                    _vm._s(_vm.receipt.currency_key) +
                      " " +
                      _vm._s(_vm.$root.amount(_vm.receipt.amount)) +
                      "\n                "
                  ),
                ]),
              ])
            : _vm._e(),
          _vm._v(" "),
          _vm.payment
            ? _c("div", { staticClass: "modal-body" }, [
                !_vm.payment.cancelled_by_admin_profile_id
                  ? _c(
                      "button",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: _vm.$store.state.auth.hasRole("ad-20"),
                            expression: "$store.state.auth.hasRole('ad-20')",
                          },
                        ],
                        staticClass:
                          "btn btn-sm btn-outline-danger float-right",
                        on: {
                          click: function ($event) {
                            return _vm.cancel_this(_vm.payment)
                          },
                        },
                      },
                      [
                        _vm._v(
                          "\n                    Cancel Payment\n                "
                        ),
                      ]
                    )
                  : _vm._e(),
                _vm._v(" "),
                _vm.payment.admin_profile_id
                  ? _c("h3", [
                      _c("small", [_vm._v("Issued By: ")]),
                      _vm._v(
                        _vm._s(
                          _vm.$root.full_name(_vm.payment.admin_profile.user)
                        ) + "\n                "
                      ),
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm.payment.cancelled_by_admin_profile_id
                  ? _c("h3", { staticClass: "text-danger" }, [
                      _c("small", [_vm._v("Cancelled By: ")]),
                      _vm._v(
                        _vm._s(
                          _vm.$root.full_name(
                            _vm.payment.cancelled_by_admin_profile.user
                          )
                        ) + "\n                "
                      ),
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _c("h3", [
                  _c("small", [_vm._v("Amount: ")]),
                  _vm._v(
                    _vm._s(_vm.payment.currency_key) +
                      " " +
                      _vm._s(_vm.$root.amount(_vm.payment.amount)) +
                      "\n                "
                  ),
                ]),
              ])
            : _vm._e(),
        ]
      ),
      _vm._v(" "),
      _c(
        "modal",
        { attrs: { scrollable: true, name: "cancel", height: "auto" } },
        [
          _c("h3", { staticClass: "modal-header" }, [
            _vm.cancel_form.type === "c_p"
              ? _c("span", [_vm._v("Cancel Payment")])
              : _c("span", [_vm._v("Cancel Clearance")]),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "btn btn-sm btn-danger float-right",
                on: {
                  click: function ($event) {
                    return _vm.$modal.hide("cancel")
                  },
                },
              },
              [_vm._v("\n                    x\n                ")]
            ),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "modal-body" }, [
            _c(
              "form",
              { on: { submit: _vm.cancelSubmit } },
              [
                _c("fake-form-input"),
                _vm._v(" "),
                _c("div", { staticClass: "modal-footer" }, [
                  _c(
                    "button",
                    {
                      staticClass: "btn btn-danger",
                      attrs: { type: "submit" },
                    },
                    [_vm._v("Cancel")]
                  ),
                ]),
              ],
              1
            ),
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
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "card-header bg-transparent" }, [
      _c("h3", { staticClass: "mb-0" }, [
        _vm._v(
          "\n                            Search Student Profile\n                        "
        ),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "input-group-append" }, [
      _c(
        "button",
        { staticClass: "btn btn-primary", attrs: { type: "submit" } },
        [
          _c("i", { staticClass: "ni ni-zoom-split-in" }),
          _vm._v(
            "\n                                        Search\n                                    "
          ),
        ]
      ),
    ])
  },
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/admin/Finance.vue":
/*!***************************************************!*\
  !*** ./resources/js/components/admin/Finance.vue ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Finance_vue_vue_type_template_id_38fb9082_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Finance.vue?vue&type=template&id=38fb9082&scoped=true& */ "./resources/js/components/admin/Finance.vue?vue&type=template&id=38fb9082&scoped=true&");
/* harmony import */ var _Finance_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Finance.vue?vue&type=script&lang=js& */ "./resources/js/components/admin/Finance.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Finance_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Finance_vue_vue_type_template_id_38fb9082_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Finance_vue_vue_type_template_id_38fb9082_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "38fb9082",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/admin/Finance.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/admin/Finance.vue?vue&type=script&lang=js&":
/*!****************************************************************************!*\
  !*** ./resources/js/components/admin/Finance.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Finance_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Finance.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Finance.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Finance_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/admin/Finance.vue?vue&type=template&id=38fb9082&scoped=true&":
/*!**********************************************************************************************!*\
  !*** ./resources/js/components/admin/Finance.vue?vue&type=template&id=38fb9082&scoped=true& ***!
  \**********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Finance_vue_vue_type_template_id_38fb9082_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Finance.vue?vue&type=template&id=38fb9082&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Finance.vue?vue&type=template&id=38fb9082&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Finance_vue_vue_type_template_id_38fb9082_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Finance_vue_vue_type_template_id_38fb9082_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);