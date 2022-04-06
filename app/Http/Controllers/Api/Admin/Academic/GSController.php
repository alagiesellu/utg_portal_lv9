<?php

namespace App\Http\Controllers\Api\Admin\Academic;

use App\Http\Controllers\Api\Admin\LogController;
use App\Models\Academics\GradingSystem;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class GSController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
        $this->middleware('scope:ad-9.1')->only(['index','show']);
        $this->middleware('scope:ad-9')->except(['index','show']);
    }

    public function index(Request $request)
    {
        return response()->json([
            'grading_systems' => GradingSystem::paginate(),
        ]);
    }

    public function show($id)
    {
        return response()->json([
            'grading_system' => GradingSystem::find($id),
        ]);
    }

    public function store(Request $request)
    {
        $validation_errors = $this->validator($request, 'c');

        abort_errors_if(
            $validation_errors !== null,
            $validation_errors
        );

        $gs = GradingSystem::create([
            'name' => $request['name'],
            'active' => $request['active'],
            'grades' => $request['grades'],
        ]);

        LogController::logModel($request->user()->id, 'create', $gs);

        return response()->json([
            'success' => $request['name'] . ' grading system successfully created.',
            'grading_system' => $gs,
        ]);
    }

    public function update(Request $request)
    {
        $gs = GradingSystem::find($request['id']);

        $validation_errors = $this->validator($request, 'u', $gs);

        abort_errors_if(
            $validation_errors !== null,
            $validation_errors
        );

        $gs->update([
            'name' => $request['name'],
            'active' => $request['active'],
            'grades' => $request['grades'],
        ]);

        LogController::logModel($request->user()->id, 'update', $gs);

        return response()->json([
            'success' => $request['name'] . ' grading system successfully updated.',
            'grading_system' => $gs,
        ]);
    }

    public function delete(Request $request)
    {
        $validation_errors = $this->validator($request, 'd');

        abort_errors_if(
            $validation_errors !== null,
            $validation_errors
        );

        $gs = GradingSystem::find($request['id']);

        LogController::logModel($request->user()->id, 'delete', $gs);

        $gs->delete();

        return response()->json([
            'success' => 'Grading system successfully deleted.',
        ]);
    }

    public function validator(Request $request, $ops, $obj = null)
    {
        $errors = [
            'grade' => [],
            'point' => [],
            'from' => [],
            'to' => [],
        ];

        if ($request['grades'])
        foreach ($request['grades'] as $grade)
        {
            if ($grade['grade'] === null)
                array_push($errors['grade'], $grade['grade'].' = Invalid grade provided.');
            if ($grade['point'] === null || !is_numeric($grade['point']))
                array_push($errors['point'], $grade['point'].' = Invalid point provided.');
            if ($grade['from'] === null || !is_numeric($grade['from']))
                array_push($errors['from'], $grade['from'].' = Invalid from grade provided.');
            if ($grade['to'] === null || !is_numeric($grade['to']))
                array_push($errors['to'], $grade['to'].' = Invalid to grade provided.');
        }

        if (count($errors['grade']) || count($errors['point']) || count($errors['from']) || count($errors['to']))
            return $errors;

        $id_val = '';
        $name_val = '';
        $active_val = '';
        $grades_val = '';
        if ($ops == 'c')
        {
            $name_val .= 'required|max:225|unique:grading_systems,name,NULL,id,deleted_at,NULL';
            $active_val .= 'required|boolean';
            $grades_val .= 'required|array';
        }
        if ($ops == 'u')
        {
            $id_val .= 'required|exists:grading_systems,id';
            $active_val .= 'required|boolean';
            $name_val .= 'required|max:225';
            $grades_val .= 'required|array';

            if ($obj != null && $obj->name !== $request['name'])
                $name_val .= '|unique:grading_systems,name,NULL,id,deleted_at,NULL';
        }
        if ($ops == 'd')
        {
            $id_val .= 'required|exists:grading_systems,id';
        }

        $validator = Validator::make($request->all(), [
            'id' => $id_val,
            'name' => $name_val,
            'active' => $active_val,
            'grades' => $grades_val,
            //*pass 'password' => 'required',
        ]);

        if ($validator->fails())
            return $validator->errors()->toArray();

        //*pass $user = $request->user();
        //*pass
//        if ($user->checkPassword($request['password'])['code'] != 202)
//            return [
//                'password' => ['Invalid password confirmation.']
//            ];

        return null;
    }
}
