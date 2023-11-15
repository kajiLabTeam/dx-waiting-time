package main

import (
	"github.com/kajiLabTeam/dx-waiting-time/integrations"
	"github.com/kajiLabTeam/dx-waiting-time/router"
)

func main() {
	go integrations.RegularUpdateNotification()
	router.Init()
}
