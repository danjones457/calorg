@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <button type="button">Create calendar</button>
            </div>
            <div class="col-md-12">
                <div id="calendars" data-calendars='{{ $calendars }}'></div>
            </div>
        </div>
    </div>
@endsection