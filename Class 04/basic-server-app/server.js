import http from "node:http";
// HTTP defines the protocol in which the client and server communicate

const server = http.createServer((request, response) => {
    // console.log("Hello world!");
    // console.log(request);

    // request.url is everything that comes after http://localhost:3000/
    const url = request.url; // logs only "/" which is the default route
    // console.log("URL:", url);

    const method = request.method;
    console.log("Method:", method);

    const headers = request.headers;
    // console.log("Headers:", headers);

    if (request.url === "/") {
        response.setHeader("Content-Type", "text/html");
        response.write(`<h1>Hello! This is my first server.</h1>`);
        return response.end(); // The argument is optional. The value will be written to the response and the response will be closed.
    }

    if (request.url === "/home") {
        response.setHeader("Content-Type", "text/html");
        response.write(`<h1>Welcome to the home page!</h1>`);
        return response.end();
    }

    if (url === "/notes") {
        response.setHeader("Content-Type", "text/html");
        response.write(`<h1>We are on the /notes route.</h1>`);

        // Using .on is the same as using .addEventListener in the browser
        const chunksReceived = [];

        request.on("data", (chunk) => {
            console.log(chunk);
            chunksReceived.push(chunk);
        });

        request.on("end", () => {
            const parsedData = Buffer.concat(chunksReceived) // noteName=learn+coding
            console.log("Parsed data:", parsedData); // [noteName, learn+coding]
            const data = parsedData.split("-");
            const noteReceived = data[1]; // learn+coding
            formattedNote = noteReceived.replace("+", ""); // learn coding
            console.log(formattedNote);
        });
        return response.end();
    }

    if (url === "/add_note") {
        response.setHeader("Content-Type", "text/html");
        response.write(`
            <form action="/notes" method="post">
                <input type="text" name="note" placeholder="Your note here">
                <button type="submit">Add note</button>
            </form>
        `)
        return response.end();
    }
});

server.listen(3000, () => {
    console.log(`The server is up and running on port 3000.`);
});