import React from "react";
import { screen } from "@testing-library/dom";
import { fireEvent, render } from "@testing-library/react";
import { ListMenuProps } from "../cgui-core.molecules.list-menu";
import Select from "./select";

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

const records: ListMenuProps["items"] = [
  { type: "header", text: "Lead" },
  {
    itemId: "1",
    text: "Taylor K",
    type: "item",
  },
  { type: "divider" },
  { type: "header", text: "Engineers" },
  { itemId: "2", text: "Tim T", type: "item" },
  { itemId: "3", text: "Carla P", type: "item" },
  { itemId: "4", text: "Carla B", type: "item" },
  { itemId: "5", text: "Lean C", type: "item" },
  { itemId: "6", text: "Lukasz W", type: "item" },
  { itemId: "7", text: "Zach W", type: "item" },
  { itemId: "8", text: "Jimena N", type: "item" },
  { itemId: "9", text: "Tom C", type: "item" },
];

describe("Select component", () => {
  it("should render invalid", () => {
    const { container } = render(
      <Select name="Select" searchRecords={records} invalid />
    );
    expect(container.firstChild.firstChild).toHaveAttribute(
      "data-invalid",
      "true"
    );
  });

  it("should render disabled", () => {
    const { container } = render(
      <Select name="Select" searchRecords={records} disabled />
    );
    expect(container.firstChild.firstChild).toHaveAttribute(
      "data-disabled",
      "true"
    );
  });

  it("should render select with placeholder", () => {
    const { container } = render(
      <Select name="Select" placeholder="Placeholder" searchRecords={records} />
    );
    expect(container.firstChild).toHaveTextContent("Placeholder");
  });

  it("should render search record with given value", () => {
    const { container } = render(
      <Select name="Select" searchRecords={records} />
    );
    const input = container.querySelector("input:not([type='hidden'])");
    fireEvent.change(input, {
      target: { value: "T" },
    });
    fireEvent.focus(input);
    expect(container.firstChild.lastChild).toHaveTextContent("Taylor K");
  });

  it("should not render search record with given value", () => {
    const { container } = render(
      <Select name="Select" searchRecords={records} />
    );
    const input = container.querySelector("input:not([type='hidden'])")!;
    fireEvent.change(input, {
      target: { value: "X" },
    });
    fireEvent.focus(input);
    expect(container.firstChild.lastChild).not.toHaveTextContent("Taylor K");
  });

  it("should add a chip when record clicked", () => {
    const { container } = render(
      <Select name="Select" searchRecords={records} />
    );
    const input = container.querySelector("input:not([type='hidden'])");
    fireEvent.change(input, {
      target: { value: "T" },
    });
    fireEvent.focus(input);
    const record = screen.getByText("Taylor K");
    fireEvent.click(record);
    expect(container.firstChild.firstChild).toHaveTextContent("Taylor K");
  });

  it("should remove chip when chip remove btn clicked", () => {
    const { container } = render(
      <Select name="Select" searchRecords={records} />
    );
    const input = container.querySelector("input:not([type='hidden'])");
    fireEvent.change(input, {
      target: { value: "T" },
    });
    fireEvent.focus(input);
    const record = screen.getByText("Taylor K");
    fireEvent.click(record);
    const chipRemoveBtn =
      container.firstChild.firstChild.firstChild.firstChild.lastChild;
    fireEvent.click(chipRemoveBtn);
    expect(container.firstChild.firstChild).not.toHaveTextContent("Taylor K");
    expect(
      container.firstChild.firstChild.firstChild.childNodes.length
    ).toEqual(2);
  });

  it("should remove all chips when clear btn clicked", () => {
    const { container } = render(
      <Select name="Select" searchRecords={records} />
    );
    const input = container.querySelector("input:not([type='hidden'])");
    fireEvent.change(input, {
      target: { value: "T" },
    });
    fireEvent.focus(input);
    const record = screen.getByText("Taylor K");
    fireEvent.click(record);
    const clearBtn = container.querySelector("button.clearBtn");
    fireEvent.click(clearBtn);
    expect(container.firstChild.firstChild).not.toHaveTextContent("Taylor K");
    expect(
      container.firstChild.firstChild.firstChild.childNodes.length
    ).toEqual(2);
  });

  it("should render all records", () => {
    const { container } = render(
      <Select name="Select" searchRecords={records} />
    );
    const input = container.querySelector("input:not([type='hidden'])");
    fireEvent.change(input, {
      target: { value: " " },
    });
    fireEvent.focus(input);
    const listMenu = container.firstChild.lastChild.firstChild.firstChild;
    expect(listMenu.childNodes.length).toEqual(12);
  });

  it("should render filtered records", () => {
    const { container } = render(
      <Select name="Select" searchRecords={records} />
    );
    const input = container.querySelector("input:not([type='hidden'])");
    fireEvent.change(input, {
      target: { value: "Q" },
    });
    fireEvent.focus(input);
    const listMenu = container.firstChild.lastChild.firstChild.firstChild;
    expect(listMenu.childNodes.length).toEqual(3);
  });

  it("should pass up selected records through prop", () => {
    let selectedRecords = [];
    const handleOnChangeSelectedRecords = (records) => {
      selectedRecords = records;
    };
    const { container } = render(
      <Select
        name="Select"
        searchRecords={records}
        onChangeSelectedRecords={handleOnChangeSelectedRecords}
      />
    );
    const input1 = container.querySelector("input:not([type='hidden'])");
    fireEvent.change(input1, {
      target: { value: "T" },
    });
    fireEvent.focus(input1);
    const record1 = screen.getByText("Taylor K");
    fireEvent.click(record1);
    const input2 = container.querySelector("input:not([type='hidden'])");
    fireEvent.change(input2, {
      target: { value: "T" },
    });
    fireEvent.focus(input2);
    const record2 = screen.getByText("Tim T");
    fireEvent.click(record2);
    expect(selectedRecords).toEqual([
      { itemId: "1", children: "Taylor K" },
      { itemId: "2", children: "Tim T" },
    ]);
    expect(selectedRecords).not.toContain({ itemId: "3", children: "Carla P" });
  });

  it("should render input field with initial values provided", () => {
    const { container } = render(
      <Select
        name="Select"
        searchRecords={records}
        initialValue={[
          { itemId: "1", children: "Taylor K" },
          { itemId: "2", children: "Tim T" },
        ]}
      />
    );
    expect(container.firstChild.firstChild).toHaveTextContent("Taylor K");
    expect(container.firstChild.firstChild).toHaveTextContent("Tim T");
    expect(container.firstChild.firstChild).not.toHaveTextContent("Carla P");
  });
});
