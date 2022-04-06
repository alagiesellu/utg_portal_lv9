<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login', [\App\Http\Controllers\Api\OpenController::class, 'login']);

/**      ^
 *      Open
 *       -
 *      Auth
 *       v
 */

Route::get('/user', [\App\Http\Controllers\Api\AuthController::class, 'user']);
Route::post('/logout', [\App\Http\Controllers\Api\AuthController::class, 'logout']);
Route::get('/logged-in', [\App\Http\Controllers\Api\AuthController::class, 'loggedIn']);

Route::get('/user/profile', [\App\Http\Controllers\Api\ProfileController::class, 'profile']);
Route::post('/user/switch', [\App\Http\Controllers\Api\ProfileController::class, 'switch']);

Route::prefix('admin')->group(function () {
    Route::post('/logs', [\App\Http\Controllers\Api\Admin\LogController::class, 'index']);
    Route::get('/logs/models', [\App\Http\Controllers\Api\Admin\LogController::class, 'models']);
    Route::get('/logs/infos/{model}', [\App\Http\Controllers\Api\Admin\LogController::class, 'infos']);
    Route::get('/logs/{id}', [\App\Http\Controllers\Api\Admin\LogController::class, 'get']);
    Route::post('/logs/filter', [\App\Http\Controllers\Api\Admin\LogController::class, 'filter']);
    Route::post('/logs/find-models', [\App\Http\Controllers\Api\Admin\LogController::class, 'find_models']);

    Route::post('/users', [\App\Http\Controllers\Api\Admin\General\UserController::class, 'index']);
    Route::post('/users/store', [\App\Http\Controllers\Api\Admin\General\UserController::class, 'store']);
    Route::post('/users/edit', [\App\Http\Controllers\Api\Admin\General\UserController::class, 'edit']);
    Route::post('/users/upload', [\App\Http\Controllers\Api\Admin\General\UserController::class, 'upload']);
    Route::post('/users/destroy', [\App\Http\Controllers\Api\Admin\General\UserController::class, 'destroy']);
    Route::get('/users/{id}', [\App\Http\Controllers\Api\Admin\General\UserController::class, 'show']);
    Route::get('/users/profile/{id}', [\App\Http\Controllers\Api\Admin\General\UserController::class, 'profile']);
    Route::post('/users/reset/password', [\App\Http\Controllers\Api\Admin\General\UserController::class, 'reset_password']);

    Route::post('/grades/external/store', [\App\Http\Controllers\Api\Admin\Academic\GradeController::class, 'external']);

    Route::get('/grades/approvals/terms', [\App\Http\Controllers\Api\Admin\Academic\GradeApprovalController::class, 'terms']);
    Route::get('/grades/approvals/classes/{term}', [\App\Http\Controllers\Api\Admin\Academic\GradeApprovalController::class, 'classes']);
    Route::get('/grades/approvals/grades/{class}', [\App\Http\Controllers\Api\Admin\Academic\GradeApprovalController::class, 'grades']);
    Route::post('/grades/approvals/store', [\App\Http\Controllers\Api\Admin\Academic\GradeApprovalController::class, 'store']);

    Route::get('/grades/get={id}', [\App\Http\Controllers\Api\Admin\Academic\GradeController::class, 'get']);
    Route::post('/grades/search', [\App\Http\Controllers\Api\Admin\Academic\GradeController::class, 'search']);
    Route::post('/grades/update', [\App\Http\Controllers\Api\Admin\Academic\GradeController::class, 'update']);
    Route::post('/grades/resit', [\App\Http\Controllers\Api\Admin\Academic\GradeController::class, 'resit']);
    Route::get('/grades/{id}', [\App\Http\Controllers\Api\Admin\Academic\GradeController::class, 'show']);

    Route::get('/transcripts/{id}', [\App\Http\Controllers\Api\Admin\Academic\TranscriptController::class, 'show']);
    Route::post('/transcripts/search', [\App\Http\Controllers\Api\Admin\Academic\TranscriptController::class, 'search']);

    Route::get('/finance/{id}', [\App\Http\Controllers\Api\Admin\Finance\FinanceController::class, 'show']);
    Route::post('/finance/search', [\App\Http\Controllers\Api\Admin\Finance\FinanceController::class, 'search']);
    Route::post('/finance/clearance', [\App\Http\Controllers\Api\Admin\Finance\FinanceController::class, 'clearance']);
    Route::post('/finance/payment', [\App\Http\Controllers\Api\Admin\Finance\FinanceController::class, 'payment']);
    Route::get('/finance/get/payment/{id}', [\App\Http\Controllers\Api\Admin\Finance\FinanceController::class, 'get_payment']);
    Route::get('/finance/get/receipt/{id}', [\App\Http\Controllers\Api\Admin\Finance\FinanceController::class, 'get_receipt']);
    Route::post('/finance/cancel/payment', [\App\Http\Controllers\Api\Admin\Finance\FinanceController::class, 'cancel_payment']);
    Route::post('/finance/cancel/receipt', [\App\Http\Controllers\Api\Admin\Finance\FinanceController::class, 'cancel_receipt']);

    Route::get('/profiles', [\App\Http\Controllers\Api\Admin\General\ProfileController::class, 'index']);
    Route::get('/profiles/set={id}', [\App\Http\Controllers\Api\Admin\General\ProfileController::class, 'set']);
    Route::get('/profiles/{id}', [\App\Http\Controllers\Api\Admin\General\ProfileController::class, 'show']);
    Route::post('/profiles/store', [\App\Http\Controllers\Api\Admin\General\ProfileController::class, 'store']);
    Route::post('/profiles/edit', [\App\Http\Controllers\Api\Admin\General\ProfileController::class, 'edit']);
    Route::post('/profiles/destroy', [\App\Http\Controllers\Api\Admin\General\ProfileController::class, 'destroy']);

    Route::get('/grading-systems', [\App\Http\Controllers\Api\Admin\Academic\GSController::class, 'index']);
    Route::get('/grading-systems/{id}', [\App\Http\Controllers\Api\Admin\Academic\GSController::class, 'show']);
    Route::post('/grading-systems/store', [\App\Http\Controllers\Api\Admin\Academic\GSController::class, 'store']);
    Route::post('/grading-systems/update', [\App\Http\Controllers\Api\Admin\Academic\GSController::class, 'update']);
    Route::post('/grading-systems/delete', [\App\Http\Controllers\Api\Admin\Academic\GSController::class, 'delete']);

    Route::get('/courses', [\App\Http\Controllers\Api\Admin\Academic\CourseController::class, 'index']);
    Route::get('/courses/{id}', [\App\Http\Controllers\Api\Admin\Academic\CourseController::class, 'show']);
    Route::post('/courses/store', [\App\Http\Controllers\Api\Admin\Academic\CourseController::class, 'store']);
    Route::post('/courses/edit', [\App\Http\Controllers\Api\Admin\Academic\CourseController::class, 'edit']);
    Route::post('/courses/destroy', [\App\Http\Controllers\Api\Admin\Academic\CourseController::class, 'destroy']);

    Route::get('/groups', [\App\Http\Controllers\Api\Admin\General\GroupController::class, 'index']);
    Route::get('/groups/{id}', [\App\Http\Controllers\Api\Admin\General\GroupController::class, 'show']);
    Route::post('/groups/store', [\App\Http\Controllers\Api\Admin\General\GroupController::class, 'store']);
    Route::post('/groups/store-roles', [\App\Http\Controllers\Api\Admin\General\GroupController::class, 'storeRoles']);
    Route::post('/groups/edit', [\App\Http\Controllers\Api\Admin\General\GroupController::class, 'edit']);
    Route::post('/groups/destroy', [\App\Http\Controllers\Api\Admin\General\GroupController::class, 'destroy']);

    Route::get('/venues', [\App\Http\Controllers\Api\Admin\General\VenueController::class, 'index']);
    Route::get('/venues/{id}', [\App\Http\Controllers\Api\Admin\General\VenueController::class, 'show']);
    Route::post('/venues/store', [\App\Http\Controllers\Api\Admin\General\VenueController::class, 'store']);
    Route::post('/venues/edit', [\App\Http\Controllers\Api\Admin\General\VenueController::class, 'edit']);
    Route::post('/venues/destroy', [\App\Http\Controllers\Api\Admin\General\VenueController::class, 'destroy']);

    Route::get('/sets', [\App\Http\Controllers\Api\Admin\Student\SetController::class, 'index']);
    Route::get('/sets/{id}', [\App\Http\Controllers\Api\Admin\Student\SetController::class, 'show']);
    Route::post('/sets/store', [\App\Http\Controllers\Api\Admin\Student\SetController::class, 'store']);
    Route::post('/sets/edit', [\App\Http\Controllers\Api\Admin\Student\SetController::class, 'edit']);
    Route::post('/sets/destroy', [\App\Http\Controllers\Api\Admin\Student\SetController::class, 'destroy']);

    Route::get('/classes/term={term}', [\App\Http\Controllers\Api\Admin\Academic\TermClassController::class, 'index']);
    Route::get('/classes/show={id}', [\App\Http\Controllers\Api\Admin\Academic\TermClassController::class, 'show']);
    Route::get('/classes/registrations={id}', [\App\Http\Controllers\Api\Admin\Academic\TermClassController::class, 'registrations']);
    Route::get('/classes/student={id}/{class}', [\App\Http\Controllers\Api\Admin\Academic\TermClassController::class, 'student']);
    Route::get('/classes/registrations={id}/all', [\App\Http\Controllers\Api\Admin\Academic\TermClassController::class, 'registrationsAll']);
    Route::post('/classes/store', [\App\Http\Controllers\Api\Admin\Academic\TermClassController::class, 'store']);
    Route::post('/classes/edit', [\App\Http\Controllers\Api\Admin\Academic\TermClassController::class, 'edit']);
    Route::post('/classes/add-lecturer', [\App\Http\Controllers\Api\Admin\Academic\TermClassController::class, 'addLecturer']);
    Route::post('/classes/edit', [\App\Http\Controllers\Api\Admin\Academic\TermClassController::class, 'edit']);
    Route::post('/classes/destroy', [\App\Http\Controllers\Api\Admin\Academic\TermClassController::class, 'destroy']);
    Route::post('/classes/reset/assessment', [\App\Http\Controllers\Api\Admin\Academic\TermClassController::class, 'resetAssessment']);

    Route::post('/classes/register-all-students', [\App\Http\Controllers\Api\Admin\Academic\TermClassController::class, 'registerSet']);


    Route::get('/terms', [\App\Http\Controllers\Api\Admin\Academic\TermController::class, 'index']);
    Route::get('/terms/{id}', [\App\Http\Controllers\Api\Admin\Academic\TermController::class, 'show']);
    Route::post('/terms/external-grades', [\App\Http\Controllers\Api\Admin\Academic\TermController::class, 'external_grades']);
    Route::post('/terms/store', [\App\Http\Controllers\Api\Admin\Academic\TermController::class, 'store']);
    Route::post('/terms/store-rotation', [\App\Http\Controllers\Api\Admin\Academic\TermController::class, 'storeRotation']);
    Route::post('/terms/edit-rotation', [\App\Http\Controllers\Api\Admin\Academic\TermController::class, 'editRotation']);
    Route::post('/terms/edit', [\App\Http\Controllers\Api\Admin\Academic\TermController::class, 'edit']);
    Route::post('/terms/destroy', [\App\Http\Controllers\Api\Admin\Academic\TermController::class, 'destroy']);
    Route::get('/terms/add/{type}/{id}', [\App\Http\Controllers\Api\Admin\Academic\TermController::class, 'getAddList']);
    Route::post('/terms/add', [\App\Http\Controllers\Api\Admin\Academic\TermController::class, 'storeAdd']);

    Route::get('/departments', [\App\Http\Controllers\Api\Admin\General\DepartmentController::class, 'index']);
    Route::get('/departments/type/{is_admin}', [\App\Http\Controllers\Api\Admin\General\DepartmentController::class, 'get_type']);
    Route::get('/departments/{id}', [\App\Http\Controllers\Api\Admin\General\DepartmentController::class, 'show']);
    Route::post('/departments/store', [\App\Http\Controllers\Api\Admin\General\DepartmentController::class, 'store']);
    Route::post('/departments/edit', [\App\Http\Controllers\Api\Admin\General\DepartmentController::class, 'edit']);
    Route::post('/departments/destroy', [\App\Http\Controllers\Api\Admin\General\DepartmentController::class, 'destroy']);

    Route::get('/options/get/db', [\App\Http\Controllers\Api\Admin\General\OptionsController::class, 'db']);
    Route::get('/options/get/info', [\App\Http\Controllers\Api\Admin\General\OptionsController::class, 'info']);
    Route::post('/options/update', [\App\Http\Controllers\Api\Admin\General\OptionsController::class, 'update']);

    Route::prefix('get')->group(function () {
        Route::get('departments', [\App\Http\Controllers\Api\Admin\GetController::class, 'departments']);
        Route::get('majors/department={department_id}', [\App\Http\Controllers\Api\Admin\GetController::class, 'department_majors']);
        Route::get('sets/department={department_id}', [\App\Http\Controllers\Api\Admin\GetController::class, 'sets_department']);
        Route::get('major_courses/term={term_id}', [\App\Http\Controllers\Api\Admin\GetController::class, 'major_courses']);
        Route::get('current_courses/term={term_id}', [\App\Http\Controllers\Api\Admin\GetController::class, 'current_courses']);
        Route::get('groups/department={department_id}', [\App\Http\Controllers\Api\Admin\GetController::class, 'groups_department']);
        Route::get('active-terms', [\App\Http\Controllers\Api\Admin\GetController::class, 'active_terms']);
        Route::get('user-profile/{id}', [\App\Http\Controllers\Api\Admin\GetController::class, 'user_profile']);
        Route::get('options-roles', [\App\Http\Controllers\Api\Admin\GetController::class, 'options_roles']);
        Route::get('can-register-terms', [\App\Http\Controllers\Api\Admin\GetController::class, 'can_reg_terms']);
    });

    Route::prefix('search')->group(function () {
        Route::post('courses', [\App\Http\Controllers\Api\Admin\SearchController::class, 'courses']);
        Route::post('venues', [\App\Http\Controllers\Api\Admin\SearchController::class, 'venues']);
        Route::post('lecturers', [\App\Http\Controllers\Api\Admin\SearchController::class, 'lecturers']);
        Route::post('users', [\App\Http\Controllers\Api\Admin\SearchController::class, 'users']);
    });

    Route::prefix('current')->group(function () {
        Route::get('department', [\App\Http\Controllers\Api\Admin\CurrentController::class, 'department']);
        Route::get('grading-systems', [\App\Http\Controllers\Api\Admin\CurrentController::class, 'grading_systems']);
    });
});

Route::prefix('students')->group(function () {

    Route::post('register', [\App\Http\Controllers\Api\Student\ClassesController::class, 'register']);
    Route::post('unregister', [\App\Http\Controllers\Api\Student\ClassesController::class, 'unregister']);

    Route::get('classes/{id}/grades', [\App\Http\Controllers\Api\Student\ClassesController::class, 'grades']);
    Route::get('classes/{id}/files', [\App\Http\Controllers\Api\Student\ClassesController::class, 'files']);
    Route::get('classes/{id}', [\App\Http\Controllers\Api\Student\ClassesController::class, 'show']);
    Route::get('classes', [\App\Http\Controllers\Api\Student\ClassesController::class, 'index']);

    Route::get('mails/{id}', [\App\Http\Controllers\Api\Student\MailsController::class, 'show']);
    Route::post('mails/{id}/post', [\App\Http\Controllers\Api\Student\MailsController::class, 'store']);
    Route::post('mails/{id}/delete', [\App\Http\Controllers\Api\Student\MailsController::class, 'delete']);

    Route::get('timetables/{term}', [\App\Http\Controllers\Api\Student\TimetableController::class, 'index']);
    Route::get('timetables/term/{term}', [\App\Http\Controllers\Api\Student\TimetableController::class, 'term']);

    Route::get('terms', [\App\Http\Controllers\Api\Student\TermController::class, 'index']);
    Route::get('terms/{id}', [\App\Http\Controllers\Api\Student\TermController::class, 'show']);

    Route::get('finance', [\App\Http\Controllers\Api\Student\FinanceController::class, 'index']);
    Route::get('/finance/get/payment/{id}', [\App\Http\Controllers\Api\Student\FinanceController::class, 'get_payment']);
    Route::get('/finance/get/receipt/{id}', [\App\Http\Controllers\Api\Student\FinanceController::class, 'get_receipt']);

    Route::prefix('current')->group(function () {
        Route::get('calendar', [\App\Http\Controllers\Api\Student\CurrentController::class, 'calendar']);
    });

    Route::prefix('get')->group(function () {
        Route::post('transcript', [\App\Http\Controllers\Api\Student\GetController::class, 'transcript']);
        Route::get('active-terms', [\App\Http\Controllers\Api\Student\GetController::class, 'active_terms']);
        Route::get('current-classes', [\App\Http\Controllers\Api\Student\GetController::class, 'current_classes']);
    });
});

Route::prefix('academic')->group(function () {

    Route::post('grades/store', [\App\Http\Controllers\Api\Academic\GradesController::class, 'store']);
    Route::post('grades/upload', [\App\Http\Controllers\Api\Academic\GradesController::class, 'upload']);
    Route::get('grades/{id}/assignment', [\App\Http\Controllers\Api\Academic\GradesController::class, 'get']);

    Route::get('/classes', [\App\Http\Controllers\Api\Academic\ClassesController::class, 'index']);
    Route::get('/classes/registrations/get/{id}', [\App\Http\Controllers\Api\Academic\ClassesController::class, 'registrationGet']);
    Route::post('/classes/uploads/{id}', [\App\Http\Controllers\Api\Academic\ClassesController::class, 'uploads']);
    Route::post('/classes/files/{id}/delete', [\App\Http\Controllers\Api\Academic\ClassesController::class, 'delete_file']);
    Route::get('/classes/{id}/registrations/all', [\App\Http\Controllers\Api\Academic\ClassesController::class, 'registrationsAll']);
    Route::get('/classes/{id}/registrations', [\App\Http\Controllers\Api\Academic\ClassesController::class, 'registrations']);
    Route::get('/classes/{id}/assessments', [\App\Http\Controllers\Api\Academic\ClassesController::class, 'assessments']);
    Route::get('/classes/{id}/files', [\App\Http\Controllers\Api\Academic\ClassesController::class, 'files']);
    Route::get('/classes/{id}/mails', [\App\Http\Controllers\Api\Academic\ClassesController::class, 'mails']);
    Route::post('/classes/{id}/mails/post', [\App\Http\Controllers\Api\Academic\ClassesController::class, 'post_mail']);
    Route::post('/classes/{mail_id}/mails/delete', [\App\Http\Controllers\Api\Academic\ClassesController::class, 'delete_mail']);
    Route::get('/classes/{id}', [\App\Http\Controllers\Api\Academic\ClassesController::class, 'show']);
    Route::post('/classes/{id}/approve-registrations', [\App\Http\Controllers\Api\Academic\ClassesController::class, 'approve_registrations']);

    Route::post('assessments/store', [\App\Http\Controllers\Api\Academic\AssessmentsController::class, 'store']);
    Route::post('assessments/update', [\App\Http\Controllers\Api\Academic\AssessmentsController::class, 'update']);
    Route::post('assessments/delete', [\App\Http\Controllers\Api\Academic\AssessmentsController::class, 'delete']);
    Route::get('assessments/{id}', [\App\Http\Controllers\Api\Academic\AssessmentsController::class, 'show']);

    Route::get('/students', [\App\Http\Controllers\Api\Academic\StudentsController::class, 'index']);
    Route::get('/students/{id}', [\App\Http\Controllers\Api\Academic\StudentsController::class, 'show']);
    Route::post('/students/search', [\App\Http\Controllers\Api\Academic\StudentsController::class, 'search']);

    Route::prefix('get')->group(function () {
        Route::get('current-classes', [\App\Http\Controllers\Api\Academic\GetController::class, 'current_classes']);
    });
});
