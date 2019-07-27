workflow "Deploy to GitHub Pages on push" {
  on = "push"
  resolves = [
    "Deploy to GitHub Pages",
  ]
}

workflow "Deploy to GitHub Pages on issues" {
  on = "issues"
  resolves = [
    "Deploy to GitHub Pages",
  ]
}

action "Deploy to GitHub Pages" {
  uses = "JamesIves/github-pages-deploy-action@master"
  env = {
    BRANCH = "gh-pages"
    BUILD_SCRIPT = "npm ci && npm run build"
    FOLDER = "_site"
  }
  secrets = ["ACCESS_TOKEN"],
  needs = "Get posts from GitHub Issues"
}

action "Get posts from GitHub Issues" {
  uses = "./.github/actions/setup"
  secrets = [
    "GH_API_TOKEN"
  ]
  args = "npx gulp github:issues"
}
