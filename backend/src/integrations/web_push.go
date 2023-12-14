package integrations

import (
	"context"
	"fmt"
	"time"

	"firebase.google.com/go/messaging"
	"github.com/kajiLabTeam/dx-waiting-time/lib"
	"github.com/kajiLabTeam/dx-waiting-time/model"
)

var c = lib.MessageConnect()

func WebPushNotification(m *messaging.Message) error {
	var response string
	var err error
	response, err = c.Send(context.Background(), m)
	if err != nil {
		fmt.Printf("Failed to send message: %s", err)
		return err
	}
	fmt.Printf("response=%s\n", response)
	return nil
}

func MakeMessage(token, title, body string) *messaging.Message {
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
		for _, owner := range owners {
			go func(owner model.Owner) {
				customers, _ := model.GetFollowing(owner.OwnerId)
				for _, customer := range customers {
					if customer.WaitingStatus == "ignoreItOnce" {
						model.UpdateCustomerStatus(customer.OwnerId, customer.FirebaseToken, "non-waiting")
					} else {
						model.UpdateCustomerStatus(customer.OwnerId, customer.FirebaseToken, "ignoreItOnce")
					}

					m := MakeMessage(customer.FirebaseToken, "お知らせ", "順番が更新されました")
					WebPushNotification(m)
				}
			}(owner)
		}
	}
}

func CallNotification(c model.Customer) error {
	m := MakeMessage(c.FirebaseToken, "店舗からの呼び出し", "順番が来ました")
	err := WebPushNotification(m)
	if err != nil {
		return err
	}
	return nil
}
