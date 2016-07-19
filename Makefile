PHONY: refresh

init:
	@echo "Removing node_modules directory"
	@rm -rf node_modules

	@echo "Removing bower_components directory"
	@rm -rf bower_components

	@echo "Removing dist/ directory"
	@rm -rf dist

	@echo "Install Node modules"
	@npm install

fresh:
	@echo "Remove Git"
	@rm -rf .git

	@echo "Creating new Git repo"
	@git init

	@echo "Install Node modules"
	@npm install

refresh:
	@echo "Removing node_modules directory"
	@rm -rf node_modules

	@echo "Removing bower_components directory"
	@rm -rf bower_components

	@echo "Cleaning NPM cache"
	@npm cache clean

build:
	@echo "Cleaning dist/ directory"
	@gulp clean
	@echo "Building vendor file"
	@gulp vendor && gulp images
	@echo "Building application assets"
	@gulp js && gulp css && gulp html
