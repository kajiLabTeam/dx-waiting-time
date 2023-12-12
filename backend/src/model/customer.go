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
// 引数：OwnerId, position
// 返り値：Customer, error
// 1. OwnerIdとpositionを元に、Customerを検索
// 2. Customerを削除
func DeleteCustomer(ownerId string, position int) (Customer, error) {
	c := Customer{}
	if err := db.Where("owner_id = ? AND position = ?", ownerId, position).Delete(&c).Error; err != nil {
		fmt.Println(err)
		return c, err
	}
	return c, nil
}

// customerをOwnerIdとPositionで検索
// 引数：OwnerId, position
// 返り値：Customer, error
// 1. OwnerIdとpositionを元に、Customerを検索
func GetCustomer(ownerId string, position int) (Customer, error) {
	c := Customer{}
	if err := db.Where("owner_id = ? AND position = ?", ownerId, position).Find(&c).Error; err != nil {
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

// customerをOwnerIdを元に、「statusが'waiting'または'ignoreItOnce',かつpositionが引数のpositionより小さい」で条件付けて全て検索
// 引数：OwnerId, position
// 返り値：Customer, error
// 1. OwnerIdを元に、statusが'waiting'または'ignoreItOnce'であるCustomerを全て検索
// 2. positionが引数のpositionより小さいCustomerを全て検索
func GetCustomerFollowing(ownerId string, position int) ([]Customer, error) {
	c := []Customer{}
	if err := db.Where("owner_id = ? AND (waiting_status = 'waiting' OR waiting_status = 'ignoreItOnce') AND position < ?", ownerId, position).Find(&c).Error; err != nil {
		fmt.Println(err)
		return c, err
	}
	return c, nil
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
// 引数：OwnerId, position, status
// 返り値：Customer, error
// 1. OwnerIdとpositionを元に、Customerを検索
// 2. statusを引数のstatusに更新
// 3. CustomerをDBに登録
func UpdateCustomerStatus(ownerId, status string, position int) (Customer, error) {
	c := Customer{}
	// db.Where("owner_id = ? AND position = ?", ownerId, position).First(&c)
	// c.WaitingStatus = status
	if err := db.Model(&Customer{}).Where("owner_id = ? AND position = ?", ownerId, position).Update("waiting_status", status).Error; err != nil {
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

