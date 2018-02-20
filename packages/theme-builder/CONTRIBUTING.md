# Contributing

## Pull Requests

When merging Pull Requests on GitHub, use the [squash and merge](https://github.com/blog/2141-squash-your-commits) button, so that our timeline of master branch is linear.

## Releases

To publish a new release:

```
$ git checkout master
$ git pull origin master

$ npm run transpile
$ npm version patch(|minor|major)
$ npm publish
$ git push --follow-tags
```

## Changelogs

You should provide proper change log. Later we will automate to assemble from commit messages
