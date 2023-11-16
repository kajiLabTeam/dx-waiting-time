package router

import (
	"github.com/gin-gonic/gin"
	"github.com/kajiLabTeam/dx-waiting-time/controller"
)

func Init() {
	// gin.DisableConsoleColor()
	// f, _ := os.Create("../server.log")
	// gin.DefaultWriter = io.MultiWriter(f)

	// r := gin.Default()
	// r.Use(cors.Default())
	r := gin.Default()

	r.GET("api/:ownerId/queue/position/", controller.GetCustomer)

	r.GET("api/:ownerId/queue/following/", controller.GetCustomerFollowing)

	r.GET("api/owner/queue/following/", controller.GetFollowing)

	r.GET("api/owner/queue/position/next/", controller.GetNextCustomer)

	r.POST("api/owner/queue/create", controller.PostOwner)

	r.PUT("api/owner/queue/status", controller.PutCustomerStatus)

	r.DELETE("api/:ownerId/queue/position/", controller.DeleteCustomerPosition)

	r.Run()
}
