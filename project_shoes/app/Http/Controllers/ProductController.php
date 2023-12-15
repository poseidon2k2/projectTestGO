<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    public function index()
    {
        $products = DB::table('products')->get();
        return response()->json($products);
    }

    // Thêm các phương thức khác nếu cần
}
?>