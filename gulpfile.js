"use strict";

const gulp = require("gulp");

const GH_API_TOKEN = process.env.GH_API_TOKEN;

gulp.task("github:issues", getGitHubIssues);

async function getGitHubIssues() {
  const graphql = require("graphql.js");
  const graph = graphql("https://api.github.com/graphql", {
    headers: {
      Authorization: `Bearer ${GH_API_TOKEN}`,
      "User-Agent": "pioug"
    },
    asJSON: true
  });
  const query = graph(
    `
    query ($number_of_issues: Int!) {
      repository(owner:"pioug", name:"blog") {
        issues(last:20) {
          edges {
            node {
              title
              createdAt,
              body,
              bodyText,
              labels(first: $number_of_issues) {
                edges {
                  node {
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  `
  );
  const {
    repository: {
      issues: { edges: issues }
    }
  } = await query({
    number_of_issues: 100
  });

  issues
    .filter(({ node: { labels: { edges: labels } } }) =>
      labels.some(({ name }) => "posts")
    )
    .forEach(function({ node: issue }) {
      const fs = require("fs");
      const slugify = require("slugify");
      const { title, createdAt, body, bodyText, labels } = issue;
      const description = bodyText
        .replace(/\s+/g, " ")
        .split(" ")
        .reduce(
          (res, token) => (res.length > 200 ? `${res}` : res + " " + token),
          ""
        );
      const md = [
        `---`,
        `title: ${title}`,
        `date: ${createdAt.toString()}`,
        `description: ${
          description.length >= 200 ? description + "..." : description
        }`,
        `layout: post.njk`,
        `tags:`,
        `${labels.edges.map(label => `  - ${label.node.name}`).join("\n")}`,
        `---`,
        `${body}`
      ].join("\n");
      const filename =
        slugify(title, {
          remove: /[.,\/#!$%\^&\*;:{}=\-_`~()]/g,
          lower: true
        }) + ".md";
      console.log(`Write ${filename}`);
      fs.writeFileSync(`./posts/${filename}`, md);
    });
}
