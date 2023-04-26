<?php

namespace App\Http\Controllers\Inquires;

use App\Http\Controllers\Controller;
use App\Models\Inquiry;
use App\Models\Iquiry;
use Illuminate\Http\Request;

class InquiryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $inquires = Inquiry::all();
        return $inquires;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'Name' => 'required',
            'Email' => 'required|Email',
            'Message' => 'required|min:5'
        ]);

        Inquiry::create([
            'Name' => $request->Name,
            'Email' => $request->Email,
            'Message' => $request->Message
        ]);

        return response()->json([
            'message' => 'data added'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        Inquiry::destroy($id);

        return response()->json([
            'message' => 'data deleted'
        ]);
    }
}
