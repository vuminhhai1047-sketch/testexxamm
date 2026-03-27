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
const btnCancel = document.getElementById("btn-cancel");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");

const loadProducts = () => {
  const data = localStorage.getItem("products");
  if (data) products = JSON.parse(data);
};

const saveProducts = () => {
  localStorage.setItem("products", JSON.stringify(products));
};

const resetInput = () => {
  nameInput.value = "";
  priceInput.value = "";
  quantityInput.value = "";
};

const renderProductsList = (list) => {
  const tbody = document.getElementById("tbody");
  tbody.innerHTML = "";

  if (list.length === 0) {
    document.getElementById("emptyState").style.display = "block";
    return;
  } else {
    document.getElementById("emptyState").style.display = "none";
  }

  list.forEach((product, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${product.name}</td>
      <td>${product.price} ₫</td>
      <td>${product.quantity}</td>
      <td>
        <button onclick="editProduct(${product.id})">Sửa</button>
        <button onclick="deleteProduct(${product.id})">Xóa</button>
      </td>
    `;

    tbody.appendChild(tr);
  });
};

const createProduct = () => {
  const name = nameInput.value.trim();
  const price = +priceInput.value;
  const quantity = +quantityInput.value;

  if (!name || !price || !quantity) {
    return alert("Vui lòng không được để trống dữ liệu");
  }

  if (price <= 0) {
    return alert("Giá phải > 0");
  }

  if (quantity < 0) {
    return alert("Tồn kho >= 0");
  }

  const check = products.findIndex(
    (p) => p.name.toLowerCase() === name.toLowerCase()
  );

  if (check !== -1) {
    return alert("Tên sản phẩm đã tồn tại");
  }

  const newProduct = {
    id: Date.now(),
    name,
    price,
    quantity,
  };

  products.push(newProduct);

  saveProducts();
  renderProductsList(products);
  resetInput();
};

const editProduct = (id) => {
  const product = products.find((p) => p.id == id);

  nameInput.value = product.name;
  priceInput.value = product.price;
  quantityInput.value = product.quantity;

  document.getElementById("updateId").value = id;

  btnSubmit.innerText = "Lưu thay đổi";
  btnCancel.style.display = "inline";
};

const updateProduct = () => {
  const id = document.getElementById("updateId").value;
  const index = products.findIndex((p) => p.id == id);

  const name = nameInput.value.trim();
  const price = +priceInput.value;
  const quantity = +quantityInput.value;

  if (!name || !price || !quantity) {
    return alert("Vui lòng không được để trống dữ liệu");
  }

  if (price <= 0) {
    return alert("Giá phải > 0");
  }

  if (quantity < 0) {
    return alert("Tồn kho >= 0");
  }

  products[index] = {
    ...products[index],
    name,
    price,
    quantity,
  };

  saveProducts();
  renderProductsList(products);

  resetInput();
  document.getElementById("updateId").value = "";
  btnSubmit.innerText = "Thêm sản phẩm";
  btnCancel.style.display = "none";
};

btnSubmit.onclick = () => {
  const id = document.getElementById("updateId").value;

  if (id) {
    updateProduct();
  } else {
    createProduct();
  }
};

btnCancel.onclick = () => {
  resetInput();
  document.getElementById("updateId").value = "";
  btnSubmit.innerText = "Thêm sản phẩm";
  btnCancel.style.display = "none";
};

const deleteProduct = (id) => {
  const confirmDelete = confirm("Bạn có chắc muốn xóa sản phẩm này không?");
  if (!confirmDelete) return;

  products = products.filter((p) => p.id != id);

  saveProducts();
  renderProductsList(products);
};

searchInput.addEventListener("input", () => {
  const keyword = searchInput.value.toLowerCase().trim();

  if (!keyword) {
    renderProductsList(products);
    return;
  }

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(keyword)
  );

  renderProductsList(filtered);
});

sortSelect.addEventListener("change", () => {
  let newList = [...products];

  switch (sortSelect.value) {
    case "name_asc":
      newList.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name_desc":
      newList.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "price_asc":
      newList.sort((a, b) => a.price - b.price);
      break;
    case "price_desc":
      newList.sort((a, b) => b.price - a.price);
      break;
  }

  renderProductsList(newList);
});

loadProducts();
renderProductsList(products);