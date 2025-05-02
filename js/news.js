const newsList = document.getElementById('news-list');
const news = [
    { id: 1, title: "Công nghệ máy cơ khí mới nhất 2023", content: "Công nghệ máy cơ khí đang phát triển mạnh mẽ...", image: "images/news1.jpg" },
    { id: 2, title: "Xu hướng máy CNC trong năm 2023", content: "Máy CNC đang trở thành xu hướng chủ đạo...", image: "images/news2.jpg" },
    { id: 3, title: "Ứng dụng máy cắt laser trong công nghiệp", content: "Máy cắt laser đang được ứng dụng rộng rãi...", image: "images/news3.jpg" }
];

news.forEach(item => {
    const newsItem = document.createElement('div');
    newsItem.className = 'news-item';
    newsItem.innerHTML = `
        <img src="${item.image}" alt="${item.title}" width="200">
        <h3>${item.title}</h3>
        <p>${item.content}</p>
        <a href="news-detail.html?id=${item.id}">Xem chi tiết</a>
    `;
    newsList.appendChild(newsItem);
});