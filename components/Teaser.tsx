import React from "react";
import { sbEditable } from "@storyblok/storyblok-editable";
import { Blok } from "@/types/storyblokTypes";

const Teaser = ({ blok }: { blok: Blok }) => {
  return <h2 {...sbEditable(blok)}>{blok.headline}</h2>;
};

export default Teaser;
