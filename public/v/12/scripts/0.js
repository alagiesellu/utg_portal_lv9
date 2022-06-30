(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Profile.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Profile.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modals_ViewRoles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modals/ViewRoles */ "./resources/js/components/modals/ViewRoles.vue");
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

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "profile",
  components: {
    ViewRoles: _modals_ViewRoles__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      user: [],
      roles: window.roles,
      form: {
        input: {
          image: ''
        },
        message: {
          errors: [],
          success: []
        }
      },
      switch_action: {
        error: false,
        success: false
      }
    };
  },
  mounted: function mounted() {
    this.fectchUserProfile();
    this.$store.state.page = 'Profile';
  },
  methods: {
    switchProfile: function switchProfile(profile) {
      var _this = this;

      if (profile.id !== this.user.profile_id) {
        axios.post('/user/switch', {
          profile: profile.id
        }).then(function (res) {
          if (res.data.success === null) _this.switch_action.error = true;else {
            _this.switch_action.success = true;
          }
        });
      }
    },
    onFileChange: function onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage: function createImage(file) {
      var _this2 = this;

      var reader = new FileReader();

      reader.onload = function (e) {
        _this2.form.input.image = e.target.result;
      };

      reader.readAsDataURL(file);
    },
    upload: function upload() {
      var _this3 = this;

      this.form.message.errors = [];
      this.form.message.success = [];

      if (this.form.input.image.substr(5, 5) === 'image') {
        axios.post('/user/upload', {
          image: this.form.input.image
        }).then(function (res) {
          _this3.form.message.success.push(res.data.success);

          sessionStorage.setItem(window.cookies_key_start + 'img', res.data.img);
          _this3.$store.state.auth.img = res.data.img;
        });
      } else {
        this.form.message.errors.push({
          msg: "Invalid! Must select a image."
        });
      }
    },
    fectchUserProfile: function fectchUserProfile() {
      var _this4 = this;

      axios.get('/user/profile').then(function (res) {
        _this4.user = res.data.user;

        var _iterator = _createForOfIteratorHelper(_this4.user.profiles),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var profile = _step.value;

            if (_this4.user.profile_id === profile.id) {
              _this4.user.profile = profile;
              _this4.user.profile.department = profile.department;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      });
    },
    gender: function gender(_gender) {
      if (_gender === 'm') return 'Male';else return 'Female';
    },
    user_type: function user_type(type) {
      return window.user_type[type];
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/modals/ViewRoles.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/modals/ViewRoles.vue?vue&type=script&lang=js& ***!
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
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "ViewRoles",
  data: function data() {
    return {
      group: {},
      window_roles: window.roles
    };
  },
  methods: {
    beforeOpen: function beforeOpen(event) {
      this.group = event.params.group;
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Profile.vue?vue&type=template&id=3bd692e4&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Profile.vue?vue&type=template&id=3bd692e4&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************/
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
    _c("div", { staticClass: "col-md-7" }, [
      _c("div", { staticClass: "card bg-secondary shadow" }, [
        _vm._m(0),
        _vm._v(" "),
        _c("div", { staticClass: "card-body" }, [
          _c("table", { staticClass: "table align-items-center table-flush" }, [
            _c("tbody", [
              _c("tr", [
                _c("td", { staticClass: "text-center" }, [
                  _c("img", {
                    staticClass: "img-thumbnail",
                    attrs: { src: "/" + this.$store.state.auth.img },
                  }),
                ]),
              ]),
              _vm._v(" "),
              _c("tr", [
                _c("th", [
                  _c("small", [_vm._v("#")]),
                  _c("h2", [_vm._v(_vm._s(this.user.num))]),
                ]),
              ]),
              _vm._v(" "),
              _c("tr", [
                _c("th", [
                  _c("small", [_vm._v("First Name")]),
                  _c("h3", [_vm._v(_vm._s(this.user.first_name))]),
                ]),
              ]),
              _vm._v(" "),
              _c("tr", [
                _c("th", [
                  _c("small", [_vm._v("Middle Name")]),
                  _c("h3", [_vm._v(_vm._s(this.user.middle_name))]),
                ]),
              ]),
              _vm._v(" "),
              _c("tr", [
                _c("th", [
                  _c("small", [_vm._v("Last Name")]),
                  _c("h3", [_vm._v(_vm._s(this.user.last_name))]),
                ]),
              ]),
              _vm._v(" "),
              _c("tr", [
                _c("th", [
                  _c("small", [_vm._v("Email")]),
                  _c("h3", [_vm._v(_vm._s(this.user.email))]),
                ]),
              ]),
              _vm._v(" "),
              _c("tr", [
                _c("th", [
                  _c("small", [_vm._v("Telephone Number")]),
                  _c("h3", [_vm._v(_vm._s(this.user.tel))]),
                ]),
              ]),
              _vm._v(" "),
              _c("tr", [
                _c("th", [
                  _c("small", [_vm._v("Address")]),
                  _c("h3", [_vm._v(_vm._s(this.user.address))]),
                ]),
              ]),
              _vm._v(" "),
              _c("tr", [
                _c("th", [
                  _c("small", [_vm._v("Gender")]),
                  _c("h3", [_vm._v(_vm._s(this.gender(this.user.gender)))]),
                ]),
              ]),
              _vm._v(" "),
              _c("tr", [
                _c("th", [
                  _c("small", [_vm._v("Date Of Birth")]),
                  _c("h3", [_vm._v(_vm._s(this.user.dob))]),
                ]),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "col-md-5" }, [
      _c("div", { staticClass: "card shadow" }, [
        _c("div", { staticClass: "card-header bg-white border-0" }, [
          _c("div", { staticClass: "align-items-center" }, [
            _c("div", { staticClass: "float-left" }, [
              _c("div", { staticClass: "btn-group" }, [
                _c(
                  "button",
                  {
                    staticClass:
                      "btn btn-outline-warning btn-sm dropdown-toggle",
                    attrs: {
                      type: "button",
                      "data-toggle": "dropdown",
                      "aria-haspopup": "true",
                      "aria-expanded": "false",
                    },
                  },
                  [
                    _vm._v(
                      "\n                                Switch\n                            "
                    ),
                  ]
                ),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "dropdown-menu" },
                  _vm._l(_vm.user.profiles, function (profile) {
                    return _c(
                      "button",
                      {
                        staticClass: "dropdown-item text-capitalize",
                        on: {
                          click: function ($event) {
                            return _vm.switchProfile(profile)
                          },
                        },
                      },
                      [
                        profile.id === _vm.user.profile.id
                          ? _c("i", {
                              staticClass: "ni ni-check-bold text-success",
                            })
                          : _c("i", { staticClass: "ni ni-fat-delete" }),
                        _vm._v(" "),
                        _c("strong", [
                          _vm._v(_vm._s(_vm.user_type(profile.type))),
                        ]),
                        _vm._v(" in "),
                        _c("strong", [_vm._v(_vm._s(profile.department.name))]),
                      ]
                    )
                  }),
                  0
                ),
              ]),
              _vm._v(" "),
              _vm.switch_action.error
                ? _c("span", { staticClass: "badge badge-pill badge-danger" }, [
                    _vm._v("Error! Retry."),
                  ])
                : _vm._e(),
              _vm._v(" "),
              _vm.switch_action.success
                ? _c(
                    "span",
                    { staticClass: "badge badge-pill badge-success" },
                    [
                      _vm._v(
                        "Switching Successful! Login again for changes to take effect."
                      ),
                    ]
                  )
                : _vm._e(),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "float-right" }, [_vm._v("Profiles")]),
          ]),
        ]),
        _vm._v(" "),
        _vm.user.profile
          ? _c("div", { staticClass: "card-body pt-0 pt-md-4" }, [
              _c("h4", { class: { "text-danger": !_vm.user.profile.active } }, [
                !_vm.user.profile.active
                  ? _c("span", { staticClass: "badge badge-danger" }, [
                      _vm._v("Deactivated"),
                    ])
                  : _vm._e(),
                _c("br"),
                _vm._v(" "),
                _c("div", { staticClass: "text-capitalize" }, [
                  _c("small", [_vm._v("Type: ")]),
                  _vm._v(_vm._s(_vm.$root.profile_type(_vm.user.profile.type))),
                  _c("br"),
                ]),
                _vm._v(" "),
                _vm.user.profile.set != null
                  ? _c("div", [
                      _c("small", [_vm._v("Set: ")]),
                      _vm._v(
                        _vm._s(_vm.user.profile.set.name) +
                          "\n                    "
                      ),
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm.user.profile.department != null
                  ? _c(
                      "div",
                      [
                        _c("small", [_vm._v("Department: ")]),
                        _vm._v(" "),
                        _c(
                          "router-link",
                          {
                            attrs: {
                              target: "_blank",
                              to: {
                                name: "ad.departments",
                                params: { id: _vm.user.profile.department_id },
                              },
                            },
                          },
                          [
                            _vm._v(
                              "\n                            " +
                                _vm._s(_vm.user.profile.department.name) +
                                "\n                        "
                            ),
                          ]
                        ),
                      ],
                      1
                    )
                  : _vm._e(),
                _vm._v(" "),
                _vm.user.profile.group != null
                  ? _c(
                      "div",
                      [
                        _c("small", [_vm._v("Role Group: ")]),
                        _vm._v(" "),
                        _c(
                          "button",
                          {
                            staticClass: "btn btn-sm btn-link",
                            on: {
                              click: function ($event) {
                                return _vm.$modal.show("view-roles", {
                                  group: _vm.user.profile.group,
                                })
                              },
                            },
                          },
                          [_vm._v(_vm._s(_vm.user.profile.group.name))]
                        ),
                        _vm._v(" "),
                        _c("ViewRoles"),
                      ],
                      1
                    )
                  : _vm._e(),
              ]),
              _vm._v(" "),
              _c("hr"),
            ])
          : _vm._e(),
      ]),
    ]),
    _vm._v(" "),
    _c(
      "div",
      {
        staticClass: "modal fade",
        attrs: {
          id: "modal-profile",
          tabindex: "-1",
          role: "dialog",
          "aria-labelledby": "modal-profile",
          "aria-hidden": "true",
        },
      },
      [
        _c(
          "div",
          {
            staticClass: "modal-dialog modal- modal-dialog-centered modal-",
            attrs: { role: "document" },
          },
          [
            _c("div", { staticClass: "modal-content" }, [
              _vm._m(1),
              _vm._v(" "),
              _c("div", { staticClass: "modal-body" }, [
                _c(
                  "div",
                  { staticClass: "text-center text-muted mb-4" },
                  [
                    _vm._l(_vm.form.message.errors, function (messages) {
                      return _c(
                        "div",
                        { staticClass: "text-danger bold" },
                        _vm._l(messages, function (msg) {
                          return _c("span", [_c("li", [_vm._v(_vm._s(msg))])])
                        }),
                        0
                      )
                    }),
                    _vm._v(" "),
                    _vm.form.message.success.length
                      ? _c(
                          "div",
                          {
                            ref: "display_success_message",
                            staticClass:
                              "alert alert-success alert-dismissible fade show",
                            attrs: { role: "alert" },
                          },
                          [
                            _vm._m(2),
                            _vm._v(" "),
                            _c(
                              "span",
                              { staticClass: "alert-inner--text" },
                              [
                                _c("strong", [_vm._v("Success!")]),
                                _vm._v(" "),
                                _vm._l(
                                  _vm.form.message.success,
                                  function (msg) {
                                    return _c("span", [
                                      _vm._v(
                                        "\n                                    " +
                                          _vm._s(msg) +
                                          "\n                                "
                                      ),
                                    ])
                                  }
                                ),
                              ],
                              2
                            ),
                          ]
                        )
                      : _vm._e(),
                  ],
                  2
                ),
                _vm._v(" "),
                _c("div", { staticClass: "row" }, [
                  _c("div", { staticClass: "col-12" }, [
                    _c("img", {
                      staticClass: "img-thumbnail",
                      attrs: { src: _vm.form.input.image },
                    }),
                    _vm._v(" "),
                    _c("hr"),
                    _vm._v(" "),
                    _c("div", { staticClass: "row" }, [
                      _c("input", {
                        staticClass: "form-control col-8",
                        attrs: { type: "file" },
                        on: { change: _vm.onFileChange },
                      }),
                      _vm._v(" "),
                      _c(
                        "button",
                        {
                          staticClass: "btn btn-success col-4",
                          on: { click: _vm.upload },
                        },
                        [_vm._v("Upload")]
                      ),
                    ]),
                  ]),
                ]),
              ]),
            ]),
          ]
        ),
      ]
    ),
  ])
}
var staticRenderFns = [
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "card-header bg-white border-0" }, [
      _c("div", { staticClass: "row align-items-center" }, [
        _c("div", { staticClass: "col-8" }, [
          _c("h3", { staticClass: "mb-0" }, [_vm._v("My account")]),
        ]),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "modal-header" }, [
      _c(
        "h3",
        { staticClass: "modal-title", attrs: { id: "modal-title-create" } },
        [
          _vm._v(
            "\n                        Update Profile\n                    "
          ),
        ]
      ),
      _vm._v(" "),
      _c(
        "button",
        {
          staticClass: "close",
          attrs: {
            type: "button",
            "data-dismiss": "modal",
            "aria-label": "Close",
          },
        },
        [_c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v("×")])]
      ),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("span", { staticClass: "alert-inner--icon" }, [
      _c("i", { staticClass: "ni ni-like-2" }),
    ])
  },
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/modals/ViewRoles.vue?vue&type=template&id=7b07fa5a&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/modals/ViewRoles.vue?vue&type=template&id=7b07fa5a&scoped=true& ***!
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
  return _c(
    "modal",
    {
      attrs: { scrollable: true, name: "view-roles", height: "auto" },
      on: { "before-open": _vm.beforeOpen },
    },
    [
      _c("div", { staticClass: "modal-header" }, [
        _c(
          "h3",
          { staticClass: "modal-title", attrs: { id: "modal-title-create" } },
          [_vm._v("Roles for "), _c("strong", [_vm._v(_vm._s(_vm.group.name))])]
        ),
      ]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "modal-body" },
        _vm._l(_vm.group.roles, function (role) {
          return _c("li", [_vm._v(_vm._s(_vm.window_roles[role]))])
        }),
        0
      ),
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/Profile.vue":
/*!*********************************************!*\
  !*** ./resources/js/components/Profile.vue ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Profile_vue_vue_type_template_id_3bd692e4_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Profile.vue?vue&type=template&id=3bd692e4&scoped=true& */ "./resources/js/components/Profile.vue?vue&type=template&id=3bd692e4&scoped=true&");
/* harmony import */ var _Profile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Profile.vue?vue&type=script&lang=js& */ "./resources/js/components/Profile.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Profile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Profile_vue_vue_type_template_id_3bd692e4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Profile_vue_vue_type_template_id_3bd692e4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "3bd692e4",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Profile.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Profile.vue?vue&type=script&lang=js&":
/*!**********************************************************************!*\
  !*** ./resources/js/components/Profile.vue?vue&type=script&lang=js& ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Profile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Profile.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Profile.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Profile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Profile.vue?vue&type=template&id=3bd692e4&scoped=true&":
/*!****************************************************************************************!*\
  !*** ./resources/js/components/Profile.vue?vue&type=template&id=3bd692e4&scoped=true& ***!
  \****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Profile_vue_vue_type_template_id_3bd692e4_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./Profile.vue?vue&type=template&id=3bd692e4&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Profile.vue?vue&type=template&id=3bd692e4&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Profile_vue_vue_type_template_id_3bd692e4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Profile_vue_vue_type_template_id_3bd692e4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/modals/ViewRoles.vue":
/*!******************************************************!*\
  !*** ./resources/js/components/modals/ViewRoles.vue ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ViewRoles_vue_vue_type_template_id_7b07fa5a_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ViewRoles.vue?vue&type=template&id=7b07fa5a&scoped=true& */ "./resources/js/components/modals/ViewRoles.vue?vue&type=template&id=7b07fa5a&scoped=true&");
/* harmony import */ var _ViewRoles_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ViewRoles.vue?vue&type=script&lang=js& */ "./resources/js/components/modals/ViewRoles.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ViewRoles_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ViewRoles_vue_vue_type_template_id_7b07fa5a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ViewRoles_vue_vue_type_template_id_7b07fa5a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "7b07fa5a",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/modals/ViewRoles.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/modals/ViewRoles.vue?vue&type=script&lang=js&":
/*!*******************************************************************************!*\
  !*** ./resources/js/components/modals/ViewRoles.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewRoles_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./ViewRoles.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/modals/ViewRoles.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewRoles_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/modals/ViewRoles.vue?vue&type=template&id=7b07fa5a&scoped=true&":
/*!*************************************************************************************************!*\
  !*** ./resources/js/components/modals/ViewRoles.vue?vue&type=template&id=7b07fa5a&scoped=true& ***!
  \*************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewRoles_vue_vue_type_template_id_7b07fa5a_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./ViewRoles.vue?vue&type=template&id=7b07fa5a&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/modals/ViewRoles.vue?vue&type=template&id=7b07fa5a&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewRoles_vue_vue_type_template_id_7b07fa5a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewRoles_vue_vue_type_template_id_7b07fa5a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);