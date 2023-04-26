<?php

namespace App\Http\Controllers\States;

use App\Http\Controllers\Controller;
use App\Models\State;
use Illuminate\Http\Request;

class StateController extends Controller
{

    public function index()
    {
        $states = State::all();
        return $states;
    }


    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $request->validate([
            'Name' => 'required'
        ]);

        State::updateOrCreate([
            'Name' => $request->Name
        ]);

        return response()->json([
            'message' => 'data added'
        ]);
    }


    public function show($id)
    {
        $state = State::findOrFail($id);
        return $state;
    }

    public function edit($id)
    {
        return "edit";
    }


    public function update(Request $request, $id)
    {
        $request->validate([
            'Name' => 'required'
        ]);

        $state = State::findOrFail($id);
        $state->Name = $request->Name;
        $state->save();

        return response()->json([
            'message' => 'data updated'
        ]);
    }

    public function destroy($id)
    {
        State::destroy($id);

        return response()->json([
            'message' => 'item is deleted'
        ]);
    }
}
