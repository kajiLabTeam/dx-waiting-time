
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


BASE_URL := https://dx-waiting-time.vercel.app/api
REQUEST_BODY := '{{"ownerId": "edXser3IVCb1e2HsA1MX9QUxiol1","deviceToken": "cbVI_cPqTIl6kiFQbGldTW:APA91bEqzw1PHHeN1ozGyb-_5iltKelBcE-2zC4pqVf-b9tSG5l7iVvI8BdNbbhUHgUnicmLrbVU4coqlgLJP0IKmuhXuxwY0Thu4rmgFrpriT9mcF7aKv2YzZGVoSirUgPZnEFKk55K"},{"ownerId": "awoO21MPlEc3iXOTSYKGBfZiTrr1","deviceToken": "cbVI_cPqTIl6kiFQbGldTW:APA91bEqzw1PHHeN1ozGyb-_5iltKelBcE-2zC4pqVf-b9tSG5l7iVvI8BdNbbhUHgUnicmLrbVU4coqlgLJP0IKmuhXuxwY0Thu4rmgFrpriT9mcF7aKv2YzZGVoSirUgPZnEFKk55K"}}'

migrate:
	curl -X POST -H "Content-Type: application/json" -b REQUEST_BODY $(BASE_URL)/migrate