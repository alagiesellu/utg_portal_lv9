<?php

namespace App\Http\Controllers\Api\Student;

use App\Models\Academics\TermClass;
use App\Models\General\ClassMail;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class MailsController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function delete(Request $request, $mail_id)
    {
        $user = $request->user();

        $class_mail = ClassMail::find($mail_id);

        abort_errors_if(
            is_null($class_mail) || $class_mail->profile_id !== $user->profile_id,
            [['Incorrect class selected.']]
        );

        abort_errors_if(
            now()->diffInHours($class_mail->created_at) > 1,
            [['Mail cannot be deleted now an hour posted.']]
        );

        $term_class_id = $class_mail->term_class_id;

        $class_mail->delete();

        return response()->json([
            'success' => 'Mail successfully deleted.',
            'profile_id' => $user->profile_id,
            'mails' => ClassMail::with('profile.user')->where('term_class_id', $term_class_id)->orderByDesc('id')->paginate(),
        ]);
    }

    public function store(Request $request, $id)
    {
        $validator = Validator::make($request->toArray(), [
            'subject' => 'required|string|max:200',
            'message' => 'required|string|max:4000',
        ]);

        abort_errors_if(
            $validator->fails(),
            $validator->errors()->toArray()
        );

        $term_class = TermClass::find($id);

        abort_errors_if(
            is_null($term_class),
            [['Incorrect class selected.']]
        );

        $user = $request->user();

        ClassMail::create([
            'term_class_id' => $id,
            'profile_id' => $user->profile_id,
            'subject' => $request['subject'],
            'message' => $request['message'],
        ]);

        return response()->json([
            'success' => 'Mail successfully posted.',
            'profile_id' => $user->profile_id,
            'mails' => ClassMail::with('profile.user')->where('term_class_id', $id)->orderByDesc('id')->paginate(),
        ]);
    }

    public function show(Request $request, $id)
    {
        return response()->json([
            'term_class' => TermClass::with('course')->find($id),
            'profile_id' => $request->user()->profile_id,
            'mails' => ClassMail::with('profile.user')->where('term_class_id', $id)->orderByDesc('id')->paginate(),
        ]);
    }
}
