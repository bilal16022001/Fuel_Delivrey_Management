<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{

    public function index()
    {
        $users = User::all();

        return $users;
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required'
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'Phone' => $request->Phone,
            'password' => Hash::make($request->password),
            'Birthday' => $request->Birthday,
            'Type' => 1
        ]);

        return response()->json([
            'meesage' => 'data inserted successfully'
        ]);
    }


    public function show($id)
    {
        $user = User::FindOrFail($id);
        return $user;
    }

    public function edit(string $id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email'
        ]);

        $admin = User::findOrFail($id);
        $admin->name = $request->name;
        $admin->email = $request->email;
        $admin->Phone = $request->Phone;

        if (Hash::needsRehash($request->password)) {
            $pass = Hash::make($request->password);
        } else {
            $pass = $request->password;
        }

        $admin->password = $pass;
        $admin->save();
        return response()->json([
            'message' => 'profile updated'
        ]);
    }

    public function destroy(string $id)
    {
        //
    }
}
