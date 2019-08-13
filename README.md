# DataBaseDesign

## usersテーブル

|Column|Type|Options|
|------|----|-------|
| name | string | null: false, unique: true,index: true |

### Association
- has_many :groups, through: :groups_users
- has_many :massages
- has_many :groups_users

***

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
| name | string | null: false, unique: true |

### Association
- has_many :users, through: :groups_users
- has_many :massages
- has_many :groups_users

***

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
| body | text | |
| image | text | |
| user | reference | null: false, foreign_key: true |
| group | reference | null: false, foreign_key: true |

### Association
- belongs_to :user
- belongs_to :group

***

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
| user | reference | null: false, foreign_key: true |
| group | reference | null: false, foreign_key: true |

### Association
- belongs_to :group
- belongs_to :user