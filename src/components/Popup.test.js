import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Popup from "./Popup";

describe("Popup", () => {
  const setOpenListPopup = jest.fn();
  const openListPopup = true

  test("shows children", () => {
    const { getByText } = render(
      <Popup
        title="Update List Title"
        openPopup={openListPopup}
        setOpenPopup={setOpenListPopup}
      >
        <div>test</div>
      </Popup>
    );
    expect(getByText("test")).toBeTruthy();
  });

  test("shows close button", () => {
    const { getByTestId } = render(
      <Popup
        title="Update List Title"
        openPopup={openListPopup}
        setOpenPopup={setOpenListPopup}
      >
        <div>test</div>
      </Popup>
    );
    fireEvent.click(getByTestId("popup-close"))
    expect(setOpenListPopup).toHaveBeenCalledTimes(1)
  });
});
