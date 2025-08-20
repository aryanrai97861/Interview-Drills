up:
	docker compose up --build

down:
	docker compose down

seed:
	cd api && npm install && npm run seed

logs:
	docker compose logs -f
