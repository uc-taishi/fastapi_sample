import databases
import sqlalchemy

# データベースの設定
DATABASE = 'sqlite'
DATABASE_NAME = 'practice.db'

# SQLiteのデータベースURL
DATABASE_URL = f'{DATABASE}:///..//sqlite/{DATABASE_NAME}'

# DatabaseインスタンスとSQLAlchemyエンジンの作成
database = databases.Database(DATABASE_URL)
engine = sqlalchemy.create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
metadata = sqlalchemy.MetaData()
