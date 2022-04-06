@extends('layouts.private')
@section('content')
    <!-- Sidenav -->
    <layout-sidebar></layout-sidebar>
    <!-- Main content -->
    <div class="main-content">
        <layout-navbar></layout-navbar>
        <router-view></router-view>
    </div>
@endsection
