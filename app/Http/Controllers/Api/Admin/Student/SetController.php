<?php

namespace App\Http\Controllers\Api\Admin\Student;

use App\Http\Controllers\Api\Admin\LogController;
use App\Models\Students\Set;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class SetController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
        $this->middleware('scope:ad-8.1')->only('index','show');
        $this->middleware('scope:ad-8')->except('index','show');
    }

    public function index(Request $request)
    {
        $set = Set::with('department');

        if ($request->query('search'))
            $set->where('name', 'LIKE', '%'.$request->query('search').'%');

        return response()->json([
            'sets' => $set->orderByDesc('id')->paginate(),
        ]);
    }

    public function show(Request $request, $id)
    {
        return response()->json([
            'set' => Set::with([
                'department', 'school_department', 'grading_system',
            ])->find($id),
        ]);
    }

    public function store(Request $request)
    {
        $request['code'] = strtoupper($request['code']);
        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:sets,name,NULL,id,deleted_at,NULL|max:225',
            'degree' => 'required|string|max:225',
            'start_date' => 'required|date',
            'expected_years' => 'required|numeric|min:0|max:10',
            'department_id' => 'required|exists:departments,id',
            'school_department_id' => 'required|exists:departments,id',
            'grading_system_id' => 'required|exists:grading_systems,id',
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

        $set = Set::create($request->toArray());

        LogController::logModel($user->id, 'create', $set);

        return response()->json([
            'success' => $request['name'] . ' successfully created.',
            'sets' => Set::with('department')->orderByDesc('id')->paginate(),
        ]);
    }

    public function edit(Request $request)
    {
        $set = Set::with([
            'department', 'grading_system',
        ])->find($request['id']);

        $name_val = '';
        if ($set != null && $set->name != $request['name'])
            $name_val = '|unique:sets,name,NULL,id,deleted_at,NULL';

        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:sets',
            'name' => 'required|max:225'.$name_val,
            'degree' => 'required|string|max:225',
            'start_date' => 'required|date',
            'expected_years' => 'required|numeric|min:0|max:10',
            'department_id' => 'required|exists:departments,id',
            'school_department_id' => 'required|exists:departments,id',
            'grading_system_id' => 'required|exists:grading_systems,id',
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

        $set->update([
            'name' => $request['name'],
            'degree' => $request['degree'],
            'start_date' => $request['start_date'],
            'expected_years' => $request['expected_years'],
            'department_id' => $request['department_id'],
            'school_department_id' => $request['school_department_id'],
            'grading_system_id' => $request['grading_system_id'],
        ]);

        LogController::logModel($user->id, 'update', $set);

        return response()->json([
            'success' => $request['name'] . ' successfully edited.',
            'sets' => Set::with('department')->orderByDesc('id')->paginate(),
            'set' => $set,
        ]);
    }

    public function destroy(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:sets',
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

        $set = Set::find($request['id']);

        $can_delete = $set->canDelete();

        abort_errors_if(
            count($can_delete),
            $can_delete
        );

        $set_name = $set->name;

        LogController::logModel($user->id, 'delete', $set);

        $set->delete();

        return response()->json([
            'success' => $set_name . ' successfully deleted.',
            'sets' => Set::with('department')->orderByDesc('id')->paginate(),
        ]);
    }
}
