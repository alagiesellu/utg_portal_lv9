<?php

use App\Http\Controllers\OpenController;
use App\Http\Controllers\Web\MainController;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::namespace('Web')->group(function () {

    Route::get('/auth/redirect', [OpenController::class, 'auth_redirect']);
    Route::post('/auth/callback', [OpenController::class, 'auth_callback']);

    Route::get('/', [MainController::class, 'welcome']);
    Route::get('/password-reset', [MainController::class, 'password']);

    Route::get('/student/{vue_capture?}', [MainController::class, 'private'])->where('vue_capture', '[\/\w\.-]*');
    Route::get('/academic/{vue_capture?}', [MainController::class, 'private'])->where('vue_capture', '[\/\w\.-]*');
    Route::get('/admin/{vue_capture?}', [MainController::class, 'private'])->where('vue_capture', '[\/\w\.-]*');

    Route::get('/{vue_capture?}', [MainController::class, 'public'])->where('vue_capture', '[\/\w\.-]*');

});
