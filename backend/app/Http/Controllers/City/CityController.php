<?php

namespace App\Http\Controllers\City;

use App\Http\Controllers\Controller;
use App\Models\City;
use Illuminate\Http\Request;

class CityController extends Controller
{

    public function index()
    {
        $cities = City::with('state')->get();
        return $cities;
    }

    public function create()
    {
        //
    }


    public function store(Request $request)
    {
        $request->validate([
            'Name' => 'required',
            'State_id' => 'required'
        ]);

        City::updateOrCreate([
            'Name' => $request->Name,
            'State_id' => $request->State_id
        ]);

        return response()->json([
            'message' => 'City Added'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $city = City::findOrFail($id);
        return $city;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'Name' => 'required',
            'State_id' => 'required'
        ]);

        $City = City::findOrFail($id);
        $City->Name = $request->Name;
        $City->State_id = $request->State_id;
        $City->save();

        return response()->json([
            'message' => 'data updated'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        City::destroy($id);

        return response()->json([
            'message' => 'item is deleted'
        ]);
    }
}
