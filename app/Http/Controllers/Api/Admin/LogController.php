<?php

namespace App\Http\Controllers\Api\Admin;

use App\DatabaseLog;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class LogController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
        $this->middleware('scope:ad-22');
    }

    public function find_models(Request $request) {

        $models =
            DB::transaction(function () use ($request) {
                return DB::table($request['search'])->get();
            });

        return response()->json([
            'models' => $models
        ]);
    }

    public function filter(Request $request) {
        $where = [];
        $infos = [];

        if (!is_null($request['user_id']))
            array_push($where, ['user_id', $request['user_id']]);

        if (!is_null($request['info']))
            array_push($where, ['info', $request['info']]);

        if (!is_null($request['model']))
        {
            $infos = DatabaseLog::where('model', $request['model'])->distinct()->get(['info']);
            array_push($where, ['model', $request['model']]);
        }

        if (!is_null($request['model_id']))
            array_push($where, ['model_id', $request['model_id']]);

        return response()->json([
            'db_logs' => DatabaseLog::where($where)->with('user')->orderByDesc('id')->paginate(),
            'db_infos' => $infos,
        ]);
    }

    public function index(Request $request) {
        $where = [];

        if (!is_null($request['user_id']))
            array_push($where, ['user_id', $request['user_id']]);

        if (!is_null($request['model']))
            array_push($where, ['model', $request['model']]);

        if (!is_null($request['model_id']))
            array_push($where, ['model_id', $request['model_id']]);

        return response()->json([
            'db_logs' => DatabaseLog::where($where)->with('user')->orderByDesc('id')->paginate(),
        ]);
    }

    public function get($id)
    {
        return response()->json([
            'db_log' => DatabaseLog::with('user')->find($id),
        ]);
    }

    public function models()
    {
        return response()->json([
            'db_models' => DatabaseLog::distinct()->get(['model'])
        ]);
    }

    public function infos($model)
    {
        return response()->json([
            'db_infos' => DatabaseLog::where('model', $model)->distinct()->get(['info'])
        ]);
    }

    public static function logModel($user_id, $info, Model $model)
    {
        DatabaseLog::create([
            'user_id' => $user_id,
            'info' => $info,
            'data' => $model,
            'model' => $model->getTable(),
            'model_id' => $model->id,
        ]);
    }

    public static function logModelArray($user_id, $info, array $data, Model $model)
    {
        $logs = [];
        foreach ($data as $d)
            array_push($logs, [
                'user_id' => $user_id,
                'info' => $info,
                'data' => json_encode($d),
                'model' => $model->getTable(),
                'model_id' => $d['id'],
                'created_at' => now(),
            ]);

        DB::beginTransaction();
        try {

            DB::table((new DatabaseLog())->getTable())->insert($logs);

            DB::commit();
        } catch (\Exception $exception) {
            DB::rollBack();
            Log::error($exception);
        }
    }
}
