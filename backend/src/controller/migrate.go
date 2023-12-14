package controller

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/kajiLabTeam/dx-waiting-time/model"
)

func Migration(c *gin.Context) {
	var test []model.Test
	count, _ := strconv.Atoi(c.Query("count"))
	err := c.BindJSON(&test)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
	}

	if test[0].OwnerId == "" {
		test[0].OwnerId = "edXser3IVCb1e2HsA1MX9QUxiol1"
	}
	if test[0].DeviceToken == "" {
		test[0].DeviceToken = "cbVI_cPqTIl6kiFQbGldTW:APA91bEqzw1PHHeN1ozGyb-_5iltKelBcE-2zC4pqVf-b9tSG5l7iVvI8BdNbbhUHgUnicmLrbVU4coqlgLJP0IKmuhXuxwY0Thu4rmgFrpriT9mcF7aKv2YzZGVoSirUgPZnEFKk55K"
	}
	if test[1].OwnerId == "" {
		test[1].OwnerId = "awoO21MPlEc3iXOTSYKGBfZiTrr1"
	}
	if test[1].DeviceToken == "" {
		test[1].DeviceToken = "cbVI_cPqTIl6kiFQbGldTW:APA91bEqzw1PHHeN1ozGyb-_5iltKelBcE-2zC4pqVf-b9tSG5l7iVvI8BdNbbhUHgUnicmLrbVU4coqlgLJP0IKmuhXuxwY0Thu4rmgFrpriT9mcF7aKv2YzZGVoSirUgPZnEFKk55K"
	}

	err = model.Migration(count, test)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{})
}
