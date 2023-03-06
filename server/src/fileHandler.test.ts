import fs from "fs/promises";
import { FileHandler } from "./fileHandler";

describe("FileHandler Test", () => {
  const testFilePath = "test-data.csv";
  const testData = [
    { name: "John", age: 30 },
    { name: "Jane", age: 25 },
  ];

  beforeEach(async () => {
    await fs.writeFile(testFilePath, "name,age\n");
  });

  afterEach(async () => {
    await fs.unlink(testFilePath);
  });

  describe("read()", () => {
    it("should read data from file", async () => {
      const fileHandler = new FileHandler(testFilePath);
      await fs.appendFile(testFilePath, "John,30\nJane,25\n");

      const data = await fileHandler.read();

      expect(data).toEqual(testData);
    });

    it("should return null when file does not exist", async () => {
      const fileHandler = new FileHandler("nonexistent-file.csv");

      const data = await fileHandler.read();

      expect(data).toBeNull();
    });
  });

  describe("write()", () => {
    it("should write data to file", async () => {
      const fileHandler = new FileHandler(testFilePath);

      await fileHandler.write(testData);

      const data = await fs.readFile(testFilePath, "utf8");
      expect(data).toEqual("name,age\nJohn,30\nJane,25\n");
    });
  });
});
