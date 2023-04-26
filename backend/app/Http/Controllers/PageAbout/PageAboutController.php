<?php

namespace App\Http\Controllers\PageAbout;

use App\Http\Controllers\Controller;
use App\Models\PageAbout;
use Illuminate\Http\Request;

class PageAboutController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $about = PageAbout::all();
        return $about;
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
        $pageAbout = PageAbout::all()->first();

        if (!empty($pageAbout)) {
            $pageAbout->Title = $request->Title;
            $pageAbout->Description = $request->Description;
            $pageAbout->save();

            return response()->json([
                'message' => 'data updated'
            ]);
        } else {
            PageAbout::create([
                'Title' => $request->Title,
                'Description' => $request->Description
            ]);
            return response()->json([
                'message' => 'data inserted'
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(PageAbout $pageAbout)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PageAbout $pageAbout)
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
    public function destroy(PageAbout $pageAbout)
    {
        //
    }
}
