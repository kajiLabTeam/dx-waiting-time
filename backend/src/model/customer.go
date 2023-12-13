package model

import (
	"fmt"

	"github.com/kajiLabTeam/dx-waiting-time/service"
)

// customerの登録
// 引数：ownerId
// 返り値：Customer, error
// 1. ownerIdを元に、CustomerをPositionの昇順で検索
// 2. 最大のPositionに＋1下値を引数のCustomer.Positionに付与
// 3. CustomerをDBに登録
func CreateCustomer(ownerId, token string) (Customer, error) {
	c := Customer{}
	db.Where("owner_id = ?", ownerId).Last(&c)
	nc := Customer{
		Position:      c.Position + 1,
		WaitingStatus: "waiting",
		Date:          service.GetTime(),
		FirebaseToken: token,
		OwnerId:       ownerId,
	}
	if err := db.Create(&nc).Error; err != nil {
		fmt.Println(err)
		return nc, err
	}
	return nc, nil
}

// customerの削除
// 引数：OwnerId, deviceToken
// 返り値：Customer, error
// 1. OwnerIdとdeviceTokenを元に、Customerを検索
// 2. Customerを削除
func DeleteCustomer(ownerId,deviceToken string) (Customer, error) {
	c := Customer{}
	if err := db.Where("owner_id = ? AND firebase_token = ?", ownerId, deviceToken).Delete(&c).Error; err != nil {
		fmt.Println(err)
		return c, err
	}
	return c, nil
}

// customerをOwnerIdとdeviceTokenで検索
// 引数：OwnerId, deviceToken
// 返り値：Customer, error
// 1. OwnerIdとdeviceTokenを元に、Customerを検索
func GetCustomer(ownerId,deviceToken string) (Customer, error) {
	c := Customer{}
	if err := db.Where("owner_id = ? AND firebase_token = ?", ownerId, deviceToken).Find(&c).Error; err != nil {
		fmt.Println(err)
		return c, err
	}
	return c, nil
}

// customerをOwnerIdを元にStatusで条件付けて検索
// 引数：OwnerId
// 返り値：Customer, error
// 1. OwnerIdを元に、statusが'waiting'または'ignoreItOnce'であるCustomerを全て検索
func GetFollowing(ownerId string) ([]Customer, error) {
	c := []Customer{}
	if err := db.Where("owner_id = ? AND (waiting_status = 'waiting' OR waiting_status = 'ignoreItOnce')", ownerId).Find(&c).Error; err != nil {
		fmt.Println(err)
		return c, err
	}

	return c, nil
}

// customerをOwnerIdとdeviceTokenで検索
// customerをOwnerIdを元に、「statusが'waiting'または'ignoreItOnce',かつpositionが検索結果のpositionより小さい」で条件付けて全て検索
// 引数：OwnerId, deviceToken
// 返り値：[]Customer, error
// 1. model.GetCustomerを実行
// 2. OwnerIdを元に、statusが'waiting'または'ignoreItOnce'であるCustomerを全て検索
// 2. positionが1での検索結果のpositionより小さいCustomerを全て検索
func GetCustomerFollowing(ownerId,deviceToken string) ([]Customer, error) {
	var customers []Customer
	var c Customer
	var err error
	
	if c,err = GetCustomer(ownerId,deviceToken); err != nil {
		fmt.Println(err)
		return customers, err
	}
	if err = db.Where("owner_id = ? AND (waiting_status = 'waiting' OR waiting_status = 'ignoreItOnce') AND position < ?", ownerId, c.Position).Find(&customers).Error; err != nil {
		fmt.Println(err)
		return customers, err
	}
	return customers, nil
}

// customerをOwnerIdを元に、「statusが'waiting'または'ignoreItOnce',かつpositionが最も小さい」で条件付けて検索
// 引数：OwnerId
// 返り値：Customer, error
// 1. OwnerIdを元に、statusが'waiting'または'ignoreItOnce'であるCustomerを全て検索
// 2. positionが最も小さいCustomerを検索
func GetNextCustomer(ownerId string) (Customer, error) {
	c := Customer{}
	if err := db.Where("owner_id = ? AND (waiting_status = 'waiting' OR waiting_status = 'ignoreItOnce')", ownerId).First(&c).Error; err != nil {
		fmt.Println(err)
		return c, err
	}
	return c, nil
}

// customerをOwnerで検索
// 引数：OwnerId
// 返り値：Customer, error
// 1. OwnerIdを元に、Customerを全て検索
func GetOwnerCustomer(ownerId string) ([]Customer, error) {
	c := []Customer{}
	if err := db.Where("owner_id = ?", ownerId).Find(&c).Error; err != nil {
		fmt.Println(err)
		return c, err
	}
	return c, nil
}

// customerのStatusを更新
// 引数：OwnerId, deviceToken, status
// 返り値：Customer, error
// 1. OwnerIdとdevceTokenを元に、Customerを検索
// 2. statusを引数のstatusに更新
// 3. CustomerをDBに登録
func UpdateCustomerStatus(ownerId, deviceToken, status string) (Customer, error) {
	var c Customer
	// db.Where("owner_id = ? AND position = ?", ownerId, position).First(&c)
	// c.WaitingStatus = status
	if err := db.Model(&Customer{}).Where("owner_id = ? AND firebase_token = ?", ownerId, deviceToken).Update("waiting_status", status).Error; err != nil {
		fmt.Println(err)
		return c, err
	}
	// fmt.Println(c)
	return c, nil
}

// customer
// 引数：OwnerId
// 返り値：Customer, error
// 1. OwnerIdを元に、Customerの件数を取得
// 2. Customerの件数を返す
func GetCustomerCount(ownerId string) (int64, error) {
	var number int64
	if err := db.Model(&Customer{}).Where("owner_id = ?", ownerId).Count(&number).Error; err != nil {
		fmt.Println(err)
		return number, err
	}
	return number, nil
}

// customer
// 引数：OwnerId
// 返り値：[]int64, error
// 1. OwnerIdを元に、dateから1時間ごとの件数を取得する
// 2. 1時間ごとの件数を返す
func GetCustomerCountByHour(ownerId string, hour int) (int64, error) {
	var result int64
	if err := db.Model(&Customer{}).Where("owner_id = ? AND HOUR(date) = ?", ownerId, hour).Count(&result).Error; err != nil {
		fmt.Println(err)
		return result, err
	}
	return result, nil
}
