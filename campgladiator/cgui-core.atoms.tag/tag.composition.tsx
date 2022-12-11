import React from "react";
import { Tag } from "./";

export const DefaultTags = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "5px",
    }}
  >
    <Tag>Tag</Tag>
    <Tag emphasis="primary">Tag</Tag>
    <Tag emphasis="secondary">Tag</Tag>
    <Tag variation="alternative">Tag</Tag>
    <Tag emphasis="primary" variation="alternative">
      Tag
    </Tag>
    <Tag emphasis="secondary" variation="alternative">
      Tag
    </Tag>
  </div>
);

export const SmallTags = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "5px",
    }}
  >
    <Tag size="small">Tag</Tag>
    <Tag size="small" emphasis="primary">
      Tag
    </Tag>
    <Tag size="small" emphasis="secondary">
      Tag
    </Tag>
    <Tag size="small" variation="alternative">
      Tag
    </Tag>
    <Tag size="small" emphasis="primary" variation="alternative">
      Tag
    </Tag>
    <Tag size="small" emphasis="secondary" variation="alternative">
      Tag
    </Tag>
  </div>
);

export const XSmallTags = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "5px",
    }}
  >
    <Tag size="xsmall">Tag</Tag>
    <Tag size="xsmall" emphasis="primary">
      Tag
    </Tag>
    <Tag size="xsmall" emphasis="secondary">
      Tag
    </Tag>
    <Tag size="xsmall" variation="alternative">
      Tag
    </Tag>
    <Tag size="xsmall" emphasis="primary" variation="alternative">
      Tag
    </Tag>
    <Tag size="xsmall" emphasis="secondary" variation="alternative">
      Tag
    </Tag>
  </div>
);

export const TinyTags = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "5px",
    }}
  >
    <Tag size="tiny">Tag</Tag>
    <Tag size="tiny" emphasis="primary">
      Tag
    </Tag>
    <Tag size="tiny" emphasis="secondary">
      Tag
    </Tag>
    <Tag size="tiny" variation="alternative">
      Tag
    </Tag>
    <Tag size="tiny" emphasis="primary" variation="alternative">
      Tag
    </Tag>
    <Tag size="tiny" emphasis="secondary" variation="alternative">
      Tag
    </Tag>
  </div>
);
