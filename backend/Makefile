
DOCKER_COMPOSE := docker compose

compose/down:
	$(DOCKER_COMPOSE) down
	
compose/up:
	$(DOCKER_COMPOSE) up -d
	
compose/logs:
	$(DOCKER_COMPOSE) logs -f

MYSQL_ROOT_USER := root
MYSQL_ROOT_PASSWORD := admin
DATABASE   := dx_waiting

CONTAINER_NAME := GeekCamp_Nagoya_DB

mysql/shell:
	docker exec -it $(CONTAINER_NAME) mysql -u $(MYSQL_ROOT_USER) -p$(MYSQL_ROOT_PASSWORD) $(DATABASE)


	
	
	