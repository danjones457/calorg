<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use DB;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $calendars = DB::table('calendars')->where('user_id', Auth::id())->get();
        return view('calendars', ['calendars' => $calendars]);
    }

    public function viewCalendar(Request $request, $id)
    {
        $calendar = DB::table('calendars')->where('id', $id)->get();
        $calendar_dates = DB::table('calendar_dates')->where('calendar_id', $id)->get();
        return view('home', ['calendar' => $calendar, 'calendar_dates' => $calendar_dates]);
    }

    public function addDate(Request $request) {
        DB::table('calendar_dates')->insert([
            ['calendar_id' => $request->id, 'start_date' => $request->startDate, 'end_date' => $request->endDate]
        ]);
    }
}
