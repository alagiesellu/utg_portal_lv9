<?php

namespace App\Http\Controllers\Api\Admin\General;

use App\Http\Controllers\Api\Admin\LogController;
use App\Models\General\Department;
use App\Models\General\Group;
use App\Models\General\Profile;
use App\Models\Academics\Grade;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class GroupController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
        $this->middleware('scope:ad-7')->except(['index','show']);
        $this->middleware('scopes:ad-7,ad-7.1')->only(['index','show']);
    }

    public function index(Request $request)
    {
        $group = Group::with('department');

        if ($request->query('search'))
            $group->where('name', 'LIKE', '%'.$request->query('search').'%');

        return response()->json([
            'groups' => $group->orderByDesc('id')->paginate(),
        ]);
    }

    public function show(Request $request, $id)
    {
        return response()->json([
            'group' => Group::with('department')->find($id),
        ]);
    }

    public function storeRoles(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'group' => 'required',
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

        $_roles = [];
        $config_roles = config('roles');
        foreach ($request['roles'] as $role) {
            if ($config_roles[$role])
                array_push($_roles, $role);
        }

        DB::beginTransaction();
        try {

            DB::table((new Group())->getTable())
                ->where('id', $request['group'])
                ->update([
                    'roles' => json_encode($_roles),
                ]);

            DB::table((new Profile())->getTable())
                ->where('group_id', $request['group'])
                ->update([
                    'roles' => json_encode($_roles),
                ]);

            DB::commit();
        } catch (\Exception $exception) {
            DB::rollBack();
            Log::error($exception);
            abort_errors([['Operations fail. Try again!']]);
        }

        LogController::logModelArray($user->id, 'update', [
            [
                'id' => $request['group'],
                'roles' => json_encode($_roles),
            ]
        ], new Grade());

        return response()->json([
            'success' => 'Roles successfully updated.',
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:groups,name,NULL,id,deleted_at,NULL|max:225',
            'description' => 'required|max:500',
            'department_id' => 'required|exists:departments,id',
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

        $group = Group::create([
            'name' => $request['name'],
            'description' => $request['description'],
            'department_id' => $request['department_id'],
            'roles' => [],
        ]);

        LogController::logModel($user->id, 'create', $group);

        return response()->json([
            'success' => $request['name'] . ' successfully created.',
            'groups' => Group::with('department')->orderByDesc('id')->paginate(),
        ]);
    }

    public function edit(Request $request)
    {
        $group = Group::with('department')->find($request['id']);

        $name_val = '';
        if ($group != null && strtolower($group->name) != strtolower($request['name']))
            $name_val = '|unique:groups,name,NULL,id,deleted_at,NULL';

        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:groups',
            'name' => 'required|max:225'.$name_val,
            'description' => 'required|max:500',
            'department_id' => 'required|exists:departments,id',
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

        $group->update([
            'name' => $request['name'],
            'description' => $request['description'],
            'department_id' => $request['department_id'],
        ]);

        LogController::logModel($user->id, 'update', $group);

        return response()->json([
            'success' => $request['name'] . ' successfully edited.',
            'groups' => Group::with('department')->orderByDesc('id')->paginate(),
            'group' => $group,
        ]);
    }

    public function destroy(Request $request)
    {
        $request['group'] = Group::find($request['id']);
        $validator = Validator::make($request->all(), [
            'group' => 'required',
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

        $can_delete = $request['group']->canDelete();

        abort_errors_if(
            count($can_delete),
            $can_delete
        );

        $group_name = $request['group']->name;

        LogController::logModel($user->id, 'delete', $request['group']);

        $request['group']->delete();

        return response()->json([
            'success' => $group_name . ' successfully deleted.',
            'groups' => Group::with('department')->orderByDesc('id')->paginate(),
        ]);
    }
}
