package controller

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/kajiLabTeam/dx-waiting-time/integrations"
	"github.com/kajiLabTeam/dx-waiting-time/model"
)

// Ownerの登録
// 1. firebaseの認証
// 2. tokenからuuidとownerNameを取得する
// 4. uuidとOwnerNameを元にownerを作成する
func PostOwner(c *gin.Context) {
	auth := c.Request.Header.Get("Authorization")
	tId := strings.TrimPrefix(auth, "Bearer ")
	t, err := integrations.VerifyIDToken(tId)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	ownerId := t.UID
	var o model.Owner
	o, _ = model.GetOwner(ownerId)
	if o.OwnerName == "" {
		nameInterfase := t.Claims["name"]
		ownerName := nameInterfase.(string)

		no, _ := model.CreateOwner(ownerId, ownerName)
		c.JSON(http.StatusOK, no)
		return
	}

	fmt.Println(o)
	c.JSON(http.StatusOK, o)
}

// 並んでいる人数を取得する
// 1. firebaseの認証をする
// 2. tokenからownerIdを取得する
// 3. ownerIdを元にcustomerを取得する
// 4. customerの数を返す
func GetFollowing(c *gin.Context) {
	auth := c.Request.Header.Get("Authorization")
	tId := strings.TrimPrefix(auth, "Bearer ")
	t, err := integrations.VerifyIDToken(tId)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	ownerId := t.UID
	customer, err := model.GetFollowing(ownerId)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"following": len(customer)})
}

// 次に呼び出されるcustomerの情報を取得する
// 1. firebaseの認証をする
// 2. tokenからownerIdを取得する
// 3. ownerIdを元にcustomerを取得する
// 4. customerに対して呼び出し通知を送る
// 5. customerの情報を返す
func GetNextCustomer(c *gin.Context) {
	auth := c.Request.Header.Get("Authorization")
	tId := strings.TrimPrefix(auth, "Bearer ")
	t, err := integrations.VerifyIDToken(tId)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}
	OwnerId := t.UID
	customer, err := model.GetNextCustomer(OwnerId)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	integrations.CallNotification(customer)

	c.JSON(http.StatusOK, gin.H{"callNumber": customer.Position})
}

// customerのwaitingStatusを"complete"に変更する
// 1. firebaseの認証をする
// 2. tokenからownerIdを取得する
// 3. リクエストbodyからcustomerを取得する
// 4. ownerIdとdeviceTokenを元にcustomerのWaiting'statusを"complete"に変更する
// 5. customerの情報を返す
func PutCustomerStatus(c *gin.Context) {
	auth := c.Request.Header.Get("Authorization")
	tId := strings.TrimPrefix(auth, "Bearer ")
	t, err := integrations.VerifyIDToken(tId)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	OwnerId := t.UID
	var customer model.Customer
	if err := c.BindJSON(&customer); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if customer.WaitingStatus != "complete" && customer.WaitingStatus != "pass" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid status"})
		return
	}
	_, err = model.UpdateCustomerStatus(OwnerId, customer.FirebaseToken, customer.WaitingStatus)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"callNumber": customer.Position, "status": customer.WaitingStatus})
}

// customer
// 1. firebaseの認証をする
// 2. tokenからownerIdを取得する
// 3. ownerIdを元に件数を取得する
// 4. dateから1時間ごとの件数を取得する
// 5. jsonにして返す
func GetResult(c *gin.Context){
	auth := c.Request.Header.Get("Authorization")
	tId := strings.TrimPrefix(auth, "Bearer ")
	t, err := integrations.VerifyIDToken(tId)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	OwnerId := t.UID
	var counter int64
	counter, err = model.GetCustomerCount(OwnerId)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 0時から23時まで1時間毎の件数を取得する
    var result []int64
    for i := 0; i < 24; i++ {
        var hourlyCounter int64
        hourlyCounter, err = model.GetCustomerCountByHour(OwnerId, i)
        if err != nil {
            c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
            return
        }
        result = append(result, hourlyCounter)
    }
    
    var results []gin.H
    for i, count := range result {
        results = append(results, gin.H{"time": i, "count": count})
    }
    c.JSON(http.StatusOK, gin.H{"counter": counter, "result": results})
}