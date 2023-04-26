<?php

namespace App\Http\Controllers\PageContact;

use App\Http\Controllers\Controller;
use App\Models\PageContact;
use Illuminate\Http\Request;

class PageContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $contact = PageContact::all();
        return $contact;
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
        $pageContact = PageContact::all()->first();
        if (!empty($pageContact)) {
            $pageContact->Title = $request->Title;
            $pageContact->Description = $request->Description;
            $pageContact->Phone = $request->Phone;
            $pageContact->Email = $request->Email;
            $pageContact->Copyright = $request->Copyright;
            $pageContact->save();

            return response()->json([
                'message' => 'data updated'
            ]);
        } else {
            PageContact::create([
                'Title' => $request->Title,
                'Description' => $request->Description,
                'Phone' => $request->Phone,
                'Email' => $request->Email,
                'Copyright' => $request->Copyright
            ]);
            return response()->json([
                'message' => 'data Inserted'
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(PageContact $pageContact)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PageContact $pageContact)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PageContact $pageContact)
    {
        //
    }
}
