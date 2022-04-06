<?php

namespace App\Http\Controllers\Api\Admin\Academic;

use App\Http\Controllers\Api\Admin\LogController;
use App\Models\Academics\Course;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class CourseController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
        $this->middleware('scope:ad-12')->except(['index','show']);
        $this->middleware('scope:ad-12.1')->only(['index','show']);
    }

    public function index(Request $request)
    {
        $courses = Course::with('department');

        if ($request->query('search'))
            $courses
                ->where('code', 'LIKE', '%'.$request->query('search').'%')
                ->orWhere('name', 'LIKE', '%'.$request->query('search').'%');

        return response()->json([
            'courses' => $courses->orderByDesc('id')->paginate(),
        ]);
    }

    public function show(Request $request, $id)
    {
        return response()->json([
            'course' => Course::with('department')->find($id),
        ]);
    }

    public function store(Request $request)
    {
        $request['code'] = strtoupper($request['code']);
        $validator = Validator::make($request->all(), [
            'code' => 'required|unique:courses,code,NULL,id,deleted_at,NULL|max:7',
            'name' => 'required|unique:courses,name,NULL,id,deleted_at,NULL|max:225',
            'description' => 'required|max:500',
            'credit_hours' => 'required|min:1|max:500',
            'department_id' => 'required|exists:departments,id',
            //*pass 'password' => 'required',
        ]);

        abort_errors_if(
            $validator->fails(),
            $validator->errors()->toArray()
        );

        $user = $request->user();
//*pass
//        abort_errors_if(
//            $user->checkPassword($request['password'])['code'] != 202,
//            [['Invalid password confirmation.']]
//        );

        $course = Course::create($request->toArray());

        LogController::logModel($user->id, 'create', $course);

        return response()->json([
            'success' => $request['name'] . ' successfully created.',
            'courses' => Course::with('department')->orderByDesc('id')->paginate(),
        ]);
    }

    public function edit(Request $request)
    {
        $course = Course::with('department')->find($request['id']);

        $name_val = '';
        if ($course != null && $course->name != $request['name'])
            $name_val = '|unique:courses,name,NULL,id,deleted_at,NULL';

        $code_val = '';
        if ($course != null && $course->code != $request['code'])
            $code_val = '|unique:courses,code,NULL,id,deleted_at,NULL';

        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:courses',
            'code' => 'required|max:225'.$code_val,
            'name' => 'required|max:225'.$name_val,
            'description' => 'required|max:500',
            'credit_hours' => 'required|min:1|max:500',
            'department_id' => 'required|exists:departments,id',
            //*pass 'password' => 'required',
        ]);

        abort_errors_if(
            $validator->fails(),
            $validator->errors()->toArray()
        );

        $user = $request->user();
//*pass
//        abort_errors_if(
//            $user->checkPassword($request['password'])['code'] != 202,
//            [['Invalid password confirmation.']]
//        );

        $course->update([
            'code' => $request['code'],
            'name' => $request['name'],
            'description' => $request['description'],
            'credit_hours' => $request['credit_hours'],
            'department_id' => $request['department_id'],
        ]);

        LogController::logModel($user->id, 'update', $course);

        return response()->json([
            'success' => $request['name'] . ' successfully edited.',
            'courses' => Course::with('department')->orderByDesc('id')->paginate(),
            'course' => $course,
        ]);
    }

    public function destroy(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:courses',
            //*pass 'password' => 'required',
        ]);

        abort_errors_if(
            $validator->fails(),
            $validator->errors()->toArray()
        );

//*pass
//        abort_errors_if(
//            $request->user()->checkPassword($request['password'])['code'] != 202,
//            [['Invalid password confirmation.']]
//        );

        $course = Course::find($request['id']);

        $can_delete = $course->canDelete();

        abort_errors_if(
            count($can_delete),
            $can_delete
        );

        $course_name = $course->name;

        LogController::logModel($request->user()->id, 'delete', $course);

        $course->delete();

        return response()->json([
            'success' => $course_name . ' successfully deleted.',
            'courses' => course::with('department')->orderByDesc('id')->paginate(),
        ]);
    }
}
