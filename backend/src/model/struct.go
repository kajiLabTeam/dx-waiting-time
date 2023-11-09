package model

import "time"

type Owner struct {
	OwnerId   int        `json:"ownerId"`
	OwnerName string     `json:"ownerName"`
	Url       string     `json:"url"`
	Customer  []Customer `gorm:"foreignkey:GenreID"`
}

type Customer struct {
	CustomerId    int       `json:"customerId"`
	Position      int       `json:"position"`
	WaitingStatus string    `json:"waitingStatus"`
	Date          time.Time `json:"date"`
	FirebaseToken string    `json:"firebaseToken"`
	OwnerId       int       `json:"ownerId"`
}
