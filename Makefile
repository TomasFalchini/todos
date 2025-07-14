.PHONY: help install dev dev-web dev-api build build-web build-api build-shared lint lint-fix format format-check type-check clean all check setup

# Variables
PACKAGE_MANAGER := pnpm

# Default target
help: ## Show this help message
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

# Setup and installation
install: ## Install all dependencies
	$(PACKAGE_MANAGER) install

setup: install ## Setup project (install dependencies)
	@echo "✅ Project setup complete!"

# Development
dev: ## Start development mode for all apps
	$(PACKAGE_MANAGER) run dev

dev-web: ## Start development mode for web app only
	$(PACKAGE_MANAGER) run dev:web

dev-api: ## Start development mode for API only
	$(PACKAGE_MANAGER) run dev:api

# Build
build: ## Build all packages and apps
	$(PACKAGE_MANAGER) run build

build-web: ## Build web app only
	$(PACKAGE_MANAGER) run build:web

build-api: ## Build API only
	$(PACKAGE_MANAGER) run build:api

build-shared: ## Build shared packages only
	$(PACKAGE_MANAGER) run build:shared

# Code quality
lint: ## Run linting
	$(PACKAGE_MANAGER) run lint

lint-fix: ## Run linting with auto-fix
	$(PACKAGE_MANAGER) run lint:fix

format: ## Format code with prettier
	$(PACKAGE_MANAGER) run format

format-check: ## Check code formatting
	$(PACKAGE_MANAGER) run format:check

type-check: ## Run TypeScript type checking
	$(PACKAGE_MANAGER) run type-check

# Quality checks (combined)
check: lint format-check type-check ## Run all code quality checks

fix: lint-fix format ## Fix all auto-fixable issues

# Maintenance
clean: ## Clean build artifacts and caches
	$(PACKAGE_MANAGER) run clean

clean-all: clean ## Clean everything including node_modules
	rm -rf node_modules
	rm -rf apps/*/node_modules
	rm -rf packages/*/node_modules
	rm -f pnpm-lock.yaml

reinstall: clean-all install ## Clean and reinstall all dependencies

# Combined workflows
all: install build check ## Install, build, and run all checks

ci: install build check ## CI pipeline: install, build, and check

# Docker
docker-build: ## Build Docker image
	docker build -t todos-monorepo .

docker-up: ## Start services with docker-compose
	docker-compose up -d

docker-down: ## Stop services with docker-compose
	docker-compose down

docker-logs: ## Show docker-compose logs
	docker-compose logs -f

docker-down-clean: ## Stop all docker services and remove volumes
	docker-compose down -v --remove-orphans

db-up-and-migrate: ## Start db in docker and run migrations
	docker-compose -f docker-compose.local.yaml up -d postgres

# Utilities
status: ## Show project status
	@echo "📊 Project Status:"
	@echo "Node version: $$(node --version)"
	@echo "pnpm version: $$(pnpm --version)"
	@echo "Workspaces:"
	@$(PACKAGE_MANAGER) list --depth=0 2>/dev/null | grep -E "^(apps|packages)/"

update: ## Update dependencies
	$(PACKAGE_MANAGER) update

outdated: ## Check for outdated dependencies
	$(PACKAGE_MANAGER) outdated 