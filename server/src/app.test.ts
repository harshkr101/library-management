import request from "supertest";
import { app } from "./app"; // assuming the Express app is defined in this file

describe("GET /books", () => {
  it("responds with 200 status and array of books if data is available", async () => {
    const response = await request(app).get("/books");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("responds with 404 status if data is not available", async () => {
    // Assuming the CSV file is empty or missing
    const response = await request(app).get("/books");
    expect(response.status).toBe(404);
  });

  it("responds with 500 status if an error occurs", async () => {
    // Assuming there is an internal server error (e.g. file path is incorrect)
    const response = await request(app).get("/books");
    expect(response.status).toBe(500);
  });
});

describe("GET /authors", () => {
  it("responds with 200 status and array of author is available", async () => {
    const response = await request(app).get("/authors");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("responds with 404 status if data is not available", async () => {
    // Assuming the CSV file is empty or missing
    const response = await request(app).get("/authors");
    expect(response.status).toBe(404);
  });

  it("responds with 500 status if an error occurs", async () => {
    // Assuming there is an internal server error (e.g. file path is incorrect)
    const response = await request(app).get("/authors");
    expect(response.status).toBe(500);
  });
});

describe("GET /magazines", () => {
  it("responds with 200 status and array of magazines is available", async () => {
    const response = await request(app).get("/magazines");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("responds with 404 status if data is not available", async () => {
    // Assuming the CSV file is empty or missing
    const response = await request(app).get("/magazines");
    expect(response.status).toBe(404);
  });

  it("responds with 500 status if an error occurs", async () => {
    // Assuming there is an internal server error (e.g. file path is incorrect)
    const response = await request(app).get("/magazines");
    expect(response.status).toBe(500);
  });
});

describe("GET /items/:isbn", () => {
  it("responds with 200 status and item object if matching ISBN exists", async () => {
    const response = await request(app).get("/items/1234567890");
    expect(response.status).toBe(200);
    expect(typeof response.body).toBe("object");
  });

  it("responds with 404 status if matching ISBN does not exist", async () => {
    const response = await request(app).get("/items/0987654321");
    expect(response.status).toBe(404);
  });

  it("responds with 500 status if an error occurs", async () => {
    const response = await request(app).get("/items/invalid");
    expect(response.status).toBe(500);
  });
});

describe("GET /items/author/:email", () => {
  it("responds with 200 status and item object if matching author exists", async () => {
    const response = await request(app).get(
      "/items/author/null-rabe@echocat.org"
    );
    expect(response.status).toBe(200);
    expect(typeof response.body).toBe("object");
  });

  it("responds with 404 status if matching author does not exist", async () => {
    const response = await request(app).get(
      "/items/author/samplemails@echocat.org"
    );
    expect(response.status).toBe(404);
  });

  it("responds with 500 status if an error occurs", async () => {
    const response = await request(app).get("/items/author/32313");
    expect(response.status).toBe(500);
  });
});

describe("GET /items/sorted", () => {
  it("responds with 200 status and sorted array of items if data is available", async () => {
    const response = await request(app).get("/items/sorted");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: expect.any(String),
        }),
      ])
    );
  });

  it("responds with 404 status if data is not available", async () => {
    // Assuming the CSV files are empty or missing
    const response = await request(app).get("/items/sorted");
    expect(response.status).toBe(404);
  });

  it("responds with 500 status if an error occurs", async () => {
    // Assuming there is an internal server error (e.g. file path is incorrect)
    const response = await request(app).get("/items/sorted");
    expect(response.status).toBe(500);
  });
});

describe("POST /add-item/book", () => {
  it("responds with 200 status if book data is valid and successfully added", async () => {
    const response = await request(app)
      .post("/add-item/book")
      .send({
        isbn: "1234-567-890",
        title: "Sample Book",
        authors: ["author1@example.com"],
        description: "A sample book description",
      });
    expect(response.status).toBe(200);
  });
});

describe("POST /add-item/magazine", () => {
  it("responds with 200 status if magazine data is valid and successfully added", async () => {
    const response = await request(app)
      .post("/add-item/book")
      .send({
        isbn: "1234-567-890-12",
        title: "Sample Magazine",
        authors: ["author1@example.com"],
      });
    expect(response.status).toBe(200);
  });
});
