<?php

namespace App\Http\Controllers\Api\Admin\General;

use App\Http\Controllers\Api\Admin\LogController;
use App\Models\General\Option;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class OptionsController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
        $this->middleware('scope:ad-16');
    }

    public function db()
    {
        return response()->json([
            'options' => Option::orderByDesc('id')->paginate(),
        ]);
    }

    public function info()
    {
        return response()->json([
            'options' => config('options'),
        ]);
    }

    public function update(Request $request)
    {
        $info_options = config('options');

        $val = '';

        if ($info_options[$request['key']]['info']['type'] == 'number')
            $val .= '|numeric';

        if (isset($info_options[$request['key']]['info']['min']))
            $val .= '|min:'.$info_options[$request['key']]['info']['min'];

        if (isset($info_options[$request['key']]['info']['max']))
            $val .= '|max:'.$info_options[$request['key']]['info']['max'];

        $validator = Validator::make($request->all(), [
            'value' => 'required'.$val,
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

        $opt = Option::where('key', $request['key'])->first();

        LogController::logModel($user->id, 'update', $opt);

        $opt->update([
            'value' => $request['value'],
        ]);

        return response()->json([
            'options' => Option::orderBy('key')->orderByDesc('id')->paginate(),
            'success' => $info_options[$request['key']]['info']['name'].' successfully updated to '.$request['value'].'.'
        ]);
    }
}
