<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="author" content="UTG Software Dev Team; @alagiesellu & @feller23">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="icon" type="image/png" href="{{ asset('img/UTG-icon.png') }}"/>
    <title>{{ config('app.name') }}</title>
    <link href="{{ asset('v/12/css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('css/global.css') }}" rel="stylesheet">
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet">
    <!-- Icons -->
    <link href="{{ asset('argon/assets/vendor/nucleo/css/nucleo.css') }}" rel="stylesheet">
    <link href="{{ asset('argon/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css') }}" rel="stylesheet">
    <!-- Argon CSS -->
    <link type="text/css" href="{{ asset('argon/assets/css/argon.css?v=1.0.0') }}" rel="stylesheet">
</head>
<body>
<div id="app">
    @yield('content')
</div>
<!-- Argon Scripts -->
<!-- Core -->
<script src="{{ asset('argon/assets/vendor/jquery/dist/jquery.min.js') }}"></script>
<!-- Argon JS -->
<script src="{{ asset('argon/assets/js/argon.js?v=1.0.0') }}"></script>
{{--<script src="{{ asset('js/app.js') }}"></script>--}}
<script src="{{ asset('v/11/js/app.js') }}"></script>
</body>
</html>
