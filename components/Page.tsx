import DynamicComponent from "./DynamicComponent";
import { Blok } from "@/types/storyblokTypes";

const Page = ({ blok }: { blok: Blok }) => (
  <main>
    {blok.body
      ? blok.body.map((blok) => (
          <DynamicComponent blok={blok} key={blok._uid} />
        ))
      : null}
  </main>
);

export default Page;
