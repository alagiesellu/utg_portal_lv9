<?php

namespace App;

use App\Models\General\Profile;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Laravel\Passport\HasApiTokens;
use function config;
use function now;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'num',
        'first_name',
        'middle_name',
        'last_name',
        'email',
        'tel',
        'address',
        'gender',
        'dob',
        'nationality',
        'profile_id',
        'profile_type',
        'img',
        'password'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        //'dob' => 'datetime:dS M, Y',
    ];

    protected $dates = [
        //'dob',
    ];

    public function _toArray()
    {
        return [
            'id' => $this->id,
            'num' => $this->num,
            'first_name' => $this->first_name,
            'middle_name' => $this->middle_name,
            'last_name' => $this->last_name,
            'email' => $this->email,
            'tel' => $this->tel,
            'address' => $this->address,
            'gender' => $this->gender,
            'dob' => $this->dob,
            'nationality' => $this->nationality,
            'profile_id' => $this->profile_id,
            'img' => $this->img(),
            'name' => "{$this->first_name} {$this->middle_name} {$this->last_name}",
        ];
    }

    public function canRegister($term_id, $class_term_id)
    {
        $checkClearance = $this->profile->checkClearance($term_id, $class_term_id);
        return [
            'value' => count($checkClearance) == 0,
            'reasons' => $checkClearance
        ];
    }

    public function canDelete()
    {
        $ret = [];

        foreach ($this->profiles() as $profile)
        {
            $profile_can_delete = $profile->canDelete();
            if (count($profile_can_delete))
                $ret = array_merge($ret, $profile_can_delete);

        }

//        $profile_count = count($this->profiles);
//        if ($profile_count)
//            $ret = [['User cannot be deleted.', "{$profile_count} registered profile/s for this user."]];

        return $ret;
    }

    public function name()
    {
        return "{$this->first_name} {$this->middle_name} {$this->last_name}";
    }

    public function profile()
    {
        return $this->belongsTo(Profile::class);
    }

    public function haveScope($scope)
    {
        foreach ($this->oauth_access_tokens() as $token) {
            if (in_array($scope, $token->scopes))
                return true;
        }
        return false;
    }

    /**
     * Active passport access tokens. Then load scopes into array
     *
     * return array tokens
     */
    public function oauth_access_tokens()
    {
        $tokens = DB::table('oauth_access_tokens')
            ->whereDate('created_at', '>=', now()->addHours(-1*config('token.expire_in_hours')))
            ->whereDate('expires_at', '>=', now())
            ->where('user_id', $this->id)->get();

        // load scopes as arrays
        for ($i = 0; $i < count($tokens); $i++)
            $tokens[$i]->scopes = json_decode($tokens[$i]->scopes);

        return $tokens;
    }

    public function profiles()
    {
        return $this->hasMany(Profile::class);
    }

    public function gender()
    {
        return $this->gender == 'm' ? 'Male':'Female';
    }

    public function img()
    {
        return ($this->img === 'default.png' ? "profiles/" : "public/storage/profiles/") . $this->img;
    }

    public function roles()
    {
        return $this->profile()->roles;
    }

    public function forClient()
    {
        return [
            'name' => $this->name(),
            'img' => $this->img(),
            'roles' => $this->profile->roles,
            'type' => $this->profile->type,
        ];
    }

    public function checkPassword($password)
    {
        return
            Hash::check(
                $password,
                $this->password
            )
                ?
                [ 'code' => 202 ]
                :
                [ 'code' => 404 ];
        try {

            $client = new Client(['base_uri' => config('app.auth.address')]);

            $response = $client->post(config('app.auth.uri'), [
                'form_params' => [
                    'client_name' => config('app.client.name'),
                    'client_token' => config('app.client.token'),
                    'username' => $this->email,
                    'password' => $password,
                ]
            ]);

            return json_decode((string) $response->getBody(), true);

        } catch (GuzzleException $exception) {

            Log::error($exception);
            return [];
        }
    }
}
