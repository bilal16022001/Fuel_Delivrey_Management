<?php

use App\Http\Controllers\City\CityController;
use App\Http\Controllers\Fuels\FuelController;
use App\Http\Controllers\FuelStationOwners\FuelStationOwnerController;
use App\Http\Controllers\FuelStations\FuelStationController;
use App\Http\Controllers\PageAbout\PageAboutController;
use App\Http\Controllers\PageContact\PageContactController;
use App\Http\Controllers\States\StateController;
use App\Http\Controllers\Users\UserController;
use App\Http\Controllers\Inquires\InquiryController;
use App\Http\Controllers\Order_Statuts\StatutOrderController;
use App\Http\Controllers\OrdersFuel\OrderFuelController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::apiResource("users", UserController::class);
Route::apiResource("State", StateController::class);
Route::apiResource("City", CityController::class);
Route::apiResource("Fuels", FuelController::class);
Route::apiResource("PageContact", PageContactController::class);
Route::apiResource("PageAbout", PageAboutController::class);
Route::apiResource("Inquiry", InquiryController::class);
Route::apiResource("FuelOwners", FuelStationOwnerController::class);
Route::apiResource("FuelStations", FuelStationController::class);
Route::apiResource("OrdesFuel", OrderFuelController::class);
Route::apiResource("Order_Statuts", StatutOrderController::class);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
