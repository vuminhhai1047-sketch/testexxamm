let products = [
  { id: 1, name: "Laptop Dell XPS 13", price: 28500000, quantity: 12 },
  { id: 2, name: "Chuột Logitech MX Master", price: 1850000, quantity: 12 },
  { id: 3, name: "Bàn phím Keychron K2", price: 2200000, quantity: 12 },
  { id: 4, name: "Áo thun Basic Uniqlo", price: 390000, quantity: 12 },
  { id: 5, name: "Cà phê rang xay 500g", price: 185000, quantity: 12 },
];

const nameInput = document.getElementById("iName");
const priceInput = document.getElementById("iPrice");
const quantityInput = document.getElementById("iStock");
const btnSubmit = document.getElementById("btnSubmit");
const btnNew = document.getElementById("btnNew");
const btnCancel = document.getElementById("btn-cancel");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");

const loadProducts = () => {
  const data = localStorage.getItem("products");
  products = data ? JSON.parse(data) : products;
};

const saveProducts = () => {
  localStorage.setItem("products", JSON.stringify(products));
};

const renderProductsList = (container) => {
  loadProducts();

  const tbody = document.getElementById("tbody");
  tbody.innerHTML = "";

  container.forEach((product, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
                <td>${index + 1}</td>
                <td class="td-name">${product.name}</td>
                <td class="td-price">${product.price} ₫</td>
                <td class="center" style="font-weight: 700">${product.quantity}</td>
                <td>
                  <div class="td-actions">
                    <button class="btn btn-sm btn-edit"  onclick = "editId(${product.id})" >✏ Sửa</button>
                    <button class="btn btn-sm btn-del" onclick = "deleteProduct(${product.id})">✕ Xóa</button>
                  </div>
                </td>
        `;
    tbody.appendChild(tr);
  });
};

renderProductsList(products);

const check = products.findIndex((p) => {
    return p.name.toLowerCase() === nameInput.value.trim().toLowerCase();
});

const input = () => {
  nameInput.value = "";
  priceInput.value = "";
  quantityInput.value = "";
};

const createProducts = () => {
  const name = nameInput.value.trim();
  const price = +priceInput.value.trim();
  const quantity = +quantityInput.value.trim();

  if (!name || !price || !quantity) {
    return alert("Vui lòng không được để trống dữ liệu");
  }

  if (check !== -1 ) {
    return alert("Tên sản phẩm đã tồn tại");
  }

  if (price <= 0) {
    return alert("Giá phải là số dương lớn hơn 0 ");
  }

  if (quantity < 0) {
    return alert("Tồn kho phải là số nguyên lớn hơn hoặc bằng 0");
  }

  const newProducts = {
    id: Date.now(),
    name: name,
    price: price,
    quantity: quantity,
  };

  products.push(newProducts);

  saveProducts();
  renderProductsList(products);

  input();
};

const editId = (id) => {
  const find = products.find((s) => s.id == id);

  nameInput.value = find.name;
  priceInput.value = find.price;
  quantityInput.value = find.quantity;

  document.getElementById("updateId").value = find.id;

  btnSubmit.innerText = "Lưu thay đổi";
  btnCancel.style.display = "inline";
};

const updateProducts = () => {
  const id = document.getElementById("updateId").value;

  const findIndex = products.findIndex((s) => s.id == id);

  products[findIndex].name = nameInput.value;
  products[findIndex].price = +priceInput.value;
  products[findIndex].quantity = +quantityInput.value;

  const name = nameInput.value.trim();
  const price = +priceInput.value.trim();
  const quantity = +quantityInput.value.trim();

  if (!name || !price || !quantity) {
    return alert("Vui lòng không được để trống dữ liệu");
  }

  if (price <= 0) {
    return alert("Giá phải là số dương lớn hơn 0 ");
  }

  if (quantity < 0) {
    return alert("Tồn kho phải là số nguyên lớn hơn hoặc bằng 0");
  }

  saveProducts();
  renderProductsList(products);

  input();

  document.getElementById("updateId").value = "";
  btnSubmit.innerText = "Thêm sản phẩm ";
  btnNew.style.display = "none";
  btnCancel.style.display = "none";

};

btnSubmit.onclick = () => {
  const id = document.getElementById("updateId").value;

  if (id) {
    updateProducts();
  } else {
    createProducts();
  }
};

const cancel = () => {
    input();
    btnSubmit.innerText = "Thêm sản phẩm";
    btnCancel.style.display = "none";
}

btnCancel.addEventListener("click" , cancel);

const deleteProduct = (id) => {
  const confirmDelete = confirm("Bạn có chắc muốn xóa ca sĩ này không?");

  if (!confirmDelete) return;

  products = products.filter((s) => s.id != id);

  saveProducts();
  renderProductsList(products);
};

searchInput.addEventListener("input", () => {
  const search = searchInput.value;

  if (search !== "") {
    let newlist = products.filter((s) => {
      return s.name.toLowerCase().includes(search.toLowerCase().trim());
    });
    renderProductsList(newlist);
  } else {
    renderProductsList(products);
  }
});

const sortProducts = () => {
  if (sortSelect.value == "sort") {
    renderProductsList(products);
  } else if (sortSelect.value == "name_asc") {
    let newList = [...products].sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    renderProductsList(newList);
  } else if (sortSelect.value == "name_desc") {
    let newList = [...products].sort((a, b) => {
      return b.name.localeCompare(a.name);
    });
    renderProductsList(newList);
  } else if (sortSelect.value == "price_asc") {
    let newlist = [...products].sort((a, b) => {
      return a.price - b.price;
    });
    renderProductsList(newlist);
  } else if (sortSelect.value == "price_desc") {
    let newlist = [...products].sort((a, b) => {
      return b.price - a.price;
    });
    renderProductsList(newlist);
  }
};

sortSelect.addEventListener("change", sortProducts);





