(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[22],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/academic/Classes/FilesClasses.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/academic/Classes/FilesClasses.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue2_dropzone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue2-dropzone */ "./node_modules/vue2-dropzone/dist/vue2Dropzone.js");
/* harmony import */ var vue2_dropzone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue2_dropzone__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vue2_dropzone_dist_vue2Dropzone_min_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue2-dropzone/dist/vue2Dropzone.min.css */ "./node_modules/vue2-dropzone/dist/vue2Dropzone.min.css");
/* harmony import */ var vue2_dropzone_dist_vue2Dropzone_min_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue2_dropzone_dist_vue2Dropzone_min_css__WEBPACK_IMPORTED_MODULE_1__);
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
  name: "FilesClasses",
  components: {
    vueDropzone: vue2_dropzone__WEBPACK_IMPORTED_MODULE_0___default.a
  },
  data: function data() {
    return {
      file_storage: 0,
      max_file_storage: window.options.file_storage,
      files: {},
      dropzoneOptions: {
        url: window.api_url + '/academic/classes/uploads/' + this.$route.params.id,
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + window.Save.get('token')
        },
        chunking: false,
        acceptedFiles: 'image/*,.pdf,.doc,.docx,.odt,.pdf,.xls,.xlsx,.ods,.ppt,.pptx,.txt',
        thumbnailWidth: 150,
        maxFilesize: 50
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
    remove_file: function remove_file(file) {
      var _this = this;

      axios.post('/academic/classes/files/' + file.id + '/delete').then(function (res) {
        _this.$root.post_success(res.data.success);

        _this.load_data(res.data.files);
      });
    },
    dropzoneComplete: function dropzoneComplete(file, res) {
      if (res.errors) this.$root.post_errors(res.errors);else {
        this.load_data(res.files);
        this.$root.post_success(res.success);
      }
    },
    fetchData: function fetchData() {
      this.get_files();
    },
    get_files: function get_files() {
      var _this2 = this;

      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      axios.get('/academic/classes/' + this.$route.params.id + '/files?page=' + page).then(function (res) {
        _this2.load_data(res.data.files);
      });
    },
    load_data: function load_data(files) {
      this.file_storage = 0;
      this.files = files;

      var _iterator = _createForOfIteratorHelper(this.files),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var file = _step.value;
          this.file_storage += file.size;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      this.file_storage = (this.file_storage / 1048576).toFixed(2);
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/academic/Classes/FilesClasses.vue?vue&type=template&id=5e86f305&scoped=true&":
/*!********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/academic/Classes/FilesClasses.vue?vue&type=template&id=5e86f305&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************************/
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
    _c("div", { staticClass: "col-xl-12 order-xl-1" }, [
      _c("div", { staticClass: "card bg-secondary shadow" }, [
        _c("div", { staticClass: "card-header bg-white border-0" }, [
          _c(
            "h3",
            [
              _c("i", { staticClass: "ni ni-folder-17" }),
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
                        "\n                        " +
                          _vm._s(_vm.$parent.term_class.course.name) +
                          "\n                    "
                      ),
                    ]
                  )
                : _vm._e(),
              _vm._v(
                "\n                    Uploaded Files\n                    "
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
                    _vm._v(" Back\n                        "),
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
                _c("small", [
                  _vm._v(
                    "Used " +
                      _vm._s(_vm.file_storage) +
                      " MB out of " +
                      _vm._s(_vm.max_file_storage) +
                      " MB"
                  ),
                ]),
              ]),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "progress" }, [
              _c("div", {
                staticClass: "progress-bar bg-default",
                style: {
                  width: (_vm.file_storage / _vm.max_file_storage) * 100 + "%",
                },
                attrs: {
                  role: "progressbar",
                  "aria-valuemin": "0",
                  "aria-valuemax": "100",
                  "aria-valuenow":
                    (_vm.file_storage / _vm.max_file_storage) * 100,
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
            _c("vue-dropzone", {
              ref: "dropzone",
              attrs: {
                id: "dropzone",
                options: _vm.dropzoneOptions,
                duplicateCheck: true,
              },
              on: { "vdropzone-success": _vm.dropzoneComplete },
            }),
            _vm._v(" "),
            _c("table", { staticClass: "table" }, [
              _vm._m(1),
              _vm._v(" "),
              _c(
                "tbody",
                _vm._l(_vm.files, function (file) {
                  return _c("tr", [
                    _c("td", [
                      _c(
                        "a",
                        {
                          staticClass: "font-weight-bold text-underline",
                          attrs: {
                            href: "/storage/" + file.url,
                            target: "_blank",
                          },
                        },
                        [
                          _vm._v(
                            "\n                                " +
                              _vm._s(file.name) +
                              "\n                            "
                          ),
                        ]
                      ),
                      _vm._v(" "),
                      _c("span", [
                        _c("span", { staticClass: "badge" }, [
                          _c("i", { staticClass: "ni ni-chart-pie-35" }),
                          _vm._v(" " + _vm._s(_vm.$root.file_size(file.size))),
                        ]),
                        _vm._v(" "),
                        _c("span", { staticClass: "badge" }, [
                          _c("i", { staticClass: "ni ni-single-02" }),
                          _vm._v(
                            " " + _vm._s(_vm.$root.full_name(file.profile.user))
                          ),
                        ]),
                        _vm._v(" "),
                        _c(
                          "button",
                          {
                            staticClass: "btn btn-sm btn-link text-danger",
                            on: {
                              click: function ($event) {
                                return _vm.remove_file(file)
                              },
                            },
                          },
                          [
                            _vm._v(
                              "\n                                    Remove\n                                "
                            ),
                          ]
                        ),
                      ]),
                    ]),
                  ])
                }),
                0
              ),
            ]),
          ],
          1
        ),
      ]),
    ]),
  ])
}
var staticRenderFns = [
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "progress-label" }, [
      _c("span", [_vm._v("Storage Capacity")]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [_c("tr", [_c("th", [_vm._v("Files")])])])
  },
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/academic/Classes/FilesClasses.vue":
/*!*******************************************************************!*\
  !*** ./resources/js/components/academic/Classes/FilesClasses.vue ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FilesClasses_vue_vue_type_template_id_5e86f305_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FilesClasses.vue?vue&type=template&id=5e86f305&scoped=true& */ "./resources/js/components/academic/Classes/FilesClasses.vue?vue&type=template&id=5e86f305&scoped=true&");
/* harmony import */ var _FilesClasses_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FilesClasses.vue?vue&type=script&lang=js& */ "./resources/js/components/academic/Classes/FilesClasses.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _FilesClasses_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _FilesClasses_vue_vue_type_template_id_5e86f305_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _FilesClasses_vue_vue_type_template_id_5e86f305_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "5e86f305",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/academic/Classes/FilesClasses.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/academic/Classes/FilesClasses.vue?vue&type=script&lang=js&":
/*!********************************************************************************************!*\
  !*** ./resources/js/components/academic/Classes/FilesClasses.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FilesClasses_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./FilesClasses.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/academic/Classes/FilesClasses.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FilesClasses_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/academic/Classes/FilesClasses.vue?vue&type=template&id=5e86f305&scoped=true&":
/*!**************************************************************************************************************!*\
  !*** ./resources/js/components/academic/Classes/FilesClasses.vue?vue&type=template&id=5e86f305&scoped=true& ***!
  \**************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FilesClasses_vue_vue_type_template_id_5e86f305_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./FilesClasses.vue?vue&type=template&id=5e86f305&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/academic/Classes/FilesClasses.vue?vue&type=template&id=5e86f305&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FilesClasses_vue_vue_type_template_id_5e86f305_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FilesClasses_vue_vue_type_template_id_5e86f305_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);