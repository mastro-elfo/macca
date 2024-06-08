import fs from "fs";
import path from "path";

import db from "../public/data/db.json";

import { describe, expect, it } from "vitest";

describe("Database", () => {
  it("should have unique artwork id", () => {
    const ids = db.artworks.map((artwork) => artwork.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("should have unique author id", () => {
    const ids = db.authors.map((author) => author.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("should match artwork authorId with author id", () => {
    const ids = db.artworks.map((artwork) => artwork.authorIds).flat();
    ids.forEach((authorId) => {
      expect(db.authors.find((author) => author.id === authorId)).toBeTruthy();
    });
  });

  it("should match artwork image with image file", () => {
    const ids = db.artworks
      .map((artwork) => artwork.images)
      .flat()
      .map((image) => image.path);
    ids.forEach((image) => {
      expect(fs.existsSync(path.join("public", "media", image))).toBeTruthy();
    });
  });
});
