package controller

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/kajiLabTeam/dx-waiting-time/model"
)

// customerが自分の番号を取得する
// 1. urlからownerIdを取得する
// 4. customerの作成
func GetCustomer(c *gin.Context) {
	token := c.Query("token")
	ownerId := c.Param("ownerId")
	customer, _ := model.CreateCustomer(ownerId, token)
	c.JSON(http.StatusOK,
		gin.H{
			"owner_id":   customer.OwnerId,
			"date":       customer.Date.Format("2006-01-02"),
			"callNumber": customer.Position,
		})
}

// func GetFollowing(c *gin.Context) {
// 	var info model.Customer
// 	if c.ShouldBind(&info) == nil {
// 		GetCustomerFollowing(c, info)
// 	} else {
// 		GetOwnerFollowing(c)
// 	}
// }

// customerが自分の前にいる人の情報を取得する
// 1. urlからownerIdを取得する
// 2. ownerIdとinfo.positionを元にcustomerを取得する
// 3. customerのwaitingStatusを"waiting"に変更する
// 4. スライスの長さを返す
func GetCustomerFollowing(c *gin.Context) {
	ownerId := c.Param("ownerId")

	position, _ := strconv.Atoi(c.Query("position"))

	customer, _ := model.GetCustomerFollowing(ownerId, position)

	model.UpdateCustomerStatus(ownerId, "waiting", position)

	c.JSON(http.StatusOK, gin.H{"following": len(customer)})
}

// customerを削除する
// 1. urlからownerIdを取得する
// 2. ownerIdとinfo.positionを元にcustomerを削除する
func DeleteCustomerPosition(c *gin.Context) {
	ownerId := c.Param("ownerId")
	position, _ := strconv.Atoi(c.Query("position"))
	model.DeleteCustomer(ownerId, position)
	c.JSON(http.StatusOK, gin.H{"message": "delete customer" + strconv.Itoa(position)})
}
