const loadComponent = (id, path) => {
    const element = document.getElementById(id);
    if (element) {
        fetch(path)
            .then(res => res.text())
            .then(data => element.innerHTML = data)
            .catch(err => console.error(`Error loading ${path}:`, err));
    }
};

// Tải các components chung
loadComponent("header", "/components/header.html");
loadComponent("footer", "/components/footer.html");

// Tải nội dung trang từ thư mục /pages/ tương ứng với `data-page`
const page = document.body.getAttribute("data-page");
if (page) {
    loadComponent("content", `/pages/${page}.html`);
}
