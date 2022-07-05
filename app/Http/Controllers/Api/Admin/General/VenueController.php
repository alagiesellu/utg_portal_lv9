<?php

namespace App\Http\Controllers\Api\Admin\General;

use App\Http\Controllers\Api\Admin\LogController;
use App\Models\General\Venue;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class VenueController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
        $this->middleware('scope:ad-10.1')->only('index','show');
        $this->middleware('scope:ad-10')->except('index','show');
    }

    public function index(Request $request)
    {
        $group = Venue::orderByDesc('id');
        if ($request->query('search'))
            $group->where('name', 'LIKE', '%'.$request->query('search').'%');

        return response()->json([
            'venues' => $group->paginate(),
        ]);
    }

    public function show(Request $request, $id)
    {
        return response()->json([
            'venue' => Venue::find($id),
        ]);
    }

    public function store(Request $request)
    {
        $request['name'] = strtoupper($request['name']);

        $validator = Validator::make($request->all(), [
            'name' => 'required|max:25|unique:venues,name,NULL,id,deleted_at,NULL',
            'type' => 'required|in:auditorium,class,lab',
            'description' => 'required|max:500',
            'address' => 'required|max:500',
            'capacity' => 'required|integer|min:0|max:1000',
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

        $venue = Venue::create([
            'name' => $request['name'],
            'type' => $request['type'],
            'description' => $request['description'],
            'address' => $request['address'],
            'capacity' => $request['capacity'],
        ]);

        LogController::logModel($user->id, 'create', $venue);

        return response()->json([
            'success' => $request['name'] . ' successfully created.',
            'venues' => Venue::paginate(),
        ]);
    }

    public function edit(Request $request)
    {
        $venue = Venue::find($request['id']);
        $request['name'] = ucfirst($request['name']);

        $id_val = '';
        if ($venue != null && $venue->name != $request['name'])
            $id_val = '|unique:venues,name,NULL,id,deleted_at,NULL';

        $validator = Validator::make($request->all(), [
            'name' => 'required|max:25'.$id_val,
            'type' => 'required|in:auditorium,class,lab',
            'description' => 'required|max:500',
            'address' => 'required|max:500',
            'capacity' => 'required|integer|min:0|max:1000',
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

        $venue->update([
            'name' => $request['name'],
            'type' => $request['type'],
            'description' => $request['description'],
            'address' => $request['address'],
            'capacity' => $request['capacity'],
        ]);

        LogController::logModel($user->id, 'update', $venue);

        return response()->json([
            'success' => $request['name'] . ' successfully edited.',
            'venues' => Venue::paginate(),
            'venue' => $venue,
        ]);
    }

    public function destroy(Request $request)
    {
        $request['venue'] = Venue::find($request['id']);
        $validator = Validator::make($request->all(), [
            'venue' => 'required',
//            'password' => 'required',
        ]);

        abort_errors_if(
            $validator->fails(),
            $validator->errors()->toArray()
        );

//        abort_errors_if(
//            $request->user()->checkPassword($request['password'])['code'] != 202,
//            [['Invalid password confirmation.']]
//        );

        $can_delete = $request['venue']->canDelete();

        abort_errors_if(
            count($can_delete),
            $can_delete
        );

        $venue_name = $request['venue']->name;

        LogController::logModel($request->user()->id, 'delete', $request['venue']);

        $request['venue']->delete();

        return response()->json([
            'success' => $venue_name . ' successfully deleted.',
            //'venues' => Venue::paginate(),
        ]);
    }
}
