package service

import (
	"time"
)

func GetTime() time.Time {
	jst, err := time.LoadLocation(("Asia/Tokyo"))
	if err != nil {
		panic(err)
	}
	time := time.Now().In(jst)
	// time := t.Format("2006-01-02T15:04:00.000Z")
	// fmt.Println(time)
	return (time)
}
