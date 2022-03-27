import React from "react";
import DynamicComponent from "../components/DynamicComponent";
import Head from "next/head";
import styles from "../styles/Home.module.css";

import Storyblok, { useStoryblok } from "../lib/storyblok";
import {
  GetStaticPaths,
  GetStaticPathsResult,
  GetStaticProps,
  PreviewData,
} from "next";
import { Blok } from "@/types/storyblokTypes";

export default function Page({
  story,
  preview,
}: {
  story: Blok;
  preview: PreviewData;
}) {
  const enableBridge = true; // load the storyblok bridge everywhere
  // const enableBridge = preview; // enable bridge only in prevew mode
  story = useStoryblok(story, enableBridge);

  return (
    <div className={styles.container}>
      <Head>
        {/* TODO: Get rid of this hardcoded text */}
        <title>{story ? story.name : "Juan M. Garcia"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <h1>{story ? story.name : "Juan M. Garcia"}</h1>
      </header>

      <DynamicComponent blok={story.content} />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
}) => {
  // join the slug array used in Next.js catch-all routes
  let slug = params?.slug
    ? Array.isArray(params.slug)
      ? params.slug.join("/")
      : params.slug
    : "home";

  let sbParams = {
    // change to `published` to load the published version
    version: "draft", // or published
    cv: 0,
  };

  if (preview) {
    // set the version to draft in the preview mode
    sbParams.version = "draft";
    sbParams.cv = Date.now();
  }

  // NOTE: Only rendering what is inside the folder pages

  let { data } = await Storyblok.get(`cdn/stories/pages/${slug}`, sbParams);

  return {
    props: {
      story: data ? data.story : null,
      preview,
    },
    revalidate: 3600, // revalidate every hour
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // get all links from Storyblok
  let { data } = await Storyblok.get("cdn/links/", {
    start_with: "pages",
  });

  let paths: GetStaticPathsResult["paths"] = [];
  // create a routes for every link

  Object.keys(data.links).forEach((linkKey) => {
    // do not create a route for folders or the home (index) page
    if (data.links[linkKey].is_folder || data.links[linkKey].slug === "home") {
      return;
    }

    // get array for slug because of catch all
    const slug = data.links[linkKey].slug;
    let newSlug = slug.replace("pages", "");
    let splittedSlug = newSlug.split("/").filter((slug: string) => slug);
    // cretes all the routes
    paths.push({ params: { slug: splittedSlug } });
  });

  return {
    paths,
    fallback: false,
  };
};
