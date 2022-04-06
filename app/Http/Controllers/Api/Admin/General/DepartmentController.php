<?php

namespace App\Http\Controllers\Api\Admin\General;

use App\Http\Controllers\Api\Admin\LogController;
use App\Models\General\Department;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class DepartmentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
        $this->middleware('scope:ad-11')->except(['index','show']);
        $this->middleware('scopes:ad-11,ad-11.1')->only(['index','show']);
    }

    public function index(Request $request)
    {
        $department = Department::with('departments')->find($request->user()->profile->department_id);

        return response()->json([
            'department' => $department,
        ]);
    }

    public function show(Request $request, $id)
    {
        $department = Department::with('departments')->find($id);

        return response()->json([
            'department' => $department,
        ]);
    }

    public function store(Request $request)
    {
        $request['local'] = $request['foreign'] = null;
        $fee_per_term_val = '';
        if ($request['is_major']) {
            $request['local'] = $request['fee_per_term']['local'];
            $request['foreign'] = $request['fee_per_term']['foreign'];
            $fee_per_term_val = 'required|numeric|min:0';
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:departments,name,NULL,id,deleted_at,NULL|max:225',
            'description' => 'required|string|max:500',
            'email' => 'required|email|ends_with:@utg.edu.gm',
            'tel' => 'required|numeric',//regex:/220[0-9]{7}/',
            'is_admin' => 'required|boolean',
            'is_major' => 'required|boolean',
            'has_rotation' => 'required|boolean',
            'local' => $fee_per_term_val,
            'foreign' => $fee_per_term_val,
            'department_id' => 'required|exists:departments,id',
            //*pass 'password' => 'required',
        ]);

        abort_errors_if(
            $validator->fails(),
            $validator->errors()->toArray()
        );

        $user = $request->user();

////*pass         abort_errors_if(
//            $user->checkPassword($request['password'])['code'] != 202,
//            [['Invalid password confirmation.']]
//        );

        $department = Department::with('departments')->create([
            'name' => $request['name'],
            'description' => $request['description'],
            'email' => $request['email'],
            'tel' => $request['tel'],
            'is_admin' => $request['is_admin'],
            'is_major' => $request['is_major'],
            'has_rotation' => $request['has_rotation'],
            'fee_per_term' => $request['fee_per_term'],
            'department_id' => $request['department_id'],
        ]);

        LogController::logModel($user->id, 'create', $department);

        return response()->json([
            'department' => $department,
            'success' => $department->name.' department successfully created.',
        ]);
    }

    public function edit(Request $request)
    {
        $request['department'] = Department::with('departments')->find($request['id']);

        $name_val = '';
        if ($request['department'] != null && $request['department']->name != $request['name'])
            $name_val = '|unique:departments,name,NULL,id,deleted_at,NULL';

        $request['local'] = $request['foreign'] = null;
        $fee_per_term_val = '';
        if ($request['is_major']) {
            $request['local'] = $request['fee_per_term']['local'];
            $request['foreign'] = $request['fee_per_term']['foreign'];
            $fee_per_term_val = 'required|numeric|min:0';
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|max:225'.$name_val,
            'description' => 'required|string|max:500',
            'email' => 'required|email|ends_with:@utg.edu.gm',
            'tel' => 'required|numeric',//regex:/220[0-9]{7}/',
            'is_admin' => 'required|boolean',
            'is_major' => 'required|boolean',
            'has_rotation' => 'required|boolean',
            'local' => $fee_per_term_val,
            'foreign' => $fee_per_term_val,
            'password' => 'required',
        ]);

        abort_errors_if(
            $validator->fails(),
            $validator->errors()->toArray()
        );

        $user = $request->user();

        abort_errors_if(
            $user->checkPassword($request['password'])['code'] != 202,
            [['Invalid password confirmation.']]
        );

        $request['department']->update([
                'name' => $request['name'],
                'description' => $request['description'],
                'email' => $request['email'],
                'tel' => $request['tel'],
                'is_admin' => $request['is_admin'],
                'is_major' => $request['is_major'],
                'has_rotation' => $request['has_rotation'],
                'fee_per_term' => $request['fee_per_term'],
            ]);

        LogController::logModel($user->id, 'update', $request['department']);

        return response()->json([
            'department' => $request['department'],
            'success' => $request['department']->name.' department successfully edited.',
        ]);
    }

    public function destroy(Request $request)
    {

        $request['department'] = Department::with(['departments', 'department'])->find($request['id']);
        $validator = Validator::make($request->all(), [
            'department' => 'required',
            'password' => 'required',
        ]);

        abort_errors_if(
            $validator->fails(),
            $validator->errors()->toArray()
        );

        $user = $request->user();

        abort_errors_if(
            $user->checkPassword($request['password'])['code'] != 202,
            [['Invalid password confirmation.']]
        );

        $can_delete = $request['department']->canDelete();

        abort_errors_if(
            count($can_delete),
            $can_delete
        );

        $department_parent = $request['department']->department_id;

        $deleted = $request['department']->name;

        LogController::logModel($user->id, 'delete', $request['department']);

        $request['department']->delete();

        $department_parent = Department::with('departments')->find($department_parent);

        return response()->json([
            'department' => $department_parent,
            'success' => $deleted.' department successfully deleted.',
        ]);
    }
}
