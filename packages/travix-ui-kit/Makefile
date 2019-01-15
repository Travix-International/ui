VERSION := patch
GITHUB_API_TOKEN := ""

release:
	echo "Releasing version: $(VERSION)"
	git checkout master
	git pull --no-rebase origin master
	npm run lint
	npm test
	npm run build
	npm version $(VERSION)
	npm publish

push-release:
	git checkout master
	git pull --no-rebase origin master
	git add package.json package-lock.json
	VERSION_NUMBER=$$(node -p 'require("./package.json").version');\
	GIT_TAG=v$$VERSION_NUMBER;\
	git commit -m $$VERSION_NUMBER;\
	git tag $$GIT_TAG;\
	git push origin master;\
	git push origin $$GIT_TAG

changelog:
	git checkout master
	git pull --no-rebase origin master
	github_changelog_generator -t $(GITHUB_API_TOKEN) -u Travix-International -p ui

push-changelog:
	git checkout master
	git pull --no-rebase origin master
	git add CHANGELOG.md
	git commit -m 'changelog updated.'
	git push origin master

prepare-site:
	rm -rf ./styleguide
	npm run styleguide:build
	# copy directly from the library
	cp ../css-themes-polyfill/src/index.js ./styleguide/css-themes-polyfill.js
