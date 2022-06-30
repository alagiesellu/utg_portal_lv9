(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[20],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/academic/Classes/AssessmentGrade.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/academic/Classes/AssessmentGrade.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue_json_excel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-json-excel */ "./node_modules/vue-json-excel/dist/vue-json-excel.esm.js");
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

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "AssessmentGrade",
  components: {
    downloadexcel: vue_json_excel__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      json_fields: {
        '#': 'mark',
        'Name': 'name',
        'MAT Number': 'mat',
        'Score': 'score',
        'Grade': 'grade'
      },
      assessment: {},
      students_registrations: {},
      term_class: {},
      grades: {},
      confirm: false,
      editable: [],
      all_stored: true,
      //*pass password: null,
      input_csv: null
    };
  },
  created: function created() {
    this.fetchData();
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    onFileChange: function onFileChange(e) {
      var _this = this;

      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      var file_reader = new FileReader();
      file_reader.readAsText(files[0]);

      file_reader.onload = function (e) {
        var data = [];

        var _iterator = _createForOfIteratorHelper(e.target.result.split('\n')),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var line = _step.value;

            if (line.charAt(0) === '>') {
              data = line.split(',');
              _this.grades['_' + data[2]].scores[_this.$route.params.ass] = data[3];

              _this.$forceUpdate();
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      };

      this.$modal.hide('upload_csv');
    },
    getCSV: function getCSV() {
      var csv_data = [];

      for (var i in this.grades) {
        csv_data.push({
          mark: '>',
          name: this.$root.full_name(this.grades[i].student_profile.user),
          mat: this.grades[i].student_profile.user.num,
          score: this.grades[i].scores[this.$route.params.ass],
          grade: this.assessment.score
        });
      }

      return csv_data;
    },
    startDownload: function startDownload() {},
    finishDownload: function finishDownload() {},
    submitForm: function submitForm(e) {
      var _this2 = this;

      e.preventDefault();

      if (this.confirm) {
        //*pass if (!this.password)
        ////*pass  this.$root.post_errors([['Confirm your password to be able to complete the action.']]);
        //*pass else {
        // let grades = [];
        // for (let sr of this.students_registrations)
        //     grades.push({id:sr.profile_id, score:sr.score});
        axios.post('/academic/grades/store', {
          grades: this.grades,
          //*pass password: this.password,
          assessment: this.assessment.id
        }).then(function (res) {
          _this2.$root.post_success(res.data.success);

          _this2.load_grades(res.data.grades);

          _this2.calEditable();
        }); //*pass }
      } else this.confirm = true;
    },
    calEditable: function calEditable() {
      this.all_stored = true;

      for (var i in this.grades) {
        this.editable[this.grades[i].id] = this.grades[i].scores[this.$route.params.ass];
        if (this.editable[this.grades[i].id] === undefined || this.editable[this.grades[i].id] === null) this.all_stored = false;
      }
    },
    fetchData: function fetchData() {
      this.get_grades(); //this.get_students();

      this.get_assessment();
      this.get_term_class();
    },
    get_grades: function get_grades() {
      var _this3 = this;

      axios.get('/academic/grades/' + this.$route.params.tc + '/assignment').then(function (res) {
        _this3.load_grades(res.data.grades);

        _this3.calEditable();
      });
    },
    load_grades: function load_grades(grades) {
      this.grades = {};

      var _iterator2 = _createForOfIteratorHelper(grades),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var grade = _step2.value;
          this.grades['_' + grade.student_profile.user.num] = grade;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    },
    get_term_class: function get_term_class() {
      var _this4 = this;

      axios.get('/academic/classes/' + this.$route.params.tc).then(function (res) {
        _this4.term_class = res.data.term_class;
      });
    },
    get_assessment: function get_assessment() {
      var _this5 = this;

      axios.get('/academic/assessments/' + this.$route.params.ass).then(function (res) {
        _this5.assessment = res.data.assessment;
      });
    },
    get_students: function get_students() {
      var _this6 = this;

      axios.get('/academic/classes/' + this.$route.params.tc + '/registrations/all').then(function (res) {
        _this6.students_registrations = res.data.class_registrations;
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/academic/Classes/AssessmentGrade.vue?vue&type=template&id=2d2f834f&scoped=true&":
/*!***********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/academic/Classes/AssessmentGrade.vue?vue&type=template&id=2d2f834f&scoped=true& ***!
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
        _c("div", { staticClass: "card shadow" }, [
          _c(
            "div",
            { staticClass: "card-header" },
            [
              _c(
                "button",
                {
                  staticClass: "btn btn-outline-primary btn-sm float-right",
                  on: {
                    click: function ($event) {
                      return _vm.$parent.$router.back()
                    },
                  },
                },
                [
                  _c("i", { staticClass: "ni ni-bold-left" }),
                  _vm._v(" Back\n                    "),
                ]
              ),
              _vm._v(" "),
              _vm.term_class.course
                ? _c("h4", [
                    _c("small", [_vm._v("Course:")]),
                    _vm._v(
                      "\n                        " +
                        _vm._s(_vm.term_class.course.name) +
                        "\n                    "
                    ),
                  ])
                : _vm._e(),
              _vm._v(" "),
              _c("h4", [
                _c("small", [_vm._v("Assessment:")]),
                _vm._v(
                  "\n                        " +
                    _vm._s(_vm.assessment.name) +
                    "\n                    "
                ),
              ]),
              _vm._v(" "),
              _c("hr"),
              _vm._v(" "),
              _vm.term_class.course
                ? _c(
                    "downloadexcel",
                    {
                      staticClass: "btn btn-sm btn-outline-default",
                      attrs: {
                        fetch: _vm.getCSV,
                        fields: _vm.json_fields,
                        name:
                          _vm.term_class.course.name
                            .replace(/\s+/g, "_")
                            .toLowerCase() +
                          " - " +
                          _vm.assessment.name
                            .replace(/\s+/g, "_")
                            .toLowerCase() +
                          ".csv",
                        "before-generate": _vm.startDownload,
                        "before-finish": _vm.finishDownload,
                        type: "csv",
                      },
                    },
                    [
                      _c("i", { staticClass: "ni ni-cloud-download-95" }),
                      _vm._v(
                        "\n                        Download CSV\n                    "
                      ),
                    ]
                  )
                : _vm._e(),
              _vm._v(" "),
              _c(
                "button",
                {
                  staticClass: "btn btn-sm btn-outline-default",
                  on: {
                    click: function ($event) {
                      return _vm.$modal.show("upload_csv")
                    },
                  },
                },
                [
                  _c("i", { staticClass: "ni ni-cloud-upload-96" }),
                  _vm._v(
                    "\n                        Upload CSV\n                    "
                  ),
                ]
              ),
            ],
            1
          ),
          _vm._v(" "),
          _c("div", { staticClass: "card-body" }, [
            _c("form", { on: { submit: _vm.submitForm } }, [
              _c("table", { staticClass: "table" }, [
                _vm._m(0),
                _vm._v(" "),
                _c(
                  "tbody",
                  [
                    _vm._l(Object.keys(_vm.grades), function (i) {
                      return _c("tr", [
                        _c("th", [
                          _vm._v(
                            _vm._s(
                              _vm.$root.full_name(
                                _vm.grades[i].student_profile.user
                              )
                            )
                          ),
                        ]),
                        _vm._v(" "),
                        _c("th", [
                          _vm._v(
                            _vm._s(_vm.grades[i].student_profile.user.num)
                          ),
                        ]),
                        _vm._v(" "),
                        _c("th", [
                          _vm.editable[_vm.grades[i].id] == null
                            ? _c("div", { staticClass: "form-group" }, [
                                _c(
                                  "div",
                                  {
                                    staticClass:
                                      "input-group input-group-sm mb-4",
                                  },
                                  [
                                    _c("input", {
                                      directives: [
                                        {
                                          name: "model",
                                          rawName: "v-model",
                                          value:
                                            _vm.grades[i].scores[
                                              _vm.$route.params.ass
                                            ],
                                          expression:
                                            "grades[i].scores[$route.params.ass]",
                                        },
                                      ],
                                      staticClass: "form-control",
                                      attrs: {
                                        placeholder: "score",
                                        type: "number",
                                        step: "0.01",
                                        min: "0",
                                        max: _vm.assessment.score,
                                      },
                                      domProps: {
                                        value:
                                          _vm.grades[i].scores[
                                            _vm.$route.params.ass
                                          ],
                                      },
                                      on: {
                                        input: function ($event) {
                                          if ($event.target.composing) {
                                            return
                                          }
                                          _vm.$set(
                                            _vm.grades[i].scores,
                                            _vm.$route.params.ass,
                                            $event.target.value
                                          )
                                        },
                                      },
                                    }),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      { staticClass: "input-group-append" },
                                      [
                                        _c(
                                          "span",
                                          { staticClass: "input-group-text" },
                                          [
                                            _vm._v(
                                              "/ " +
                                                _vm._s(_vm.assessment.score)
                                            ),
                                          ]
                                        ),
                                      ]
                                    ),
                                  ]
                                ),
                              ])
                            : _c("span", [
                                _vm._v(
                                  "\n                                        " +
                                    _vm._s(
                                      _vm.grades[i].scores[
                                        _vm.$route.params.ass
                                      ] +
                                        " / " +
                                        _vm.assessment.score
                                    ) +
                                    "\n                                    "
                                ),
                              ]),
                        ]),
                      ])
                    }),
                    _vm._v(" "),
                    !_vm.all_stored
                      ? _c("tr", [
                          _c(
                            "td",
                            {
                              staticClass: "text-right",
                              attrs: { colspan: "3" },
                            },
                            [
                              _vm.confirm
                                ? _c("span", [
                                    _vm._m(1),
                                    _vm._v(" "),
                                    _c(
                                      "button",
                                      {
                                        staticClass: "btn btn-danger btn-sm",
                                        attrs: { type: "button" },
                                        on: {
                                          click: function ($event) {
                                            _vm.confirm = false
                                          },
                                        },
                                      },
                                      [_vm._v("Cancel")]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "button",
                                      {
                                        staticClass: "btn btn-primary btn-sm",
                                        attrs: { type: "submit" },
                                      },
                                      [_vm._v("Save Changes")]
                                    ),
                                  ])
                                : _c(
                                    "button",
                                    {
                                      staticClass: "btn btn-primary btn-sm",
                                      attrs: { type: "submit" },
                                    },
                                    [_vm._v("Store")]
                                  ),
                            ]
                          ),
                        ])
                      : _c("tr", [
                          _c(
                            "td",
                            {
                              staticClass: "h1 text-danger",
                              attrs: { colspan: "3" },
                            },
                            [
                              _vm._v(
                                "You cannot modify grades! Inform appropriate authorities if need be."
                              ),
                            ]
                          ),
                        ]),
                  ],
                  2
                ),
              ]),
            ]),
          ]),
        ]),
      ]),
      _vm._v(" "),
      _c(
        "modal",
        {
          attrs: {
            scrollable: true,
            name: "upload_csv",
            height: "auto",
            draggable: true,
          },
        },
        [
          _c("div", { staticClass: "modal modal-content" }, [
            _c("h3", { staticClass: "modal-header" }, [
              _vm._v("Upload CSV file with students grades added."),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "modal-body" }, [
              _c("div", { staticClass: "form-group mb-3" }, [
                _c("div", { staticClass: "input-group" }, [
                  _c("div", { staticClass: "input-group-prepend" }, [
                    _c("span", { staticClass: "input-group-text" }, [
                      _c("i", { staticClass: "ni ni-lock-circle-open" }),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c("input", {
                    staticClass: "form-control",
                    attrs: {
                      placeholder: "CSV file",
                      accept: ".csv",
                      type: "file",
                    },
                    on: { change: _vm.onFileChange },
                  }),
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
    return _c("thead", [
      _c("tr", [
        _c("th", { attrs: { colspan: "2" } }, [_vm._v("Student")]),
        _vm._v(" "),
        _c("th", [_vm._v("Score")]),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "form-group mb-3" }, [
      _c("label", { staticClass: "form-control-label" }, [
        _vm._v(
          "\n                                                 Save Scores.\n"
        ),
      ]),
    ])
  },
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/academic/Classes/AssessmentGrade.vue":
/*!**********************************************************************!*\
  !*** ./resources/js/components/academic/Classes/AssessmentGrade.vue ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AssessmentGrade_vue_vue_type_template_id_2d2f834f_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AssessmentGrade.vue?vue&type=template&id=2d2f834f&scoped=true& */ "./resources/js/components/academic/Classes/AssessmentGrade.vue?vue&type=template&id=2d2f834f&scoped=true&");
/* harmony import */ var _AssessmentGrade_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AssessmentGrade.vue?vue&type=script&lang=js& */ "./resources/js/components/academic/Classes/AssessmentGrade.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _AssessmentGrade_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _AssessmentGrade_vue_vue_type_template_id_2d2f834f_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _AssessmentGrade_vue_vue_type_template_id_2d2f834f_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "2d2f834f",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/academic/Classes/AssessmentGrade.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/academic/Classes/AssessmentGrade.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************!*\
  !*** ./resources/js/components/academic/Classes/AssessmentGrade.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AssessmentGrade_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./AssessmentGrade.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/academic/Classes/AssessmentGrade.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AssessmentGrade_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/academic/Classes/AssessmentGrade.vue?vue&type=template&id=2d2f834f&scoped=true&":
/*!*****************************************************************************************************************!*\
  !*** ./resources/js/components/academic/Classes/AssessmentGrade.vue?vue&type=template&id=2d2f834f&scoped=true& ***!
  \*****************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AssessmentGrade_vue_vue_type_template_id_2d2f834f_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./AssessmentGrade.vue?vue&type=template&id=2d2f834f&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/academic/Classes/AssessmentGrade.vue?vue&type=template&id=2d2f834f&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AssessmentGrade_vue_vue_type_template_id_2d2f834f_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AssessmentGrade_vue_vue_type_template_id_2d2f834f_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);