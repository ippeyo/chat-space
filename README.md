# DataBaseDesign

## usersテーブル

|Column|Type|Options|
|------|----|-------|
| name | string | null: false, unique: true |
| email | string | null: false, unique: true  |
| password | string |

### Association
- has_many :groups, through: :groups_users
- has_many :massages

***

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
| name | string | null: false, unique: true |

### Association
- has_many :users, through: :groups_users
- has_many :massages

***

## massagesテーブル

|Column|Type|Options|
|------|----|-------|
| body | text | null: false |
| image | text | |
| user_id | integer |  foreign_key: true |
| group_id | integer |  foreign_key: true |

### Association
- belongs_to :user
- belongs_to :user

***

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id | integer | null: false, foreign_key: true |
|group_id | integer | null: false, foreign_key: true |

### Association
- belongs_to :group
- belongs_to :user