package router

import (
	"io"
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/kajiLabTeam/dx-waiting-time/controller"
)

func Init() {

	// サーバーログの出力先を設定
	gin.DisableConsoleColor()
	f, _ := os.Create("../server.log")
	gin.DefaultWriter = io.MultiWriter(f)

	// ルーティングの設定
	r := gin.Default()

	// ここからCorsの設定
	r.Use(cors.New(cors.Config{
		// アクセスを許可したいアクセス元
		AllowOrigins: []string{
			"https://dx-waiting-time.vercel.app",
			"https://dxwaitingtime.vercel.app",
			"http://localhost:3000",
		},
		// アクセスを許可したいHTTPメソッド(以下の例だとPUTやDELETEはアクセスできません)
		AllowMethods: []string{
			"POST",
			"GET",
			"PUT",
			"DELETE",
		},
		// 許可したいHTTPリクエストヘッダ
		AllowHeaders: []string{
			"Access-Control-Allow-Credentials",
			"Access-Control-Allow-Headers",
			"Content-Type",
			"Content-Length",
			"Accept-Encoding",
			"Accept",
			"Authorization",
		},
		// cookieなどの情報を必要とするかどうか
		AllowCredentials: true,
		// preflightリクエストの結果をキャッシュする時間
		MaxAge: 24 * time.Hour,
	}))

	// gin.DisableConsoleColor()
	// f, _ := os.Create("../server.log")
	// gin.DefaultWriter = io.MultiWriter(f)

	// r := gin.Default()
	// r.Use(cors.Default())
	// r := gin.Default()

	r.GET("api/:ownerId/queue/position", controller.GetCustomer)

	r.GET("api/:ownerId/queue/following", controller.GetCustomerFollowing)

	r.GET("api/owner/queue/following", controller.GetFollowing)

	r.GET("api/owner/queue/position/next", controller.GetNextCustomer)

	r.POST("api/owner/queue/create", controller.PostOwner)

	r.PUT("api/owner/queue/status", controller.PutCustomerStatus)

	r.DELETE("api/:ownerId/queue/position", controller.DeleteCustomerPosition)

	r.POST(("api/migration"), controller.Migration)

	r.Run()
}
