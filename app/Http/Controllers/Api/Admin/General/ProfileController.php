<?php

namespace App\Http\Controllers\Api\Admin\General;

use App\Http\Controllers\Api\Admin\LogController;
use App\Models\General\Department;
use App\Models\General\Group;
use App\Models\General\Profile;
use App\Models\Students\Set;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ProfileController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
        $this->middleware('scope:ad-8.1')->only('show','set');
        $this->middleware('scope:ad-14.ad,ad-14.ac,ad-14.s')->except('show','set');
    }

    public function index()
    {
        return response()->json([
            'profiles' => Profile::with('profiles')->orderByDesc('id')->paginate(),
        ]);
    }

    public function show($id)
    {
        return response()->json([
            'profile' => Profile::with(['profiles.set', 'profiles.department', 'profiles.group'])->find($id),
        ]);
    }

    public function set($id)
    {
        return response()->json([
            'profiles' => Profile::with('user')->where('set_id', $id)->orderByDesc('id')->paginate(),
        ]);
    }

    public function store(Request $request)
    {
        $set_val = $group_val = $major_val = $minor_val = $enrolled_at_val = '';
        if ($request['type'] == 's') {
            $request['group_id'] = null;
            $set_val = 'required|exists:sets,id';
            $major_val = 'required';

            if ($request['minor_department_id'])
                $minor_val = 'required';
            $enrolled_at_val = 'required|date';

            $request['set_id'] = Set::find($request['set_id']);

            if (!is_null($request['set_id']))
            {
                $request['major_department_id'] = $request['set_id']->department_id;
                $request['department_id'] = $request['set_id']->school_department_id;

                $request['set_id'] = $request['set_id']->id;
            }
        } else {
            $request['set_id'] = null;
            $group_val = 'required|exists:groups,id';
        }

        $validator = Validator::make($request->all(), [
            'active' => 'required|boolean',
            'type' => 'required|in:ad,ac,s',
            'department_id' => 'required|exists:departments,id',
            'group_id' => $group_val,
            'major_department_id' => $major_val,
            'minor_department_id' => $minor_val,
            'enrolled_at' => $enrolled_at_val,
            'set_id' => $set_val,
            //*pass 'password' => 'required',
        ]);

        abort_errors_if(
            $validator->fails(),
            $validator->errors()->toArray()
        );


        if ($request['type'] === 's')
        {

            $major_deb = Department::find($request['major_department_id']);
            abort_errors_if(
                is_null($major_deb) || !$major_deb->is_major,
                [['Invalid Major selected.']]
            );

            if ($request['minor_department_id'])
            {
                abort_errors_if(
                    $request['major_department_id'] === $request['minor_department_id'],
                    [['Same major selected as minor program.']]
                );

                $minor_deb = Department::find($request['minor_department_id']);
                abort_errors_if(
                    is_null($minor_deb) || !$minor_deb->is_major,
                    [['Invalid Minor selected.']]
                );
            }
        }

        $user = $request->user();

        // if don't have "Admin: CUD Semester" role and creating semester
        abort_forbidden_if(
            $request['type'] === 'ad' && !$user->haveScope('ad-14.ad')
        );

        // if don't have "Admin: CUD Semester" role and creating semester
        abort_forbidden_if(
            $request['type'] === 'ac' && !$user->haveScope('ad-14.ac')
        );

        // if don't have "Admin: CUD Semester" role and creating semester
        abort_forbidden_if(
            $request['type'] === 's' && !$user->haveScope('ad-14.s')
        );

////*pass         abort_errors_if(
//            $user->checkPassword($request['password'])['code'] != 202,
//            [['Invalid password confirmation.']]
//        );

        if ($request['group_id'] != null)
            $roles = Group::find($request['group_id'])->roles;
        else
            $roles = [];

        $profile = Profile::create([
            'active' => $request['active'],
            'type' => $request['type'],
            'department_id' => $request['department_id'],
            'major_department_id' => $request['major_department_id'],
            'minor_department_id' => $request['minor_department_id'],
            'enrolled_at' => $request['enrolled_at'],
            'group_id' => $request['group_id'],
            'set_id' => $request['set_id'],
            'user_id' => $request['user_id'],
            'roles' => $roles,
        ]);

        LogController::logModel($user->id, 'create', $profile);

        return response()->json([
            'success' => 'Successfully added profile.',
            'profiles' => Profile::with(['set', 'department', 'major_department', 'minor_department', 'group'])->where('user_id', $request['user_id'])->get(),
//            'profile' => $profile,
        ]);
    }

    public function edit(Request $request)
    {
        $profile = Profile::with('department', 'user')->find($request['id']);

        $set_val = $group_val = $major_val = $minor_val = $completed_at_val = $enrolled_at_val = '';
        if ($request['type'] == 's') {
            $request['group_id'] = null;
            $set_val = 'required|exists:sets,id';

            $major_val = 'required';

            if ($request['minor_department_id'])
                $minor_val = 'required';

            if ($request['completed_at'])
                $completed_at_val = 'required|date|before:today';
            $enrolled_at_val = 'required|date';

            $request['set_id'] = Set::find($request['set_id']);

            if (!is_null($request['set_id']))
            {
                $request['major_department_id'] = $request['set_id']->department_id;
                $request['department_id'] = $request['set_id']->school_department_id;

                $request['set_id'] = $request['set_id']->id;
            }
        } else {
            $request['set_id'] = null;
            $group_val = 'required|exists:groups,id';
        }

        $validator = Validator::make($request->all(), [
            'active' => 'required|boolean',
            'type' => 'required|in:ad,ac,s',
            'department_id' => 'required|exists:departments,id',
            'group_id' => $group_val,
            'major_department_id' => $major_val,
            'minor_department_id' => $minor_val,
            'completed_at' => $completed_at_val,
            'enrolled_at' => $enrolled_at_val,
            'set_id' => $set_val,
            //*pass 'password' => 'required',
        ]);

        abort_errors_if(
            $validator->fails(),
            $validator->errors()->toArray()
        );

        if ($request['type'] === 's')
        {
            $major_deb = Department::find($request['major_department_id']);
            abort_errors_if(
                is_null($major_deb) || !$major_deb->is_major,
                [['Invalid Major selected.']]
            );

            if ($request['minor_department_id'])
            {
                abort_errors_if(
                    $request['major_department_id'] === $request['minor_department_id'],
                    [['Same major selected as minor program.']]
                );

                $minor_deb = Department::find($request['minor_department_id']);
                abort_errors_if(
                    is_null($minor_deb) || !$minor_deb->is_major,
                    [['Invalid Minor selected.']]
                );
            }
        }

        $user = $request->user();

        // if don't have "Admin: CUD Semester" role and creating semester
        abort_forbidden_if(
            $request['type'] === 'ad' && !$user->haveScope('ad-14.ad')
        );

        // if don't have "Admin: CUD Semester" role and creating semester
        abort_forbidden_if(
            $request['type'] === 'ac' && !$user->haveScope('ad-14.ac')
        );

        // if don't have "Admin: CUD Semester" role and creating semester
        abort_forbidden_if(
            $request['type'] === 's' && !$user->haveScope('ad-14.s')
        );

////*pass         abort_errors_if(
//            $user->checkPassword($request['password'])['code'] != 202,
//            [['Invalid password confirmation.']]
//        );

        if ($request['group_id'] != null)
            $roles = Group::find($request['group_id'])->roles;
        else
            $roles = [];

        $profile->update([
            'active' => $request['active'],
            'type' => $request['type'],
            'department_id' => $request['department_id'],
            'major_department_id' => $request['major_department_id'],
            'minor_department_id' => $request['minor_department_id'],
            'group_id' => $request['group_id'],
            'set_id' => $request['set_id'],
            'completed_at' => $request['completed_at'],
            'enrolled_at' => $request['enrolled_at'],
            'roles' => $roles,
        ]);

        LogController::logModel($user->id, 'update', $profile);

        return response()->json([
            'success' => 'Successfully edited.',
            'profiles' => $profile->user->profiles()->with(['set', 'department', 'major_department', 'minor_department', 'group'])->get(),
//            'profile' => $profile,
        ]);
    }

    public function destroy(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:profiles',
            //*pass 'password' => 'required',
        ]);

        abort_errors_if(
            $validator->fails(),
            $validator->errors()->toArray()
        );

        $user = $request->profile();

////*pass         abort_errors_if(
//            $user->checkPassword($request['password'])['code'] != 202,
//            [['Invalid password confirmation.']]
//        );

        $profile = Profile::find($request['id']);

        $can_delete = $profile->canDelete();

        abort_errors_if(
            count($can_delete),
            $can_delete
        );

        $profile_name = $profile->name;

        LogController::logModel($user->id, 'delete', $profile);

        $profile->delete();

        return response()->json([
            'success' => $profile_name . ' successfully deleted.',
            'profiles' => Profile::with('profile')->orderByDesc('id')->paginate(),
        ]);
    }
}
