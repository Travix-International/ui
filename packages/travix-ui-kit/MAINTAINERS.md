# Maintainers

## Pull requests

When merging pull requests on GitHub, use the [squash and merge](https://github.com/blog/2141-squash-your-commits) button, so that the `master` branch timeline is linear.

## Releases

To publish a new release to npm:

```
$ make release VERSION=<version>
```

where `<version>` if one of `patch`, `minor` or `major`.

### Pushing `package.json` and `package-lock.json`

Once the release is published, you can commit, tag and push the updated package files:

```
$ make push-release
```

## Changelogs

Changelogs are generated using the `github_changelog_generator` gem.

Make sure you have Ruby v2.3.0+:

```
$ gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3
$ curl -sSL https://get.rvm.io | bash -s stable

$ rvm install 2.3.0
```

Then install the gem:

```
$ gem install github_changelog_generator
```

Now you can generate `CHANGELOG.md` file automatically by running:

```
$ make changelog GITHUB_API_TOKEN="<your-github-token>"
```

### Generating a GitHub API token

You can generate a token [here](https://github.com/settings/tokens/new?description=GitHub%20Changelog%20Generator%20token).

Since this is a public repository, you only need `public_repo` access for the token.

### Pushing `CHANGELOG.md`

Once the `CHANGELOG.md` file is generated, it is up to you to commit and push it.

There is a handy command available:

```
$ make push-changelog
```

## Adding release notes

After `CHANGELOG.md` is pushed, release notes should be added.

In the GitHub repository page, navigate to the _Releases_ section, open the new tag and click the `Edit tag` button.
Then, add the respective `CHANGELOG.md` notes in the description field and publish the release.
