# @pioug/blog

- Static site generated with [11ty](https://www.11ty.io/)
- Content authored with [GitHub Issues](https://github.com/pioug/blog/issues)
- Assets hosted with [GitHub Pages](https://pages.github.com/)
- Assets deployed with [GitHub Actions](https://github.com/features/actions)

## Setup

**GitHub Actions is required** (still in beta as far as know).

1. Fork (or copy) the repository.
2. Store GitHub access token as [Secrets](https://developer.github.com/actions/managing-workflows/storing-secrets/):

- `GH_API_TOKEN`: See [Creating a personal access token](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line#creating-a-token).
- `ACCESS_TOKEN`: Same as above but since I reuse an [existing action](https://github.com/JamesIves/github-pages-deploy-action), the environment variable has a different name than mine.

3. Enable GitHub Pages in the repository settings and set the `gh-pages` branch as source.

## Workflow

1. Create (or edit) an issue in the GitHub repository.
2. GitHub Actions receives an `issues` event.
3. A workflow fetches all issues labelled as `posts` in the repository using the GraphQL API of GitHub then uses Eleventy to compile the Markdown files using the body of the issues. The front matter is built from the title, tags and creation date of the issues.
4. Another workflow git-commits and git-pushes the build folder to the GitHub Pages branch.
5. GitHub Pages assets are automatically refreshed.

## Why

- Reuse the label system to manage the post tags (easy to assign, rename on GitHub).
- Articles are updated automatically as soon as I finish editing the corresponding issues.
- Image upload is simple as copy-pasting an image on GitHub
- No web server, no file bucket, no CDN to manage.
- The articles are editable in the browser.
- Bonus: No vendor lock-in? I feel like I could easily change the Docker/scripting part (used by GH Actions) or the hosting (S3 + CF) or the static site generator or without too much trouble. I can always return to markdown files if GitHub issues are a bad idea.
- Bonus: Giving editing permissions could be as simple as giving someone access
