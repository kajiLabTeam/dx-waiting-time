package model

type Test struct {
	OwnerId     string `json:"ownerId"`
	DeviceToken string `json:"deviceToken"`
}

func Migration(count int, test []Test) error {
	for i := 0; i < count; i++ {
		for _, v := range test {
			_, err := CreateCustomer(v.OwnerId, v.DeviceToken)
			if err != nil {
				return err
			}
		}
	}

	return nil
}
