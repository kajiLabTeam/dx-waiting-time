package integrations

import (
	"context"
	"fmt"
	"math/rand"
	"time"

	"firebase.google.com/go/messaging"
	"github.com/kajiLabTeam/dx-waiting-time/lib"
	"github.com/kajiLabTeam/dx-waiting-time/model"
)

func WebPushNotification(m *messaging.Message) {
	c := lib.MessageConnect()
	var response string
	var err error
	for i := 0; i < 3; i++ {
		response, err = c.Send(context.Background(), m)
		if err == nil {
			break
		}
		// 待ち時間はどんどん倍にしていく
		waitTime := (1<<i)*1000 + rand.Intn(1000)
		time.Sleep(time.Duration(waitTime) * time.Millisecond)
	}
	if err != nil {
		fmt.Printf("Failed to send message: %s", err)
		return
	}
	fmt.Printf("response=%s\n", response)
}

func makeMessage(token, title, body string) *messaging.Message {
	return &messaging.Message{
		Token: token,
		Notification: &messaging.Notification{
			Title: title,
			Body:  body,
		},
		Webpush: &messaging.WebpushConfig{},
	}
}

func RegularUpdateNotification() {
	for {
		time.Sleep(5 * time.Minute)
		owners, _ := model.GetAllOwner()
		for i, owner := range owners {
			go func(owner model.Owner) {
				customers, _ := model.GetFollowing(owner.OwnerId)
				for _, customer := range customers {
					if customer.WaitingStatus == "ignoreItOnce" {
						model.UpdateCustomerStatus(customer.OwnerId, "non-waiting", customer.Position)
					} else {
						model.UpdateCustomerStatus(customer.OwnerId, "ignoreItOnce", customer.Position)
					}
					
					makeMessage(customer.FirebaseToken, "お知らせ", "順番が更新されました")
				}
			}(owner)
		}
	}
}
