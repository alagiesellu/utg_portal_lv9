@extends('layouts.private')
@section('content')
    <!-- Sidenav -->
    <layout-sidebar></layout-sidebar>
    <!-- Main content -->
    <div class="main-content">
        <layout-navbar></layout-navbar>
        <router-view></router-view>
        <div class="container-fluid"><hr>
            <layout-footer></layout-footer>
        </div>
    </div>
    <!-- Login Modal when session expires -->
{{--    <login-modal></login-modal>--}}
@endsection
