package model

// Ownerの登録
// 引数：ownerId
// 返り値：Owner, error
// 1. ownerIdを元に、Ownerを検索
// 2. ownerIdが存在しない場合、Ownerを作成
func CreateOwner(ownerId, ownerName string) (Owner, error) {
	o := Owner{}
	db.Where("owner_id = ?", ownerId).First(&o)
	if o.OwnerId == "" {
		o.OwnerId = ownerId
		o.OwnerName = ownerName
		db.Create(&o)
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
	db.Where("owner_id = ?", ownerId).Find(&o)
	db.Delete(&o)
	return o, nil
}

// OwnerをownerIdから検索
// 引数：OwnerId
// 返り値：Owner, error
// 1. OwnerIdを元に、Ownerを検索
func GetOwner(ownerId string) (Owner, error) {
	o := Owner{}
	db.Where("owner_id = ?", ownerId).Find(&o)
	return o, nil
}