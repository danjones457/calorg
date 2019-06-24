@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <form method="POST" action="/create">
                    @csrf

                    <div class="form-group row">
                        <label for="calendarName" class="col-md-4 col-form-label text-md-right">{{ __('New calendar name') }}</label>

                        <div class="col-md-4">
                            <input id="calendarName" type="text" class="form-control" name="calendarName" required autofocus>
                        </div>

                        <div class="col-md-4">
                            <button type="submit" class="btn btn-primary">
                                {{ __('Create') }}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="col-md-12">
                <div id="calendars" data-calendars='{{ $calendars }}'></div>
            </div>
        </div>
    </div>
@endsection