<?php

namespace App\Http\Controllers\Api\Academic;

use App\Models\Academics\Assessment;
use App\Models\Academics\ClassLecturer;
use App\Models\Academics\ClassRegistration;
use App\Models\Academics\Grade;
use App\Models\Academics\TermClass;
use App\Models\General\ClassFile;
use App\Models\General\ClassMail;
use App\Models\General\Option;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Laravel\Passport\Passport;

class ClassesController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');//->except('uploads');
        $this->middleware('scope:ac-4')->only('approve_registrations');
    }

    public function delete_file(Request $request, $id)
    {
        $class_file = ClassFile::find($id);

        abort_errors_if(
            is_null($class_file),
            [['File not found.']]
        );

        $term_class_id = $class_file->term_class_id;

        $class_file->delete();

        Storage::delete($class_file->url);

        return response()->json([
            'success' => 'File successfully deleted.',
            'files' => ClassFile::with('profile.user')->where('term_class_id', $term_class_id)->orderByDesc('id')->get(),
        ]);
    }

    public function uploads(Request $request, $id)
    {
        $validator = Validator::make($request->toArray(), [
            'file' => 'required|file',
        ]);

        abort_errors_if(
            $validator->fails(),
            $validator->errors()->toArray()
        );

        $term_class = TermClass::with('class_files')->find($id);

        abort_errors_if(
            is_null($term_class),
            [['Incorrect class selected.']]
        );

        $storage = Option::where('key', 'file_storage')->first()->value * 1048576;

        foreach ($term_class->class_files as $cf)
            $storage -= $cf->size;

        $user = $request->user();

        if($request->hasfile('file'))
        {
            $files = [];

            $class_file = [
                'term_class_id' => $id,
                'profile_id' => $user->profile_id,
            ];

            foreach($request->allFiles() as $file)
            {
                $class_file['name'] = $file->getClientOriginalName();
                $class_file['size'] = $file->getSize();

                $storage -= $class_file['size'];

                abort_errors_if(
                    $storage < 0,
                    [['Not enough storage.', $class_file['name'].' cannot be stored.']]
                );

                $class_file['url'] = $file->store('files/'.now()->format('Y/m'));
                array_push($files, new ClassFile($class_file));
            }

            $user->profile->class_files()->saveMany($files);
        }

        return response()->json([
            'files' => ClassFile::with('profile.user')->where('term_class_id', $id)->orderByDesc('id')->get(),
            'success' => 'Files successfully uploaded.',
        ]);
    }

    public function delete_mail(Request $request, $mail_id)
    {
        $user = $request->user();

        $class_mail = ClassMail::find($mail_id);

        abort_errors_if(
            is_null($class_mail) || $class_mail->profile_id !== $user->profile_id,
            [['Incorrect class selected.']]
        );

        abort_errors_if(
            now()->diffInHours($class_mail->created_at) > 1,
            [['Mail cannot be deleted after an hour posted.']]
        );

        $term_class_id = $class_mail->term_class_id;

        $class_mail->delete();

        return response()->json([
            'success' => 'Mail successfully deleted.',
            'profile_id' => $user->profile_id,
            'mails' => ClassMail::with('profile.user')->where('term_class_id', $term_class_id)->orderByDesc('id')->paginate(),
        ]);
    }

    public function post_mail(Request $request, $id)
    {
        $user = $request->user();

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

    public function mails(Request $request, $id)
    {
        return response()->json([
            'profile_id' => $request->user()->profile_id,
            'mails' => ClassMail::with('profile.user')->where('term_class_id', $id)->orderByDesc('id')->paginate(),
        ]);
    }

    public function files($id)
    {
        return response()->json([
            'files' => ClassFile::with('profile.user')->where('term_class_id', $id)->orderByDesc('id')->get(),
        ]);
    }

    public function index(Request $request)
    {
        return response()->json([
            'lecturer_class_registrations' => ClassLecturer::with([
                'term_class.course',
                'term_class.venue',
            ])->where([
                ['active', 1],
                ['profile_id', $request->user()->profile_id],
            ])->orderByDesc('id')->paginate(),
        ]);
    }

    public function approve_registrations(Request $request, $id)
    {
        $cr = ClassRegistration::find($id);

        $user = $request->user();

        if ($cr->approved_by_profile_id)
        {
// //*pass            $validator = Validator::make($request->all(), [
//                'password' => 'required',
//            ]);

// //*pass            abort_errors_if(
//                $validator->fails(),
//                $validator->errors()->toArray()
//            );

////*pass             abort_errors_if(
//                $user->checkPassword($request['password'])['code'] != 202,
//                [['Invalid password confirmation.']]
//            );

            $cr->update([
                'approved_by_profile_id' => null,
            ]);

            Grade::where('class_registration_id', $id)->delete();

            return response()->json([
                'success' => 'Class registration successfully cancelled.',
            ]);
        }
        else
        {
            $cr->update([
                'approved_by_profile_id' => $user->profile_id,
            ]);

            Grade::onlyTrashed()->where('class_registration_id', $id)->restore();

            return response()->json([
                'success' => 'Class registration successfully approved.',
            ]);
        }
    }

    public function show(Request $request, $id)
    {
        return response()->json([
            'term_class' => TermClass::with([
                'course',
                'term',
                'venue',
                'class_lecturers.profile.user',
                'assessments',
            ])->find($id),
        ]);
    }

    public function registrations($id)
    {
        return response()->json([
            'class_registrations' =>
                ClassRegistration::with(
                    [
                        'profile.user',
                        'profile.grades',
//                        'term_class.course',
//                        'term_class.term',
//                        'term_class.venue',
                    ]
                )->
                where([
                    ['term_class_id', $id],
                    ['active', 1]
                ])->orderByDesc('id')->paginate(),
            'approved' =>
                ClassRegistration::where([
                    ['term_class_id', $id],
                    ['active', 1],
                    ['approved_by_profile_id', '!=', null],
                ])->count(),
            'unapproved' =>
                ClassRegistration::where([
                    ['term_class_id', $id],
                    ['active', 1],
                    ['approved_by_profile_id', null],
                ])->count(),
        ]);
    }

    public function registrationsAll($id)
    {
        return response()->json([
            'class_registrations' => ClassRegistration::
            with([
                'profile.user',
//                'term_class.course',
//                'term_class.term',
//                'term_class.venue'
            ])->
            where([
                ['term_class_id', $id],
                ['active', 1]
            ])->get()
        ]);
    }

    public function registrationGet($id)
    {
        return response()->json([
            'registration' => ClassRegistration::
            with([
                'profile.user',
//                'term_class.course',
//                'term_class.term',
//                'term_class.venue',
                'grades.term_class.assessments',
            ])->find($id)
        ]);
    }

    public function assessments($id)
    {
        return response()->json([
            'assessments' => Assessment::where('term_class_id', $id)->get()
        ]);
    }
}
