(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[26],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/academic/Classes/ViewClasses.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/academic/Classes/ViewClasses.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "ViewClasses",
  data: function data() {
    return {
      term_class: {},
      class_registrations: {},
      form: {
        input: {}
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
    fetchData: function fetchData() {
      this.get_term_class();
    },
    get_term_class: function get_term_class() {
      var _this = this;

      axios.get('/academic/classes/' + this.$route.params.id).then(function (res) {
        _this.term_class = res.data.term_class;
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/academic/Classes/ViewClasses.vue?vue&type=template&id=feaf244a&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/academic/Classes/ViewClasses.vue?vue&type=template&id=feaf244a&scoped=true& ***!
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
  return _c("div", { staticClass: "container-fluid" }, [
    _c("div", { staticClass: "header-body" }, [
      _c("div", { staticClass: "row" }, [
        _c("div", { staticClass: "col-md-12" }, [
          _c("div", { staticClass: "card card-stats mb-4 mb-xl-0" }, [
            _c(
              "div",
              { staticClass: "card-body" },
              [
                _c(
                  "router-link",
                  {
                    staticClass: "btn btn-link btn-sm",
                    attrs: {
                      to: {
                        name: "ac.classes.assessments",
                        params: { id: _vm.term_class.id },
                      },
                    },
                  },
                  [
                    _c("i", { staticClass: "ni ni-ruler-pencil" }),
                    _vm._v(" Assessments\n                        "),
                  ]
                ),
                _vm._v(" "),
                _c(
                  "router-link",
                  {
                    staticClass: "btn btn-link btn-sm",
                    attrs: {
                      to: {
                        name: "ac.classes.students",
                        params: { id: _vm.term_class.id },
                      },
                    },
                  },
                  [
                    _c("i", { staticClass: "ni ni-single-02" }),
                    _vm._v(" Registered Students\n                        "),
                  ]
                ),
                _vm._v(" "),
                _c(
                  "router-link",
                  {
                    staticClass: "btn btn-link btn-sm",
                    attrs: {
                      to: {
                        name: "ac.classes.files",
                        params: { id: _vm.term_class.id },
                      },
                    },
                  },
                  [
                    _c("i", { staticClass: "ni ni-folder-17" }),
                    _vm._v(" Files\n                        "),
                  ]
                ),
                _vm._v(" "),
                _c(
                  "router-link",
                  {
                    staticClass: "btn btn-link btn-sm",
                    attrs: {
                      to: {
                        name: "ac.classes.mails",
                        params: { id: _vm.term_class.id },
                      },
                    },
                  },
                  [
                    _c("i", { staticClass: "ni ni-email-83" }),
                    _vm._v(" Mails\n                        "),
                  ]
                ),
                _vm._v(" "),
                _c("table", { staticClass: "table" }, [
                  _c("tbody", [
                    _vm.term_class.course
                      ? _c("tr", [
                          _c("td", [_vm._v("Course")]),
                          _vm._v(" "),
                          _c("th", [
                            _vm._v(
                              _vm._s(
                                _vm.term_class.course.code +
                                  " - " +
                                  _vm.term_class.course.name
                              )
                            ),
                          ]),
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.term_class.term
                      ? _c("tr", [
                          _c("td", [_vm._v("Academic Term")]),
                          _vm._v(" "),
                          _c("th", [
                            _vm._v(
                              "\n                                    " +
                                _vm._s(_vm.term_class.term.name)
                            ),
                            _c("br"),
                            _vm._v(" "),
                            _c("small", [_vm._v("Start Date:")]),
                            _vm._v(
                              " " +
                                _vm._s(
                                  _vm.$root.format_date(
                                    _vm.term_class.term.starting_at
                                  )
                                )
                            ),
                            _c("br"),
                            _vm._v(" "),
                            _c("small", [_vm._v("End Date:")]),
                            _vm._v(
                              " " +
                                _vm._s(
                                  _vm.$root.format_date(
                                    _vm.term_class.term.ending_at
                                  )
                                ) +
                                "\n                                "
                            ),
                          ]),
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.term_class.venue
                      ? _c("tr", [
                          _c("td", [_vm._v("Venue")]),
                          _vm._v(" "),
                          _c("th", [
                            _vm._v(
                              _vm._s(
                                _vm.term_class.venue.name +
                                  ", " +
                                  _vm.term_class.venue.description
                              )
                            ),
                          ]),
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _c("tr", [
                      _c("td", [_vm._v("Lecturers")]),
                      _vm._v(" "),
                      _c("th", [
                        _c(
                          "ul",
                          _vm._l(
                            _vm.term_class.class_lecturers,
                            function (lect) {
                              return _c("li", {}, [
                                _vm._v(
                                  "\n                                            " +
                                    _vm._s(
                                      _vm.$root.full_name(lect.profile.user)
                                    ) +
                                    "\n                                        "
                                ),
                              ])
                            }
                          ),
                          0
                        ),
                      ]),
                    ]),
                  ]),
                ]),
              ],
              1
            ),
          ]),
        ]),
      ]),
    ]),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/academic/Classes/ViewClasses.vue":
/*!******************************************************************!*\
  !*** ./resources/js/components/academic/Classes/ViewClasses.vue ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ViewClasses_vue_vue_type_template_id_feaf244a_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ViewClasses.vue?vue&type=template&id=feaf244a&scoped=true& */ "./resources/js/components/academic/Classes/ViewClasses.vue?vue&type=template&id=feaf244a&scoped=true&");
/* harmony import */ var _ViewClasses_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ViewClasses.vue?vue&type=script&lang=js& */ "./resources/js/components/academic/Classes/ViewClasses.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ViewClasses_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ViewClasses_vue_vue_type_template_id_feaf244a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ViewClasses_vue_vue_type_template_id_feaf244a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "feaf244a",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/academic/Classes/ViewClasses.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/academic/Classes/ViewClasses.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/components/academic/Classes/ViewClasses.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewClasses_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./ViewClasses.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/academic/Classes/ViewClasses.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewClasses_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/academic/Classes/ViewClasses.vue?vue&type=template&id=feaf244a&scoped=true&":
/*!*************************************************************************************************************!*\
  !*** ./resources/js/components/academic/Classes/ViewClasses.vue?vue&type=template&id=feaf244a&scoped=true& ***!
  \*************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewClasses_vue_vue_type_template_id_feaf244a_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./ViewClasses.vue?vue&type=template&id=feaf244a&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/academic/Classes/ViewClasses.vue?vue&type=template&id=feaf244a&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewClasses_vue_vue_type_template_id_feaf244a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewClasses_vue_vue_type_template_id_feaf244a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);