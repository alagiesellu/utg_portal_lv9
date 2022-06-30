(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[17],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/students/Mails.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/students/Mails.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Mails_ViewMails__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Mails/ViewMails */ "./resources/js/components/students/Mails/ViewMails.vue");
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "Mails",
  components: {
    ViewMails: _Mails_ViewMails__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      term_class: null,
      mails: null
    };
  },
  created: function created() {
    this.$store.state.page = 'Mails';
    this.fetchData();
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData: function fetchData() {
      if (this.$route.params.id !== undefined) {
        this.get_mails();
      }
    },
    get_mails: function get_mails() {
      var _this = this;

      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      axios.get('/students/mails/' + this.$route.params.id + '?page=' + page).then(function (res) {
        _this.term_class = res.data.term_class;
        _this.mails = res.data.mails;
        _this.mails.profile_id = res.data.profile_id;
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/students/Mails/ViewMails.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/students/Mails/ViewMails.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************/
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
//
//
//
//
//
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
  name: "ViewMails",
  data: function data() {
    return {
      compose: {
        subject: null,
        message: null
      },
      mails: {}
    };
  },
  methods: {
    delete_post: function delete_post(mail) {
      var _this = this;

      axios.post('/students/mails/' + mail.id + '/delete').then(function (res) {
        _this.$root.post_success(res.data.success);

        _this.$parent.mails = res.data.mails;
        _this.$parent.mails.profile_id = res.data.profile_id;
        _this.compose = {};
      });
    },
    submitMail: function submitMail(e) {
      var _this2 = this;

      e.preventDefault();
      axios.post('/students/mails/' + this.$route.params.id + '/post', this.compose).then(function (res) {
        _this2.$root.post_success(res.data.success);

        _this2.$parent.mails = res.data.mails;
        _this2.$parent.mails.profile_id = res.data.profile_id;
        _this2.compose = {};
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/students/Mails.vue?vue&type=template&id=07408260&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/students/Mails.vue?vue&type=template&id=07408260&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************/
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
  return _vm.term_class ? _c("ViewMails") : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/students/Mails/ViewMails.vue?vue&type=template&id=9d16c150&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/students/Mails/ViewMails.vue?vue&type=template&id=9d16c150&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************/
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
              _c("i", { staticClass: "ni ni-email-83" }),
              _vm._v(" "),
              _vm.$parent.term_class.course
                ? _c(
                    "router-link",
                    {
                      attrs: {
                        to: {
                          name: "s.classes",
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
              _vm._v("\n                    Mail Posts\n                "),
            ],
            1
          ),
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "card-body" }, [
          _c("form", { on: { submit: _vm.submitMail } }, [
            _c("div", { staticClass: "form-group" }, [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.compose.subject,
                    expression: "compose.subject",
                  },
                ],
                staticClass: "form-control",
                attrs: {
                  required: "",
                  type: "text",
                  maxlength: "200",
                  placeholder: "Subject",
                },
                domProps: { value: _vm.compose.subject },
                on: {
                  input: function ($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.$set(_vm.compose, "subject", $event.target.value)
                  },
                },
              }),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "form-group" }, [
              _c("textarea", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.compose.message,
                    expression: "compose.message",
                  },
                ],
                staticClass: "form-control",
                attrs: {
                  required: "",
                  maxlength: "4000",
                  rows: "3",
                  placeholder: "Compose",
                },
                domProps: { value: _vm.compose.message },
                on: {
                  input: function ($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.$set(_vm.compose, "message", $event.target.value)
                  },
                },
              }),
            ]),
            _vm._v(" "),
            _vm._m(0),
          ]),
        ]),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "card-footer" },
          [
            _vm._l(_vm.$parent.mails.data, function (mail) {
              return _c(
                "div",
                {
                  staticClass: "alert",
                  class: [
                    mail.profile_id !== _vm.$parent.mails.profile_id
                      ? "alert-default"
                      : "alert-primary",
                  ],
                  attrs: { role: "alert" },
                },
                [
                  _c("span", { staticClass: "alert-inner--text" }, [
                    _c("h4", [
                      mail.profile_id !== _vm.$parent.mails.profile_id
                        ? _c(
                            "span",
                            {
                              staticClass: "text-white float-right",
                              attrs: { title: mail.profile.user.num },
                            },
                            [
                              _vm._m(1, true),
                              _vm._v(
                                "\n                                " +
                                  _vm._s(
                                    _vm.$root.full_name(mail.profile.user)
                                  ) +
                                  "\n                                -\n                                "
                              ),
                              _c("small", [
                                _vm._v(
                                  "\n                                    " +
                                    _vm._s(mail.profile.user.email) +
                                    "\n                                "
                                ),
                              ]),
                            ]
                          )
                        : _vm.$root.minutes_lapsed(mail.created_at) <= 1
                        ? _c("div", [
                            _c(
                              "button",
                              {
                                staticClass:
                                  "btn btn-sm btn-danger float-right",
                                on: {
                                  click: function ($event) {
                                    return _vm.delete_post(mail)
                                  },
                                },
                              },
                              [
                                _vm._v(
                                  "\n                                    Delete\n                                "
                                ),
                              ]
                            ),
                          ])
                        : _vm._e(),
                    ]),
                    _vm._v(" "),
                    _c("p", [
                      _c("strong", { staticClass: "text-underline" }, [
                        _vm._v(_vm._s(mail.subject)),
                      ]),
                      _c("br"),
                      _vm._v(
                        "\n                            " +
                          _vm._s(mail.message) +
                          "\n                        "
                      ),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c("small", { staticClass: "float-right" }, [
                    _c("i", { staticClass: "ni ni-time-alarm" }),
                    _vm._v(
                      " " +
                        _vm._s(_vm.$root.moment(mail.created_at)) +
                        "\n                    "
                    ),
                  ]),
                ]
              )
            }),
            _vm._v(" "),
            _c("laravel-vue-pagination", {
              attrs: { limit: 5, data: _vm.$parent.mails, align: "center" },
              on: { "pagination-change-page": _vm.$parent.get_mails },
            }),
          ],
          2
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
    return _c("div", { staticClass: "form-group" }, [
      _c(
        "button",
        {
          staticClass: "btn btn-icon btn-primary float-right",
          attrs: { type: "submit" },
        },
        [
          _c("span", { staticClass: "btn-inner--icon" }, [
            _c("i", { staticClass: "ni ni-send" }),
          ]),
          _vm._v(" "),
          _c("span", { staticClass: "btn-inner--text" }, [_vm._v("Post")]),
        ]
      ),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("span", { staticClass: "alert-inner--icon" }, [
      _c("i", { staticClass: "ni ni-single-02" }),
    ])
  },
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/students/Mails.vue":
/*!****************************************************!*\
  !*** ./resources/js/components/students/Mails.vue ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Mails_vue_vue_type_template_id_07408260_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Mails.vue?vue&type=template&id=07408260&scoped=true& */ "./resources/js/components/students/Mails.vue?vue&type=template&id=07408260&scoped=true&");
/* harmony import */ var _Mails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Mails.vue?vue&type=script&lang=js& */ "./resources/js/components/students/Mails.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Mails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Mails_vue_vue_type_template_id_07408260_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Mails_vue_vue_type_template_id_07408260_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "07408260",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/students/Mails.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/students/Mails.vue?vue&type=script&lang=js&":
/*!*****************************************************************************!*\
  !*** ./resources/js/components/students/Mails.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Mails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Mails.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/students/Mails.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Mails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/students/Mails.vue?vue&type=template&id=07408260&scoped=true&":
/*!***********************************************************************************************!*\
  !*** ./resources/js/components/students/Mails.vue?vue&type=template&id=07408260&scoped=true& ***!
  \***********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Mails_vue_vue_type_template_id_07408260_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Mails.vue?vue&type=template&id=07408260&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/students/Mails.vue?vue&type=template&id=07408260&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Mails_vue_vue_type_template_id_07408260_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Mails_vue_vue_type_template_id_07408260_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/students/Mails/ViewMails.vue":
/*!**************************************************************!*\
  !*** ./resources/js/components/students/Mails/ViewMails.vue ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ViewMails_vue_vue_type_template_id_9d16c150_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ViewMails.vue?vue&type=template&id=9d16c150&scoped=true& */ "./resources/js/components/students/Mails/ViewMails.vue?vue&type=template&id=9d16c150&scoped=true&");
/* harmony import */ var _ViewMails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ViewMails.vue?vue&type=script&lang=js& */ "./resources/js/components/students/Mails/ViewMails.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ViewMails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ViewMails_vue_vue_type_template_id_9d16c150_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ViewMails_vue_vue_type_template_id_9d16c150_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "9d16c150",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/students/Mails/ViewMails.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/students/Mails/ViewMails.vue?vue&type=script&lang=js&":
/*!***************************************************************************************!*\
  !*** ./resources/js/components/students/Mails/ViewMails.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewMails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./ViewMails.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/students/Mails/ViewMails.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewMails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/students/Mails/ViewMails.vue?vue&type=template&id=9d16c150&scoped=true&":
/*!*********************************************************************************************************!*\
  !*** ./resources/js/components/students/Mails/ViewMails.vue?vue&type=template&id=9d16c150&scoped=true& ***!
  \*********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewMails_vue_vue_type_template_id_9d16c150_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./ViewMails.vue?vue&type=template&id=9d16c150&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/students/Mails/ViewMails.vue?vue&type=template&id=9d16c150&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewMails_vue_vue_type_template_id_9d16c150_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewMails_vue_vue_type_template_id_9d16c150_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);