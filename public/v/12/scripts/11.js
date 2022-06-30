(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[11],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/GradeApproval.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/GradeApproval.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _GradeApproval_ViewGrades__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GradeApproval/ViewGrades */ "./resources/js/components/admin/GradeApproval/ViewGrades.vue");
/* harmony import */ var _GradeApproval_IndexGrades__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GradeApproval/IndexGrades */ "./resources/js/components/admin/GradeApproval/IndexGrades.vue");
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  name: "GradeApproval",
  components: {
    IndexGrades: _GradeApproval_IndexGrades__WEBPACK_IMPORTED_MODULE_1__["default"],
    ViewGrades: _GradeApproval_ViewGrades__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      grades: null,
      terms: null,
      term: null,
      term_classes: null,
      term_class: null,
      filter: {
        search: null
      },
      input: {
        term: {}
      }
    };
  },
  created: function created() {
    this.fetchData();
  },
  watch: {
    '$route': 'fetchData'
  },
  mounted: function mounted() {
    this.$store.state.page = 'Grade Approvals';
  },
  methods: {
    submitTerm: function submitTerm(e) {
      e.preventDefault();
    },
    termSelected: function termSelected() {
      this.$router.push({
        name: 'ad.grades.approvals',
        params: {
          id: this.input.term.id
        }
      });
      this.get_term_classes();
    },
    get_term_classes: function get_term_classes() {
      var _this = this;

      if (this.terms == null) this.get_terms();
      axios.get('/admin/grades/approvals/classes/' + this.$route.params.id).then(function (res) {
        _this.term_classes = res.data.term_classes;
        _this.term = res.data.term;
      });
    },
    fetchData: function fetchData() {
      if (this.$route.params.id !== undefined && this.$route.params.tc === undefined) this.get_term_classes();else if (this.$route.params.tc !== undefined) this.get_grades();else this.get_terms();
    },
    get_grades: function get_grades() {
      var _this2 = this;

      axios.get('/admin/grades/approvals/grades/' + this.$route.params.tc).then(function (res) {
        _this2.grades = res.data.grades;
        _this2.term_class = res.data.term_class;

        _this2.prepare_grades();
      });
    },
    get_terms: function get_terms() {
      var _this3 = this;

      this.grades = null;
      axios.get('/admin/grades/approvals/terms').then(function (res) {
        _this3.terms = res.data.terms; // this.input.term.id = this.$route.params.id;
      });
    },
    filter_users: function filter_users(e) {
      var _this4 = this;

      e.preventDefault();
      axios.post('/admin/grades/search', {
        search: this.filter.search
      }).then(function (res) {
        _this4.filter.search = null;
        _this4.user = res.data.user;
        _this4.profile = res.data.profile;

        _this4.$router.push({
          name: 'ad.grades',
          params: {
            id: _this4.user.num
          }
        });

        _this4.prepare_grades();
      });
    },
    prepare_grades: function prepare_grades() {
      for (var i in this.grades) {
        this.grades[i].total = 0;

        for (var si in this.grades[i].scores) {
          if (this.grades[i].scores[si] != null) this.grades[i].total += this.grades[i].scores[si] * 1;
        }
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/GradeApproval/IndexGrades.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/GradeApproval/IndexGrades.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "IndexGrades"
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/GradeApproval/ViewGrades.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/GradeApproval/ViewGrades.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "ViewGrades",
  data: function data() {
    return {
      form: {
        input: {
          grades: [],
          all: true //*pass password: null,

        }
      }
    };
  },
  mounted: function mounted() {
    this.select_all();
  },
  methods: {
    select_all: function select_all() {
      this.form.input.all = this.form.input.all !== true;

      var _iterator = _createForOfIteratorHelper(this.$parent.grades),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var grade = _step.value;
          if (this.$refs['grade_' + grade.id]) this.$refs['grade_' + grade.id][0].checked = this.form.input.all;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    },
    submitForm: function submitForm(e) {
      var _this = this;

      e.preventDefault();
      this.form.input.grades = [];

      var _iterator2 = _createForOfIteratorHelper(this.$parent.grades),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var grade = _step2.value;
          if (this.$refs['grade_' + grade.id] && this.$refs['grade_' + grade.id][0].checked) this.form.input.grades.push(grade.id);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      axios.post('/admin/grades/approvals/store', {
        grades: this.form.input.grades,
        term_class: this.$route.params.id //*pass password: this.form.input.password,

      }).then(function (res) {
        _this.$root.post_success(res.data.success); //*pass this.form.input.password = null;

      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/GradeApproval.vue?vue&type=template&id=63d24d5f&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/GradeApproval.vue?vue&type=template&id=63d24d5f&scoped=true& ***!
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
  return _c("div", [_vm.grades ? _c("ViewGrades") : _c("IndexGrades")], 1)
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/GradeApproval/IndexGrades.vue?vue&type=template&id=72fa929e&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/GradeApproval/IndexGrades.vue?vue&type=template&id=72fa929e&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "col-md-12" }, [
    _c("div", { staticClass: "card shadow mb-4 mb-xl-0" }, [
      _vm._m(0),
      _vm._v(" "),
      _c("div", { staticClass: "card-body" }, [
        _c(
          "form",
          { staticClass: "col-md-12", on: { submit: _vm.$parent.submitTerm } },
          [
            _c("div", { staticClass: "form-group" }, [
              _c("div", { staticClass: "form-group mb-3" }, [
                _vm.$parent.terms
                  ? _c(
                      "div",
                      { staticClass: "input-group" },
                      [
                        _vm._m(1),
                        _vm._v(" "),
                        _c("v-select", {
                          staticClass: "form-control",
                          attrs: {
                            options: _vm.$parent.terms,
                            reduce: function (term) {
                              return term.id
                            },
                            label: "name",
                          },
                          on: { input: _vm.$parent.termSelected },
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
                            value: _vm.$parent.input.term.id,
                            callback: function ($$v) {
                              _vm.$set(_vm.$parent.input.term, "id", $$v)
                            },
                            expression: "$parent.input.term.id",
                          },
                        }),
                      ],
                      1
                    )
                  : _vm._e(),
              ]),
            ]),
          ]
        ),
        _vm._v(" "),
        _vm.$parent.term_classes
          ? _c("table", { staticClass: "table" }, [
              _c("thead", [
                _c("tr", [
                  _c("th"),
                  _vm._v(" "),
                  _c("th", [
                    _vm._v(
                      "\n                        Course of\n                        "
                    ),
                    _c("h3", { staticClass: "text-underline" }, [
                      _vm._v(_vm._s(_vm.$parent.term.name)),
                    ]),
                  ]),
                ]),
              ]),
              _vm._v(" "),
              _c(
                "tbody",
                _vm._l(_vm.$parent.term_classes, function (term_class) {
                  return _c("tr", [
                    _c(
                      "td",
                      [
                        _c(
                          "router-link",
                          {
                            staticClass: "btn btn-sm btn-primary",
                            attrs: {
                              to: {
                                name: "ad.grades.approvals",
                                params: {
                                  id: _vm.$parent.term.id,
                                  tc: term_class.id,
                                },
                              },
                            },
                          },
                          [_c("i", { staticClass: "ni ni-bold-right" })]
                        ),
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c("td", [
                      term_class.course_id
                        ? _c("span", [_vm._v(_vm._s(term_class.course.name))])
                        : _c("span", [_vm._v("External Exams")]),
                    ]),
                  ])
                }),
                0
              ),
            ])
          : _vm._e(),
      ]),
    ]),
  ])
}
var staticRenderFns = [
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "card-header bg-transparent" }, [
      _c("h3", { staticClass: "mb-0" }, [
        _vm._v("\n                Approve Grades\n            "),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "input-group-prepend" }, [
      _c("span", { staticClass: "input-group-text" }, [
        _vm._v(
          "\n                                        Academic Terms :\n                                    "
        ),
      ]),
    ])
  },
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/GradeApproval/ViewGrades.vue?vue&type=template&id=54c29d81&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/GradeApproval/ViewGrades.vue?vue&type=template&id=54c29d81&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "row" }, [
    _c("div", { staticClass: "col-12" }, [
      _c("div", { staticClass: "card shadow" }, [
        _c("div", { staticClass: "card-header bg-transparent" }, [
          _c("h2", [
            _vm._v(
              "\n                        Approve Grades\n                        "
            ),
            _c(
              "button",
              {
                staticClass: "btn btn-sm btn-outline-primary float-right",
                on: {
                  click: function ($event) {
                    return _vm.$router.push({
                      name: "ad.grades.approvals",
                      params: { id: _vm.$parent.term_class.term.id },
                    })
                  },
                },
              },
              [
                _c("i", { staticClass: "ni ni-bold-left" }),
                _vm._v(" Back\n                        "),
              ]
            ),
          ]),
          _vm._v(" "),
          _c("h4", [
            _c("small", [_vm._v("Term:")]),
            _vm._v(
              " " +
                _vm._s(_vm.$parent.term_class.term.name) +
                "\n                    "
            ),
          ]),
          _vm._v(" "),
          _c("h4", [
            _c("small", [_vm._v("Course:")]),
            _vm._v(
              " " +
                _vm._s(_vm.$parent.term_class.course.name) +
                "\n                    "
            ),
          ]),
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "table-responsive" }, [
          _c("table", { staticClass: "table align-items-center table-flush" }, [
            _c("thead", [
              _c("tr", [
                _c("th", [
                  _c(
                    "div",
                    {
                      staticClass:
                        "custom-control custom-checkbox btn btn-sm btn-outline-primary",
                    },
                    [
                      _c("input", {
                        ref: "select_all",
                        staticClass: "custom-control-input",
                        attrs: { id: "select_all", type: "checkbox" },
                        on: { click: _vm.select_all },
                      }),
                      _vm._v(" "),
                      _c(
                        "label",
                        {
                          staticClass: "custom-control-label",
                          attrs: { for: "select_all" },
                        },
                        [_vm._v("Approve All")]
                      ),
                    ]
                  ),
                ]),
                _vm._v(" "),
                _c("th", [_vm._v("Score")]),
                _vm._v(" "),
                _c("th", [_vm._v("Student")]),
                _vm._v(" "),
                _c("th", [_vm._v("#")]),
              ]),
            ]),
            _vm._v(" "),
            _c(
              "tbody",
              _vm._l(_vm.$parent.grades, function (grade) {
                return grade.uploaded_by_profile_id != null &&
                  grade.approved_by_profile_id === null
                  ? _c("tr", [
                      _c("td", [
                        _c(
                          "div",
                          {
                            staticClass: "custom-control custom-checkbox mb-3",
                          },
                          [
                            _c("input", {
                              ref: "grade_" + grade.id,
                              refInFor: true,
                              staticClass: "custom-control-input",
                              attrs: {
                                id: "grade_" + grade.id,
                                type: "checkbox",
                              },
                            }),
                            _vm._v(" "),
                            _c(
                              "label",
                              {
                                staticClass: "custom-control-label",
                                attrs: { for: "grade_" + grade.id },
                              },
                              [_vm._v("Approve")]
                            ),
                          ]
                        ),
                      ]),
                      _vm._v(" "),
                      _c("th", [
                        _vm._v(
                          "\n                                " +
                            _vm._s(grade.total) +
                            "%\n                                "
                        ),
                        grade.resit_grade_id
                          ? _c("span", [
                              _vm._v(
                                "\n                                    (Resit)\n                                "
                              ),
                            ])
                          : _vm._e(),
                      ]),
                      _vm._v(" "),
                      _c("td", [
                        _vm._v(
                          "\n                                " +
                            _vm._s(
                              _vm.$root.full_name(grade.student_profile.user)
                            ) +
                            "\n                            "
                        ),
                      ]),
                      _vm._v(" "),
                      _c("td", [
                        _vm._v(
                          "\n                                " +
                            _vm._s(grade.student_profile.user.num) +
                            "\n                            "
                        ),
                      ]),
                    ])
                  : _vm._e()
              }),
              0
            ),
          ]),
          _vm._v(" "),
          _c(
            "form",
            { staticClass: "card-body", on: { submit: _vm.submitForm } },
            [_vm._m(0)]
          ),
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
    return _c("div", { staticClass: "form-group mb-3" }, [
      _c("div", { staticClass: "input-group" }, [
        _c("div", { staticClass: "input-group-prepend" }, [
          _c(
            "button",
            {
              staticClass: "btn btn-sm btn-primary",
              attrs: { type: "submit" },
            },
            [_vm._v("Approve Grades")]
          ),
        ]),
      ]),
    ])
  },
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/admin/GradeApproval.vue":
/*!*********************************************************!*\
  !*** ./resources/js/components/admin/GradeApproval.vue ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _GradeApproval_vue_vue_type_template_id_63d24d5f_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GradeApproval.vue?vue&type=template&id=63d24d5f&scoped=true& */ "./resources/js/components/admin/GradeApproval.vue?vue&type=template&id=63d24d5f&scoped=true&");
/* harmony import */ var _GradeApproval_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GradeApproval.vue?vue&type=script&lang=js& */ "./resources/js/components/admin/GradeApproval.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _GradeApproval_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _GradeApproval_vue_vue_type_template_id_63d24d5f_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _GradeApproval_vue_vue_type_template_id_63d24d5f_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "63d24d5f",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/admin/GradeApproval.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/admin/GradeApproval.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/admin/GradeApproval.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GradeApproval_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./GradeApproval.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/GradeApproval.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GradeApproval_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/admin/GradeApproval.vue?vue&type=template&id=63d24d5f&scoped=true&":
/*!****************************************************************************************************!*\
  !*** ./resources/js/components/admin/GradeApproval.vue?vue&type=template&id=63d24d5f&scoped=true& ***!
  \****************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_GradeApproval_vue_vue_type_template_id_63d24d5f_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./GradeApproval.vue?vue&type=template&id=63d24d5f&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/GradeApproval.vue?vue&type=template&id=63d24d5f&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_GradeApproval_vue_vue_type_template_id_63d24d5f_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_GradeApproval_vue_vue_type_template_id_63d24d5f_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/admin/GradeApproval/IndexGrades.vue":
/*!*********************************************************************!*\
  !*** ./resources/js/components/admin/GradeApproval/IndexGrades.vue ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _IndexGrades_vue_vue_type_template_id_72fa929e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./IndexGrades.vue?vue&type=template&id=72fa929e&scoped=true& */ "./resources/js/components/admin/GradeApproval/IndexGrades.vue?vue&type=template&id=72fa929e&scoped=true&");
/* harmony import */ var _IndexGrades_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./IndexGrades.vue?vue&type=script&lang=js& */ "./resources/js/components/admin/GradeApproval/IndexGrades.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _IndexGrades_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _IndexGrades_vue_vue_type_template_id_72fa929e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _IndexGrades_vue_vue_type_template_id_72fa929e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "72fa929e",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/admin/GradeApproval/IndexGrades.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/admin/GradeApproval/IndexGrades.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************!*\
  !*** ./resources/js/components/admin/GradeApproval/IndexGrades.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IndexGrades_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./IndexGrades.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/GradeApproval/IndexGrades.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IndexGrades_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/admin/GradeApproval/IndexGrades.vue?vue&type=template&id=72fa929e&scoped=true&":
/*!****************************************************************************************************************!*\
  !*** ./resources/js/components/admin/GradeApproval/IndexGrades.vue?vue&type=template&id=72fa929e&scoped=true& ***!
  \****************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_IndexGrades_vue_vue_type_template_id_72fa929e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./IndexGrades.vue?vue&type=template&id=72fa929e&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/GradeApproval/IndexGrades.vue?vue&type=template&id=72fa929e&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_IndexGrades_vue_vue_type_template_id_72fa929e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_IndexGrades_vue_vue_type_template_id_72fa929e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/admin/GradeApproval/ViewGrades.vue":
/*!********************************************************************!*\
  !*** ./resources/js/components/admin/GradeApproval/ViewGrades.vue ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ViewGrades_vue_vue_type_template_id_54c29d81_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ViewGrades.vue?vue&type=template&id=54c29d81&scoped=true& */ "./resources/js/components/admin/GradeApproval/ViewGrades.vue?vue&type=template&id=54c29d81&scoped=true&");
/* harmony import */ var _ViewGrades_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ViewGrades.vue?vue&type=script&lang=js& */ "./resources/js/components/admin/GradeApproval/ViewGrades.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ViewGrades_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ViewGrades_vue_vue_type_template_id_54c29d81_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ViewGrades_vue_vue_type_template_id_54c29d81_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "54c29d81",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/admin/GradeApproval/ViewGrades.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/admin/GradeApproval/ViewGrades.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************!*\
  !*** ./resources/js/components/admin/GradeApproval/ViewGrades.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewGrades_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./ViewGrades.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/GradeApproval/ViewGrades.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewGrades_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/admin/GradeApproval/ViewGrades.vue?vue&type=template&id=54c29d81&scoped=true&":
/*!***************************************************************************************************************!*\
  !*** ./resources/js/components/admin/GradeApproval/ViewGrades.vue?vue&type=template&id=54c29d81&scoped=true& ***!
  \***************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewGrades_vue_vue_type_template_id_54c29d81_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./ViewGrades.vue?vue&type=template&id=54c29d81&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/GradeApproval/ViewGrades.vue?vue&type=template&id=54c29d81&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewGrades_vue_vue_type_template_id_54c29d81_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewGrades_vue_vue_type_template_id_54c29d81_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);