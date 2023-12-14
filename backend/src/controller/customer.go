package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/kajiLabTeam/dx-waiting-time/model"
)

// customerが自分の番号を取得する
// 1. urlからownerIdを取得する
// 2. urlからdeviceTokenを取得する
// 3. オーナIDとデバイストークンを持っているユーザを検索
//	1. 存在していた場合、番号と待ち人数を返す
//	2. 存在していなかった場合、登録後に番号と待ち人数を返す
// 4. customerの作成

func GetCustomer(c *gin.Context) {
	token := c.Query("deviceToken")
	ownerId := c.Param("ownerId")

	customer, _ := model.GetCustomer(ownerId, token)
	if customer.FirebaseToken != "" {
		c.JSON(http.StatusOK, gin.H{"callNumber": customer.Position,})
		return
	}

	customer, err := model.CreateCustomer(ownerId, token)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK,gin.H{"callNumber": customer.Position,})
}

// customerが自分の前にいる人の情報を取得する
// 1. urlからownerIdを取得する
// 2. ownerIdとinfo.positionを元にcustomerを取得する
// 3. customerのwaitingStatusを"waiting"に変更する
// 4. スライスの長さを返す
func GetCustomerFollowing(c *gin.Context) {
	ownerId := c.Param("ownerId")

	deviceToken := c.Query("deviceToken")

	customer, _ := model.GetCustomerFollowing(ownerId, deviceToken)

	if _, err := model.UpdateCustomerStatus(ownerId, "waiting", deviceToken); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}

	c.JSON(http.StatusOK, gin.H{"following": len(customer)})
}

// customerを削除する
// 1. urlからownerIdを取得する
// 2. ownerIdとinfo.positionを元にcustomerを削除する
func DeleteCustomerPosition(c *gin.Context) {
	ownerId := c.Param("ownerId")
	deviceToken := c.Query("deviceToken")
	if _, err := model.DeleteCustomer(ownerId, deviceToken); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "delete customer " + deviceToken + " success"})
}
