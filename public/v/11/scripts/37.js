(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[37],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/students/Transcript.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/students/Transcript.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "Transcript",
  data: function data() {
    return {
      user: null,
      profile: null,
      transcript: {}
    };
  },
  mounted: function mounted() {
    this.$store.state.page = 'My Transcript';
    this.get_user();
  },
  methods: {
    get_user: function get_user() {
      var _this = this;

      axios.post('/students/get/transcript').then(function (res) {
        _this.user = res.data.user;
        _this.profile = _this.$root.generate_transcript(res.data.profile); // this.generate_transcript();
      });
    },
    generate_transcript: function generate_transcript() {
      if (this.profile.major_department == null) this.$root.post_errors([['Your student status is invalid.']]);else if (this.profile.major_department.has_rotation) // medical transcript
        {
          // this.profile.grades
          this.transcript = {
            type: 'm',
            data: []
          };
          var grades = [];

          var _iterator = _createForOfIteratorHelper(this.profile.grades),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var grade = _step.value;

              if (grade.term_class.term.external_exam_percentage !== null) {
                this.transcript.data[grade.id] = grade;
                this.transcript.data[grade.id].grades = [];
              } else grades[grade.id] = grade;
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }

          for (var i in grades) {
            for (var yi in this.transcript.data) {
              if (grades[i].term_class.term.term_id === this.transcript.data[yi].term_class.term.id) {
                this.transcript.data[yi].grades[grades[i].id] = grades[i];
              }
            }
          }
        } else // normal transcript
        {
          // this.profile.grades
          this.transcript = {
            type: 'n',
            data: []
          };

          var _iterator2 = _createForOfIteratorHelper(this.profile.grades),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var _grade = _step2.value;

              if (this.transcript.data[_grade.term_class.term_id] === undefined) {
                this.transcript.data[_grade.term_class.term_id] = {
                  term: _grade.term_class.term,
                  grades: []
                };
              }

              this.transcript.data[_grade.term_class.term_id].grades[_grade.id] = _grade;
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/students/Transcript.vue?vue&type=template&id=23d15832&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/students/Transcript.vue?vue&type=template&id=23d15832&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************/
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
  return _vm.user && _vm.profile.major_department
    ? _c("div", { staticClass: "row card shadow" }, [
        _c("div", { staticClass: "card-body" }, [
          _c("div", { staticClass: "row" }, [
            _c(
              "div",
              { staticClass: "col-12" },
              [
                _vm._l(Object.keys(_vm.profile.transcript.terms), function (i) {
                  return _c(
                    "table",
                    { staticClass: "table table-borderless" },
                    [
                      _c(
                        "thead",
                        {
                          staticStyle: {
                            "margin-top": "3px",
                            "border-top": "1px solid #8898aa",
                          },
                        },
                        [
                          _c("tr", { staticClass: "thead-light" }, [
                            _c(
                              "th",
                              {
                                staticClass: "text-center",
                                attrs: { colspan: "5" },
                              },
                              [
                                _c("h5", [
                                  _vm._v(
                                    _vm._s(
                                      _vm.profile.transcript.terms[i].term.name
                                    )
                                  ),
                                ]),
                              ]
                            ),
                          ]),
                          _vm._v(" "),
                          _vm._m(0, true),
                        ]
                      ),
                      _vm._v(" "),
                      _vm._l(
                        _vm.profile.transcript.terms[i].grades,
                        function (grade) {
                          return _c(
                            "tbody",
                            _vm._l(
                              Object.keys(grade.transcript_data),
                              function (si) {
                                return _c("tr", [
                                  _c("td", [
                                    _vm._v(
                                      "\n                            " +
                                        _vm._s(grade.term_class.course.code) +
                                        "\n                        "
                                    ),
                                  ]),
                                  _vm._v(" "),
                                  _c("td", [
                                    _vm._v(
                                      "\n                            " +
                                        _vm._s(grade.term_class.course.name) +
                                        "\n                            "
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "span",
                                      {
                                        directives: [
                                          {
                                            name: "show",
                                            rawName: "v-show",
                                            value:
                                              grade.transcript_data[si]
                                                .is_resit,
                                            expression:
                                              "grade.transcript_data[si].is_resit",
                                          },
                                        ],
                                      },
                                      [
                                        _vm._v(
                                          "\n                                        (Resit)\n                                    "
                                        ),
                                      ]
                                    ),
                                    _vm._v(" "),
                                    grade.transcript_data[si].is_not_approved
                                      ? _c(
                                          "span",
                                          {
                                            staticClass:
                                              "float-right text-danger",
                                          },
                                          [
                                            _vm._v(
                                              "\n                                        Not Approved\n                                    "
                                            ),
                                          ]
                                        )
                                      : _vm._e(),
                                  ]),
                                  _vm._v(" "),
                                  _c("td", { staticClass: "text-center" }, [
                                    _vm._v(
                                      "\n                            " +
                                        _vm._s(
                                          grade.term_class.course.credit_hours
                                        ) +
                                        "\n                        "
                                    ),
                                  ]),
                                  _vm._v(" "),
                                  _c("td", { staticClass: "text-center" }, [
                                    _vm._v(
                                      "\n                            " +
                                        _vm._s(
                                          parseFloat(
                                            grade.transcript_data[si].gs.point
                                          ).toFixed(2)
                                        ) +
                                        "\n                        "
                                    ),
                                  ]),
                                  _vm._v(" "),
                                  _c("td", { staticClass: "text-center" }, [
                                    _vm._v(
                                      "\n                            " +
                                        _vm._s(
                                          grade.transcript_data[si].gs.grade
                                        ) +
                                        "\n                        "
                                    ),
                                  ]),
                                ])
                              }
                            ),
                            0
                          )
                        }
                      ),
                      _vm._v(" "),
                      _vm._m(1, true),
                    ],
                    2
                  )
                }),
                _vm._v(" "),
                _c("table", { staticClass: "table table-borderless" }, [
                  _c(
                    "thead",
                    {
                      staticStyle: {
                        "margin-top": "3px",
                        "border-top": "1px solid #8898aa",
                      },
                    },
                    [
                      _c("tr", [
                        _c(
                          "th",
                          {
                            staticClass: "text-center",
                            attrs: { colspan: "5" },
                          },
                          [
                            _c("span", { staticClass: "h5" }, [
                              _vm._v(
                                "\n                                    Average Quality Point:\n                                "
                              ),
                            ]),
                            _vm._v(" "),
                            _c("span", { staticClass: "h3" }, [
                              _vm._v(
                                "\n                                    " +
                                  _vm._s(
                                    _vm.profile.transcript.gpa.calculated.toFixed(
                                      2
                                    )
                                  ) +
                                  "\n                                "
                              ),
                            ]),
                          ]
                        ),
                      ]),
                    ]
                  ),
                ]),
              ],
              2
            ),
          ]),
        ]),
      ])
    : _c("div", { staticClass: "row card card-stats" }, [
        _c("h3", { staticClass: "card-header" }, [
          _vm._v("\n        Invalid Student Profile\n    "),
        ]),
      ])
}
var staticRenderFns = [
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("tr", { staticClass: "thead-light" }, [
      _c("th", [_vm._v("Course Code")]),
      _vm._v(" "),
      _c("th", [_vm._v("Course Description")]),
      _vm._v(" "),
      _c("th", { staticClass: "text-center" }, [_vm._v("Credit Value")]),
      _vm._v(" "),
      _c("th", { staticClass: "text-center" }, [_vm._v("Qualitative Point")]),
      _vm._v(" "),
      _c("th", { staticClass: "text-center" }, [_vm._v("Grade")]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [_c("tr", [_c("td", { attrs: { colspan: "5" } })])])
  },
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/students/Transcript.vue":
/*!*********************************************************!*\
  !*** ./resources/js/components/students/Transcript.vue ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Transcript_vue_vue_type_template_id_23d15832_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Transcript.vue?vue&type=template&id=23d15832&scoped=true& */ "./resources/js/components/students/Transcript.vue?vue&type=template&id=23d15832&scoped=true&");
/* harmony import */ var _Transcript_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Transcript.vue?vue&type=script&lang=js& */ "./resources/js/components/students/Transcript.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Transcript_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Transcript_vue_vue_type_template_id_23d15832_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Transcript_vue_vue_type_template_id_23d15832_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "23d15832",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/students/Transcript.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/students/Transcript.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/students/Transcript.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Transcript_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Transcript.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/students/Transcript.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Transcript_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/students/Transcript.vue?vue&type=template&id=23d15832&scoped=true&":
/*!****************************************************************************************************!*\
  !*** ./resources/js/components/students/Transcript.vue?vue&type=template&id=23d15832&scoped=true& ***!
  \****************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Transcript_vue_vue_type_template_id_23d15832_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Transcript.vue?vue&type=template&id=23d15832&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/students/Transcript.vue?vue&type=template&id=23d15832&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Transcript_vue_vue_type_template_id_23d15832_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Transcript_vue_vue_type_template_id_23d15832_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);