const API_URL = "http://localhost:3000";

const fetchData = async (url) => {
    const response = await fetch(url);
    const result = await response.json();

    console.log(result);
};

const btn = document.getElementsByTagName("button")[0];

btn.addEventListener("click", () => {
    fetchData(API_URL);
});