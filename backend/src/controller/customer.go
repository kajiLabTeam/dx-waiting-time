package controller

import (
	"github.com/gin-gonic/gin"
	"github.com/kajiLabTeam/dx-waiting-time/model"
)

func GetCustomerPosition(c *gin.Context) {

}

func GetFollowing(c *gin.Context) {
	var info model.Customer
	if c.ShouldBind(&info) == nil {
		GetCustomerFollowing(c, info)
	} else {
		GetOwnerFollowing(c)
	}
}

func GetCustomerFollowing(c *gin.Context, info model.Customer) {

}

func DeleteCustomerPosition(c *gin.Context) {

}