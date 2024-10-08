let data = [];
    
// Функция для загрузки данных
async function fetchData() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    data = await response.json();
    renderTable(data);
}

// Функция для рендеринга таблицы
function renderTable(data) {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.title}</td>
            <td>${item.body}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Функция для сортировки таблицы
let sortDirection = [true, true, true]; // Масив для хранения направления сортировки
function sortTable(columnIndex) {
    sortDirection[columnIndex] = !sortDirection[columnIndex];
    data.sort((a, b) => {
        if (a[columnIndex] < b[columnIndex]) return sortDirection[columnIndex] ? -1 : 1;
        if (a[columnIndex] > b[columnIndex]) return sortDirection[columnIndex] ? 1 : -1;
        return 0;
    });
    renderTable(data);
}

// Функция для фильтрации таблицы
function filterTable() {
    const searchValue = document.getElementById('searchBar').value.toLowerCase();
    const filteredData = data.filter(item => 
        item.title.toLowerCase().includes(searchValue) || 
        item.body.toLowerCase().includes(searchValue)
    );
    renderTable(filteredData);
}

// Добавляем обработчик события для поиска
document.getElementById('searchBar').addEventListener('input', function() {
    if (this.value.length >= 3) {
        filterTable();
    } else {
        renderTable(data);
    }
});

// Загружаем данные при загрузке страницы
window.onload = fetchData;