@extends('layouts.app')

@section('styles')
    @parent
    <link rel="stylesheet" href="{{ mix('css/calendar.css') }}" type="text/css">
@endsection

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div id="calendar"></div>
        </div>
    </div>
</div>
@endsection
