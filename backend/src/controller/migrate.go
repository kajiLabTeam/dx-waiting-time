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

	err = model.Migration(count, test)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{})
}
