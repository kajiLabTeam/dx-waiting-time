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

	r.GET("api/:ownerId/queue/position/", controller.GetCustomerPosition)

	r.GET("api/:ownerId/queue/following/", controller.GetFollowing)

	r.GET("api/:ownerId/queue/position/next/", controller.GetOwnerNextCustomer)

	r.PUT("api/:ownerId/queue/position/complete/:customerId", controller.PutOwnerCompleteCustomer)

	r.PUT("api/:ownerId/queue/position/pass/:customerId", controller.PutOwnerPassCustomer)

	r.DELETE("api/:ownerId/queue/position/", controller.DeleteCustomerPosition)

	r.Run()
}
