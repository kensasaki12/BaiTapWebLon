const urlParams = new URLSearchParams(window.location.search);
const newsId = urlParams.get('id');

const news = [
    { id: 1, title: "Công nghệ máy cơ khí mới nhất 2023", content: "Công nghệ máy cơ khí đang phát triển mạnh mẽ...", image: "images/news1.jpg" },
    { id: 2, title: "Xu hướng máy CNC trong năm 2023", content: "Máy CNC đang trở thành xu hướng chủ đạo...", image: "images/news2.jpg" },
    { id: 3, title: "Ứng dụng máy cắt laser trong công nghiệp", content: "Máy cắt laser đang được ứng dụng rộng rãi...", image: "images/news3.jpg" }
];

const newsItem = news.find(item => item.id == newsId);

if (newsItem) {
    document.getElementById('news-title').textContent = newsItem.title;
    document.getElementById('news-image').src = newsItem.image;
    document.getElementById('news-content').textContent = newsItem.content;
}