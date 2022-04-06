<?php

namespace App\Http\Controllers\Api;

use App\Models\General\Profile;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Facades\Image;

/**
 * Profile request controlling
 *      :middleware(auth:api)
 *
 *      fectchUserProfile(Request)  :   fetch user profile data
 */
class ProfileController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function switch(Request $request)
    {
        $request['profile'] = Profile::find($request['profile']);
        $validator = Validator::make($request->all(), [
            'profile' => 'required'
        ]);

        abort_errors_if(
            $validator->fails(),
            $validator->errors()->toArray()
        );

        $request->user()->update([
            'profile_id' => $request['profile']->id,
            'profile_type' => $request['profile']->type,
        ]);

        return response()->json([
            'success' => true
        ]);
    }

    public function upload(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'image' => 'required|starts_with:data:image'
        ]);

        abort_errors_if(
            $validator->fails(),
            $validator->errors()->toArray()
        );

        $imageData = $request->get('image');
        $fileName = Carbon::now()->timestamp . '_' . uniqid() . '.' . explode('/', explode(':', substr($imageData, 0, strpos($imageData, ';')))[1])[1];

        Image::make($request->get('image'))->save(public_path('storage/profiles/').$fileName);

        $user = $request->user();

        Storage::delete('profiles/'.$user->img);

        $user->update([
            'img' => $fileName,
        ]);

        return response()->json([
            'success'=>'Image successfully uploaded.',
            'img' => $user->img(),
        ]);
    }

    public function profile(Request $request)
    {
        $user = User::with(['profiles.department','profiles.set','profiles.group'])->find($request->user()->id);
        return response()->json([
            'user' => $user,
        ]);
    }
}
