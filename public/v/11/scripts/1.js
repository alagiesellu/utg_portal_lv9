(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Users.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/Users.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Users_IndexUsers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Users/IndexUsers */ "./resources/js/components/admin/Users/IndexUsers.vue");
/* harmony import */ var _Users_ViewUsers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Users/ViewUsers */ "./resources/js/components/admin/Users/ViewUsers.vue");
/* harmony import */ var _Users_FromUsers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Users/FromUsers */ "./resources/js/components/admin/Users/FromUsers.vue");
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



/* harmony default export */ __webpack_exports__["default"] = ({
  name: "Users",
  components: {
    FromUsers: _Users_FromUsers__WEBPACK_IMPORTED_MODULE_2__["default"],
    ViewUsers: _Users_ViewUsers__WEBPACK_IMPORTED_MODULE_1__["default"],
    IndexUsers: _Users_IndexUsers__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      users: null,
      user: null,
      departments: [],
      form: null,
      filter: {
        search: null
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
    this.$store.state.page = 'Users'; // this.$root.getDepartments(0); // load academics departments
    // this.$root.getDepartments(1); // load admin departments
  },
  methods: {
    get_departments: function get_departments() {
      this.departments = this.$root.getProfileDepartment(this.form.input.profile);
    },
    fetchData: function fetchData() {
      var _this = this;

      this.users = this.user = this.form = null;

      if (this.$route.params.id === 'create' || this.$route.params.ops === 'create') {
        // this.users = null;
        // this.user = null;
        this.form = {
          title: 'Add User',
          type: 'c',
          input: {
            id: '',
            num: '',
            first_name: '',
            middle_name: '',
            last_name: '',
            email: '',
            tel: '',
            address: '',
            gender: '',
            dob: '',
            nationality: '',
            profile: '' //*pass user_password: null,
            //*pass password: null,

          }
        };
      } else if (this.$route.params.id) {
        // this.users = null;
        axios.get('/admin/users/' + this.$route.params.id).then(function (res) {
          _this.user = res.data.user;

          if (_this.$route.params.ops === 'edit') {
            _this.form = {
              title: 'Edit User',
              type: 'e',
              input: {
                id: _this.user.id,
                num: _this.user.num,
                first_name: _this.user.first_name,
                middle_name: _this.user.middle_name,
                last_name: _this.user.last_name,
                email: _this.user.email,
                tel: _this.user.tel,
                address: _this.user.address,
                gender: _this.user.gender,
                dob: _this.user.dob,
                nationality: _this.user.nationality //*pass user_password: null,
                //*pass password: null,

              }
            };
          } else if (_this.$route.params.ops === 'delete') {
            _this.form = {
              title: 'Delete User.',
              type: 'd',
              input: {
                id: _this.user.id //*pass password: null,

              }
            };
          } else {// this.form = null;
          }

          var _iterator = _createForOfIteratorHelper(_this.user.profiles),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var profile = _step.value;
              if (_this.user.profile_id === profile.id) _this.user.profile = profile;
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        });
      } else {
        // this.user = this.form = null;
        this.get_users();
      }
    },
    profile_type: function profile_type(type) {
      return this.$root.profile_type(type);
    },
    get_role: function get_role(role) {
      return window.roles[role];
    },
    submitForm: function submitForm(e) {
      e.preventDefault();

      switch (this.form.type) {
        case 'c':
          this.postRequest('/admin/users/store');
          break;

        case 'd':
          this.form.input.id = this.user['id'];
          this.postRequest('/admin/users/destroy');
          break;

        case 'e':
          this.form.input.id = this.user['id'];
          this.postRequest('/admin/users/edit');
          break;
      }
    },
    postRequest: function postRequest(link) {
      var _this2 = this;

      this.$refs.display_success_message.style.display = 'none';
      axios.post(link, this.form.input).then(function (res) {
        _this2.users = res.data.users;
        _this2.user = null;
        if (res.data.user != null) _this2.$router.push({
          name: 'ad.users',
          params: {
            id: res.data.user.id
          }
        });
        _this2.$refs.display_success_message.style.display = 'block';

        _this2.form.message.success.push(res.data.success);

        _this2.form.message.errors = []; //*pass this.form.input.password = '';
      });
    },
    // displayInput: function(ids, style, required)
    // {
    //     for (let id of ids) {
    //         this.$refs[id].id = style;
    //         this.$refs[id].children[1].required = required;
    //     }
    //
    //     this.departments = this.departments.concat(this.$store.state.admin_departments);
    //     this.departments = this.departments.concat(this.$store.state.academic_departments);
    // },
    resetInputs: function resetInputs() {
      for (var _i = 0, _Object$keys = Object.keys(this.form.input); _i < _Object$keys.length; _i++) {
        var key = _Object$keys[_i];
        this.form.input[key] = null;
      }
    },
    filter_users: function filter_users(e) {
      e.preventDefault();
      this.get_users();
    },
    get_users: function get_users() {
      var _this3 = this;

      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      axios.post('/admin/users?page=' + page, this.filter).then(function (res) {
        _this3.users = res.data.users;
      });
    },
    get_user: function get_user(id) {
      var _this4 = this;

      axios.get('/admin/users/' + id).then(function (res) {
        _this4.user = res.data.user;

        var _iterator2 = _createForOfIteratorHelper(_this4.user.profiles),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var profile = _step2.value;
            if (_this4.user.profile_id === profile.id) _this4.user.profile = profile;
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Users/CamStudio.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/Users/CamStudio.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue_web_cam__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-web-cam */ "./node_modules/vue-web-cam/dist/index.js");
/* harmony import */ var vue_web_cam__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_web_cam__WEBPACK_IMPORTED_MODULE_0__);
function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "CamStudio",
  components: {
    "vue-web-cam": vue_web_cam__WEBPACK_IMPORTED_MODULE_0___default.a
  },
  data: function data() {
    return {
      img: null,
      camera: null,
      deviceId: null,
      devices: [],
      user: null
    };
  },
  computed: {
    device: function device() {
      var _this = this;

      return this.devices.find(function (n) {
        return n.deviceId === _this.deviceId;
      });
    }
  },
  watch: {
    camera: function camera(id) {
      this.deviceId = id;
    },
    devices: function devices() {
      // Once we have a list select the first one
      var _this$devices = _toArray(this.devices),
          first = _this$devices[0],
          tail = _this$devices.slice(1);

      if (first) {
        this.camera = first.deviceId;
        this.deviceId = first.deviceId;
      }
    }
  },
  methods: {
    onCapture: function onCapture() {
      this.img = this.$refs.webcam.capture();
    },
    onStarted: function onStarted(stream) {// console.log("On Started Event", stream);
    },
    onStopped: function onStopped(stream) {// console.log("On Stopped Event", stream);
    },
    onStop: function onStop() {
      this.$refs.webcam.stop();
    },
    onStart: function onStart() {
      this.$refs.webcam.start();
    },
    onError: function onError(error) {// console.log("On Error Event", error);
    },
    onCameras: function onCameras(cameras) {
      this.devices = cameras; // console.log("On Cameras Event", cameras);
    },
    onCameraChange: function onCameraChange(deviceId) {
      this.deviceId = deviceId;
      this.camera = deviceId; // console.log("On Camera Change Event", deviceId);
    },
    beforeOpen: function beforeOpen(event) {
      this.user = event.params.user;
    },
    uploadFile: function uploadFile() {
      var _this2 = this;

      if (this.form.input.image.substr(5, 5) === 'image') {
        axios.post(window.api_url + '/users/upload', {
          image: this.form.input.image,
          user_id: this.user.id
        }).then(function (res) {
          _this2.$root.post_success(res.data.success);

          _this2.$parent.$parent.user.img = res.data.img;

          _this2.$modal.hide('profile-upload');
        });
      } else this.$root.post_errors({
        msg: ["Invalid! Must select a image."]
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Users/EditProfile.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/Users/EditProfile.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************/
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "EditProfile",
  data: function data() {
    return {
      // user: {},
      // profile: {},
      // errors: [],
      // success: null,
      department_id: null,
      major_department_id: null,
      minor_department_id: null,
      departments: [],
      major_departments: [],
      minor_departments: [],
      sets: [],
      groups: [],
      form: {},
      profile: {}
    };
  },
  mounted: function mounted() {},
  watch: {// 'department_id': 'department_selected',
    // 'major_department_id': 'get_sets',
  },
  methods: {
    departmentSelected: function departmentSelected() {
      if (this.profile.type === 's') {
        this.get_majors();
        this.get_sets();
      } else this.get_groups();
    },
    get_majors: function get_majors() {
      var _this = this;

      if (this.profile.department_id !== undefined) axios.get('/admin/get/majors/department=' + this.profile.department_id).then(function (res) {
        _this.major_departments = res.data.majors;
        _this.minor_departments = res.data.all_majors;
      });
    },
    get_groups: function get_groups() {
      var _this2 = this;

      // if department is not admin, get all academics roles
      if (this.profile.department_id !== undefined) axios.get('/admin/get/groups/department=' + this.profile.department_id).then(function (res) {
        _this2.groups = res.data.groups;
      });
    },
    get_sets: function get_sets() {
      var _this3 = this;

      // this.profile.department_id = this.major_department_id;
      if (this.profile.department_id !== undefined) axios.get('/admin/get/sets/department=' + this.profile.department_id).then(function (res) {
        _this3.sets = res.data.sets;
      });
    },
    beforeOpen: function beforeOpen(event) {
      this.form = event.params.form;
      this.profile = event.params.profile;
      this.getDepartments();
      this.departmentSelected(); // this.get_sets();
      // this.$forceUpdate();
    },
    getDepartments: function getDepartments() {
      var _this4 = this;

      var is_admin = this.profile.type === 'ad' ? 1 : 0;
      axios.get('/admin/get/departments?is_admin=' + is_admin).then(function (res) {
        _this4.departments = [];
        if (_this4.profile.type === 'ad') _this4.departments = res.data.departments;else if (_this4.profile.type === 'ac') {
          var _iterator = _createForOfIteratorHelper(res.data.departments),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var dep = _step.value;
              if (!dep.is_major) _this4.departments.push(dep);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        } else {
          var _iterator2 = _createForOfIteratorHelper(res.data.departments),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var _dep = _step2.value;
              if (_dep.is_major) _this4.departments.push(_dep);
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
      }); // this.profile.department_id = null;
    },
    onProfileDepartmentChange: function onProfileDepartmentChange() {
      if (this.profile.type !== 's') {
        this.sets = [];
        this.get_groups();
      }
    },
    submitForm: function submitForm(e) {
      var _this5 = this;

      e.preventDefault(); // if (this.department_id !== undefined)
      //     this.profile.department_id = this.department_id;
      //
      // if (this.major_department_id !== undefined)
      //     this.profile.major_department_id = this.major_department_id;

      if (this.form.ops === 'e') {
        axios.post('/admin/profiles/edit', this.profile).then(function (res) {
          _this5.$root.post_success(res.data.success); // this.profile = res.data.profile;


          _this5.$parent.$parent.user.profiles = res.data.profiles;

          _this5.$modal.hide('edit-profile');
        });
      } else if (this.form.ops === 'c') {
        axios.post('/admin/profiles/store', this.profile).then(function (res) {
          _this5.$root.post_success(res.data.success); // this.$profile.$parent.user.profile = res.data.profile;


          _this5.$parent.$parent.user.profiles = res.data.profiles;

          _this5.$modal.hide('edit-profile');
        });
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Users/FromUsers.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/Users/FromUsers.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modals_ViewRoles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../modals/ViewRoles */ "./resources/js/components/modals/ViewRoles.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "FromUsers",
  components: {
    ViewRoles: _modals_ViewRoles__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  methods: {
    submitForm: function submitForm(e) {
      var _this = this;

      e.preventDefault();

      switch (this.$parent.form.type) {
        case 'c':
          axios.post('/admin/users/store', this.$parent.form.input).then(function (res) {
            //this.$parent.user = res.data.user;
            _this.$root.post_success(res.data.success);

            _this.$parent.user = _this.$parent.form = null;
            _this.$parent.users = res.data.users;

            _this.$router.push({
              name: 'ad.users',
              params: {
                id: res.data.user.id
              }
            });
          });
          break;

        case 'd':
          axios.post('/admin/users/destroy', this.$parent.form.input).then(function (res) {
            //this.$parent.users = res.data.users;
            _this.$root.post_success(res.data.success);

            _this.$parent.user = _this.$parent.form = null;
            _this.$parent.users = res.data.users;

            _this.$router.push({
              name: 'ad.users'
            });
          });
          break;

        case 'e':
          axios.post('/admin/users/edit', this.$parent.form.input).then(function (res) {
            _this.$root.post_success(res.data.success);

            _this.$parent.form = null;
            _this.$parent.user = res.data.user;

            _this.$router.push({
              name: 'ad.users',
              params: {
                id: res.data.user.id
              }
            });
          });
          break;
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Users/IndexUsers.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/Users/IndexUsers.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "IndexUsers"
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Users/UploadPhoto.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/Users/UploadPhoto.vue?vue&type=script&lang=js& ***!
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
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "UploadPhoto",
  data: function data() {
    return {
      form: {
        input: {
          image: ''
        }
      },
      user: {}
    };
  },
  methods: {
    beforeOpen: function beforeOpen(event) {
      this.user = event.params.user;
    },
    onFileChange: function onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage: function createImage(file) {
      var _this = this;

      var reader = new FileReader();

      reader.onload = function (e) {
        _this.form.input.image = e.target.result;
      };

      reader.readAsDataURL(file);
    },
    uploadFile: function uploadFile() {
      var _this2 = this;

      //console.log(this.form.input.image)
      if (this.form.input.image.substr(5, 5) === 'image') {
        axios.post('/admin/users/upload', {
          image: this.form.input.image,
          user_id: this.user.id
        }).then(function (res) {
          _this2.$root.post_success(res.data.success);

          _this2.$parent.$parent.user.img = res.data.img;

          _this2.$modal.hide('profile-upload');
        });
      } else this.$root.post_errors({
        msg: ["Invalid! Must select a image."]
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Users/ViewUsers.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/Users/ViewUsers.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EditProfile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EditProfile */ "./resources/js/components/admin/Users/EditProfile.vue");
/* harmony import */ var _modals_ViewRoles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../modals/ViewRoles */ "./resources/js/components/modals/ViewRoles.vue");
/* harmony import */ var _UploadPhoto__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UploadPhoto */ "./resources/js/components/admin/Users/UploadPhoto.vue");
/* harmony import */ var _CamStudio__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CamStudio */ "./resources/js/components/admin/Users/CamStudio.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "ViewUsers",
  components: {
    CamStudio: _CamStudio__WEBPACK_IMPORTED_MODULE_3__["default"],
    UploadPhoto: _UploadPhoto__WEBPACK_IMPORTED_MODULE_2__["default"],
    ViewRoles: _modals_ViewRoles__WEBPACK_IMPORTED_MODULE_1__["default"],
    EditProfile: _EditProfile__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      form: {
        ops: null,
        profile: {},
        password: {}
      }
    };
  },
  methods: {
    submitResetPassword: function submitResetPassword(e) {
      var _this = this;

      e.preventDefault();
      this.form.password.user_id = this.$parent.user.id;
      axios.post('/admin/users/reset/password', this.form.password).then(function (res) {
        _this.$root.post_success(res.data.success);

        _this.$modal.hide('reset-password');
      });
    },
    edit_profile: function edit_profile(profile) {
      var _this2 = this;

      axios.get('/admin/users/profile/' + profile.id).then(function (res) {
        _this2.$modal.show('edit-profile', {
          profile: res.data.profile,
          form: {
            ops: 'e'
          }
        });
      });
    },
    add_profile: function add_profile(type) {
      this.$modal.show('edit-profile', {
        profile: {
          type: type,
          active: 1,
          user_id: this.$parent.user.id
        },
        form: {
          ops: 'c'
        }
      });
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Users.vue?vue&type=template&id=fa2043a6&scoped=true&":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/Users.vue?vue&type=template&id=fa2043a6&scoped=true& ***!
  \**************************************************************************************************************************************************************************************************************************/
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
      _vm.users ? _c("IndexUsers") : _vm._e(),
      _vm._v(" "),
      _vm.user && !_vm.form ? _c("ViewUsers") : _vm._e(),
      _vm._v(" "),
      _vm.form ? _c("FromUsers") : _vm._e(),
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Users/CamStudio.vue?vue&type=template&id=0e785003&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/Users/CamStudio.vue?vue&type=template&id=0e785003&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************/
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
      attrs: { name: "cam-studio", height: "auto" },
      on: { "before-open": _vm.beforeOpen },
    },
    [
      _c("h2", { staticClass: "modal-header" }, [
        _c("i", { staticClass: "ni ni-camera-compact" }, [
          _vm._v(" Cam Studio"),
        ]),
      ]),
      _vm._v(" "),
      _vm.user
        ? _c("div", { staticClass: "modal-body" }, [
            _c("div", { staticClass: "row" }, [
              _c("div", { staticClass: "col-md-6" }, [
                _c("h2", [_vm._v("Current Camera")]),
                _vm._v(" "),
                _vm.device
                  ? _c("code", [_vm._v(_vm._s(_vm.device.label))])
                  : _vm._e(),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "border" },
                  [
                    _c("vue-web-cam", {
                      ref: "webcam",
                      attrs: { "device-id": _vm.deviceId, width: "100%" },
                      on: {
                        started: _vm.onStarted,
                        stopped: _vm.onStopped,
                        error: _vm.onError,
                        cameras: _vm.onCameras,
                        "camera-change": _vm.onCameraChange,
                      },
                    }),
                  ],
                  1
                ),
                _vm._v(" "),
                _c("div", { staticClass: "row" }, [
                  _c("div", { staticClass: "col-md-12" }, [
                    _c(
                      "select",
                      {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.camera,
                            expression: "camera",
                          },
                        ],
                        on: {
                          change: function ($event) {
                            var $$selectedVal = Array.prototype.filter
                              .call($event.target.options, function (o) {
                                return o.selected
                              })
                              .map(function (o) {
                                var val = "_value" in o ? o._value : o.value
                                return val
                              })
                            _vm.camera = $event.target.multiple
                              ? $$selectedVal
                              : $$selectedVal[0]
                          },
                        },
                      },
                      [
                        _c("option", [_vm._v("-- Select Device --")]),
                        _vm._v(" "),
                        _vm._l(_vm.devices, function (device) {
                          return _c(
                            "option",
                            {
                              key: device.deviceId,
                              domProps: { value: device.deviceId },
                            },
                            [_vm._v(_vm._s(device.label))]
                          )
                        }),
                      ],
                      2
                    ),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "col-md-12" }, [
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-primary",
                        attrs: { type: "button" },
                        on: { click: _vm.onCapture },
                      },
                      [_vm._v("Capture Photo")]
                    ),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-danger",
                        attrs: { type: "button" },
                        on: { click: _vm.onStop },
                      },
                      [_vm._v("Stop Camera")]
                    ),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-success",
                        attrs: { type: "button" },
                        on: { click: _vm.onStart },
                      },
                      [_vm._v("Start Camera")]
                    ),
                  ]),
                ]),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "col-md-6" }, [
                _c("h2", [_vm._v("Captured Image")]),
                _vm._v(" "),
                _c("figure", { staticClass: "figure" }, [
                  _c("img", {
                    staticClass: "img-responsive",
                    attrs: { src: _vm.img },
                  }),
                ]),
              ]),
            ]),
          ])
        : _vm._e(),
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Users/EditProfile.vue?vue&type=template&id=746e173d&scoped=true&":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/Users/EditProfile.vue?vue&type=template&id=746e173d&scoped=true& ***!
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
  return _c(
    "modal",
    {
      attrs: { scrollable: true, name: "edit-profile", height: "auto" },
      on: { "before-open": _vm.beforeOpen },
    },
    [
      _c("div", { staticClass: "modal-header" }, [
        _c(
          "h3",
          { staticClass: "modal-title", attrs: { id: "modal-title-create" } },
          [
            _vm.form.ops === "c"
              ? _c("span", [_vm._v("New")])
              : _c("span", [_vm._v("Edit")]),
            _vm._v(" "),
            _vm.profile.type === "ad"
              ? _c("span", [_vm._v("Admin")])
              : _vm.profile.type === "ac"
              ? _c("span", [_vm._v("Academic")])
              : _c("span", [_vm._v("Student")]),
            _vm._v("\n\n                Profile\n            "),
          ]
        ),
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "modal-body" }, [
        _c(
          "form",
          { on: { submit: _vm.submitForm } },
          [
            _c("fake-form-input"),
            _vm._v(" "),
            _c("div", { staticClass: "form-group mb-3" }, [
              _c("div", { ref: "active", staticClass: "custom-checkbox" }, [
                _c("label", { staticClass: "custom-toggle" }, [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.profile.active,
                        expression: "profile.active",
                      },
                    ],
                    attrs: { type: "checkbox" },
                    domProps: {
                      checked: Array.isArray(_vm.profile.active)
                        ? _vm._i(_vm.profile.active, null) > -1
                        : _vm.profile.active,
                    },
                    on: {
                      change: function ($event) {
                        var $$a = _vm.profile.active,
                          $$el = $event.target,
                          $$c = $$el.checked ? true : false
                        if (Array.isArray($$a)) {
                          var $$v = null,
                            $$i = _vm._i($$a, $$v)
                          if ($$el.checked) {
                            $$i < 0 &&
                              _vm.$set(_vm.profile, "active", $$a.concat([$$v]))
                          } else {
                            $$i > -1 &&
                              _vm.$set(
                                _vm.profile,
                                "active",
                                $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                              )
                          }
                        } else {
                          _vm.$set(_vm.profile, "active", $$c)
                        }
                      },
                    },
                  }),
                  _vm._v(" "),
                  _c("span", {
                    staticClass: "custom-toggle-slider rounded-circle",
                  }),
                ]),
              ]),
            ]),
            _vm._v(" "),
            _vm.profile.active
              ? _c("div", [
                  _c("h4", { staticClass: "text-success" }, [
                    _vm._v("Profile Activated"),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-group mb-3" }, [
                    _c("label", { staticClass: "form-control-label" }, [
                      _vm._v("Department"),
                    ]),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "input-group" },
                      [
                        _c("div", { staticClass: "input-group-prepend" }, [
                          _c("span", { staticClass: "input-group-text" }, [
                            _c("i", { staticClass: "ni ni-building" }),
                          ]),
                        ]),
                        _vm._v(" "),
                        _c("v-select", {
                          staticClass: "form-control",
                          attrs: {
                            options: _vm.departments,
                            reduce: function (department) {
                              return department.id
                            },
                            label: "name",
                          },
                          on: { input: _vm.departmentSelected },
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
                                                !_vm.profile.department_id,
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
                            312712132
                          ),
                          model: {
                            value: _vm.profile.department_id,
                            callback: function ($$v) {
                              _vm.$set(_vm.profile, "department_id", $$v)
                            },
                            expression: "profile.department_id",
                          },
                        }),
                      ],
                      1
                    ),
                  ]),
                  _vm._v(" "),
                  _vm.profile.type === "s"
                    ? _c("div", [
                        _c("div", { staticClass: "form-group mb-3" }, [
                          _c("label", { staticClass: "form-control-label" }, [
                            _vm._v("Minor"),
                          ]),
                          _vm._v(" "),
                          _c(
                            "div",
                            { staticClass: "input-group" },
                            [
                              _c(
                                "div",
                                { staticClass: "input-group-prepend" },
                                [
                                  _c(
                                    "span",
                                    { staticClass: "input-group-text" },
                                    [_c("i", { staticClass: "ni ni-building" })]
                                  ),
                                ]
                              ),
                              _vm._v(" "),
                              _c("v-select", {
                                staticClass: "form-control",
                                attrs: {
                                  options: _vm.minor_departments,
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
                                  value: _vm.profile.minor_department_id,
                                  callback: function ($$v) {
                                    _vm.$set(
                                      _vm.profile,
                                      "minor_department_id",
                                      $$v
                                    )
                                  },
                                  expression: "profile.minor_department_id",
                                },
                              }),
                            ],
                            1
                          ),
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "form-group mb-3" }, [
                          _c("label", { staticClass: "form-control-label" }, [
                            _vm._v("Set"),
                          ]),
                          _vm._v(" "),
                          _c(
                            "div",
                            { staticClass: "input-group" },
                            [
                              _c(
                                "div",
                                { staticClass: "input-group-prepend" },
                                [
                                  _c(
                                    "span",
                                    { staticClass: "input-group-text" },
                                    [_c("i", { staticClass: "ni ni-building" })]
                                  ),
                                ]
                              ),
                              _vm._v(" "),
                              _c("v-select", {
                                staticClass: "form-control",
                                attrs: {
                                  options: _vm.sets,
                                  reduce: function (set) {
                                    return set.id
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
                                                    disabled:
                                                      _vm.profile
                                                        .department_id === null,
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
                                  2370231418
                                ),
                                model: {
                                  value: _vm.profile.set_id,
                                  callback: function ($$v) {
                                    _vm.$set(_vm.profile, "set_id", $$v)
                                  },
                                  expression: "profile.set_id",
                                },
                              }),
                            ],
                            1
                          ),
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "form-group mb-3" }, [
                          _c("label", { staticClass: "form-control-label" }, [
                            _vm._v("Enrolled Date"),
                          ]),
                          _vm._v(" "),
                          _c("div", { staticClass: "input-group" }, [
                            _c("div", { staticClass: "input-group-prepend" }, [
                              _c("span", { staticClass: "input-group-text" }, [
                                _c("i", {
                                  staticClass: "ni ni-calendar-grid-58",
                                }),
                              ]),
                            ]),
                            _vm._v(" "),
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.profile.enrolled_at,
                                  expression: "profile.enrolled_at",
                                },
                              ],
                              staticClass: "form-control",
                              attrs: {
                                placeholder: "Enrolled Date",
                                type: "date",
                                name: "enrolled_at",
                                required: "",
                              },
                              domProps: { value: _vm.profile.enrolled_at },
                              on: {
                                input: function ($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.profile,
                                    "enrolled_at",
                                    $event.target.value
                                  )
                                },
                              },
                            }),
                          ]),
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "form-group mb-3" }, [
                          _c("label", { staticClass: "form-control-label" }, [
                            _vm._v("Completion Date"),
                          ]),
                          _vm._v(" "),
                          _c("div", { staticClass: "input-group" }, [
                            _c("div", { staticClass: "input-group-prepend" }, [
                              _c("span", { staticClass: "input-group-text" }, [
                                _c("i", {
                                  staticClass: "ni ni-calendar-grid-58",
                                }),
                              ]),
                            ]),
                            _vm._v(" "),
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.profile.completed_at,
                                  expression: "profile.completed_at",
                                },
                              ],
                              staticClass: "form-control",
                              attrs: {
                                placeholder: "Completion Date",
                                type: "date",
                                name: "completed_at",
                              },
                              domProps: { value: _vm.profile.completed_at },
                              on: {
                                input: function ($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.profile,
                                    "completed_at",
                                    $event.target.value
                                  )
                                },
                              },
                            }),
                          ]),
                        ]),
                      ])
                    : _c("div", [
                        _c("div", { staticClass: "form-group mb-3" }, [
                          _c("label", { staticClass: "form-control-label" }, [
                            _vm._v("Group"),
                          ]),
                          _vm._v(" "),
                          _c(
                            "div",
                            { ref: "group_id", staticClass: "input-group" },
                            [
                              _c(
                                "div",
                                { staticClass: "input-group-prepend" },
                                [
                                  _c(
                                    "span",
                                    { staticClass: "input-group-text" },
                                    [_c("i", { staticClass: "ni ni-building" })]
                                  ),
                                ]
                              ),
                              _vm._v(" "),
                              _c("v-select", {
                                staticClass: "form-control",
                                attrs: {
                                  options: _vm.groups,
                                  reduce: function (group) {
                                    return group.id
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
                                  value: _vm.profile.group_id,
                                  callback: function ($$v) {
                                    _vm.$set(_vm.profile, "group_id", $$v)
                                  },
                                  expression: "profile.group_id",
                                },
                              }),
                            ],
                            1
                          ),
                        ]),
                      ]),
                ])
              : _c("div", [
                  _c("h4", { staticClass: "text-danger" }, [
                    _vm._v("Profile Deactivated"),
                  ]),
                ]),
            _vm._v(" "),
            _c("div", { staticClass: "modal-footer" }, [
              _c(
                "button",
                { staticClass: "btn btn-primary", attrs: { type: "submit" } },
                [_vm._v("Save changes")]
              ),
              _vm._v(" "),
              _c(
                "button",
                {
                  staticClass: "btn btn-danger",
                  attrs: { type: "button" },
                  on: {
                    click: function ($event) {
                      return _vm.$modal.hide("edit-profile")
                    },
                  },
                },
                [_vm._v("Close")]
              ),
            ]),
          ],
          1
        ),
      ]),
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Users/FromUsers.vue?vue&type=template&id=530aa508&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/Users/FromUsers.vue?vue&type=template&id=530aa508&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************/
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
            _c(
              "button",
              {
                staticClass: "btn btn-sm btn-outline-primary float-right",
                on: {
                  click: function ($event) {
                    return _vm.$router.go(-1)
                  },
                },
              },
              [
                _c("i", { staticClass: "ni ni-bold-left" }),
                _vm._v(" Back\n            "),
              ]
            ),
            _vm._v(" "),
            _c("h4", {
              domProps: { textContent: _vm._s(_vm.$parent.form.title) },
            }),
            _vm._v(" "),
            _vm.$parent.user
              ? _c(
                  "h3",
                  [
                    _c("small", [_vm._v("#")]),
                    _vm._v(
                      " " + _vm._s(_vm.$parent.user.num) + "\n                "
                    ),
                    _c("br"),
                    _vm._v(" "),
                    _c("small", [_vm._v("Names")]),
                    _vm._v(" "),
                    _c(
                      "router-link",
                      {
                        attrs: {
                          to: {
                            name: "ad.users",
                            params: { id: _vm.$parent.user.id },
                          },
                        },
                      },
                      [_vm._v(_vm._s(_vm.$root.full_name(_vm.$parent.user)))]
                    ),
                  ],
                  1
                )
              : _vm._e(),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "card-body" }, [
            _c(
              "form",
              { on: { submit: _vm.submitForm } },
              [
                _c("fake-form-input"),
                _vm._v(" "),
                _vm.$parent.form.input.num !== undefined
                  ? _c("div", { staticClass: "form-group mb-3" }, [
                      _c("div", { staticClass: "input-group" }, [
                        _vm._m(0),
                        _vm._v(" "),
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.$parent.form.input.num,
                              expression: "$parent.form.input.num",
                            },
                          ],
                          staticClass: "form-control",
                          attrs: {
                            placeholder: "user number",
                            type: "text",
                            required: "",
                          },
                          domProps: { value: _vm.$parent.form.input.num },
                          on: {
                            input: function ($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.$parent.form.input,
                                "num",
                                $event.target.value
                              )
                            },
                          },
                        }),
                      ]),
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm.$parent.form.input.first_name !== undefined
                  ? _c("div", { staticClass: "form-group mb-3" }, [
                      _c("div", { staticClass: "input-group" }, [
                        _vm._m(1),
                        _vm._v(" "),
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.$parent.form.input.first_name,
                              expression: "$parent.form.input.first_name",
                            },
                          ],
                          staticClass: "form-control",
                          attrs: {
                            placeholder: "user first name",
                            type: "text",
                            required: "",
                          },
                          domProps: {
                            value: _vm.$parent.form.input.first_name,
                          },
                          on: {
                            input: function ($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.$parent.form.input,
                                "first_name",
                                $event.target.value
                              )
                            },
                          },
                        }),
                      ]),
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm.$parent.form.input.middle_name !== undefined
                  ? _c("div", { staticClass: "form-group mb-3" }, [
                      _c("div", { staticClass: "input-group" }, [
                        _vm._m(2),
                        _vm._v(" "),
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.$parent.form.input.middle_name,
                              expression: "$parent.form.input.middle_name",
                            },
                          ],
                          staticClass: "form-control",
                          attrs: {
                            placeholder: "user middle name",
                            type: "text",
                          },
                          domProps: {
                            value: _vm.$parent.form.input.middle_name,
                          },
                          on: {
                            input: function ($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.$parent.form.input,
                                "middle_name",
                                $event.target.value
                              )
                            },
                          },
                        }),
                      ]),
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm.$parent.form.input.last_name !== undefined
                  ? _c("div", { staticClass: "form-group mb-3" }, [
                      _c("div", { staticClass: "input-group" }, [
                        _vm._m(3),
                        _vm._v(" "),
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.$parent.form.input.last_name,
                              expression: "$parent.form.input.last_name",
                            },
                          ],
                          staticClass: "form-control",
                          attrs: {
                            placeholder: "user last name",
                            type: "text",
                            required: "",
                          },
                          domProps: { value: _vm.$parent.form.input.last_name },
                          on: {
                            input: function ($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.$parent.form.input,
                                "last_name",
                                $event.target.value
                              )
                            },
                          },
                        }),
                      ]),
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm.$parent.form.input.email !== undefined
                  ? _c("div", { staticClass: "form-group mb-3" }, [
                      _c("div", { staticClass: "input-group" }, [
                        _vm._m(4),
                        _vm._v(" "),
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.$parent.form.input.email,
                              expression: "$parent.form.input.email",
                            },
                          ],
                          staticClass: "form-control",
                          attrs: {
                            placeholder: "user email",
                            type: "text",
                            required: "",
                          },
                          domProps: { value: _vm.$parent.form.input.email },
                          on: {
                            input: function ($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.$parent.form.input,
                                "email",
                                $event.target.value
                              )
                            },
                          },
                        }),
                      ]),
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm.$parent.form.input.tel !== undefined
                  ? _c("div", { staticClass: "form-group mb-3" }, [
                      _c("div", { staticClass: "input-group" }, [
                        _vm._m(5),
                        _vm._v(" "),
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.$parent.form.input.tel,
                              expression: "$parent.form.input.tel",
                            },
                          ],
                          staticClass: "form-control",
                          attrs: {
                            placeholder: "Telephone Number",
                            type: "tel",
                            required: "",
                          },
                          domProps: { value: _vm.$parent.form.input.tel },
                          on: {
                            input: function ($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.$parent.form.input,
                                "tel",
                                $event.target.value
                              )
                            },
                          },
                        }),
                      ]),
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm.$parent.form.input.address !== undefined
                  ? _c("div", { staticClass: "form-group mb-3" }, [
                      _c("div", { staticClass: "input-group" }, [
                        _vm._m(6),
                        _vm._v(" "),
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.$parent.form.input.address,
                              expression: "$parent.form.input.address",
                            },
                          ],
                          staticClass: "form-control",
                          attrs: {
                            placeholder: "user address",
                            type: "text",
                            required: "",
                          },
                          domProps: { value: _vm.$parent.form.input.address },
                          on: {
                            input: function ($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.$parent.form.input,
                                "address",
                                $event.target.value
                              )
                            },
                          },
                        }),
                      ]),
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm.$parent.form.input.gender !== undefined
                  ? _c("div", { staticClass: "form-group mb-3" }, [
                      _c("div", { staticClass: "input-group" }, [
                        _vm._m(7),
                        _vm._v(" "),
                        _c(
                          "select",
                          {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.$parent.form.input.gender,
                                expression: "$parent.form.input.gender",
                              },
                            ],
                            ref: "gender_select",
                            staticClass: "form-control",
                            attrs: { id: "gender", required: "" },
                            on: {
                              change: function ($event) {
                                var $$selectedVal = Array.prototype.filter
                                  .call($event.target.options, function (o) {
                                    return o.selected
                                  })
                                  .map(function (o) {
                                    var val = "_value" in o ? o._value : o.value
                                    return val
                                  })
                                _vm.$set(
                                  _vm.$parent.form.input,
                                  "gender",
                                  $event.target.multiple
                                    ? $$selectedVal
                                    : $$selectedVal[0]
                                )
                              },
                            },
                          },
                          [
                            _c("option", { attrs: { value: "m" } }, [
                              _vm._v("Male"),
                            ]),
                            _vm._v(" "),
                            _c("option", { attrs: { value: "f" } }, [
                              _vm._v("Female"),
                            ]),
                          ]
                        ),
                      ]),
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm.$parent.form.input.dob !== undefined
                  ? _c("div", { staticClass: "form-group mb-3" }, [
                      _c("div", { staticClass: "input-group" }, [
                        _vm._m(8),
                        _vm._v(" "),
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.$parent.form.input.dob,
                              expression: "$parent.form.input.dob",
                            },
                          ],
                          staticClass: "form-control",
                          attrs: {
                            placeholder: "Date of birth",
                            type: "date",
                            required: "",
                          },
                          domProps: { value: _vm.$parent.form.input.dob },
                          on: {
                            input: function ($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.$parent.form.input,
                                "dob",
                                $event.target.value
                              )
                            },
                          },
                        }),
                      ]),
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm.$parent.form.input.nationality !== undefined
                  ? _c("div", { staticClass: "form-group mb-3" }, [
                      _c(
                        "div",
                        { staticClass: "input-group" },
                        [
                          _vm._m(9),
                          _vm._v(" "),
                          _c("country-select", {
                            staticClass: "form-control",
                            attrs: {
                              topCountry: "GM",
                              country: _vm.$parent.form.input.nationality,
                            },
                            model: {
                              value: _vm.$parent.form.input.nationality,
                              callback: function ($$v) {
                                _vm.$set(
                                  _vm.$parent.form.input,
                                  "nationality",
                                  $$v
                                )
                              },
                              expression: "$parent.form.input.nationality",
                            },
                          }),
                        ],
                        1
                      ),
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm.$parent.form.input.profile !== undefined
                  ? _c("div", { staticClass: "form-group mb-3" }, [
                      _c("div", { staticClass: "input-group" }, [
                        _vm._m(10),
                        _vm._v(" "),
                        _c(
                          "select",
                          {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.$parent.form.input.profile,
                                expression: "$parent.form.input.profile",
                              },
                            ],
                            staticClass: "form-control",
                            attrs: { required: "" },
                            on: {
                              change: [
                                function ($event) {
                                  var $$selectedVal = Array.prototype.filter
                                    .call($event.target.options, function (o) {
                                      return o.selected
                                    })
                                    .map(function (o) {
                                      var val =
                                        "_value" in o ? o._value : o.value
                                      return val
                                    })
                                  _vm.$set(
                                    _vm.$parent.form.input,
                                    "profile",
                                    $event.target.multiple
                                      ? $$selectedVal
                                      : $$selectedVal[0]
                                  )
                                },
                                function ($event) {
                                  return _vm.$parent.get_departments()
                                },
                              ],
                            },
                          },
                          [
                            _c("option", { attrs: { value: "ad" } }, [
                              _vm._v("Admin"),
                            ]),
                            _vm._v(" "),
                            _c("option", { attrs: { value: "ac" } }, [
                              _vm._v("Academics"),
                            ]),
                            _vm._v(" "),
                            _c("option", { attrs: { value: "s" } }, [
                              _vm._v("Student"),
                            ]),
                          ]
                        ),
                      ]),
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _c("div", { staticClass: "form-group mb-3" }, [
                  _c("div", { staticClass: "input-group" }, [
                    _vm._m(11),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.$parent.form.input.password,
                          expression: "$parent.form.input.password",
                        },
                      ],
                      staticClass: "form-control",
                      attrs: {
                        placeholder: "Password confirmation",
                        type: "password",
                        required: "",
                      },
                      domProps: { value: _vm.$parent.form.input.password },
                      on: {
                        input: function ($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(
                            _vm.$parent.form.input,
                            "password",
                            $event.target.value
                          )
                        },
                      },
                    }),
                  ]),
                ]),
                _vm._v(" "),
                _vm._m(12),
              ],
              1
            ),
          ]),
        ]
      ),
      _vm._v(" "),
      _c("ViewRoles"),
    ],
    1
  )
}
var staticRenderFns = [
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "input-group-prepend" }, [
      _c("span", { staticClass: "input-group-text" }, [_vm._v("Number:")]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "input-group-prepend" }, [
      _c("span", { staticClass: "input-group-text" }, [_vm._v("First Name:")]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "input-group-prepend" }, [
      _c("span", { staticClass: "input-group-text" }, [_vm._v("Middle Name:")]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "input-group-prepend" }, [
      _c("span", { staticClass: "input-group-text" }, [_vm._v("Last Name:")]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "input-group-prepend" }, [
      _c("span", { staticClass: "input-group-text" }, [_vm._v("Email:")]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "input-group-prepend" }, [
      _c("span", { staticClass: "input-group-text" }, [_vm._v("Tel:")]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "input-group-prepend" }, [
      _c("span", { staticClass: "input-group-text" }, [_vm._v("Address:")]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "input-group-prepend" }, [
      _c("span", { staticClass: "input-group-text" }, [_vm._v("Gender:")]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "input-group-prepend" }, [
      _c("span", { staticClass: "input-group-text" }, [
        _vm._v("Date of Birth:"),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "input-group-prepend" }, [
      _c("span", { staticClass: "input-group-text" }, [_vm._v("Nationality:")]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "input-group-prepend" }, [
      _c("span", { staticClass: "input-group-text" }, [
        _vm._v("Profile Type:"),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "input-group-prepend" }, [
      _c("span", { staticClass: "input-group-text" }, [
        _c("i", { staticClass: "ni ni-lock-circle-open" }),
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Users/IndexUsers.vue?vue&type=template&id=21877970&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/Users/IndexUsers.vue?vue&type=template&id=21877970&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************/
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
                      value: _vm.$store.state.auth.hasRole("ad-13"),
                      expression: "$store.state.auth.hasRole('ad-13')",
                    },
                  ],
                  staticClass: "btn btn-sm btn-outline-primary mb-3",
                  attrs: {
                    to: { name: "ad.users", params: { ops: "create" } },
                    "data-toggle": "modal",
                    "data-target": "#modal-term",
                  },
                },
                [
                  _vm._v(
                    "\n                        Add New user\n                    "
                  ),
                ]
              ),
            ],
            1
          ),
        ]),
      ]),
      _vm._v(" "),
      _c(
        "form",
        { staticClass: "col-md-12", on: { submit: _vm.$parent.filter_users } },
        [
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
                  placeholder: "Student or Staff Number, Email, or Names...",
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
              _vm._m(0),
            ]),
          ]),
        ]
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "table-responsive" },
        [
          _c("table", { staticClass: "table align-items-center table-flush" }, [
            _vm._m(1),
            _vm._v(" "),
            _c(
              "tbody",
              [
                _vm._l(_vm.$parent.users.data, function (user) {
                  return _c("tr", [
                    _c(
                      "td",
                      [
                        _c(
                          "router-link",
                          {
                            staticClass: "btn btn-primary btn-sm",
                            attrs: {
                              to: { name: "ad.users", params: { id: user.id } },
                            },
                          },
                          [_c("i", { staticClass: "ni ni-bold-right" })]
                        ),
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c("th", [_vm._v(_vm._s(user.num))]),
                    _vm._v(" "),
                    _c("th", [_vm._v(_vm._s(_vm.$root.full_name(user)))]),
                    _vm._v(" "),
                    _c(
                      "th",
                      _vm._l(user.profiles, function (profile) {
                        return _c(
                          "span",
                          {
                            staticClass: "badge",
                            class: [
                              profile.id == user.profile_id
                                ? "badge-default"
                                : "badge-light",
                            ],
                          },
                          [
                            _vm._v(
                              "\n                            " +
                                _vm._s(_vm.$root.profile_type(profile.type)) +
                                "\n                        "
                            ),
                          ]
                        )
                      }),
                      0
                    ),
                  ])
                }),
                _vm._v(" "),
                _vm._m(2),
              ],
              2
            ),
          ]),
          _vm._v(" "),
          _c("laravel-vue-pagination", {
            attrs: { limit: 5, data: _vm.$parent.users, align: "center" },
            on: { "pagination-change-page": _vm.$parent.get_users },
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
    return _c("div", { staticClass: "input-group-append" }, [
      _c(
        "button",
        { staticClass: "btn btn-primary", attrs: { type: "submit" } },
        [
          _c("i", { staticClass: "ni ni-zoom-split-in" }),
          _vm._v(
            "\n                            Search\n                        "
          ),
        ]
      ),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", { staticClass: "thead-light" }, [
      _c("tr", [
        _c("th", { attrs: { scope: "col" } }),
        _vm._v(" "),
        _c("th", { attrs: { scope: "col" } }, [_vm._v("#")]),
        _vm._v(" "),
        _c("th", { attrs: { scope: "col" } }, [_vm._v("Name")]),
        _vm._v(" "),
        _c("th", { attrs: { scope: "col" } }, [_vm._v("Profiles")]),
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
      _vm._v(" "),
      _c("td"),
    ])
  },
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Users/UploadPhoto.vue?vue&type=template&id=084e9aa2&scoped=true&":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/Users/UploadPhoto.vue?vue&type=template&id=084e9aa2&scoped=true& ***!
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
  return _c(
    "modal",
    {
      attrs: { name: "profile-upload", height: "auto", draggable: true },
      on: { "before-open": _vm.beforeOpen },
    },
    [
      _c("h2", { staticClass: "modal-header" }, [
        _c("i", { staticClass: "ni ni-cloud-upload-96" }, [
          _vm._v(" Update Profile"),
        ]),
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "modal-body" }, [
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
                  on: { click: _vm.uploadFile },
                },
                [_vm._v("Upload")]
              ),
            ]),
          ]),
        ]),
      ]),
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Users/ViewUsers.vue?vue&type=template&id=335bb4e1&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/Users/ViewUsers.vue?vue&type=template&id=335bb4e1&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "row col-12" }, [
    _c(
      "div",
      { staticClass: "col-md-6" },
      [
        _c(
          "div",
          { staticClass: "card shadow mb-4 mb-xl-0", attrs: { id: "view" } },
          [
            _c("div", { staticClass: "card-header bg-transparent" }, [
              _c("h3", { staticClass: "mb-0" }, [
                _c("div", { staticClass: "float-left" }, [
                  _c(
                    "button",
                    {
                      staticClass: "btn btn-sm btn-outline-primary mb-3",
                      on: {
                        click: function ($event) {
                          return _vm.$router.go(-1)
                        },
                      },
                    },
                    [
                      _c("i", { staticClass: "ni ni-bold-left" }),
                      _vm._v(" Back\n                            "),
                    ]
                  ),
                ]),
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
                            value: _vm.$store.state.auth.hasRole("ad-13"),
                            expression: "$store.state.auth.hasRole('ad-13')",
                          },
                        ],
                        staticClass: "btn btn-sm btn-outline-warning mb-3",
                        attrs: {
                          to: {
                            name: "ad.users",
                            params: { id: _vm.$parent.user.id, ops: "edit" },
                          },
                        },
                      },
                      [
                        _vm._v(
                          "\n                                Edit\n                            "
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
                            value: _vm.$store.state.auth.hasRole("ad-13"),
                            expression: "$store.state.auth.hasRole('ad-13')",
                          },
                        ],
                        staticClass: "btn btn-sm btn-outline-danger mb-3",
                        attrs: {
                          to: {
                            name: "ad.users",
                            params: { id: _vm.$parent.user.id, ops: "delete" },
                          },
                        },
                      },
                      [
                        _vm._v(
                          "\n                                Delete\n                            "
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
              _c(
                "table",
                { staticClass: "table align-items-center table-flush" },
                [
                  _c("tbody", [
                    _c("tr", [
                      _c("td", { staticClass: "text-center row" }, [
                        _c("div", { staticClass: "col-12" }, [
                          _c("img", {
                            staticClass: "img-thumbnail",
                            attrs: {
                              src:
                                "/storage/profiles/" + _vm.$parent.user["img"],
                            },
                          }),
                          _vm._v(" "),
                          _c(
                            "button",
                            {
                              staticClass: "btn btn-sm btn-secondary btn-block",
                              on: {
                                click: function ($event) {
                                  return _vm.$modal.show("profile-upload", {
                                    user: _vm.$parent.user,
                                  })
                                },
                              },
                            },
                            [
                              _vm._v(
                                "\n                                        Upload\n                                    "
                              ),
                            ]
                          ),
                        ]),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c("tr", [
                      _c("th", [
                        _c("small", [_vm._v("#")]),
                        _vm._v(
                          "\n                                " +
                            _vm._s(_vm.$parent.user["num"]) +
                            "\n                            "
                        ),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c("tr", [
                      _c("th", [
                        _c("small", [_vm._v("First Name")]),
                        _vm._v(
                          "\n                                " +
                            _vm._s(_vm.$parent.user["first_name"]) +
                            "\n                            "
                        ),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c("tr", [
                      _c("th", [
                        _c("small", [_vm._v("Middle Name")]),
                        _vm._v(
                          "\n                                " +
                            _vm._s(_vm.$parent.user["middle_name"]) +
                            "\n                            "
                        ),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c("tr", [
                      _c("th", [
                        _c("small", [_vm._v("Last Name")]),
                        _vm._v(
                          "\n                                " +
                            _vm._s(_vm.$parent.user["last_name"]) +
                            "\n                            "
                        ),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c("tr", [
                      _c("th", [
                        _c("small", [_vm._v("Email")]),
                        _vm._v(
                          "\n                                " +
                            _vm._s(_vm.$parent.user["email"]) +
                            "\n                            "
                        ),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c("tr", [
                      _c("th", [
                        _c("small", [_vm._v("Tel")]),
                        _vm._v(
                          "\n                                " +
                            _vm._s(_vm.$parent.user["tel"]) +
                            "\n                            "
                        ),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c("tr", [
                      _c("th", [
                        _c("small", [_vm._v("Address")]),
                        _vm._v(
                          "\n                                " +
                            _vm._s(_vm.$parent.user["address"]) +
                            "\n                            "
                        ),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c("tr", [
                      _c("th", [
                        _c("small", [_vm._v("Gender")]),
                        _vm._v(
                          "\n                                " +
                            _vm._s(
                              this.$root.gender(_vm.$parent.user["gender"])
                            ) +
                            "\n                            "
                        ),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c("tr", [
                      _c("th", [
                        _c("small", [_vm._v("Date of Birth")]),
                        _vm._v(
                          "\n                                " +
                            _vm._s(
                              this.$root.format_date(_vm.$parent.user["dob"])
                            ) +
                            "\n                            "
                        ),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c("tr", [
                      _c("th", [
                        _c("small", [_vm._v("Nationality")]),
                        _vm._v(
                          "\n                                " +
                            _vm._s(
                              this.$root.country(
                                _vm.$parent.user["nationality"]
                              )
                            ) +
                            "\n                            "
                        ),
                      ]),
                    ]),
                  ]),
                ]
              ),
            ]),
          ]
        ),
        _vm._v(" "),
        _c("EditProfile"),
        _vm._v(" "),
        _c("ViewRoles"),
        _vm._v(" "),
        _c("UploadPhoto"),
        _vm._v(" "),
        _c("CamStudio"),
      ],
      1
    ),
    _vm._v(" "),
    _c("div", { staticClass: "col-md-6" }, [
      _c("div", { staticClass: "card shadow mb-4 mb-xl-0" }, [
        _c("h2", { staticClass: "card-header bg-transparent" }, [
          _vm._v("\n                    Profiles\n                    "),
          _c("div", { staticClass: "float-right" }, [
            _c("div", { staticClass: "btn-group dropleft" }, [
              _c(
                "button",
                {
                  staticClass: "btn btn-outline-primary btn-sm dropdown-toggle",
                  attrs: {
                    type: "button",
                    "data-toggle": "dropdown",
                    "aria-haspopup": "true",
                    "aria-expanded": "false",
                  },
                },
                [
                  _vm._v(
                    "\n                                New Profile\n                            "
                  ),
                ]
              ),
              _vm._v(" "),
              _c("div", { staticClass: "dropdown-menu" }, [
                _c(
                  "button",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.$store.state.auth.hasRole("ad-14.ad"),
                        expression: "$store.state.auth.hasRole('ad-14.ad')",
                      },
                    ],
                    staticClass: "dropdown-item",
                    on: {
                      click: function ($event) {
                        return _vm.add_profile("ad")
                      },
                    },
                  },
                  [
                    _vm._v(
                      "\n                                    Admin\n                                "
                    ),
                  ]
                ),
                _vm._v(" "),
                _c(
                  "button",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.$store.state.auth.hasRole("ad-14.ac"),
                        expression: "$store.state.auth.hasRole('ad-14.ac')",
                      },
                    ],
                    staticClass: "dropdown-item",
                    on: {
                      click: function ($event) {
                        return _vm.add_profile("ac")
                      },
                    },
                  },
                  [
                    _vm._v(
                      "\n                                    Academic\n                                "
                    ),
                  ]
                ),
                _vm._v(" "),
                _c(
                  "button",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.$store.state.auth.hasRole("ad-14.s"),
                        expression: "$store.state.auth.hasRole('ad-14.s')",
                      },
                    ],
                    staticClass: "dropdown-item",
                    on: {
                      click: function ($event) {
                        return _vm.add_profile("s")
                      },
                    },
                  },
                  [
                    _vm._v(
                      "\n                                    Student\n                                "
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
          { staticClass: "card-body" },
          _vm._l(_vm.$parent.user.profiles, function (profile) {
            return _c("div", [
              _c(
                "button",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.$store.state.auth.hasRole(
                        "ad-14." + profile.type
                      ),
                      expression:
                        "$store.state.auth.hasRole('ad-14.'+profile.type)",
                    },
                  ],
                  staticClass:
                    "btn btn-sm btn-outline-primary mb-3 float-right",
                  on: {
                    click: function ($event) {
                      return _vm.edit_profile(profile)
                    },
                  },
                },
                [
                  _vm._v(
                    "\n                            Edit " +
                      _vm._s(_vm.$parent.profile_type(profile.type)) +
                      " profile\n                        "
                  ),
                ]
              ),
              _vm._v(" "),
              _c("h5", { class: { "text-danger": !profile.active } }, [
                !profile.active
                  ? _c("span", { staticClass: "badge badge-danger" }, [
                      _vm._v("Deactivated"),
                      _c("br"),
                    ])
                  : _vm._e(),
                _vm._v(" "),
                profile.id === _vm.$parent.user.profile_id
                  ? _c("span", { staticClass: "badge badge-default" }, [
                      _vm._v("Currently Using"),
                      _c("br"),
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _c("div", { staticClass: "text-capitalize" }, [
                  _c("small", [_vm._v("Type: ")]),
                  _vm._v(_vm._s(_vm.$parent.profile_type(profile.type))),
                  _c("br"),
                ]),
                _vm._v(" "),
                profile.set != null
                  ? _c("div", [
                      _c("small", [_vm._v("Set: ")]),
                      _vm._v(
                        _vm._s(profile.set.name) +
                          "\n                            "
                      ),
                    ])
                  : _vm._e(),
                _vm._v(" "),
                profile.department != null
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
                                params: { id: profile.department_id },
                              },
                            },
                          },
                          [
                            _vm._v(
                              "\n                                    " +
                                _vm._s(profile.department.name) +
                                "\n                                "
                            ),
                          ]
                        ),
                      ],
                      1
                    )
                  : _vm._e(),
                _vm._v(" "),
                profile.major_department != null
                  ? _c(
                      "div",
                      [
                        _c("small", [_vm._v("Major: ")]),
                        _vm._v(" "),
                        _c(
                          "router-link",
                          {
                            attrs: {
                              target: "_blank",
                              to: {
                                name: "ad.departments",
                                params: { id: profile.major_department_id },
                              },
                            },
                          },
                          [
                            _vm._v(
                              "\n                                    " +
                                _vm._s(profile.major_department.name) +
                                "\n                                "
                            ),
                          ]
                        ),
                      ],
                      1
                    )
                  : _vm._e(),
                _vm._v(" "),
                profile.minor_department != null
                  ? _c(
                      "div",
                      [
                        _c("small", [_vm._v("Minor: ")]),
                        _vm._v(" "),
                        _c(
                          "router-link",
                          {
                            attrs: {
                              target: "_blank",
                              to: {
                                name: "ad.departments",
                                params: { id: profile.minor_department_id },
                              },
                            },
                          },
                          [
                            _vm._v(
                              "\n                                    " +
                                _vm._s(profile.minor_department.name) +
                                "\n                                "
                            ),
                          ]
                        ),
                      ],
                      1
                    )
                  : _vm._e(),
                _vm._v(" "),
                profile.completed_at != null
                  ? _c("div", [
                      _c("small", [_vm._v("Completion Date: ")]),
                      _vm._v(
                        "\n                                " +
                          _vm._s(_vm.$root.format_date(profile.completed_at)) +
                          "\n                            "
                      ),
                    ])
                  : _vm._e(),
                _vm._v(" "),
                profile.enrolled_at != null
                  ? _c("div", [
                      _c("small", [_vm._v("Enrolled Date: ")]),
                      _vm._v(
                        "\n                                " +
                          _vm._s(_vm.$root.format_date(profile.enrolled_at)) +
                          "\n                            "
                      ),
                    ])
                  : _vm._e(),
                _vm._v(" "),
                profile.group != null
                  ? _c("div", [
                      _c("small", [_vm._v("Role Group: ")]),
                      _vm._v(" "),
                      _c(
                        "button",
                        {
                          staticClass: "btn btn-sm btn-link",
                          on: {
                            click: function ($event) {
                              return _vm.$modal.show("view-roles", {
                                group: profile.group,
                              })
                            },
                          },
                        },
                        [_vm._v(_vm._s(profile.group.name))]
                      ),
                    ])
                  : _vm._e(),
              ]),
              _vm._v(" "),
              profile.type === "s"
                ? _c(
                    "h5",
                    { staticClass: "mb-0 text-center" },
                    [
                      _c(
                        "router-link",
                        {
                          directives: [
                            {
                              name: "show",
                              rawName: "v-show",
                              value: _vm.$store.state.auth.hasRole("ad-15"),
                              expression: "$store.state.auth.hasRole('ad-15')",
                            },
                          ],
                          staticClass: "btn btn-link text-underline",
                          attrs: {
                            to: {
                              name: "ad.transcripts",
                              params: { id: _vm.$parent.user.num },
                            },
                          },
                        },
                        [
                          _vm._v(
                            "\n                                Transcript\n                            "
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
                              value: _vm.$store.state.auth.hasRole("ad-23"),
                              expression: "$store.state.auth.hasRole('ad-23')",
                            },
                          ],
                          staticClass: "btn btn-link text-underline",
                          attrs: {
                            to: {
                              name: "ad.grades",
                              params: { id: _vm.$parent.user.num },
                            },
                          },
                        },
                        [
                          _vm._v(
                            "\n                                Grades\n                            "
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
                              value: _vm.$store.state.auth.hasRole("ad-17"),
                              expression: "$store.state.auth.hasRole('ad-17')",
                            },
                          ],
                          staticClass: "btn btn-link text-underline",
                          attrs: {
                            to: {
                              name: "ad.finance",
                              params: { id: _vm.$parent.user.num },
                            },
                          },
                        },
                        [
                          _vm._v(
                            "\n                                Finance\n                            "
                          ),
                        ]
                      ),
                    ],
                    1
                  )
                : _vm._e(),
              _vm._v(" "),
              _c("hr"),
            ])
          }),
          0
        ),
      ]),
    ]),
  ])
}
var staticRenderFns = []
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

/***/ "./node_modules/vue-web-cam/dist/index.js":
/*!************************************************!*\
  !*** ./node_modules/vue-web-cam/dist/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t():undefined}(window,function(){return function(e){var t={};function i(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,i),r.l=!0,r.exports}return i.m=e,i.c=t,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/dist/",i(i.s=0)}([function(e,t,i){"use strict";i.r(t);var n=function(e,t,i,n,r,o,a,s){var c,d="function"==typeof e?e.options:e;if(t&&(d.render=t,d.staticRenderFns=i,d._compiled=!0),n&&(d.functional=!0),o&&(d._scopeId="data-v-"+o),a?(c=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),r&&r.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(a)},d._ssrRegister=c):r&&(c=s?function(){r.call(this,this.$root.$options.shadowRoot)}:r),c)if(d.functional){d._injectStyles=c;var u=d.render;d.render=function(e,t){return c.call(t),u(e,t)}}else{var f=d.beforeCreate;d.beforeCreate=f?[].concat(f,c):[c]}return{exports:e,options:d}}({name:"VueWebCam",props:{width:{type:[Number,String],default:"100%"},height:{type:[Number,String],default:500},autoplay:{type:Boolean,default:!0},screenshotFormat:{type:String,default:"image/jpeg"},selectFirstDevice:{type:Boolean,default:!1},deviceId:{type:String,default:null},playsinline:{type:Boolean,default:!0},resolution:{type:Object,default:null,validator:function(e){return e.height&&e.width}}},data:function(){return{source:null,canvas:null,camerasListEmitted:!1,cameras:[]}},watch:{deviceId:function(e){this.changeCamera(e)}},mounted:function(){this.setupMedia()},beforeDestroy:function(){this.stop()},methods:{legacyGetUserMediaSupport:function(){return function(e){var t=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia||navigator.oGetUserMedia;return t?new Promise(function(i,n){t.call(navigator,e,i,n)}):Promise.reject(new Error("getUserMedia is not implemented in this browser"))}},setupMedia:function(){void 0===navigator.mediaDevices&&(navigator.mediaDevices={}),void 0===navigator.mediaDevices.getUserMedia&&(navigator.mediaDevices.getUserMedia=this.legacyGetUserMediaSupport()),this.testMediaAccess()},loadCameras:function(){var e=this;navigator.mediaDevices.enumerateDevices().then(function(t){for(var i=0;i!==t.length;++i){var n=t[i];"videoinput"===n.kind&&e.cameras.push(n)}}).then(function(){e.camerasListEmitted||(e.selectFirstDevice&&e.cameras.length>0&&(e.deviceId=e.cameras[0].deviceId),e.$emit("cameras",e.cameras),e.camerasListEmitted=!0)}).catch(function(t){return e.$emit("notsupported",t)})},changeCamera:function(e){this.stop(),this.$emit("camera-change",e),this.loadCamera(e)},loadSrcStream:function(e){var t=this;"srcObject"in this.$refs.video?this.$refs.video.srcObject=e:this.source=window.HTMLMediaElement.srcObject(e),this.$refs.video.onloadedmetadata=function(){t.$emit("video-live",e)},this.$emit("started",e)},stopStreamedVideo:function(e){var t=this,i=e.srcObject;i.getTracks().forEach(function(e){e.stop(),t.$emit("stopped",i),t.$refs.video.srcObject=null,t.source=null})},stop:function(){null!==this.$refs.video&&this.$refs.video.srcObject&&this.stopStreamedVideo(this.$refs.video)},start:function(){this.deviceId&&this.loadCamera(this.deviceId)},pause:function(){null!==this.$refs.video&&this.$refs.video.srcObject&&this.$refs.video.pause()},resume:function(){null!==this.$refs.video&&this.$refs.video.srcObject&&this.$refs.video.play()},testMediaAccess:function(){var e=this,t={video:!0};this.resolution&&(t.video={},t.video.height=this.resolution.height,t.video.width=this.resolution.width),navigator.mediaDevices.getUserMedia(t).then(function(t){t.getTracks().forEach(function(e){e.stop()}),e.loadCameras()}).catch(function(t){return e.$emit("error",t)})},loadCamera:function(e){var t=this,i={video:{deviceId:{exact:e}}};this.resolution&&(i.video.height=this.resolution.height,i.video.width=this.resolution.width),navigator.mediaDevices.getUserMedia(i).then(function(e){return t.loadSrcStream(e)}).catch(function(e){return t.$emit("error",e)})},capture:function(){return this.getCanvas().toDataURL(this.screenshotFormat)},getCanvas:function(){var e=this.$refs.video;if(!this.ctx){var t=document.createElement("canvas");t.height=e.videoHeight,t.width=e.videoWidth,this.canvas=t,this.ctx=t.getContext("2d")}var i=this.ctx,n=this.canvas;return i.drawImage(e,0,0,n.width,n.height),n}}},function(){var e=this.$createElement;return(this._self._c||e)("video",{ref:"video",attrs:{width:this.width,height:this.height,src:this.source,autoplay:this.autoplay,playsinline:this.playsinline}})},[],!1,null,null,null).exports;function r(e){e.component("vue-web-cam",n)}i.d(t,"version",function(){return o}),i.d(t,"WebCam",function(){return n}),"undefined"!=typeof window&&window.Vue&&window.Vue.use(r);t.default=r;var o="__VERSION__"}])});

/***/ }),

/***/ "./resources/js/components/admin/Users.vue":
/*!*************************************************!*\
  !*** ./resources/js/components/admin/Users.vue ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Users_vue_vue_type_template_id_fa2043a6_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Users.vue?vue&type=template&id=fa2043a6&scoped=true& */ "./resources/js/components/admin/Users.vue?vue&type=template&id=fa2043a6&scoped=true&");
/* harmony import */ var _Users_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Users.vue?vue&type=script&lang=js& */ "./resources/js/components/admin/Users.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Users_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Users_vue_vue_type_template_id_fa2043a6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Users_vue_vue_type_template_id_fa2043a6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "fa2043a6",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/admin/Users.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/admin/Users.vue?vue&type=script&lang=js&":
/*!**************************************************************************!*\
  !*** ./resources/js/components/admin/Users.vue?vue&type=script&lang=js& ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Users_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Users.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Users.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Users_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/admin/Users.vue?vue&type=template&id=fa2043a6&scoped=true&":
/*!********************************************************************************************!*\
  !*** ./resources/js/components/admin/Users.vue?vue&type=template&id=fa2043a6&scoped=true& ***!
  \********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Users_vue_vue_type_template_id_fa2043a6_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Users.vue?vue&type=template&id=fa2043a6&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Users.vue?vue&type=template&id=fa2043a6&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Users_vue_vue_type_template_id_fa2043a6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Users_vue_vue_type_template_id_fa2043a6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/admin/Users/CamStudio.vue":
/*!***********************************************************!*\
  !*** ./resources/js/components/admin/Users/CamStudio.vue ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CamStudio_vue_vue_type_template_id_0e785003_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CamStudio.vue?vue&type=template&id=0e785003&scoped=true& */ "./resources/js/components/admin/Users/CamStudio.vue?vue&type=template&id=0e785003&scoped=true&");
/* harmony import */ var _CamStudio_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CamStudio.vue?vue&type=script&lang=js& */ "./resources/js/components/admin/Users/CamStudio.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _CamStudio_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _CamStudio_vue_vue_type_template_id_0e785003_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _CamStudio_vue_vue_type_template_id_0e785003_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "0e785003",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/admin/Users/CamStudio.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/admin/Users/CamStudio.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./resources/js/components/admin/Users/CamStudio.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CamStudio_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./CamStudio.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Users/CamStudio.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CamStudio_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/admin/Users/CamStudio.vue?vue&type=template&id=0e785003&scoped=true&":
/*!******************************************************************************************************!*\
  !*** ./resources/js/components/admin/Users/CamStudio.vue?vue&type=template&id=0e785003&scoped=true& ***!
  \******************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CamStudio_vue_vue_type_template_id_0e785003_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./CamStudio.vue?vue&type=template&id=0e785003&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Users/CamStudio.vue?vue&type=template&id=0e785003&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CamStudio_vue_vue_type_template_id_0e785003_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CamStudio_vue_vue_type_template_id_0e785003_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/admin/Users/EditProfile.vue":
/*!*************************************************************!*\
  !*** ./resources/js/components/admin/Users/EditProfile.vue ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EditProfile_vue_vue_type_template_id_746e173d_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EditProfile.vue?vue&type=template&id=746e173d&scoped=true& */ "./resources/js/components/admin/Users/EditProfile.vue?vue&type=template&id=746e173d&scoped=true&");
/* harmony import */ var _EditProfile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EditProfile.vue?vue&type=script&lang=js& */ "./resources/js/components/admin/Users/EditProfile.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _EditProfile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _EditProfile_vue_vue_type_template_id_746e173d_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _EditProfile_vue_vue_type_template_id_746e173d_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "746e173d",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/admin/Users/EditProfile.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/admin/Users/EditProfile.vue?vue&type=script&lang=js&":
/*!**************************************************************************************!*\
  !*** ./resources/js/components/admin/Users/EditProfile.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EditProfile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./EditProfile.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Users/EditProfile.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EditProfile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/admin/Users/EditProfile.vue?vue&type=template&id=746e173d&scoped=true&":
/*!********************************************************************************************************!*\
  !*** ./resources/js/components/admin/Users/EditProfile.vue?vue&type=template&id=746e173d&scoped=true& ***!
  \********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EditProfile_vue_vue_type_template_id_746e173d_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./EditProfile.vue?vue&type=template&id=746e173d&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Users/EditProfile.vue?vue&type=template&id=746e173d&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EditProfile_vue_vue_type_template_id_746e173d_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EditProfile_vue_vue_type_template_id_746e173d_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/admin/Users/FromUsers.vue":
/*!***********************************************************!*\
  !*** ./resources/js/components/admin/Users/FromUsers.vue ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FromUsers_vue_vue_type_template_id_530aa508_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FromUsers.vue?vue&type=template&id=530aa508&scoped=true& */ "./resources/js/components/admin/Users/FromUsers.vue?vue&type=template&id=530aa508&scoped=true&");
/* harmony import */ var _FromUsers_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FromUsers.vue?vue&type=script&lang=js& */ "./resources/js/components/admin/Users/FromUsers.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _FromUsers_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _FromUsers_vue_vue_type_template_id_530aa508_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _FromUsers_vue_vue_type_template_id_530aa508_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "530aa508",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/admin/Users/FromUsers.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/admin/Users/FromUsers.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./resources/js/components/admin/Users/FromUsers.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FromUsers_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./FromUsers.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Users/FromUsers.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FromUsers_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/admin/Users/FromUsers.vue?vue&type=template&id=530aa508&scoped=true&":
/*!******************************************************************************************************!*\
  !*** ./resources/js/components/admin/Users/FromUsers.vue?vue&type=template&id=530aa508&scoped=true& ***!
  \******************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FromUsers_vue_vue_type_template_id_530aa508_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./FromUsers.vue?vue&type=template&id=530aa508&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Users/FromUsers.vue?vue&type=template&id=530aa508&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FromUsers_vue_vue_type_template_id_530aa508_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FromUsers_vue_vue_type_template_id_530aa508_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/admin/Users/IndexUsers.vue":
/*!************************************************************!*\
  !*** ./resources/js/components/admin/Users/IndexUsers.vue ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _IndexUsers_vue_vue_type_template_id_21877970_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./IndexUsers.vue?vue&type=template&id=21877970&scoped=true& */ "./resources/js/components/admin/Users/IndexUsers.vue?vue&type=template&id=21877970&scoped=true&");
/* harmony import */ var _IndexUsers_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./IndexUsers.vue?vue&type=script&lang=js& */ "./resources/js/components/admin/Users/IndexUsers.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _IndexUsers_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _IndexUsers_vue_vue_type_template_id_21877970_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _IndexUsers_vue_vue_type_template_id_21877970_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "21877970",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/admin/Users/IndexUsers.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/admin/Users/IndexUsers.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./resources/js/components/admin/Users/IndexUsers.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IndexUsers_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./IndexUsers.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Users/IndexUsers.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IndexUsers_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/admin/Users/IndexUsers.vue?vue&type=template&id=21877970&scoped=true&":
/*!*******************************************************************************************************!*\
  !*** ./resources/js/components/admin/Users/IndexUsers.vue?vue&type=template&id=21877970&scoped=true& ***!
  \*******************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_IndexUsers_vue_vue_type_template_id_21877970_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./IndexUsers.vue?vue&type=template&id=21877970&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Users/IndexUsers.vue?vue&type=template&id=21877970&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_IndexUsers_vue_vue_type_template_id_21877970_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_IndexUsers_vue_vue_type_template_id_21877970_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/admin/Users/UploadPhoto.vue":
/*!*************************************************************!*\
  !*** ./resources/js/components/admin/Users/UploadPhoto.vue ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UploadPhoto_vue_vue_type_template_id_084e9aa2_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UploadPhoto.vue?vue&type=template&id=084e9aa2&scoped=true& */ "./resources/js/components/admin/Users/UploadPhoto.vue?vue&type=template&id=084e9aa2&scoped=true&");
/* harmony import */ var _UploadPhoto_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UploadPhoto.vue?vue&type=script&lang=js& */ "./resources/js/components/admin/Users/UploadPhoto.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _UploadPhoto_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _UploadPhoto_vue_vue_type_template_id_084e9aa2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _UploadPhoto_vue_vue_type_template_id_084e9aa2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "084e9aa2",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/admin/Users/UploadPhoto.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/admin/Users/UploadPhoto.vue?vue&type=script&lang=js&":
/*!**************************************************************************************!*\
  !*** ./resources/js/components/admin/Users/UploadPhoto.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UploadPhoto_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./UploadPhoto.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Users/UploadPhoto.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UploadPhoto_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/admin/Users/UploadPhoto.vue?vue&type=template&id=084e9aa2&scoped=true&":
/*!********************************************************************************************************!*\
  !*** ./resources/js/components/admin/Users/UploadPhoto.vue?vue&type=template&id=084e9aa2&scoped=true& ***!
  \********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UploadPhoto_vue_vue_type_template_id_084e9aa2_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./UploadPhoto.vue?vue&type=template&id=084e9aa2&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Users/UploadPhoto.vue?vue&type=template&id=084e9aa2&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UploadPhoto_vue_vue_type_template_id_084e9aa2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UploadPhoto_vue_vue_type_template_id_084e9aa2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/admin/Users/ViewUsers.vue":
/*!***********************************************************!*\
  !*** ./resources/js/components/admin/Users/ViewUsers.vue ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ViewUsers_vue_vue_type_template_id_335bb4e1_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ViewUsers.vue?vue&type=template&id=335bb4e1&scoped=true& */ "./resources/js/components/admin/Users/ViewUsers.vue?vue&type=template&id=335bb4e1&scoped=true&");
/* harmony import */ var _ViewUsers_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ViewUsers.vue?vue&type=script&lang=js& */ "./resources/js/components/admin/Users/ViewUsers.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ViewUsers_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ViewUsers_vue_vue_type_template_id_335bb4e1_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ViewUsers_vue_vue_type_template_id_335bb4e1_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "335bb4e1",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/admin/Users/ViewUsers.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/admin/Users/ViewUsers.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./resources/js/components/admin/Users/ViewUsers.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewUsers_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./ViewUsers.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Users/ViewUsers.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewUsers_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/admin/Users/ViewUsers.vue?vue&type=template&id=335bb4e1&scoped=true&":
/*!******************************************************************************************************!*\
  !*** ./resources/js/components/admin/Users/ViewUsers.vue?vue&type=template&id=335bb4e1&scoped=true& ***!
  \******************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewUsers_vue_vue_type_template_id_335bb4e1_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./ViewUsers.vue?vue&type=template&id=335bb4e1&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/Users/ViewUsers.vue?vue&type=template&id=335bb4e1&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewUsers_vue_vue_type_template_id_335bb4e1_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewUsers_vue_vue_type_template_id_335bb4e1_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



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