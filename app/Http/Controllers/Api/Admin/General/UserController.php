<?php

namespace App\Http\Controllers\Api\Admin\General;

use App\Http\Controllers\Api\Admin\LogController;
use App\Models\General\Profile;
use App\User;
use Carbon\Carbon;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
        $this->middleware('scope:ad-13')->except('index','search','show','upload');
        $this->middleware('scope:ad-13.1')->only('index','search','show','upload');
    }

    public function reset_password(Request $request)
    {
        $request['user'] = User::find($request['user_id']);
        $validator = Validator::make($request->all(), [
            'user' => 'required',
            'new_password' => 'sometimes|string|min:6',
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

        $request['user']->update([
            'password' => bcrypt($request['new_password'])
        ]);

        return response()->json([
            'success' => 'Password reset successful.',
        ]);

        $store_auth = $this->store_auth([
            'email' => $request['user']->email,
            'password' => mt_rand(),
        ]);

        if ($store_auth['code'] === 202)
        {
            LogController::logModelArray($user->id, 'update', [
                [
                    'id' => $request['user']->id,
                    'password' => 'reset',
                ]
            ], new User());
            return response()->json([
                'success' => 'Password reset successful.',
            ]);
        }

        abort_errors($store_auth['message']);
    }

    public function upload(Request $request)
    {
        $request['user'] = User::find($request['user_id']);

        $validator = Validator::make($request->all(), [
            'user' => 'required',
            'image' => 'required',
        ]);
        abort_errors_if(
            $validator->fails(),
            $validator->errors()->toArray()
        );

        $validator = Validator::make($request->all(), [
            'image' => 'starts_with:data:image/jpeg,data:image/png',
        ]);
        abort_errors_if(
            $validator->fails(),
            [['Invalid image type uploaded.']]
        );

        $imageData = $request->get('image');

        $fileName =
            now()->timestamp . '_' .
            uniqid() . '.' .
            explode(
                '/',
                explode(':', substr($imageData, 0, strpos($imageData, ';')))[1]
            )[1];

        Image::make($request->get('image'))->save(public_path('storage/profiles/').$fileName);

        if ($request['user']->img != 'default.png')
            Storage::delete('profiles/'.$request['user']->img);

        $request['user']->update([
            'img' => $fileName,
        ]);

        LogController::logModelArray($request->user()->id, 'upload', [
            [
                'id' => $request['user']->id,
                'img' => $fileName,
            ]
        ], new User());

        return response()->json([
            'success'=>'Image successfully uploaded.',
            'img' => $request['user']->img,
        ]);
    }

    public function index(Request $request)
    {
        $user = User::with('profiles');

        if ($request['search'])
            $user->orWhere('num', 'LIKE', '%' . $request['search'] . '%')
                ->orWhere('first_name', 'LIKE', '%' . $request['search'] . '%')
                ->orWhere('middle_name', 'LIKE', '%' . $request['search'] . '%')
                ->orWhere('last_name', 'LIKE', '%' . $request['search'] . '%')
                ->orWhere('email', 'LIKE', '%' . $request['search'] . '%');

        return response()->json([
            'users' => $user->orderByDesc('id')->paginate(),
        ]);
    }

    public function search(Request $request)
    {
        $user = User::with('profile')->where('num', $request['search'])->first();

        abort_errors_if(
            is_null($user) || $user->profile->type != 's',
            [['Student profile not found.']]
        );

        return response()->json([
            'user' => $user,
        ]);
    }

    public function students(Request $request)
    {
        return response()->json([
            'profiles' => Profile::where('type', 's')->with('user')->pagiante(),
        ]);
    }

    public function profile($id)
    {
        return response()->json([
            'profile' => Profile::find($id),
        ]);
    }

    public function show($id)
    {
        return response()->json([
            'user' => User::with(['profiles.set', 'profiles.department', 'profiles.major_department', 'profiles.minor_department', 'profiles.group'])->find($id),
        ]);
    }

    public function store(Request $request)
    {
        $request['middle_name'] = $request['middle_name'] == null ? '':$request['middle_name'];

        if (!str_contains($request['email'], '@'))
            $request['email'] .= '@utg.edu.gm';

        $validator = Validator::make($request->all(), [
            'num' => 'required|numeric|unique:users,num,NULL,id,deleted_at,NULL',
            'first_name' => 'required|max:225',
            'last_name' => 'required|max:225',
            'email' => 'required|email|ends_with:@utg.edu.gm|unique:users,email,NULL,id,deleted_at,NULL|max:225',
            'tel' => 'required|numeric',//regex:/220[0-9]{7}/|unique:users',
            'address' => 'required|max:500',
            'gender' => 'required|in:m,f',
            'profile' => 'required|in:ad,ac,s',
            'dob' => 'required|date|before:today',
            'nationality' => 'required|string|size:2',
//            'password' => 'required',
        ]);

        abort_errors_if(
            $validator->fails(),
            $validator->errors()->toArray()
        );

        $user = $request->user();
//        abort_errors_if(
//            $user->checkPassword($request['password'])['code'] != 202,
//            [['Invalid password confirmation.']]
//        );

        $request['middle_name'] = isset($request['middle_name']) ? $request['middle_name'] : '';

        $insert_user = [
            'num' => $request['num'],
            'first_name' => $request['first_name'],
            'middle_name' => $request['middle_name'],
            'last_name' => $request['last_name'],
            'email' => $request['email'],
            'tel' => $request['tel'],
            'address' => $request['address'],
            'gender' => $request['gender'],
            'dob' => $request['dob'],
            'nationality' => $request['nationality'],
            'profile_id' => 0,
            'password' => bcrypt(Str::random(12)),
        ];

        DB::beginTransaction();
        try {

            $user_id = DB::table((new User())->getTable())->insertGetId($insert_user);

            $insert_user['id'] = $user_id;

            $profile_id = DB::table((new Profile())->getTable())->insertGetId([
                'roles' => '{}',
                'type' => $request['profile'],
                'user_id' => $user_id,
                'department_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            DB::table((new User())->getTable())->where('id', $user_id)->update([
                'profile_id' => $profile_id,
                'profile_type' => $request['profile'],
            ]);

            DB::commit();
        } catch (\Exception $exception) {
            DB::rollBack();
            Log::error($exception);
            abort_errors([['Operations fail. Try again!']]);
        }

        LogController::logModelArray($user->id, 'create', [$insert_user], new User());

        $store_auth = $this->store_auth([
            'email' => $request['email'],
//            'password' => mt_rand(),
        ]);

        return response()->json([
            'success' => $request['name'] . ' successfully created with a random password.',
            'users' => User::with('profile')->orderByDesc('id')->paginate(),
        ]);
    }

    public function store_auth(array $data)
    {
        return ['code' => 202];
        try {

            $client = new Client(['base_uri' => config('app.auth.address')]);

            $response = $client->post('/api/add-auth', [
                'form_params' => [
                    'client_name' => config('app.client.name'),
                    'client_token' => config('app.client.token'),
                    'email' => $data['email'],
//                    'password' => $data['password'],
                ]
            ]);

            return json_decode((string) $response->getBody(), true);

        } catch (GuzzleException $exception) {

            Log::error($exception);
            return ['code'=>null];
        }
    }

    public function update_auth(array $data)
    {
        try {

            $client = new Client(['base_uri' => config('app.auth.address')]);

            $response = $client->post('/api/update-auth', [
                'form_params' => [
                    'client_name' => config('app.client.name'),
                    'client_token' => config('app.client.token'),
                    'email' => $data['email'],
                    'old_email' => $data['old_email'],
                ]
            ]);

            return json_decode((string) $response->getBody(), true);

        } catch (GuzzleException $exception) {

            Log::error($exception);
            return ['code'=>null];
        }
    }

    public function edit(Request $request)
    {
        $user = User::with('profiles.department')->find($request['id']);

        $num_val = $tel_val = $email_val = '';
        if ($user != null) {
            if ($user->num != $request['num'])      $num_val = '|unique:users,num,NULL,id,deleted_at,NULL';
            if ($user->email != $request['email'])  $email_val = '|unique:users,email,NULL,id,deleted_at,NULL';
//            if ($user->tel != $request['tel'])      $tel_val = '|unique:users';
        }

        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:users',
            'num' => 'required|numeric'.$num_val,
            'first_name' => 'required|string|max:225',
            'last_name' => 'required|string|max:225',
            'email' => 'required|string|ends_with:@utg.edu.gm|max:225'.$email_val,
            'tel' => 'required|numeric ',//regex:/220[0-9]{7}/'.$tel_val,
            'address' => 'required|max:500',
            'gender' => 'required|in:m,f',
            'dob' => 'required|date|before:today',
            'nationality' => 'required|string|size:2',
//            'password' => 'required',
        ]);

        abort_errors_if(
            $validator->fails(),
            $validator->errors()->toArray()
        );

        $auth_user = $request->user();

//        abort_errors_if(
//            $auth_user->checkPassword($request['password'])['code'] != 202,
//            [['Invalid password confirmation.']]
//        );

        $request['old_email'] = $user->email;

        $update_user = [
            'num' => $request['num'],
            'first_name' => $request['first_name'],
            'middle_name' => $request['middle_name'],
            'last_name' => $request['last_name'],
            'email' => $request['email'],
            'tel' => $request['tel'],
            'address' => $request['address'],
            'gender' => $request['gender'],
            'dob' => $request['dob'],
            'nationality' => $request['nationality'],
        ];

        $user->update($update_user);

        LogController::logModel($auth_user->id, 'update', $user);

        if ($request['email'] != $request['old_email'])
            $store_auth = $this->update_auth([
                'email' => $request['email'],
                'old_email' => $request['old_email'],
            ]);

        return response()->json([
            'success' => 'Successfully edited.'.
                (isset($store_auth) && $store_auth['code'] === 202 ?
                    'Account records updated on authentication server.' : 'Account records updated not on authentication server.'),
            'users' => User::with('profiles')->orderByDesc('id')->paginate(),
            'user' => $user,
        ]);
    }

    public function destroy(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:users',
//            'password' => 'required',
        ]);

        abort_errors_if(
            $validator->fails(),
            $validator->errors()->toArray()
        );

        $auth_user = $request->user();

//        abort_errors_if(
//            $auth_user->checkPassword($request['password'])['code'] != 202,
//            [['Invalid password confirmation.']]
//        );

        $user = User::find($request['id']);

        $can_delete = $user->canDelete();

        abort_errors_if(
            count($can_delete),
            $can_delete
        );

        $user_name = $user->name();

        LogController::logModel($auth_user->id, 'delete', $user);

        foreach ($user->profiles as $profile)
            $profile->delete();

        $user->delete();

        return response()->json([
            'success' => $user_name . ' successfully deleted.',
            'users' => User::with('profile')->orderByDesc('id')->paginate(),
        ]);
    }
}
