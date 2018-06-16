VERSION := patch
GITHUB_API_TOKEN := ""

release:
	echo "Releasing version: $(VERSION)"
	git checkout master
	git pull origin master
	npm run lint
	npm run test
	npm run build
	npm version $(VERSION)
	npm publish
	make publish-site

changelog:
	git checkout master
	git pull origin master
	github_changelog_generator -t $(GITHUB_API_TOKEN) -u Travix-International -p ui

push-changelog:
	git checkout master
	git pull origin master
	git add CHANGELOG.md
	git commit -m 'changelog updated.'
	git push origin master

prepare-site:
	rm -rf ./styleguide
	npm run styleguide:build
	ls -la ./styleguide/
	# copy directly from the library
	cp ../css-themes-polyfill/src/index.js ./styleguide/css-themes-polyfill.js
	cp .gitignore ./styleguide/.gitignore

publish-site-only:
	(cd ./styleguide && git init)
	(cd ./styleguide && git commit --allow-empty -m 'update site')
	(cd ./styleguide && git checkout -b gh-pages)
	(cd ./styleguide && touch .nojekyll)
	(cd ./styleguide && git add .)
	(cd ./styleguide && git commit -am 'update site')
	(cd ./styleguide && git push git@github.com:Travix-International/ui.git gh-pages --force)

publish-site:
	make prepare-site
	make publish-site-only
