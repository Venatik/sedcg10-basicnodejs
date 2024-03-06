const API_URL = "";

const fetchStudents = async (url) => {
    const response = await fetch(url);
    const result = await response.json();

    console.log(result);
};

const btn = document.getElementsByTagName("button")[0];

btn.addEventListener("click", () => {
    fetchStudents(API_URL);
});