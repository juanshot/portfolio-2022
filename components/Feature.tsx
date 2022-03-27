import React from "react";
import { sbEditable } from "@storyblok/storyblok-editable";
import { Blok } from "@/types/storyblokTypes";

const Feature = ({ blok }: { blok: Blok }) => (
  <div className="column feature" {...sbEditable(blok)}>
    {blok.name}
  </div>
);

export default Feature;
