// Khởi tạo biến lưu trữ thông tin giỏ hàng
let cartItems = [];
let cartTotal = 0;


// Kiểm tra nếu có dữ liệu giỏ hàng trong localStorage
const storedCartItems = localStorage.getItem('cartItems');
if (storedCartItems) {
    cartItems = JSON.parse(storedCartItems);

    // Cập nhật giỏ hàng và hiển thị
    updateCart();
}

// Kiểm tra nếu có dữ liệu tổng giá trị trong localStorage
const storedCartTotal = localStorage.getItem('cartTotal');
if (storedCartTotal) {
    cartTotal = parseFloat(storedCartTotal);

    // Hiển thị tổng giá trị
    document.getElementById('cart-total').textContent = cartTotal.toFixed(2);
}


UpdateDatalocalStorage();

function addToCart(productName, productPrice, productImageUrl, productColor) {
    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ chưa
    const existingProduct = cartItems.find(item => item.name === productName);
    
    if (existingProduct) {
        // Nếu sản phẩm đã tồn tại, tăng số lượng
        existingProduct.quantity++;
    } else {
        // Nếu sản phẩm chưa tồn tại, thêm mới vào giỏ
        cartItems.push({ name: productName, price: productPrice, image: productImageUrl, quantity: 1 , color: productColor});
    }
    
    // Cập nhật danh sách sản phẩm trong giỏ hàng
    updateCart();
    
    // Ví dụ sử dụng JavaScript thông báo đơn giản
    alert('Added ' + productName + ' to cart. Price: $' + productPrice);
    UpdateDatalocalStorage();
    console.log(productColor);
}

function incrementQuantity(button, productName) {
    // Tìm sản phẩm trong giỏ hàng
    const product = cartItems.find(item => item.name === productName);

    // Tăng giá trị số lượng
    product.quantity++;

    // Cập nhật giá trị số lượng trong HTML
    button.parentElement.querySelector('.App_cartItemCountNumber_1Evq9').textContent = product.quantity;

    // Cập nhật tổng giá trị
    updateTotal();
}

function decrementQuantity(button, productName) {
    // Tìm sản phẩm trong giỏ hàng
    const product = cartItems.find(item => item.name === productName);

    // Giảm giá trị số lượng, nhưng không được giảm dưới 1
    if (product.quantity > 1) {
        product.quantity--;

        // Cập nhật giá trị số lượng trong HTML
        button.parentElement.querySelector('.App_cartItemCountNumber_1Evq9').textContent = product.quantity;

        // Cập nhật tổng giá trị
        updateTotal();
    }
}

function updateCart() {
    if (cartItems.length !== 0) {
        // Ẩn phần tử thông báo trống giỏ hàng
        document.getElementById('notification_EmptyCart').style.display = 'none';
    } else {
        // Hiển thị phần tử thông báo trống giỏ hàng
        document.getElementById('notification_EmptyCart').style.display = 'block';
    }
    // Cập nhật danh sách sản phẩm trong giỏ hàng
    const cartItemsElement = document.getElementById('cartItems');
    
    // Xóa nội dung cũ
    cartItemsElement.innerHTML = '';

    // Hiển thị danh sách sản phẩm trong giỏ hàng
    cartItems.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <div class="App_cartItem_lfA9I">
                <div class="App_cartItemLeft_1HqDk cartItemLeft">
                    <div class="App_cartItemImage_1rLvq cartItemImage" style="background-color: ${item.color};">
                        <div class="App_cartItemImageBlock_wRE4E"><img src="${item.image}" alt="${item.name}"></div>
                    </div>
                </div>
                <div class="App_cartItemRight_2LNcC cartItemRight">
                    <div class="App_cartItemName_3he6M cartItemName">${item.name}</div>
                    <div class="App_cartItemPrice_R0sr2 cartItemPrice">$${item.price}</div>
                    <div class="App_cartItemActions_13kia cartItemActions">
                        <div class="App_cartItemCount_1GCCN cartItemCount">
                            <div class="App_cartItemCountButton_Gr8VG" onclick="decrementQuantity(this, '${item.name}')">-</div>
                            <div class="App_cartItemCountNumber_1Evq9">${item.quantity}</div>
                            <div class="App_cartItemCountButton_Gr8VG" onclick="incrementQuantity(this, '${item.name}')">+</div>
                        </div>
                        <div class="App_cartItemRemove_1GiLR cartItemRemove" onclick="removeFromCart('${item.name}')"><img src="../img/trash.png"></div>
                    </div>
                </div>
            </div>
        `;
        cartItemsElement.appendChild(listItem);
    });

    // Cập nhật tổng giá trị
    updateTotal();
    
}

function updateTotal() {
    // Cập nhật tổng giá trị
    const cartTotalElement = document.getElementById('cart-total');
    cartTotal = 0.0;

    // Tính tổng giá trị giỏ hàng
    cartItems.forEach(item => {
        cartTotal += item.price * item.quantity;
    });

    // Hiển thị tổng giá trị
    cartTotalElement.textContent = cartTotal.toFixed(2);
}

function removeFromCart(productName) {
    // Tìm sản phẩm trong giỏ hàng
    const productIndex = cartItems.findIndex(item => item.name === productName);

    if (productIndex !== -1) {
        // Xoá sản phẩm khỏi mảng
        cartItems.splice(productIndex, 1);

        // Cập nhật danh sách sản phẩm trong giỏ hàng
        updateCart();

        // Cập nhật tổng giá trị
        updateTotal();
    }
    
    UpdateDatalocalStorage()
}

function UpdateDatalocalStorage(){
    // Lưu thông tin giỏ hàng vào localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    // Lưu tổng giá trị vào localStorage
    localStorage.setItem('cartTotal', cartTotal.toString());
}