package controller

import (
	"net/http"
	"strconv"
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
	_, err = model.GetOwner(ownerId)
	if err == nil {
		c.JSON(http.StatusOK, gin.H{"owner_id": ownerId, "owner_name": ""})
		return
	}

	nameInterfase := t.Claims["name"]
	ownerName := nameInterfase.(string)

	owner, _ := model.CreateOwner(ownerId, ownerName)
	c.JSON(http.StatusOK, owner)
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
	customer, _ := model.GetFollowing(ownerId)
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

	// customerに対して呼び出し通知を送る処理を書く

	OwnerId := t.UID
	customer, _ := model.GetNextCustomer(OwnerId)
	c.JSON(http.StatusOK, gin.H{"customer": customer})
}

// customerのwaitingStatusを"complete"に変更する
// 1. firebaseの認証をする
// 2. tokenからownerIdを取得する
// 3. urlのパラムからpositionを取得する
// 4. ownerIdとpositionを元にcustomerのWaiting'statusを"complete"に変更する
// 5. customerの情報を返す
func PutOwnerCompleteCustomer(c *gin.Context) {
	auth := c.Request.Header.Get("Authorization")
	tId := strings.TrimPrefix(auth, "Bearer ")
	t, err := integrations.VerifyIDToken(tId)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	OwnerId := t.UID
	position, _ := strconv.Atoi(c.Param("position"))
	customer, _ := model.UpdateCustomerStatus(OwnerId, "complete", position)
	c.JSON(http.StatusOK, gin.H{"customer": customer})
}

func PutOwnerPassCustomer(c *gin.Context) {
	auth := c.Request.Header.Get("Authorization")
	tId := strings.TrimPrefix(auth, "Bearer ")
	t, err := integrations.VerifyIDToken(tId)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	OwnerId := t.UID
	position, _ := strconv.Atoi(c.Param("position"))
	customer, _ := model.UpdateCustomerStatus(OwnerId, "non-waiting", position)
	c.JSON(http.StatusOK, gin.H{"customer": customer})
}
