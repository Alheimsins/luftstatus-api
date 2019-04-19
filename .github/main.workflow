workflow "Updates data" {
  resolves = ["Commit changes"]
  on = "schedule(0 * * * *)"
}

action "Install dependencies" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "install"
}

action "Get latest data" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "run update-data"
  needs = ["Install dependencies"]
}

action "Deploy to now" {
  uses = "actions/zeit-now@666edee2f3632660e9829cb6801ee5b7d47b303d"
  args = "--team alheimsins"
  secrets = ["ZEIT_TOKEN"]
  needs = ["Get latest data"]
}

action "Alias deployment" {
  uses = "actions/zeit-now@666edee2f3632660e9829cb6801ee5b7d47b303d"
  needs = ["Deploy to now"]
  args = "alias --team alheimsins"
  secrets = ["ZEIT_TOKEN"]
}

action "Commit changes" {
  uses = "./github-actions/commit-changes"
  needs = ["Alias deployment"]
  args = "Data updated"
  secrets = ["GITHUB_TOKEN"]
}
