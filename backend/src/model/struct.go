package model

import (
	"time"

	"github.com/kajiLabTeam/dx-waiting-time/lib"
)

var db = lib.SqlConnect()

type Owner struct {
	OwnerId   string     `json:"ownerId"`
	OwnerName string     `json:"ownerName"`
	// Customers  []Customer `gorm:"foreign key:OwnerId"`
}

type Customer struct {
	CustomerId    int       `json:"customerId"`
	Position      int       `json:"callNumber"`
	WaitingStatus string    `json:"waitingStatus"`
	Date          time.Time `json:"date"`
	FirebaseToken string    `json:"firebaseToken"`
	OwnerId       string    `json:"ownerId"`
}
