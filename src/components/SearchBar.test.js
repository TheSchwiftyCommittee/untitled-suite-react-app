import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { SearchBar } from "./SearchBar";

describe("SearchBar", () => {
  test("should render correctly", () => {
    const { queryByTestId, queryByPlaceholderText } = render(<SearchBar />);

    expect(queryByTestId("search-bar")).toBeTruthy();
    expect(queryByTestId("search-icon")).toBeTruthy();
    expect(queryByPlaceholderText("Search Title…")).toBeTruthy();
  });

  describe("Input Value", () => {
    test("should updates on change", () => {
      const setSearchInput = jest.fn();
      const { queryByPlaceholderText } = render(
        <SearchBar setSearchInput={setSearchInput} />
      );

      const searchInput = queryByPlaceholderText("Search Title…");
      fireEvent.change(searchInput, { target: { value: "test" } });
      expect(searchInput.value).toBe("test");
    });
  });
});
