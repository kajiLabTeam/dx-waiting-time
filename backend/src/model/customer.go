package model

import "github.com/kajiLabTeam/dx-waiting-time/service"

// customerの登録
// 引数：ownerId
// 返り値：Customer, error
// 1. ownerIdを元に、CustomerをPositionの昇順で検索
// 2. 最大のPositionに＋1下値を引数のCustomer.Positionに付与
// 3. CustomerをDBに登録
func CreateCustomer(ownerId, token string) (Customer, error) {
	c := []Customer{}
	db.Where("owner_id = ?", ownerId).Order("position asc").Find(&c)
	nc := Customer{
		Position:      c[len(c)-1].Position + 1,
		WaitingStatus: "waiting",
		Date:          service.GetTime(),
		FirebaseToken: token,
		OwnerId:       ownerId,
	}
	db.Create(&nc)
	return nc, nil
}

// customerの削除
// 引数：OwnerId, position
// 返り値：Customer, error
// 1. OwnerIdとpositionを元に、Customerを検索
// 2. Customerを削除
func DeleteCustomer(ownerId string, position int) (Customer, error) {
	c := Customer{}
	db.Where("owner_id = ? AND position = ?", ownerId, position).Find(&c)
	db.Delete(&c)
	return c, nil
}

// customerをOwnerIdとPositionで検索
// 引数：OwnerId, position
// 返り値：Customer, error
// 1. OwnerIdとpositionを元に、Customerを検索
func GetCustomer(ownerId string, position int) (Customer, error) {
	c := Customer{}
	db.Where("owner_id = ? AND position = ?", ownerId, position).Find(&c)
	return c, nil
}

// customerをOwnerIdを元にStatusで条件付けて検索
// 引数：OwnerId
// 返り値：Customer, error
// 1. OwnerIdを元に、statusが'waiting'または'ignoreItOnce'であるCustomerを全て検索
func GetFollowing(ownerId string) ([]Customer, error) {
	c := []Customer{}
	db.Where("owner_id = ? AND (waiting_status = 'waiting' OR waiting_status = 'ignoreItOnce')", ownerId).Find(&c)
	return c, nil
}

// customerをOwnerIdを元に、「statusが'waiting'または'ignoreItOnce',かつpositionが引数のpositionより小さい」で条件付けて全て検索
// 引数：OwnerId, position
// 返り値：Customer, error
// 1. OwnerIdを元に、statusが'waiting'または'ignoreItOnce'であるCustomerを全て検索
// 2. positionが引数のpositionより小さいCustomerを全て検索
func GetCustomerFollowing(ownerId string, position int) ([]Customer, error) {
	c := []Customer{}
	db.Where("owner_id = ? AND (waiting_status = 'waiting' OR waiting_status = 'ignoreItOnce') AND position < ?", ownerId, position).Find(&c)
	return c, nil
}

// customerをOwnerIdを元に、「statusが'waiting'または'ignoreItOnce',かつpositionが最も小さい」で条件付けて検索
// 引数：OwnerId
// 返り値：Customer, error
// 1. OwnerIdを元に、statusが'waiting'または'ignoreItOnce'であるCustomerを全て検索
// 2. positionが最も小さいCustomerを検索
func GetNextCustomer(ownerId string) (Customer, error) {
	c := Customer{}
	db.Where("owner_id = ? AND (waiting_status = 'waiting' OR waiting_status = 'ignoreItOnce')", ownerId).Order("position asc").First(&c)
	return c, nil
}

// customerをOwnerで検索
// 引数：OwnerId
// 返り値：Customer, error
// 1. OwnerIdを元に、Customerを全て検索
func GetOwnerCustomer(ownerId string) ([]Customer, error) {
	c := []Customer{}
	db.Where("owner_id = ?", ownerId).Find(&c)
	return c, nil
}

// customerのStatusを更新
// 引数：OwnerId, position, status
// 返り値：Customer, error
// 1. OwnerIdとpositionを元に、Customerを検索
// 2. statusを引数のstatusに更新
// 3. CustomerをDBに登録
func UpdateCustomerStatus(ownerId, status string, position int) (Customer, error) {
	c := Customer{}
	db.Where("owner_id = ? AND position = ?", ownerId, position).Find(&c)
	c.WaitingStatus = status
	db.Save(&c)
	return c, nil
}
