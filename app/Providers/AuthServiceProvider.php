<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use Laravel\Passport\Passport;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();
        Passport::routes();
        Passport::personalAccessTokensExpireIn(now()->addHours(config('app.token.expire_in_hours')));
        Passport::tokensExpireIn(now()->addHours(config('app.token.expire_in_hours')));
        Passport::refreshTokensExpireIn(now()->addHours(config('app.token.expire_in_hours')*2));
        Passport::tokensCan(config('roles'));
    }
}
