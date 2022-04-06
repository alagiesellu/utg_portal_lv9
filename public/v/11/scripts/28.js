(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[28],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Classes/StudentClasses.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/Classes/StudentClasses.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "StudentClasses",
  data: function data() {
    return {
      profile: null,
      form: null,
      term_class: null,
      grade: null,
      assessments: {},
      totals: {
        grade: 0,
        score: 0
      }
    };
  },
  created: function created() {
    this.fetchData();
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    submitForm: function submitForm(e) {
      e.preventDefault();
      this.form.input.term_class_id = this.term_class.id;
    },
    fetchData: function fetchData() {
      this.get_student();
    },
    get_student: function get_student() {
      var _this = this;

      axios.get('/admin/classes/student=' + this.$route.params.id + '/' + this.$route.params["class"]).then(function (res) {
        _this.profile = res.data.profile;
        _this.term_class = res.data.term_class;
        _this.grade = res.data.grade;

        var _iterator = _createForOfIteratorHelper(_this.term_class.assessments),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var ass = _step.value;
            _this.assessments[ass.id] = ass;
            if (_this.grade.scores[ass.id] != null) _this.totals.grade += parseFloat(_this.grade.scores[ass.id]);
            _this.totals.score += parseFloat(ass.score);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Classes/StudentClasses.vue?vue&type=template&id=c7c30582&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/Classes/StudentClasses.vue?vue&type=template&id=c7c30582&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "col-md-12" },
    [
      _c(
        "div",
        { staticClass: "card shadow mb-4 mb-xl-0", attrs: { id: "view" } },
        [
          _c("div", { staticClass: "card-header bg-transparent" }, [
            _c("h2", { staticClass: "mb-0" }, [
              _vm._v("\n                Students\n            "),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "float-right" }, [
              _c(
                "button",
                {
                  staticClass: "btn btn-primary btn-sm",
                  on: {
                    click: function ($event) {
                      return _vm.$router.go(-1)
                    },
                  },
                },
                [_vm._v("Back")]
              ),
            ]),
          ]),
          _vm._v(" "),
          _vm.profile
            ? _c("div", { staticClass: "table-responsive" }, [
                _c(
                  "table",
                  { staticClass: "table align-items-center table-flush" },
                  [
                    _c("tbody", [
                      _c("tr", [
                        _c("td", [_vm._v("Student")]),
                        _vm._v(" "),
                        _c("th", [
                          _vm._v(
                            "\n                        " +
                              _vm._s(_vm.$root.full_name(_vm.profile.user))
                          ),
                          _c("br"),
                          _vm._v(" "),
                          _c("small", [
                            _vm._v("Email: " + _vm._s(_vm.profile.user.email)),
                          ]),
                        ]),
                      ]),
                      _vm._v(" "),
                      _c("tr", [
                        _c("td", [_vm._v("Course")]),
                        _vm._v(" "),
                        _vm.term_class.course
                          ? _c("th", [
                              _vm._v(_vm._s(_vm.term_class.course.name)),
                            ])
                          : _vm._e(),
                      ]),
                      _vm._v(" "),
                      _c("tr", [
                        _c("td", [_vm._v("Term")]),
                        _vm._v(" "),
                        _vm.term_class.term
                          ? _c(
                              "th",
                              [
                                _c(
                                  "router-link",
                                  {
                                    attrs: {
                                      to: {
                                        name: "ad.terms",
                                        params: { id: _vm.term_class.term.id },
                                      },
                                    },
                                  },
                                  [
                                    _vm._v(
                                      "\n                            " +
                                        _vm._s(_vm.term_class.term.name) +
                                        "\n                        "
                                    ),
                                  ]
                                ),
                              ],
                              1
                            )
                          : _vm._e(),
                      ]),
                      _vm._v(" "),
                      _c("tr", [
                        _c("td", [_vm._v("Venue")]),
                        _vm._v(" "),
                        _vm.term_class.venue
                          ? _c("th", [
                              _vm._v(_vm._s(_vm.term_class.venue.name)),
                            ])
                          : _vm._e(),
                      ]),
                    ]),
                  ]
                ),
                _vm._v(" "),
                _vm.grade
                  ? _c(
                      "table",
                      { staticClass: "table align-items-center table-flush" },
                      [
                        _c("thead", [
                          _vm._m(0),
                          _vm._v(" "),
                          _c("tr", { staticClass: "thead-light" }, [
                            _c("th"),
                            _vm._v(" "),
                            _c("th", [_vm._v("Grading System")]),
                            _vm._v(" "),
                            _c("th", [
                              _c(
                                "button",
                                {
                                  staticClass:
                                    "btn btn-sm btn-link text-underline",
                                  on: {
                                    click: function ($event) {
                                      return _vm.$modal.show("view_grades")
                                    },
                                  },
                                },
                                [
                                  _vm._v(
                                    "\n                            " +
                                      _vm._s(_vm.grade.grading_system.name) +
                                      "\n                        "
                                  ),
                                ]
                              ),
                            ]),
                          ]),
                          _vm._v(" "),
                          _vm._m(1),
                        ]),
                        _vm._v(" "),
                        _c(
                          "tbody",
                          [
                            _vm._l(
                              Object.keys(_vm.grade.scores),
                              function (gr) {
                                return _vm.grade.scores[gr]
                                  ? _c("tr", [
                                      _c("td", [
                                        _vm._v(
                                          _vm._s(_vm.assessments[gr].name)
                                        ),
                                      ]),
                                      _vm._v(" "),
                                      _c("td", [
                                        _vm._v(
                                          _vm._s(
                                            _vm.$root.full_name(
                                              _vm.assessments[gr]
                                                .lecturer_profile.user
                                            )
                                          )
                                        ),
                                      ]),
                                      _vm._v(" "),
                                      _c("td", [
                                        _vm._v(
                                          _vm._s(
                                            _vm.grade.scores[gr] +
                                              " / " +
                                              _vm.assessments[gr].score
                                          )
                                        ),
                                      ]),
                                    ])
                                  : _vm._e()
                              }
                            ),
                            _vm._v(" "),
                            _c("tr", [
                              _c("td"),
                              _vm._v(" "),
                              _c("th", [_vm._v("Total")]),
                              _vm._v(" "),
                              _c("th", [
                                _vm._v(
                                  _vm._s(
                                    _vm.totals.grade + " / " + _vm.totals.score
                                  )
                                ),
                              ]),
                            ]),
                          ],
                          2
                        ),
                        _vm._v(" "),
                        _c(
                          "modal",
                          {
                            attrs: {
                              scrollable: true,
                              name: "view_grades",
                              height: "auto",
                            },
                          },
                          [
                            _c("div", { staticClass: "modal-content" }, [
                              _c("div", {
                                staticClass: "modal-body",
                                domProps: {
                                  innerHTML: _vm._s(
                                    _vm.$root.view_grades(
                                      _vm.grade.grading_system.grades
                                    )
                                  ),
                                },
                              }),
                            ]),
                          ]
                        ),
                      ],
                      1
                    )
                  : _vm._e(),
              ])
            : _vm._e(),
        ]
      ),
      _vm._v(" "),
      _c(
        "modal",
        { attrs: { name: "students", height: "auto", draggable: true } },
        [
          _c("div", { staticClass: "modal modal-content" }, [
            _c("div", { staticClass: "modal-header" }, [
              _vm._v("\n                Registered Students\n            "),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "modal-body" }),
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
    return _c("tr", { staticClass: "thead-light" }, [
      _c("th"),
      _vm._v(" "),
      _c("th"),
      _vm._v(" "),
      _c("th"),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("tr", { staticClass: "thead-light" }, [
      _c("th", [_vm._v("Assessment")]),
      _vm._v(" "),
      _c("th", [_vm._v("By")]),
      _vm._v(" "),
      _c("th", [
        _vm._v("\n                        Score\n                    "),
      ]),
    ])
  },
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/admin/Classes/StudentClasses.vue":
/*!******************************************************************!*\
  !*** ./resources/js/components/admin/Classes/StudentClasses.vue ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _StudentClasses_vue_vue_type_template_id_c7c30582_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StudentClasses.vue?vue&type=template&id=c7c30582&scoped=true& */ "./resources/js/components/admin/Classes/StudentClasses.vue?vue&type=template&id=c7c30582&scoped=true&");
/* harmony import */ var _StudentClasses_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StudentClasses.vue?vue&type=script&lang=js& */ "./resources/js/components/admin/Classes/StudentClasses.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _StudentClasses_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _StudentClasses_vue_vue_type_template_id_c7c30582_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _StudentClasses_vue_vue_type_template_id_c7c30582_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "c7c30582",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/admin/Classes/StudentClasses.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/admin/Classes/StudentClasses.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/components/admin/Classes/StudentClasses.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StudentClasses_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./StudentClasses.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Classes/StudentClasses.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StudentClasses_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/admin/Classes/StudentClasses.vue?vue&type=template&id=c7c30582&scoped=true&":
/*!*************************************************************************************************************!*\
  !*** ./resources/js/components/admin/Classes/StudentClasses.vue?vue&type=template&id=c7c30582&scoped=true& ***!
  \*************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_StudentClasses_vue_vue_type_template_id_c7c30582_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./StudentClasses.vue?vue&type=template&id=c7c30582&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Classes/StudentClasses.vue?vue&type=template&id=c7c30582&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_StudentClasses_vue_vue_type_template_id_c7c30582_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_StudentClasses_vue_vue_type_template_id_c7c30582_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);