import React from "react";
import DynamicComponent from "./DynamicComponent";
import { sbEditable } from "@storyblok/storyblok-editable";
import { Blok } from "@/types/storyblokTypes";

const Grid = ({ blok }: { blok: Blok }) => {
  return (
    <div className="grid" {...sbEditable(blok)}>
      {blok.columns.map((blok) => (
        <DynamicComponent blok={blok} key={blok._uid} />
      ))}
    </div>
  );
};

export default Grid;
