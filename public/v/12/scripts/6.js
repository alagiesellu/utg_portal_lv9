(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[6],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Groups.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/Groups.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Groups_IndexGroups__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Groups/IndexGroups */ "./resources/js/components/admin/Groups/IndexGroups.vue");
/* harmony import */ var _Groups_ViewGroups__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Groups/ViewGroups */ "./resources/js/components/admin/Groups/ViewGroups.vue");
/* harmony import */ var _Groups_FormGroups__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Groups/FormGroups */ "./resources/js/components/admin/Groups/FormGroups.vue");
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  name: "Groups",
  components: {
    FormGroups: _Groups_FormGroups__WEBPACK_IMPORTED_MODULE_2__["default"],
    ViewGroups: _Groups_ViewGroups__WEBPACK_IMPORTED_MODULE_1__["default"],
    IndexGroups: _Groups_IndexGroups__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      filter: {
        search: null,
        search_q: ''
      },
      roles: {},
      window_roles: window.roles,
      roles_success: null,
      roles_error: null,
      groups: null,
      group: null,
      form: null,
      departments: []
    };
  },
  mounted: function mounted() {
    this.$store.state.page = 'groups';
  },
  created: function created() {
    this.fetchData();
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    get_non_major_departments: function get_non_major_departments() {
      var _this = this;

      axios.get('/admin/get/departments?is_major=0').then(function (res) {
        _this.departments = res.data.departments;
      });
    },
    fetchData: function fetchData() {
      var _this2 = this;

      if (this.$route.params.id === 'create' || this.$route.params.ops === 'create') {
        this.get_non_major_departments();
        this.groups = null;
        this.form = {
          title: 'Create',
          type: 'c',
          input: {
            name: '',
            description: '',
            department_id: '' //*pass password: null,

          }
        };
      } else if (this.$route.params.id) {
        this.groups = null;
        axios.get('/admin/groups/' + this.$route.params.id).then(function (res) {
          _this2.group = res.data.group;

          _this2.loadRoles();

          _this2.form = null;

          if (_this2.$route.params.ops === 'edit') {
            _this2.get_non_major_departments();

            _this2.form = {
              title: 'Edit Group ' + _this2.group.name,
              type: 'e',
              input: {
                id: _this2.group.id,
                name: _this2.group.name,
                description: _this2.group.description,
                department_id: _this2.group.department_id //*pass password: null,

              }
            };
          } else if (_this2.$route.params.ops === 'delete') {
            _this2.form = {
              title: 'Delete Group ' + _this2.group.name,
              type: 'd',
              input: {
                id: _this2.group.id //*pass password: null,

              }
            };
          }
        });
      } else {
        this.group = this.form = null;
        this.get_groups();
      }
    },
    loadRoles: function loadRoles() {
      for (var _i = 0, _Object$keys = Object.keys(window.roles); _i < _Object$keys.length; _i++) {
        var _role = _Object$keys[_i];
        this.roles[_role] = this.group.roles.includes(_role);
      }
    },
    storeRoles: function storeRoles() {
      var _this3 = this;

      this.roles_error = this.roles_success = null;
      axios.post('/admin/groups/store-roles', {
        roles: this.roles,
        group: this.group.id //*pass password:this.form.input.password

      }).then(function (res) {
        _this3.role = res.data.role;
        _this3.roles_success = res.data.success; //*pass this.form.input.password = null;
      });
    },
    submitForm: function submitForm(e) {
      e.preventDefault();

      switch (this.form.type) {
        case 'c':
          this.postRequest('/admin/groups/store');
          break;

        case 'd':
          this.form.input.id = this.group['id'];
          this.postRequest('/admin/groups/destroy');
          break;

        case 'e':
          this.form.input.id = this.group['id'];
          this.postRequest('/admin/groups/edit');
          break;
      }
    },
    postRequest: function postRequest(link) {
      var _this4 = this;

      axios.post(link, this.form.input).then(function (res) {
        // console.log(res);
        // console.log('res');
        _this4.groups = res.data.groups;

        if (res.data.group != null) {
          _this4.group = res.data.group;

          _this4.$router.push({
            name: 'ad.groups',
            params: {
              id: _this4.group.id
            }
          });
        } else {
          _this4.$router.push({
            name: 'ad.groups'
          });
        }

        _this4.$root.post_success(res.data.success); //*pass this.form.input.password = '';

      });
    },
    get_groups: function get_groups() {
      var _this5 = this;

      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      if (this.filter.search) this.filter.search_q = '&search=' + this.filter.search;
      axios.get('/admin/groups?page=' + page + this.filter.search_q).then(function (res) {
        _this5.groups = res.data.groups;
      });
    },
    get_group: function get_group(id) {
      var _this6 = this;

      axios.get('/admin/groups/' + id).then(function (res) {
        _this6.group = res.data.group;

        _this6.loadRoles();
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Groups/FormGroups.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/Groups/FormGroups.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "FormGroups"
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Groups/IndexGroups.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/Groups/IndexGroups.vue?vue&type=script&lang=js& ***!
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
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "IndexGroups"
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Groups/ViewGroups.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/Groups/ViewGroups.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _johmun_vue_tags_input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @johmun/vue-tags-input */ "./node_modules/@johmun/vue-tags-input/dist/vue-tags-input.js");
/* harmony import */ var _johmun_vue_tags_input__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_johmun_vue_tags_input__WEBPACK_IMPORTED_MODULE_0__);
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

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "ViewGroups",
  components: {
    VueTagsInput: _johmun_vue_tags_input__WEBPACK_IMPORTED_MODULE_0___default.a
  },
  data: function data() {
    return {
      tag: '',
      availableTags: {},
      tags: [],
      password: '',
      autocompleteItems: []
    };
  },
  watch: {
    'tags': 'loadAvailableRoles'
  },
  mounted: function mounted() {
    this.loadRoles();
  },
  computed: {
    filteredItems: function filteredItems() {
      var _this = this;

      return this.autocompleteItems.filter(function (i) {
        return i.text.toLowerCase().indexOf(_this.tag.toLowerCase()) !== -1;
      });
    }
  },
  methods: {
    loadAvailableRoles: function loadAvailableRoles() {
      this.availableTags = {};

      for (var role in window.roles) {
        this.availableTags[role] = {
          text: window.roles[role],
          display: true
        };
      }

      var _iterator = _createForOfIteratorHelper(this.tags),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var tag = _step.value;
          this.availableTags[tag.i].display = false;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    },
    loadRoles: function loadRoles() {
      this.tags = [];

      var _iterator2 = _createForOfIteratorHelper(this.$parent.group.roles),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _role = _step2.value;
          this.tags.push({
            text: window.roles[_role],
            i: _role
          });
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      for (var role in window.roles) {
        this.autocompleteItems.push({
          text: window.roles[role],
          i: role
        });
      }
    },
    submitForm: function submitForm(e) {
      var _this2 = this;

      e.preventDefault();
      var form = {
        roles: [],
        password: this.password,
        group: this.$parent.group.id
      };

      var _iterator3 = _createForOfIteratorHelper(this.tags),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var tag = _step3.value;
          form.roles.push(tag.i);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      axios.post('/admin/groups/store-roles', form).then(function (res) {
        _this2.$root.post_success(res.data.success);

        _this2.password = null;
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Groups.vue?vue&type=template&id=d2625b02&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/Groups.vue?vue&type=template&id=d2625b02&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************/
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
      _vm.groups ? _c("IndexGroups") : _vm._e(),
      _vm._v(" "),
      _vm.group && !_vm.form ? _c("ViewGroups") : _vm._e(),
      _vm._v(" "),
      _vm.form ? _c("FormGroups") : _vm._e(),
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Groups/FormGroups.vue?vue&type=template&id=3e114e18&scoped=true&":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/Groups/FormGroups.vue?vue&type=template&id=3e114e18&scoped=true& ***!
  \**************************************************************************************************************************************************************************************************************************************/
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
    _c(
      "div",
      { staticClass: "card shadow mb-4 mb-xl-0", attrs: { id: "view" } },
      [
        _c(
          "div",
          { staticClass: "card-header bg-transparent" },
          [
            _c(
              "router-link",
              {
                staticClass: "btn btn-outline-primary btn-sm",
                attrs: { to: { name: "ad.groups" } },
              },
              [
                _c("i", { staticClass: "ni ni-bold-left" }),
                _vm._v(" Back\n                "),
              ]
            ),
            _vm._v(" "),
            _c("span", {
              domProps: { textContent: _vm._s(_vm.$parent.form.title) },
            }),
          ],
          1
        ),
        _vm._v(" "),
        _c("div", { staticClass: "card-body" }, [
          _c(
            "form",
            { on: { submit: _vm.$parent.submitForm } },
            [
              _c("fake-form-input"),
              _vm._v(" "),
              _vm.$parent.form.input.name !== undefined
                ? _c("div", { staticClass: "form-group mb-3" }, [
                    _c("div", { staticClass: "input-group" }, [
                      _vm._m(0),
                      _vm._v(" "),
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.$parent.form.input.name,
                            expression: "$parent.form.input.name",
                          },
                        ],
                        staticClass: "form-control",
                        attrs: {
                          placeholder: "group Name",
                          type: "text",
                          name: "name",
                          required: "",
                        },
                        domProps: { value: _vm.$parent.form.input.name },
                        on: {
                          input: function ($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(
                              _vm.$parent.form.input,
                              "name",
                              $event.target.value
                            )
                          },
                        },
                      }),
                    ]),
                  ])
                : _vm._e(),
              _vm._v(" "),
              _vm.$parent.form.input.description !== undefined
                ? _c("div", { staticClass: "form-group mb-3" }, [
                    _c("label"),
                    _vm._v(" "),
                    _c("textarea", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.$parent.form.input.description,
                          expression: "$parent.form.input.description",
                        },
                      ],
                      staticClass: "form-control form-control-alternative",
                      attrs: {
                        required: "",
                        rows: "4",
                        placeholder: "group description ...",
                      },
                      domProps: { value: _vm.$parent.form.input.description },
                      on: {
                        input: function ($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(
                            _vm.$parent.form.input,
                            "description",
                            $event.target.value
                          )
                        },
                      },
                    }),
                  ])
                : _vm._e(),
              _vm._v(" "),
              _vm.$parent.form.input.department_id !== undefined
                ? _c("div", { staticClass: "form-group mb-3" }, [
                    _c(
                      "div",
                      { staticClass: "input-group" },
                      [
                        _vm._m(1),
                        _vm._v(" "),
                        _c("v-select", {
                          staticClass: "form-control",
                          attrs: {
                            options: _vm.$parent.departments,
                            reduce: function (department) {
                              return department.id
                            },
                            label: "name",
                          },
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
                                          {
                                            staticClass: "vs__search",
                                            attrs: {
                                              required:
                                                !_vm.$parent.form.input
                                                  .department_id,
                                            },
                                          },
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
                            1535220183
                          ),
                          model: {
                            value: _vm.$parent.form.input.department_id,
                            callback: function ($$v) {
                              _vm.$set(
                                _vm.$parent.form.input,
                                "department_id",
                                $$v
                              )
                            },
                            expression: "$parent.form.input.department_id",
                          },
                        }),
                      ],
                      1
                    ),
                  ])
                : _vm._e(),
              _vm._v(" "),
              _vm._m(2),
            ],
            1
          ),
        ]),
      ]
    ),
  ])
}
var staticRenderFns = [
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "input-group-prepend" }, [
      _c("span", { staticClass: "input-group-text" }, [
        _c("i", { staticClass: "ni ni-align-left-2" }),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "input-group-prepend" }, [
      _c("span", { staticClass: "input-group-text" }, [
        _c("i", { staticClass: "ni ni-building" }),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "modal-footer" }, [
      _c(
        "button",
        { staticClass: "btn btn-primary", attrs: { type: "submit" } },
        [_vm._v("Save changes")]
      ),
    ])
  },
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Groups/IndexGroups.vue?vue&type=template&id=33181a16&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/Groups/IndexGroups.vue?vue&type=template&id=33181a16&scoped=true& ***!
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
  return _c("div", { staticClass: "col-md-12" }, [
    _c("div", { staticClass: "card shadow mb-4 mb-xl-0" }, [
      _c("div", { staticClass: "card-header bg-transparent" }, [
        _c("h3", { staticClass: "mb-0" }, [
          _c(
            "div",
            { staticClass: "float-right" },
            [
              _c(
                "router-link",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.$store.state.auth.hasRole("ad-7"),
                      expression: "$store.state.auth.hasRole('ad-7')",
                    },
                  ],
                  staticClass: "btn btn-sm btn-outline-primary mb-3",
                  attrs: {
                    to: { name: "ad.groups", params: { ops: "create" } },
                    "data-toggle": "modal",
                    "data-target": "#modal-term",
                  },
                },
                [
                  _vm._v(
                    "\n                        Add New group\n                    "
                  ),
                ]
              ),
            ],
            1
          ),
        ]),
      ]),
      _vm._v(" "),
      _c("form", { staticClass: "col-md-12" }, [
        _c("div", { staticClass: "form-group" }, [
          _c("div", { staticClass: "input-group mb-4" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.$parent.filter.search,
                  expression: "$parent.filter.search",
                },
              ],
              staticClass: "form-control",
              attrs: {
                placeholder: "Search by course code or name...",
                type: "text",
              },
              domProps: { value: _vm.$parent.filter.search },
              on: {
                input: function ($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.$parent.filter, "search", $event.target.value)
                },
              },
            }),
            _vm._v(" "),
            _c("div", { staticClass: "input-group-append" }, [
              _c(
                "button",
                {
                  staticClass: "btn btn-primary",
                  attrs: { type: "button" },
                  on: {
                    click: function ($event) {
                      return _vm.$parent.get_groups(1)
                    },
                  },
                },
                [
                  _c("i", { staticClass: "ni ni-zoom-split-in" }),
                  _vm._v(
                    "\n                            Search\n                        "
                  ),
                ]
              ),
            ]),
          ]),
        ]),
      ]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "table-responsive" },
        [
          _c("table", { staticClass: "table align-items-center table-flush" }, [
            _vm._m(0),
            _vm._v(" "),
            _c(
              "tbody",
              [
                _vm._l(_vm.$parent.groups.data, function (group) {
                  return _c("tr", [
                    _c(
                      "td",
                      [
                        _c(
                          "router-link",
                          {
                            staticClass: "btn btn-primary btn-sm",
                            attrs: {
                              to: {
                                name: "ad.groups",
                                params: { id: group.id },
                              },
                            },
                          },
                          [_c("i", { staticClass: "ni ni-bold-right" })]
                        ),
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c("th", { attrs: { scope: "row" } }, [
                      _vm._v(_vm._s(group.name)),
                    ]),
                    _vm._v(" "),
                    _c("th", { attrs: { scope: "row" } }, [
                      _vm._v(_vm._s(group.department.name)),
                    ]),
                  ])
                }),
                _vm._v(" "),
                _vm._m(1),
              ],
              2
            ),
          ]),
          _vm._v(" "),
          _c("laravel-vue-pagination", {
            attrs: { limit: 5, data: _vm.$parent.groups, align: "center" },
            on: { "pagination-change-page": _vm.$parent.get_groups },
          }),
        ],
        1
      ),
    ]),
  ])
}
var staticRenderFns = [
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", { staticClass: "thead-light" }, [
      _c("tr", [
        _c("th", { attrs: { scope: "col" } }),
        _vm._v(" "),
        _c("th", { attrs: { scope: "col" } }, [_vm._v("Name")]),
        _vm._v(" "),
        _c("th", { attrs: { scope: "col" } }, [_vm._v("Department")]),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("tr", [
      _c("th", { attrs: { scope: "row" } }),
      _vm._v(" "),
      _c("td"),
      _vm._v(" "),
      _c("td"),
    ])
  },
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Groups/ViewGroups.vue?vue&type=template&id=31c556b9&scoped=true&":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/Groups/ViewGroups.vue?vue&type=template&id=31c556b9&scoped=true& ***!
  \**************************************************************************************************************************************************************************************************************************************/
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
    _c(
      "div",
      { staticClass: "card shadow mb-4 mb-xl-0", attrs: { id: "view" } },
      [
        _c("div", { staticClass: "card-header bg-transparent" }, [
          _c("h3", { staticClass: "mb-0" }, [
            _c(
              "div",
              { staticClass: "float-left" },
              [
                _c(
                  "router-link",
                  {
                    staticClass: "btn btn-outline-primary btn-sm",
                    attrs: { to: { name: "ad.groups" } },
                  },
                  [
                    _c("i", { staticClass: "ni ni-bold-left" }),
                    _vm._v(" Back\n                        "),
                  ]
                ),
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "float-right" },
              [
                _c(
                  "router-link",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.$store.state.auth.hasRole("ad-7"),
                        expression: "$store.state.auth.hasRole('ad-7')",
                      },
                    ],
                    staticClass: "btn btn-outline-warning btn-sm",
                    attrs: {
                      to: {
                        name: "ad.groups",
                        params: { id: _vm.$parent.group.id, ops: "edit" },
                      },
                    },
                  },
                  [
                    _vm._v(
                      "\n                            Edit\n                        "
                    ),
                  ]
                ),
                _vm._v(" "),
                _c(
                  "router-link",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.$store.state.auth.hasRole("ad-7"),
                        expression: "$store.state.auth.hasRole('ad-7')",
                      },
                    ],
                    staticClass: "btn btn-outline-danger btn-sm",
                    attrs: {
                      to: {
                        name: "ad.groups",
                        params: { id: _vm.$parent.group.id, ops: "delete" },
                      },
                    },
                  },
                  [
                    _vm._v(
                      "\n                            Delete\n                        "
                    ),
                  ]
                ),
              ],
              1
            ),
          ]),
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "table-responsive" }, [
          _c("table", { staticClass: "table align-items-center table-flush" }, [
            _c("tbody", [
              _c("tr", [
                _c("td", [_vm._v("Name")]),
                _vm._v(" "),
                _c("th", [_vm._v(_vm._s(_vm.$parent.group["name"]))]),
              ]),
              _vm._v(" "),
              _c("tr", [
                _c("td", [_vm._v("Description")]),
                _vm._v(" "),
                _c("th", [_vm._v(_vm._s(_vm.$parent.group["description"]))]),
              ]),
              _vm._v(" "),
              _c("tr", [
                _c("td", [_vm._v("Department")]),
                _vm._v(" "),
                _c("th", [
                  _vm._v(_vm._s(_vm.$parent.group["department"].name)),
                ]),
              ]),
            ]),
          ]),
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "card-body" }, [
          _c(
            "form",
            { on: { submit: _vm.submitForm } },
            [
              _c("fake-form-input"),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "form-group mb-3" },
                _vm._l(_vm.availableTags, function (role) {
                  return _c(
                    "span",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: role.display,
                          expression: "role.display",
                        },
                      ],
                      staticClass: "badge badge-dark",
                    },
                    [
                      _vm._v(
                        "\n                            " +
                          _vm._s(role.text) +
                          "\n                        "
                      ),
                    ]
                  )
                }),
                0
              ),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "form-group mb-3" },
                [
                  _c("vue-tags-input", {
                    attrs: {
                      placeholder: "Assign role",
                      "add-only-from-autocomplete": true,
                      tags: _vm.tags,
                      "autocomplete-items": _vm.filteredItems,
                    },
                    on: {
                      "tags-changed": function (newTags) {
                        return (_vm.tags = newTags)
                      },
                    },
                    model: {
                      value: _vm.tag,
                      callback: function ($$v) {
                        _vm.tag = $$v
                      },
                      expression: "tag",
                    },
                  }),
                ],
                1
              ),
            ],
            1
          ),
        ]),
      ]
    ),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/admin/Groups.vue":
/*!**************************************************!*\
  !*** ./resources/js/components/admin/Groups.vue ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Groups_vue_vue_type_template_id_d2625b02_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Groups.vue?vue&type=template&id=d2625b02&scoped=true& */ "./resources/js/components/admin/Groups.vue?vue&type=template&id=d2625b02&scoped=true&");
/* harmony import */ var _Groups_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Groups.vue?vue&type=script&lang=js& */ "./resources/js/components/admin/Groups.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Groups_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Groups_vue_vue_type_template_id_d2625b02_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Groups_vue_vue_type_template_id_d2625b02_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "d2625b02",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/admin/Groups.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/admin/Groups.vue?vue&type=script&lang=js&":
/*!***************************************************************************!*\
  !*** ./resources/js/components/admin/Groups.vue?vue&type=script&lang=js& ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Groups_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Groups.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Groups.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Groups_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/admin/Groups.vue?vue&type=template&id=d2625b02&scoped=true&":
/*!*********************************************************************************************!*\
  !*** ./resources/js/components/admin/Groups.vue?vue&type=template&id=d2625b02&scoped=true& ***!
  \*********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Groups_vue_vue_type_template_id_d2625b02_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Groups.vue?vue&type=template&id=d2625b02&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Groups.vue?vue&type=template&id=d2625b02&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Groups_vue_vue_type_template_id_d2625b02_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Groups_vue_vue_type_template_id_d2625b02_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/admin/Groups/FormGroups.vue":
/*!*************************************************************!*\
  !*** ./resources/js/components/admin/Groups/FormGroups.vue ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FormGroups_vue_vue_type_template_id_3e114e18_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FormGroups.vue?vue&type=template&id=3e114e18&scoped=true& */ "./resources/js/components/admin/Groups/FormGroups.vue?vue&type=template&id=3e114e18&scoped=true&");
/* harmony import */ var _FormGroups_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FormGroups.vue?vue&type=script&lang=js& */ "./resources/js/components/admin/Groups/FormGroups.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _FormGroups_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _FormGroups_vue_vue_type_template_id_3e114e18_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _FormGroups_vue_vue_type_template_id_3e114e18_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "3e114e18",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/admin/Groups/FormGroups.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/admin/Groups/FormGroups.vue?vue&type=script&lang=js&":
/*!**************************************************************************************!*\
  !*** ./resources/js/components/admin/Groups/FormGroups.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FormGroups_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./FormGroups.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Groups/FormGroups.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FormGroups_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/admin/Groups/FormGroups.vue?vue&type=template&id=3e114e18&scoped=true&":
/*!********************************************************************************************************!*\
  !*** ./resources/js/components/admin/Groups/FormGroups.vue?vue&type=template&id=3e114e18&scoped=true& ***!
  \********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FormGroups_vue_vue_type_template_id_3e114e18_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./FormGroups.vue?vue&type=template&id=3e114e18&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Groups/FormGroups.vue?vue&type=template&id=3e114e18&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FormGroups_vue_vue_type_template_id_3e114e18_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FormGroups_vue_vue_type_template_id_3e114e18_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/admin/Groups/IndexGroups.vue":
/*!**************************************************************!*\
  !*** ./resources/js/components/admin/Groups/IndexGroups.vue ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _IndexGroups_vue_vue_type_template_id_33181a16_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./IndexGroups.vue?vue&type=template&id=33181a16&scoped=true& */ "./resources/js/components/admin/Groups/IndexGroups.vue?vue&type=template&id=33181a16&scoped=true&");
/* harmony import */ var _IndexGroups_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./IndexGroups.vue?vue&type=script&lang=js& */ "./resources/js/components/admin/Groups/IndexGroups.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _IndexGroups_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _IndexGroups_vue_vue_type_template_id_33181a16_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _IndexGroups_vue_vue_type_template_id_33181a16_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "33181a16",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/admin/Groups/IndexGroups.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/admin/Groups/IndexGroups.vue?vue&type=script&lang=js&":
/*!***************************************************************************************!*\
  !*** ./resources/js/components/admin/Groups/IndexGroups.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IndexGroups_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./IndexGroups.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Groups/IndexGroups.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IndexGroups_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/admin/Groups/IndexGroups.vue?vue&type=template&id=33181a16&scoped=true&":
/*!*********************************************************************************************************!*\
  !*** ./resources/js/components/admin/Groups/IndexGroups.vue?vue&type=template&id=33181a16&scoped=true& ***!
  \*********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_IndexGroups_vue_vue_type_template_id_33181a16_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./IndexGroups.vue?vue&type=template&id=33181a16&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Groups/IndexGroups.vue?vue&type=template&id=33181a16&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_IndexGroups_vue_vue_type_template_id_33181a16_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_IndexGroups_vue_vue_type_template_id_33181a16_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/admin/Groups/ViewGroups.vue":
/*!*************************************************************!*\
  !*** ./resources/js/components/admin/Groups/ViewGroups.vue ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ViewGroups_vue_vue_type_template_id_31c556b9_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ViewGroups.vue?vue&type=template&id=31c556b9&scoped=true& */ "./resources/js/components/admin/Groups/ViewGroups.vue?vue&type=template&id=31c556b9&scoped=true&");
/* harmony import */ var _ViewGroups_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ViewGroups.vue?vue&type=script&lang=js& */ "./resources/js/components/admin/Groups/ViewGroups.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ViewGroups_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ViewGroups_vue_vue_type_template_id_31c556b9_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ViewGroups_vue_vue_type_template_id_31c556b9_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "31c556b9",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/admin/Groups/ViewGroups.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/admin/Groups/ViewGroups.vue?vue&type=script&lang=js&":
/*!**************************************************************************************!*\
  !*** ./resources/js/components/admin/Groups/ViewGroups.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewGroups_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./ViewGroups.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Groups/ViewGroups.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewGroups_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/admin/Groups/ViewGroups.vue?vue&type=template&id=31c556b9&scoped=true&":
/*!********************************************************************************************************!*\
  !*** ./resources/js/components/admin/Groups/ViewGroups.vue?vue&type=template&id=31c556b9&scoped=true& ***!
  \********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewGroups_vue_vue_type_template_id_31c556b9_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./ViewGroups.vue?vue&type=template&id=31c556b9&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Groups/ViewGroups.vue?vue&type=template&id=31c556b9&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewGroups_vue_vue_type_template_id_31c556b9_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewGroups_vue_vue_type_template_id_31c556b9_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);