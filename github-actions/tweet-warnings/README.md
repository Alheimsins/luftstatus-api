# Tweet warnings

Tweet warnings if there are any

```
action "Tweet warnings" {
  uses = "./github-action/tweet-warnings"
  needs = ["Commit changes"]
  secrets = ["TWITTER_CONSUMER_KEY", "TWITTER_CONSUMER_SECRET", "TWITTER_ACCESS_TOKEN", "TWITTER_ACCESS_TOKEN_SECRET"]
}
```
