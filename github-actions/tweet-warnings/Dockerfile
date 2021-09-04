FROM node:11-alpine

LABEL "name"="tweet-warnings"
LABEL "maintainer"="Geir Gåsodden <geir.gasodden@pythonia.no>"
LABEL "version"="1.0.0"

LABEL "com.github.actions.name"="Tweet warnings"
LABEL "com.github.actions.description"="Tweets warnings if there are any"
LABEL "com.github.actions.icon"="twitter"
LABEL "com.github.actions.color"="blue"

COPY . /

ENTRYPOINT ["sh", "/entrypoint.sh"]