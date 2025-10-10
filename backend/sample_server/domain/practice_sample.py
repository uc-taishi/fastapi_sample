import datetime
from pydantic import BaseModel, Field
from typing import List

class User(BaseModel):
    '''
    ユーザーモデル
    Fieldのserialization_aliasでJSONのキー名を指定できる
    例えば、user_id -> userIdのようにキャメルケースに変換できる
    これにより、フロントエンドとバックエンドで異なる命名規則を使用しても、データのやり取りがスムーズになる
    '''
    
    user_id: str = Field(None, serialization_alias="userId")
    user_name: str = Field(None, serialization_alias="userName")
    birthday: datetime.date = Field(None, serialization_alias="birthday")
    grade: int = Field(None, serialization_alias="grade")
    retirement_flag: bool = Field(None, serialization_alias="retirementFlag")

class OutputSample(BaseModel):
    '''
    出力用モデル
    '''
    
    response_status: str = Field(None, serialization_alias="responseStatus")
    response_message: str = Field(None, serialization_alias="responseMessage")
    users: List[User] = Field([], serialization_alias="users")
