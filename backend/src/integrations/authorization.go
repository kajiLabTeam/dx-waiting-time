package integrations

import (
	"context"

	"firebase.google.com/go/auth"
	"github.com/kajiLabTeam/dx-waiting-time/lib"
)

func VerifyIDToken(idToken string) (*auth.Token, error) {
	client := lib.AuthorizationConnect()
	token, err := client.VerifyIDToken(context.Background(), idToken)
	if err != nil {
		return nil, err
	}

	return token, nil
}
