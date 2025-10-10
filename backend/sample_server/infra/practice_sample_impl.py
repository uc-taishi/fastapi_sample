from typing import List

from databases import Database
from injector import singleton, inject
from sqlalchemy import Table, MetaData, Column, String, Integer, select
from domain.practice_sample import User
from repository.practice_sample_repository import PracticeSampleRepository

from sqlalchemy import Table, MetaData, Column, String, Integer, select

metadata = MetaData()

# ユーザーテーブル定義
users_table = Table(
    "users",
    metadata,
    Column("user_id", String, primary_key=True),
    Column("user_name", String),
    Column("birthday", String),
    Column("grade", Integer),
    Column("retirement_flag", Integer),
)

@singleton
class PracticeSampleImpl(PracticeSampleRepository):
    '''
    ユーザー一覧を取得する実装クラス
    '''
    
    @inject
    def __init__(self, db: Database):
        self.__db = db
        
    async def get_users(self) -> List[User]:
        '''
        ユーザー一覧を取得するメソッド
        Returns:
            List[User]: ユーザー一覧
        '''
        
        print('start get_users in impl')
        # DBからユーザー一覧を取得
        sql = select(users_table)
        
        # 非同期でクエリを実行
        rows = await self.__db.fetch_all(sql)
        
        # 取得したデータをUserモデルに変換し、リストに格納し、返す
        users: List[User] = []
        for row in rows:
            user = User(
                user_id=row['user_id'],
                user_name=row['user_name'],
                birthday=row['birthday'],
                grade=row['grade'],
                retirement_flag=bool(row['retirement_flag'])
            )

            # リストに追加
            users.append(user)

        print('end get_users in impl')

        return users