package model

import (
	"time"

	"github.com/kajiLabTeam/dx-waiting-time/lib"
)

var db = lib.SqlConnect()

type Owner struct {
	OwnerId   string     `json:"ownerId"`
	OwnerName string     `json:"ownerName"`
	Url       string     `json:"url"`
	Customer  []Customer `json:"customers"`
}

type Customer struct {
	CustomerId    int       `json:"customerId"`
	Position      int       `json:"position"`
	WaitingStatus string    `json:"waitingStatus"`
	Date          time.Time `json:"date"`
	FirebaseToken string    `json:"firebaseToken"`
	OwnerId       string    `json:"ownerId"`
}
