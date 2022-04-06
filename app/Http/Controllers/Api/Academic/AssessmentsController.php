<?php

namespace App\Http\Controllers\Api\Academic;

use App\Http\Controllers\Api\Admin\LogController;
use App\Models\Academics\Assessment;
use App\Models\Academics\Grade;
use App\Models\Academics\TermClass;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class AssessmentsController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
        $this->middleware('scope:ac-2')->except('show');
    }

    public function show($id)
    {
        return response()->json([
            'assessment' => Assessment::find($id),
        ]);
    }

    public function store(Request $request)
    {
        $validation_errors = $this->validator($request, 'c');

        abort_errors_if(
            $validation_errors !== null,
            $validation_errors
        );

        $assessment = [
            'name' => $request['name'],
            'term_class_id' => $request['term_class_id'],
            'lecturer_profile_id' => $request->user()->profile_id,
            'starting_at' => $request['starting_at'],
            'ending_at' => $request['ending_at'],
            'info' => $request['info'],
            'score' => $request['score'],
        ];

        DB::beginTransaction();
        try {

            $ass_id = DB::table((new Assessment())->getTable())->insertGetId($assessment);

            $assessment['id'] = $ass_id;

            foreach (DB::table((new Grade())->getTable())->where('term_class_id', $request['term_class_id'])->get() as $grade)
            {
                $scores = json_decode($grade->scores, true);
                $scores[$ass_id] = null;
                DB::table((new Grade())->getTable())
                    ->where('id', $grade->id)
                    ->update([
                        'scores' => json_encode($scores)
                    ]);
            }

            DB::commit();
        } catch (\Exception $exception) {
            DB::rollBack();
            Log::error($exception);
            abort_errors([['Operations fail. Try again!']]);
        }

        LogController::logModelArray($request->user()->id, 'create', [$assessment], new Assessment());

        return response()->json([
            'success' => $request['name'] . ' assessment successfully created.',
            'assessments' => Assessment::where('term_class_id', $request['term_class_id'])->get(),
        ]);
    }

    public function update(Request $request)
    {
        $ass = Assessment::find($request['id']);
        $validation_errors = $this->validator($request, 'u', $ass);

        abort_errors_if(
            $validation_errors !== null,
            $validation_errors
        );

        $ass->update([
            'name' => $request['name'],
            'starting_at' => $request['starting_at'],
            'ending_at' => $request['ending_at'],
            'info' => $request['info'],
            'score' => $request['score'],
        ]);

        LogController::logModel($request->user()->id, 'update', $ass);

        return response()->json([
            'success' => $request['name'] . ' assessment successfully updated.',
            'assessments' => Assessment::where('term_class_id', $request['term_class_id'])->get(),
        ]);
    }

    public function delete(Request $request)
    {
        $ass = Assessment::find($request['id']);
        $validation_errors = $this->validator($request, 'd', $ass);

        abort_errors_if(
            $validation_errors !== null,
            $validation_errors
        );

        $can_delete = $ass->canDelete();

        abort_errors_if(
            count($can_delete),
            [$can_delete]
        );

        LogController::logModel($request->user()->id, 'delete', $ass);

        $ass->delete();

        return response()->json([
            'success' => $request['name'] . ' assessment successfully deleted.',
            'assessments' => Assessment::where('term_class_id', $request['term_class_id'])->get(),
        ]);
    }

    public function validator(Request $request, $ops, $obj = null)
    {
        $request['term_class'] = TermClass::with('assessments')->find($request['term_class_id']);
        $id_val = $name_val = $starting_at_val = $ending_at_val = $info_val = $score_val = $term_class_id_val = '';
        if ($ops == 'c')
        {
            $scores = 0;
            foreach ($request['term_class']->assessments as $assessment)
                $scores += $assessment->score;

            $name_val .= 'required|max:225';
            $starting_at_val .= 'required|date|after_or_equal:today';
            $ending_at_val .= 'required|date|after_or_equal:starting_at';
            $info_val .= 'required|string|max:500';
            $score_val .= 'required|numeric|min:1|max:'.(100-$scores);
//            $term_class_id_val .= 'required|exists:term_classes,id';
        }
        elseif ($ops == 'u')
        {
            $scores = 0;
            foreach ($request['term_class']->assessments as $assessment)
                if ($assessment->id != $request['id'])
                    $scores += $assessment->score;

            $id_val .= 'required|exists:assessments,id';
            $name_val .= 'required|max:225';
            $starting_at_val .= 'required|date|after_or_equal:today';
            $ending_at_val .= 'required|date|after_or_equal:starting_at';
            $info_val .= 'required|string|max:500';
            $score_val .= 'required|numeric|min:1|max:'.(100-$scores);
        }
        elseif ($ops == 'd')
        {
            $id_val .= 'required|exists:assessments,id';
        }

        $validator = Validator::make($request->all(), [
            'id' => $id_val,
            'name' => $name_val,
            'starting_at' => $starting_at_val,
            'ending_at' => $ending_at_val,
            'info' => $info_val,
            'score' => $score_val,
//            'term_class_id' => $term_class_id_val,
            'term_class' => 'required',
            //*pass 'password' => 'required',
        ]);

        if ($validator->fails())
            return $validator->errors()->toArray();

        $user = $request->user();
////*pass         if ($user->checkPassword($request['password'])['code'] != 202)
//            return [
//                'password' => ['Invalid password confirmation.']
//            ];

        return null;
    }
}
