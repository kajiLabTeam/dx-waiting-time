package model

type Owner struct{
	ID int `json:"id"`
	URL string `json:"url"`
	Customer []Customer `gorm:"foreignkey:GenreID"`
}

type Customer struct{
	ID int `json:"id"`
	Position int `json:"position"`
	Status string `json:"status"`
	Data string `json:"data"`
	FirebaseToken string `json:"firebaseToken"`
	OwnerID int `json:"ownerId"`
}