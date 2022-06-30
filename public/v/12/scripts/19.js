(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[19],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/academic/Classes.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/academic/Classes.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "Classes",
  data: function data() {
    return {
      term_class: {},
      assessments: {},
      students_registrations: {},
      lecturer_class_registrations: {}
    };
  },
  created: function created() {
    //this.fetchData();
    this.$store.state.page = 'Class';
  },
  watch: {//'$route': 'fetchData'
  },
  methods: {
    get_students: function get_students() {
      var _this = this;

      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      axios.get('/classes/registrations=' + this.$route.params.id + '?page=' + page).then(function (res) {
        _this.students_registrations = res.data.class_registrations;
      });
    },
    get_assessments: function get_assessments() {
      var _this2 = this;

      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      axios.get('/classes/assessments=' + this.$route.params.id + '?page=' + page).then(function (res) {
        _this2.assessments = res.data.assessments;
      });
    },
    fetchData: function fetchData() {
      this.lecturer_class_registrations = this.class_registrations = this.students_registrations = this.term_class = {};

      if (this.$route.params.id !== undefined) {
        this.get_term_class();

        switch (this.$route.params.ops) {
          case "students":
            this.get_students();
            break;

          case "assessments":
            this.get_assessments();
            break;
        }
      } else {
        this.get_lecturer_class_registrations();
      }
    },
    get_term_class: function get_term_class() {
      var _this3 = this;

      axios.get('/academic/classes/' + this.$route.params.id).then(function (res) {
        _this3.term_class = res.data.term_class;
      });
    },
    get_lecturer_class_registrations: function get_lecturer_class_registrations() {
      var _this4 = this;

      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      axios.get('/academic/classes?page=' + page).then(function (res) {
        _this4.lecturer_class_registrations = res.data.lecturer_class_registrations;
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/academic/Classes.vue?vue&type=template&id=608e8249&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/academic/Classes.vue?vue&type=template&id=608e8249&scoped=true& ***!
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
  return _c("div", [_c("router-view")], 1)
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/academic/Classes.vue":
/*!******************************************************!*\
  !*** ./resources/js/components/academic/Classes.vue ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Classes_vue_vue_type_template_id_608e8249_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Classes.vue?vue&type=template&id=608e8249&scoped=true& */ "./resources/js/components/academic/Classes.vue?vue&type=template&id=608e8249&scoped=true&");
/* harmony import */ var _Classes_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Classes.vue?vue&type=script&lang=js& */ "./resources/js/components/academic/Classes.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Classes_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Classes_vue_vue_type_template_id_608e8249_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Classes_vue_vue_type_template_id_608e8249_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "608e8249",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/academic/Classes.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/academic/Classes.vue?vue&type=script&lang=js&":
/*!*******************************************************************************!*\
  !*** ./resources/js/components/academic/Classes.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Classes_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Classes.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/academic/Classes.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Classes_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/academic/Classes.vue?vue&type=template&id=608e8249&scoped=true&":
/*!*************************************************************************************************!*\
  !*** ./resources/js/components/academic/Classes.vue?vue&type=template&id=608e8249&scoped=true& ***!
  \*************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Classes_vue_vue_type_template_id_608e8249_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Classes.vue?vue&type=template&id=608e8249&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/academic/Classes.vue?vue&type=template&id=608e8249&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Classes_vue_vue_type_template_id_608e8249_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Classes_vue_vue_type_template_id_608e8249_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);