@extends('layouts.app')

@section('styles')
    @parent
    <link rel="stylesheet" href="{{ mix('css/calendar.css') }}" type="text/css">
@endsection

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div id="calendar" data-calendar='{{ $calendar }}' data-calendar_dates='{{ $calendar_dates }}'></div>
            </div>
        </div>
    </div>
@endsection
