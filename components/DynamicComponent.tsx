import Teaser from "./Teaser";
import Grid from "./Grid";
import Feature from "./Feature";
import Page from "./Page";
import { Blok } from "@/types/storyblokTypes";

// resolve Storyblok components to Next.js components

interface Indexable {
  [key: string]: ({ blok }: { blok: Blok }) => JSX.Element;
}

const Components: Indexable = {
  teaser: Teaser,
  grid: Grid,
  feature: Feature,
  page: Page,
};

const DynamicComponent = ({ blok }: { blok: Blok }) => {
  // check if component is defined above
  if (typeof Components[blok.component] !== "undefined") {
    const Component = Components[blok.component];

    return <Component blok={blok} key={blok._uid} />;
  }

  // fallback if the component doesn't exist
  return (
    <p>
      The component <strong>{blok.component}</strong> has not been created yet.
    </p>
  );
};

export default DynamicComponent;
