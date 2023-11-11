package lib

import (
	"context"
	"log"

	firebase "firebase.google.com/go"
	"firebase.google.com/go/auth"
	"firebase.google.com/go/messaging"
	"github.com/kajiLabTeam/dx-waiting-time/conf"

	"google.golang.org/api/option"
)

var app *firebase.App

func init() {
	f := conf.GetFirebaseConfig()
	opt := option.WithCredentialsFile(f.GetString("firebase.path"))
	var err error
	app, err = firebase.NewApp(context.Background(), nil, opt)
	if err != nil {
		log.Fatalln(err)
	}
}

func AuthorizationConnect() *auth.Client {
	client, err := app.Auth(context.Background())
	if err != nil {
		log.Fatalf("error initializeing app: %v", err)
	}
	return client
}

func MessageConnect() *messaging.Client {
	client, err := app.Messaging(context.Background())
	if err != nil {
		log.Fatalf("error initializeing app: %v", err)
	}
	return client
}
