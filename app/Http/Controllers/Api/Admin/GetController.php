<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\General\Department;
use App\Models\General\Group;
use App\Models\Students\Set;
use App\Models\Academics\ClassRegistration;
use App\Models\Academics\Term;
use App\Models\General\Option;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;

class GetController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function options_roles()
    {
        return response()->json([
            'options' => Option::get(),
            'roles' => config('roles'),
        ]);
    }

    public function user_profile(Request $request, $id)
    {
        return response()->json([
            'user' => User::find($id),
        ]);
    }

    public function major_courses($term_id)
    {
        $term = Term::with('term.term_classes.course')->find($term_id);
        $term_classes = [];
        if ($term->term && !is_null($term->term->external_exam_percentage))
            $term_classes = $term->term->term_classes;

        return response()->json([
            'term_classes' => $term_classes,
        ]);
    }

    public function current_courses($term_id)
    {
        $term = Term::with('term_classes.course')->find($term_id);
        $term_classes = [];
        if ($term && !is_null($term->external_exam_percentage))
            $term_classes = $term->term_classes;

        return response()->json([
            'term_classes' => $term_classes,
        ]);
    }

    public function active_terms()
    {
        $now = now();
        return response()->json([
            'terms' => Term::whereDate('starting_at', '<=', $now)->whereDate('ending_at', '>=', $now)->orderByDesc('id')->paginate(),
        ]);
    }

    public function can_reg_terms() {
        return response()->json([
            'terms' => Term::whereDate('registration_deadline', '>=', now())->get(),
        ]);
    }

    public function departments_type($is_admin)
    {
        return response()->json([
            'departments' => Department::where('is_admin', $is_admin)->get(),
        ]);
    }

    public function departments_is_major($is_major)
    {
        return response()->json([
            'departments' => Department::where('is_major', $is_major)->get(),
        ]);
    }

    public function departments(Request $request)
    {
        return response()->json([
            'departments' => Department::where($request->input())->get(),
        ]);
    }

    public function department_majors($department_id)
    {
        $departments = [];
        $list = Department::where('department_id', $department_id)->get()->toArray();

        while (count($list)) {

            $dep = array_pop($list);

            if ($dep['is_major'])
                array_push($departments, $dep);

            $list = array_merge($list, Department::where('department_id', $dep['id'])->get()->toArray());
        }

        return response()->json([
            'majors' => $departments,
            'all_majors' => Department::where('is_major', 1)->get(),
        ]);
    }

    public function sets_department($department_id)
    {
        return response()->json([
            'sets' => Set::where('department_id', $department_id)->get(),
        ]);
    }

    public function groups_department($department_id)
    {
        $department = Department::find($department_id);
        $groups = [];

        // if admin department, get only groups under it
        if ($department->is_admin)
            $groups = Group::where('department_id', $department_id)->get();

        // else if not admin, get all groups under academics departments
        else {
            foreach (Department::with('groups')->where('is_admin', 0)->get() as $department) {
                $groups = array_merge($groups, $department->groups->toArray());
            }
        }

        return response()->json([
            'groups' => $groups,
        ]);
    }

    public function auth_host()
    {
        return response()->json([
            'host' => config('app.auth.host')
        ]);
    }
}
