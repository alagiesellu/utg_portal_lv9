(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[25],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/academic/Classes/StudentsClasses.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/academic/Classes/StudentsClasses.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "StudentsClasses",
  data: function data() {
    return {
      students_registrations: {},
      registration: null,
      sr: null,
      form: {
        input: {}
      }
    };
  },
  created: function created() {
    this.fetchData();
    this.$parent.fetchData();
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    submitForm: function submitForm(e) {
      var _this = this;

      e.preventDefault();
      axios.post('/academic/classes/' + this.sr.id + '/approve-registrations', this.form.input).then(function (res) {
        _this.$root.post_success(res.data.success);

        _this.get_students(_this.students_registrations.current_page);

        _this.sr = null;

        _this.$modal.hide('approval');
      });
    },
    approval: function approval(sr) {
      this.sr = sr;
      this.$modal.show('approval');
    },
    view_student: function view_student(student) {
      var _this2 = this;

      axios.get('/academic/classes/registrations/get/' + student.id).then(function (res) {
        _this2.registration = res.data.registration;

        if (_this2.registration.grades) {
          _this2.registration.grades.score = _this2.registration.grades.total = 0;

          var _iterator = _createForOfIteratorHelper(_this2.registration.grades.term_class.assessments),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var ass = _step.value;
              if (_this2.registration.grades.scores[ass.id] != null) _this2.registration.grades.score += parseFloat(_this2.registration.grades.scores[ass.id]);
              _this2.registration.grades.total += parseFloat(ass.score);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }
      });
      this.$modal.show('view-modal');
    },
    fetchData: function fetchData() {
      this.get_students();
    },
    get_students: function get_students() {
      var _this3 = this;

      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      axios.get('/academic/classes/' + this.$route.params.id + '/registrations?page=' + page).then(function (res) {
        _this3.students_registrations = res.data.class_registrations;
        _this3.students_registrations.approved = res.data.approved;
        _this3.students_registrations.unapproved = res.data.unapproved;
        _this3.students_registrations.approval_percentage = res.data.approved / (res.data.approved + res.data.unapproved) * 100;
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/academic/Classes/StudentsClasses.vue?vue&type=template&id=523ecc08&scoped=true&":
/*!***********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/academic/Classes/StudentsClasses.vue?vue&type=template&id=523ecc08&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "row" },
    [
      _c("div", { staticClass: "col-xl-12 order-xl-1" }, [
        _c("div", { staticClass: "card bg-secondary shadow" }, [
          _c("div", { staticClass: "card-header bg-white border-0" }, [
            _c(
              "h3",
              [
                _c("i", { staticClass: "ni ni-single-02" }),
                _vm._v(" "),
                _vm.$parent.term_class.course
                  ? _c(
                      "router-link",
                      {
                        attrs: {
                          to: {
                            name: "ac.classes.show",
                            params: { id: _vm.$parent.term_class.id },
                          },
                        },
                      },
                      [
                        _vm._v(
                          "\n                            " +
                            _vm._s(_vm.$parent.term_class.course.name) +
                            "\n                        "
                        ),
                      ]
                    )
                  : _vm._e(),
                _vm._v(
                  "\n                        Registered Students\n                        "
                ),
                _c("div", { staticClass: "float-right" }, [
                  _c(
                    "button",
                    {
                      staticClass: "btn btn-outline-primary btn-sm",
                      on: {
                        click: function ($event) {
                          return _vm.$parent.$router.back()
                        },
                      },
                    },
                    [
                      _c("i", { staticClass: "ni ni-bold-left" }),
                      _vm._v(" Back\n                            "),
                    ]
                  ),
                ]),
              ],
              1
            ),
            _vm._v(" "),
            _c("div", { staticClass: "progress-wrapper" }, [
              _c("div", { staticClass: "progress-info" }, [
                _vm._m(0),
                _vm._v(" "),
                _c("div", { staticClass: "progress-percentage" }, [
                  _c("span", [
                    _vm._v(
                      _vm._s(_vm.students_registrations.approved) +
                        "/" +
                        _vm._s(
                          _vm.students_registrations.approved +
                            _vm.students_registrations.unapproved
                        )
                    ),
                  ]),
                ]),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "progress" }, [
                _c("div", {
                  staticClass: "progress-bar bg-default",
                  style: {
                    width: _vm.students_registrations.approval_percentage + "%",
                  },
                  attrs: {
                    role: "progressbar",
                    "aria-valuemin": "0",
                    "aria-valuemax": "100",
                    "aria-valuenow":
                      _vm.students_registrations.approval_percentage,
                  },
                }),
              ]),
            ]),
          ]),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "card-body" },
            [
              _c("table", { staticClass: "table" }, [
                _vm._m(1),
                _vm._v(" "),
                _c(
                  "tbody",
                  _vm._l(_vm.students_registrations.data, function (sr) {
                    return _c("tr", [
                      _c("th", [
                        _c(
                          "button",
                          {
                            staticClass: "btn btn-primary btn-sm",
                            on: {
                              click: function ($event) {
                                return _vm.view_student(sr)
                              },
                            },
                          },
                          [_c("i", { staticClass: "ni ni-bold-right" })]
                        ),
                      ]),
                      _vm._v(" "),
                      _c("td", [_vm._v(_vm._s(sr.profile.user.num))]),
                      _vm._v(" "),
                      _c("td", [
                        _vm._v(_vm._s(_vm.$root.full_name(sr.profile.user))),
                      ]),
                      _vm._v(" "),
                      _c("td", [_vm._v(_vm._s(sr.profile.user.email))]),
                      _vm._v(" "),
                      _c("td", [
                        _c(
                          "div",
                          {
                            directives: [
                              {
                                name: "show",
                                rawName: "v-show",
                                value: _vm.$store.state.auth.hasRole("ac-4"),
                                expression: "$store.state.auth.hasRole('ac-4')",
                              },
                            ],
                            staticClass: "dbtn-group",
                          },
                          [
                            _c(
                              "a",
                              {
                                staticClass: "btn btn-sm dropdown-toggle",
                                class: [
                                  sr.approved_by_profile_id
                                    ? "btn-outline-danger"
                                    : "btn-outline-success",
                                ],
                                attrs: {
                                  href: "#",
                                  role: "button",
                                  "data-toggle": "dropdown",
                                  "aria-haspopup": "true",
                                  "aria-expanded": "false",
                                },
                              },
                              [
                                _c("i", {
                                  staticClass: "ni",
                                  class: [
                                    !sr.approved_by_profile_id
                                      ? "ni-fat-add"
                                      : "ni-fat-remove",
                                  ],
                                }),
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "div",
                              {
                                staticClass:
                                  "dropdown-menu dropdown-menu-right",
                              },
                              [
                                sr.approved_by_profile_id
                                  ? _c(
                                      "button",
                                      {
                                        staticClass: "dropdown-item",
                                        on: {
                                          click: function ($event) {
                                            return _vm.approval(sr)
                                          },
                                        },
                                      },
                                      [_vm._v("Cancel")]
                                    )
                                  : _c(
                                      "button",
                                      {
                                        staticClass: "dropdown-item",
                                        on: {
                                          click: function ($event) {
                                            return _vm.approval(sr)
                                          },
                                        },
                                      },
                                      [_vm._v("Approve")]
                                    ),
                              ]
                            ),
                          ]
                        ),
                      ]),
                    ])
                  }),
                  0
                ),
              ]),
              _vm._v(" "),
              _c("laravel-vue-pagination", {
                attrs: {
                  limit: 5,
                  data: _vm.students_registrations,
                  align: "center",
                },
                on: { "pagination-change-page": _vm.get_students },
              }),
            ],
            1
          ),
        ]),
      ]),
      _vm._v(" "),
      _c(
        "modal",
        { attrs: { scrollable: true, name: "view-modal", height: "auto" } },
        [
          _vm.registration
            ? _c("div", { staticClass: "modal modal-content" }, [
                _c("div", { staticClass: "modal-body" }, [
                  _c("table", { staticClass: "table" }, [
                    _c("tbody", [
                      _c("tr", [
                        _c(
                          "th",
                          {
                            staticClass: "text-center bg-light",
                            attrs: { colspan: "2" },
                          },
                          [
                            _vm._v(
                              "\n                                Students Info\n                            "
                            ),
                          ]
                        ),
                      ]),
                      _vm._v(" "),
                      _c("tr", [
                        _c("td", [_vm._v("MAT #")]),
                        _vm._v(" "),
                        _c("th", [
                          _vm._v(_vm._s(_vm.registration.profile.user.num)),
                        ]),
                      ]),
                      _vm._v(" "),
                      _c("tr", [
                        _c("td", [_vm._v("Name")]),
                        _vm._v(" "),
                        _c("th", [
                          _vm._v(
                            _vm._s(
                              _vm.$root.full_name(_vm.registration.profile.user)
                            )
                          ),
                        ]),
                      ]),
                      _vm._v(" "),
                      _c("tr", [
                        _c("td", [_vm._v("Email")]),
                        _vm._v(" "),
                        _c("th", [
                          _vm._v(_vm._s(_vm.registration.profile.user.email)),
                        ]),
                      ]),
                      _vm._v(" "),
                      _c("tr", [
                        _c("td", [_vm._v("Tel #")]),
                        _vm._v(" "),
                        _c("th", [
                          _vm._v(_vm._s(_vm.registration.profile.user.tel)),
                        ]),
                      ]),
                    ]),
                    _vm._v(" "),
                    _vm.registration.grades
                      ? _c(
                          "tbody",
                          [
                            _c("tr", [
                              _c(
                                "th",
                                {
                                  staticClass: "text-center bg-light",
                                  attrs: { colspan: "2" },
                                },
                                [
                                  _vm._v(
                                    "\n                                    Assessments\n                                "
                                  ),
                                ]
                              ),
                            ]),
                            _vm._v(" "),
                            _vm._l(
                              _vm.registration.grades.term_class.assessments,
                              function (ass) {
                                return _c("tr", [
                                  _c("td", [_vm._v(_vm._s(ass.name))]),
                                  _vm._v(" "),
                                  _c("th", [
                                    _vm.registration.grades.scores[ass.id] ==
                                    null
                                      ? _c(
                                          "span",
                                          { staticClass: "text-danger" },
                                          [
                                            _vm._v(
                                              "\n                                    Not Entered\n                                "
                                            ),
                                          ]
                                        )
                                      : _c(
                                          "span",
                                          { staticClass: "text-underline" },
                                          [
                                            _vm._v(
                                              "\n                                    " +
                                                _vm._s(
                                                  _vm.registration.grades
                                                    .scores[ass.id]
                                                ) +
                                                " / " +
                                                _vm._s(ass.score) +
                                                "\n                                "
                                            ),
                                          ]
                                        ),
                                  ]),
                                ])
                              }
                            ),
                            _vm._v(" "),
                            _c("tr", { staticClass: "bg-danger" }, [
                              _c("td", [_vm._v("Total")]),
                              _vm._v(" "),
                              _c("th", { staticClass: "text-underline" }, [
                                _vm._v(
                                  "\n                                    " +
                                    _vm._s(_vm.registration.grades.score) +
                                    " / " +
                                    _vm._s(_vm.registration.grades.total) +
                                    "\n                                "
                                ),
                              ]),
                            ]),
                          ],
                          2
                        )
                      : _vm._e(),
                  ]),
                ]),
              ])
            : _vm._e(),
        ]
      ),
      _vm._v(" "),
      _c(
        "modal",
        { attrs: { scrollable: true, name: "approval", height: "auto" } },
        [
          _vm.sr
            ? _c("div", { staticClass: "modal-body" }, [
                _c("h2", [
                  _c("small", [_vm._v("#")]),
                  _vm._v(_vm._s(_vm.sr.profile.user.num)),
                ]),
                _vm._v(" "),
                _c("h1", [
                  _vm._v(_vm._s(_vm.$root.full_name(_vm.sr.profile.user))),
                ]),
                _vm._v(" "),
                _c("h2", [_vm._v(_vm._s(_vm.sr.profile.user.email))]),
                _vm._v(" "),
                _c("hr"),
                _vm._v(" "),
                _vm.sr.approved_by_profile_id
                  ? _c("div", [
                      _c("h1", { staticClass: "text-danger" }, [
                        _vm._v("Cancel Approval"),
                      ]),
                      _vm._v(" "),
                      _c(
                        "form",
                        { on: { submit: _vm.submitForm } },
                        [
                          _c("fake-form-input"),
                          _vm._v(" "),
                          _c(
                            "button",
                            {
                              staticClass: "btn btn-danger btn-block",
                              attrs: { type: "submit" },
                            },
                            [_vm._v("Cancel")]
                          ),
                        ],
                        1
                      ),
                    ])
                  : _c("div", [
                      _c(
                        "form",
                        { on: { submit: _vm.submitForm } },
                        [
                          _c("fake-form-input"),
                          _vm._v(" "),
                          _c(
                            "button",
                            {
                              staticClass: "btn btn-primary btn-block",
                              attrs: { type: "submit" },
                            },
                            [_vm._v("Approve Class Registration")]
                          ),
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
    return _c("div", { staticClass: "progress-label" }, [
      _c("span", [_vm._v("Approvals")]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("tr", [
        _c("th"),
        _vm._v(" "),
        _c("th", [_vm._v("#")]),
        _vm._v(" "),
        _c("th", [_vm._v("Student")]),
        _vm._v(" "),
        _c("th", [_vm._v("Email")]),
        _vm._v(" "),
        _c("th"),
      ]),
    ])
  },
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/academic/Classes/StudentsClasses.vue":
/*!**********************************************************************!*\
  !*** ./resources/js/components/academic/Classes/StudentsClasses.vue ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _StudentsClasses_vue_vue_type_template_id_523ecc08_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StudentsClasses.vue?vue&type=template&id=523ecc08&scoped=true& */ "./resources/js/components/academic/Classes/StudentsClasses.vue?vue&type=template&id=523ecc08&scoped=true&");
/* harmony import */ var _StudentsClasses_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StudentsClasses.vue?vue&type=script&lang=js& */ "./resources/js/components/academic/Classes/StudentsClasses.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _StudentsClasses_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _StudentsClasses_vue_vue_type_template_id_523ecc08_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _StudentsClasses_vue_vue_type_template_id_523ecc08_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "523ecc08",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/academic/Classes/StudentsClasses.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/academic/Classes/StudentsClasses.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************!*\
  !*** ./resources/js/components/academic/Classes/StudentsClasses.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StudentsClasses_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./StudentsClasses.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/academic/Classes/StudentsClasses.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StudentsClasses_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/academic/Classes/StudentsClasses.vue?vue&type=template&id=523ecc08&scoped=true&":
/*!*****************************************************************************************************************!*\
  !*** ./resources/js/components/academic/Classes/StudentsClasses.vue?vue&type=template&id=523ecc08&scoped=true& ***!
  \*****************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_StudentsClasses_vue_vue_type_template_id_523ecc08_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./StudentsClasses.vue?vue&type=template&id=523ecc08&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/academic/Classes/StudentsClasses.vue?vue&type=template&id=523ecc08&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_StudentsClasses_vue_vue_type_template_id_523ecc08_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_StudentsClasses_vue_vue_type_template_id_523ecc08_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);