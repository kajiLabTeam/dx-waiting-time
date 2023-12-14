package model

// Ownerの登録
// 引数：ownerId
// 返り値：Owner, error
// 1. ownerIdを元に、Ownerを検索
// 2. ownerIdが存在しない場合、Ownerを作成
func CreateOwner(ownerId, ownerName string) (Owner, error) {
	o := Owner{}
	o.OwnerId = ownerId
	o.OwnerName = ownerName
	if err := db.Create(&o).Error; err != nil {
		return o, err
	}
	return o, nil
}

// Ownerの削除
// 引数：OwnerId
// 返り値：Owner, error
// 1. OwnerIdを元に、Ownerを検索
// 2. Ownerを削除
func DeleteOwner(ownerId string) (Owner, error) {
	o := Owner{}
	if err := db.Where("owner_id = ?", ownerId).Find(&o).Error; err != nil {
		return o, err
	}
	if err := db.Delete(&o).Error; err != nil {
		return o, err
	}
	return o, nil
}

// OwnerをownerIdから検索
// 引数：OwnerId
// 返り値：Owner, error
// 1. OwnerIdを元に、Ownerを検索
func GetOwner(ownerId string) (Owner, error) {
	o := Owner{}
	if err := db.Where("owner_id = ?", ownerId).Find(&o).Error; err != nil {
		return o, err
	}
	return o, nil
}

// Ownerを全件検索
// 引数：なし
// 返り値：[]Owner, error
// 1. Ownerを全件検索
func GetAllOwner() ([]Owner, error) {
	var o []Owner
	if err := db.Find(&o).Error; err != nil {
		return o, err
	}
	return o, nil
}
