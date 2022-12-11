import React from "react";
import { Select } from "./";

export const BasicSelect = () => {
  return (
    <div style={{ height: "400px" }}>
      <Select
        name="basicSelect"
        searchRecords={[
          { itemId: "1", text: "Taylor K", type: "item" },
          { itemId: "2", text: "Tim T", type: "item" },
          { itemId: "3", text: "Carla P", type: "item" },
          { itemId: "4", text: "Carla B", type: "item" },
          { itemId: "5", text: "Lean C", type: "item" },
          { itemId: "6", text: "Lukasz W", type: "item" },
          { itemId: "7", text: "Zach W", type: "item" },
          { itemId: "8", text: "Jimena N", type: "item" },
          { itemId: "9", text: "Tom C", type: "item" },
        ]}
      />
    </div>
  );
};

export const InvalidSelect = () => {
  return (
    <div style={{ height: "400px" }}>
      <Select
        name="invalidSelect"
        invalid
        searchRecords={[
          { itemId: "1", text: "Taylor K", type: "item" },
          { itemId: "2", text: "Tim T", type: "item" },
          { itemId: "3", text: "Carla P", type: "item" },
          { itemId: "4", text: "Carla B", type: "item" },
          { itemId: "5", text: "Lean C", type: "item" },
          { itemId: "6", text: "Lukasz W", type: "item" },
          { itemId: "7", text: "Zach W", type: "item" },
          { itemId: "8", text: "Jimena N", type: "item" },
          { itemId: "9", text: "Tom C", type: "item" },
        ]}
      />
    </div>
  );
};

export const DisabledSelect = () => {
  return (
    <div style={{ height: "400px" }}>
      <Select
        name="disabledSelect"
        disabled
        searchRecords={[
          { itemId: "1", text: "Taylor K", type: "item" },
          { itemId: "2", text: "Tim T", type: "item" },
          { itemId: "3", text: "Carla P", type: "item" },
          { itemId: "4", text: "Carla B", type: "item" },
          { itemId: "5", text: "Lean C", type: "item" },
          { itemId: "6", text: "Lukasz W", type: "item" },
          { itemId: "7", text: "Zach W", type: "item" },
          { itemId: "8", text: "Jimena N", type: "item" },
          { itemId: "9", text: "Tom C", type: "item" },
        ]}
      />
    </div>
  );
};

export const BasicSelectWithPlaceholder = () => {
  return (
    <div style={{ height: "400px" }}>
      <Select
        placeholder="Insert Text Here"
        name="basicSelect"
        searchRecords={[
          { itemId: "1", text: "Taylor K", type: "item" },
          { itemId: "2", text: "Tim T", type: "item" },
          { itemId: "3", text: "Carla P", type: "item" },
          { itemId: "4", text: "Carla B", type: "item" },
          { itemId: "5", text: "Lean C", type: "item" },
          { itemId: "6", text: "Lukasz W", type: "item" },
          { itemId: "7", text: "Zach W", type: "item" },
          { itemId: "8", text: "Jimena N", type: "item" },
          { itemId: "9", text: "Tom C", type: "item" },
        ]}
      />
    </div>
  );
};

export const BasicSelectWithInitialValue = () => {
  return (
    <div style={{ height: "400px" }}>
      <Select
        placeholder="Insert Text Here"
        name="basicSelect"
        initialValue={[
          { itemId: "1", children: "Taylor K" },
          { itemId: "2", children: "Tim T" },
        ]}
        searchRecords={[
          { itemId: "1", text: "Taylor K", type: "item" },
          { itemId: "2", text: "Tim T", type: "item" },
          { itemId: "3", text: "Carla P", type: "item" },
          { itemId: "4", text: "Carla B", type: "item" },
          { itemId: "5", text: "Lean C", type: "item" },
          { itemId: "6", text: "Lukasz W", type: "item" },
          { itemId: "7", text: "Zach W", type: "item" },
          { itemId: "8", text: "Jimena N", type: "item" },
          { itemId: "9", text: "Tom C", type: "item" },
        ]}
      />
    </div>
  );
};
