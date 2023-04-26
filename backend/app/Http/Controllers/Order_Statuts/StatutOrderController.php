<?php

namespace App\Http\Controllers\Order_Statuts;

use App\Http\Controllers\Controller;
use App\Models\Statut_Order;
use Illuminate\Http\Request;

class StatutOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $statut_Orders = Statut_Order::all();
        return $statut_Orders;
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
        Statut_Order::create([
            'Remark' => $request->Remark,
            'Statuts' => $request->Statuts,
            'Order_id' => $request->Order_id,
            'User_id' => $request->User_id
        ]);

        return response()->json([
            'message'  => 'data inserted successfully!'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Statut_Order $statut_Order)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Statut_Order $statut_Order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // return $id;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Statut_Order $statut_Order)
    {
        //
    }
}
