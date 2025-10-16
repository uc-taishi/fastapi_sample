"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Question from '@/components/Question';
import { User } from '@/types/User';



type ApiResponse = {
    responseStatus: string
    responseMessage: string;
    users: User[] | undefined;
};

// スタイル定義をオブジェクトとしてまとめる
const styles: { [key: string]: React.CSSProperties } = {
    main: {
        justifyContent: 'center',
        width: '100%',
        minHeight: '100vh',
        padding: '32px',
        backgroundColor: '#f3f4f6', // gray-100
        fontFamily: 'sans-serif',
    },
    container: {
        width: '100%',
        maxWidth: '1300px',
        padding: '32px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    h1: {
        fontSize: '2rem',
        fontWeight: 'bold',
        marginBottom: '24px',
        color: '#1f2937', // gray-800
    },
    pre: {
        padding: '16px',
        fontSize: '0.875rem',
        backgroundColor: '#e5e7eb', // gray-200
        borderRadius: '4px',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-all',
    },
};

const question1RequestBody = {};
const question1ResponseBody = {
    "responseStatus": "str",
    "responseMessage": "str",
    "users": [
        {
            "userId": "str",
            "userName": "str",
            "birthday": "str",
            "grade": "int",
            "retirementFlag": "bool"
        }
    ]
};

const question2RequestBody = {};
const question2ResponseBody = {
    "responseStatus": "str",
    "responseMessage": "str",
    "users": [
        {
            "userId": "str",
            "userName": "str",
            "birthday": "str",
            "grade": "int",
            "retirementFlag": "bool"
        }
    ]
};

const question3RequestBody = {};
const question3ResponseBody = {
    "responseStatus": "str",
    "responseMessage": "str",
    "users": [
        {
            "userId": "str",
            "userName": "str",
            "birthday": "str",
            "grade": "int",
            "retirementFlag": "bool"
        }
    ]
};

const question4RequestBody = {
    "userId": "str",
    "userName": "str",
    "birthday": "str",
    "grade": "int",
    "retirementFlag": "bool"
};
const question4ResponseBody = {
    "responseStatus": "str",
    "responseMessage": "str",
};

const question5RequestBody = {
    "userId": "str",
    "userName": "str",
    "birthday": "str",
    "grade": "int",
    "retirementFlag": "bool"
};
const question5ResponseBody = {
    "responseStatus": "str",
    "responseMessage": "str",
};

const question6RequestBody = {
};
const question6ResponseBody = {
    "responseStatus": "str",
    "responseMessage": "str",
};



export default function PracticePage() {
    const [question2param, setQuestion2Param] = useState<string>('');
    const [question3paramUserId, setQuestion3ParamUserId] = useState<string>('');
    const [question3paramUserName, setQuestion3ParamUserName] = useState<string>('');
    const [question4paramUserId, setQuestion4ParamUserId] = useState<string>('');
    const [question4paramUserName, setQuestion4ParamUserName] = useState<string>('');
    const [question4paramBirthday, setQuestion4ParamBirthday] = useState<string>('');
    const [question4paramGrade, setQuestion4ParamGrade] = useState<number>(1);
    const [question4paramRetirementFlag, setQuestion4ParamRetirementFlag] = useState<string>('true');
    const [question5param, setQuestion5Param] = useState<(User & { isSelected: boolean })[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [question6paramUserId, setQuestion6ParamUserId] = useState<string>("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await fetch('/api/practice');
        const data = await response.json();
        setQuestion5Param(data.users.map((user: User) => ({ ...user, isSelected: false })));
        console.log(data.users);
        setUsers(data.users.map((user: User) => ({ ...user, isSelected: false })));
    };

    const handleFetchAllData = async (
        setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
        setError: React.Dispatch<React.SetStateAction<string | null>>,
        setData: React.Dispatch<React.SetStateAction<User[] | string | null>>
    ) => {
        setIsLoading(true);
        setError(null);
        setData(null);

        try {
            const response = await fetch('/api/practice');
            if (!response.ok) {
                throw new Error('データの取得に失敗しました。');
            }
            const result: ApiResponse = await response.json();
            setData(result.users!);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFetchPathParamData = async (
        setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
        setError: React.Dispatch<React.SetStateAction<string | null>>,
        setData: React.Dispatch<React.SetStateAction<User[] | string | null>>
    ) => {

        if (!question2param) {
            setError('ユーザーIDを入力してください。');
            return;
        }

        setIsLoading(true);
        setError(null);
        setData(null);

        try {
            const response = await fetch(`/api/practice/${question2param}`);
            if (!response.ok) {
                throw new Error('データの取得に失敗しました。');
            }
            const result: ApiResponse = await response.json();
            setData(result.users!);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFetchQueryParamData = async (
        setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
        setError: React.Dispatch<React.SetStateAction<string | null>>,
        setData: React.Dispatch<React.SetStateAction<User[] | string | null>>
    ) => {

        if (!question3paramUserId && !question3paramUserName) {
            setError('ユーザーIDあるいはユーザー名を入力してください。');
            return;
        }

        setIsLoading(true);
        setError(null);
        setData(null);

        try {
            const response = await fetch(`/api/practice/search?userId=${encodeURIComponent(question3paramUserId)}&userName=${encodeURIComponent(question3paramUserName)}`);
            if (!response.ok) {
                throw new Error('データの取得に失敗しました。');
            }
            const result: ApiResponse = await response.json();
            setData(result.users!);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegisterData = async (
        setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
        setError: React.Dispatch<React.SetStateAction<string | null>>,
        setData: React.Dispatch<React.SetStateAction<User[] | string | null>>
    ) => {
        setIsLoading(true);
        setError(null);
        setData(null);


        console.log(`Registering user: ${question4paramUserId}, ${question4paramUserName}, ${question4paramBirthday}, ${question4paramGrade}, ${question4paramRetirementFlag}`);
        try {
            const response = await fetch(`/api/practice/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: question4paramUserId,
                    user_name: question4paramUserName,
                    birthday: new Date(question4paramBirthday),
                    grade: question4paramGrade,
                    retirement_flag: question4paramRetirementFlag === 'true' ? true : false,
                }),
            });
            if (!response.ok) {
                throw new Error('データの取得に失敗しました。');
            }
            const result: ApiResponse = await response.json();
            console.log(result);
            if (result.responseStatus === "200") {
                setData("登録が成功しました。");
            } else {
                setData("登録に失敗しました。");
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }

    const handleUpdateData = async (
        setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
        setError: React.Dispatch<React.SetStateAction<string | null>>,
        setData: React.Dispatch<React.SetStateAction<User[] | string | null>>
    ) => {
        setIsLoading(true);
        setError(null);
        setData(null);

        const params = {
            user_id: question5param.find(user => user.isSelected)?.userId || "",
            user_name: question5param.find(user => user.isSelected)?.userName || "",
            birthday: new Date(question5param.find(user => user.isSelected)?.birthday || ""),
            grade: question5param.find(user => user.isSelected)?.grade || 0,
            retirement_flag: question5param.find(user => user.isSelected)?.retirementFlag || false,
        }

        try {
            const response = await fetch(`/api/practice/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: params ? JSON.stringify(params) : undefined,
            });
            if (!response.ok) {
                throw new Error('データの取得に失敗しました。');
            }
            const result: ApiResponse = await response.json();
            console.log(result);
            if (result.responseStatus === "200") {
                setData("更新が成功しました。");
            } else {
                setData("更新に失敗しました。");
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            fetchData();
            setIsLoading(false);
        }
    }

    const handleDeleteData = async (
        setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
        setError: React.Dispatch<React.SetStateAction<string | null>>,
        setData: React.Dispatch<React.SetStateAction<User[] | string | null>>
    ) => {
        setIsLoading(true);
        setError(null);
        setData(null);

        console.log(`Deleting user: ${question6paramUserId}`);
        try {
            const response = await fetch(`/api/practice/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: question6paramUserId,
                }),
            });
            if (!response.ok) {
                throw new Error('データの取得に失敗しました。');
            }
            const result: ApiResponse = await response.json();
            console.log(result);
            if (result.responseStatus === "200") {
                setData("削除が成功しました。");
            } else {
                setData("削除に失敗しました。");
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            fetchData();
            setIsLoading(false);
        }
    }

    question5param.forEach(item => {
        console.log(item);
    });

    return (
        <main style={styles.main}>
            <div style={styles.container}>
                <Link href="/" style={{ color: '#3f6ac1ff', textDecoration: 'underline' }}>ホームに戻る</Link>
                <h1 style={styles.h1}>
                    練習問題
                </h1>
                <Question
                    title="問題１：全てのユーザーデータを取得してみよう（GETリクエスト）"
                    requestHandler={handleFetchAllData}
                    responseType='table'
                    description='全てのユーザーデータを取得します。データを取得ボタンをクリックして、ユーザーデータが取得結果に表示されれば成功です。'
                    processDescription='既に実装済み。エンドポイントにはGETリクエストでアクセスします。レスポンスボディにはユーザーデータの配列が含まれます。具体的なコードについては、backend側の「/handler/practice_sample_handler.py」の「get_users」関数を参照してください。'
                    endpoint='/api/practice'
                    buttonType='GET'
                    requestBody={question1RequestBody}
                    responseBody={question1ResponseBody} />
                <Question
                    title="問題２：条件を絞りユーザーデータを取得してみよう（GETリクエスト：パスパラメータ）"
                    subTitle='※この問題はまだ実装していません。自分でFastAPIを実装してみよう！'
                    requestHandler={handleFetchPathParamData}
                    responseType='table'
                    description='ユーザーIDを指定して、そのユーザーデータを取得します。'
                    processDescription='ユーザーIDをパスパラメータとして受け取り、そのIDに対応するユーザーデータを返すようにFastAPIを実装します（部分一致で検索できるように）。具体的なコードを問題１を真似て、backend側の「/handler」にhandler用の.pyファイルを作成、「/usecase」にusecase用の.pyファイルを作成し実装してください。また、ルーティングの設定（main.pyにhandlerプログラムを追加する形で実装）も忘れずに行ってください。レスポンスボディは以下に記載している通りに実装してください。'
                    endpoint='/api/practice/{userId}'
                    buttonType='GET'
                    requestBody={question2RequestBody}
                    responseBody={question2ResponseBody}>
                    <div style={{ marginBottom: '16px' }}></div>
                    <label htmlFor="question2param" style={{ marginRight: '8px' }}>ユーザーID:</label>
                    <input
                        type="text"
                        id="question2param"
                        value={question2param}
                        onChange={(e) => setQuestion2Param(e.target.value)}
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db' }} // gray-300
                    />
                </Question>
                <Question
                    title="問題３：条件を絞りユーザーデータを取得してみよう（GETリクエスト：クエリパラメータ）"
                    subTitle='※この問題はまだ実装していません。自分でFastAPIを実装してみよう！'
                    requestHandler={handleFetchQueryParamData}
                    responseType='table'
                    description='ユーザーIDあるいはユーザー名を指定して、該当するユーザーデータを取得します。'
                    processDescription='ユーザーIDとユーザー名をクエリパラメータとして受け取り、該当するユーザーデータを返すようにFastAPIを実装します（部分一致で検索できるように）。具体的なコードを問題１を真似て、backend側の「/handler」にhandler用の.pyファイルを作成、「/usecase」にusecase用の.pyファイルを作成し実装してください。また、ルーティングの設定（main.pyにhandlerプログラムを追加する形で実装）も忘れずに行ってください。レスポンスボディは以下に記載している通りに実装してください。'
                    endpoint='/api/practice/users/search?userId={userId}&userName={userName}'
                    buttonType='GET'
                    requestBody={question3RequestBody}
                    responseBody={question3ResponseBody}>
                    <div style={{ marginBottom: '16px' }}></div>
                    <label htmlFor="question3paramUserId" style={{ marginRight: '8px' }}>ユーザーID:</label>
                    <input
                        type="text"
                        id="question3paramUserId"
                        value={question3paramUserId}
                        onChange={(e) => setQuestion3ParamUserId(e.target.value)}
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db' }} // gray-300
                    />
                    <div style={{ marginBottom: '16px' }}></div>
                    <label htmlFor="question3paramUserName" style={{ marginRight: '8px' }}>ユーザー名:</label>
                    <input
                        type="text"
                        id="question3paramUserName"
                        value={question3paramUserName}
                        onChange={(e) => setQuestion3ParamUserName(e.target.value)}
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db' }} // gray-300
                    />
                </Question>
                <Question
                    title="問題４：ユーザーデータを登録してみよう（POSTリクエスト）"
                    subTitle='※この問題はまだ実装していません。自分でFastAPIを実装してみよう！'
                    requestHandler={handleRegisterData}
                    responseType='status'
                    description='ユーザーデータを登録します。'
                    processDescription='ユーザーデータを登録します。ユーザーID、ユーザー名、生年月日、等級、退職済みフラグをリクエストボディで受け取り、そのデータを登録するようにFastAPIを実装します。具体的なコードを問題１を真似て、backend側の「/handler」にhandler用の.pyファイルを作成、「/usecase」にusecase用の.pyファイルを作成し実装してください。また、ルーティングの設定（main.pyにhandlerプログラムを追加する形で実装）も忘れずに行ってください。レスポンスボディは以下に記載している通りに実装してください。'
                    endpoint='/api/practice/register'
                    buttonType='POST'
                    requestBody={question4RequestBody}
                    responseBody={question4ResponseBody}>
                    <div style={{ marginBottom: '16px' }}></div>
                    <label htmlFor="question4paramUserId" style={{ marginRight: '8px' }}>ユーザーID:</label>
                    <input
                        type="text"
                        id="question4paramUserId"
                        value={question4paramUserId}
                        onChange={(e) => setQuestion4ParamUserId(e.target.value)}
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db' }} // gray-300
                    />
                    <div style={{ marginBottom: '16px' }}></div>
                    <label htmlFor="question4paramUserName" style={{ marginRight: '8px' }}>ユーザー名:</label>
                    <input
                        type="text"
                        id="question4paramUserName"
                        value={question4paramUserName}
                        onChange={(e) => setQuestion4ParamUserName(e.target.value)}
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db' }} // gray-300
                    />
                    <div style={{ marginBottom: '16px' }}></div>
                    <label htmlFor="question4paramBirthday" style={{ marginRight: '8px' }}>生年月日:</label>
                    <input
                        type="date"
                        id="question4paramBirthday"
                        value={question4paramBirthday}
                        onChange={(e) => setQuestion4ParamBirthday(e.target.value)}
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db' }} // gray-300
                    />
                    <div style={{ marginBottom: '16px' }}></div>
                    <label htmlFor="question4paramGrade" style={{ marginRight: '8px' }}>等級:</label>
                    <input
                        type="number"
                        id="question4paramGrade"
                        value={question4paramGrade.toString()}
                        onChange={(e) => setQuestion4ParamGrade(parseInt(e.target.value))}
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db' }} // gray-300
                    />
                    <div style={{ marginBottom: '16px' }}></div>
                    <label htmlFor="question4paramRetirementFlag" style={{ marginRight: '8px' }}>退職済み:</label>
                    <select
                        id="question4paramRetirementFlag"
                        value={question4paramRetirementFlag}
                        onChange={(e) => setQuestion4ParamRetirementFlag(e.target.value)}
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db' }} // gray-300
                    >
                        <option value="true">はい</option>
                        <option value="false">いいえ</option>
                    </select>
                </Question>
                <Question
                    title="問題５：ユーザーデータを更新してみよう（PUTリクエスト）"
                    subTitle='※この問題はまだ実装していません。自分でFastAPIを実装してみよう！'
                    requestHandler={handleUpdateData}
                    responseType='status'
                    description='ユーザーデータを更新します。'
                    processDescription='ユーザーデータを更新します。ユーザーID、ユーザー名、生年月日、等級、退職済みフラグをリクエストボディで受け取り、そのデータを更新するようにFastAPIを実装します。具体的なコードを問題１を真似て、backend側の「/handler」にhandler用の.pyファイルを作成、「/usecase」にusecase用の.pyファイルを作成し実装してください。また、ルーティングの設定（main.pyにhandlerプログラムを追加する形で実装）も忘れずに行ってください。レスポンスボディは以下に記載している通りに実装してください。'
                    endpoint='/api/practice/update'
                    buttonType='PUT'
                    requestBody={question5RequestBody}
                    responseBody={question5ResponseBody}>
                    <div style={{ marginBottom: '16px' }}></div>
                    {question5param && question5param.length > 0 && (
                        <table style={{ width: '100%', borderCollapse: 'collapse', margin: '16px 0', border: '1px solid black' }}>
                            <thead style={{ backgroundColor: '#3f6ac1ff', color: 'white' }}>
                                <tr>
                                    <th>更新対象</th>
                                    <th>ID</th>
                                    <th>ユーザー名</th>
                                    <th>生年月日</th>
                                    <th>等級</th>
                                    <th>退職済み</th>
                                </tr>
                            </thead>
                            <tbody style={{ textAlign: 'center' }}>
                                {(question5param as (User & { isSelected: boolean })[]).map((item, index) => (
                                    <tr key={index}>
                                        <td><input
                                            type="radio"
                                            name="updateUser"
                                            checked={item.isSelected}
                                            onChange={() => {
                                                setQuestion5Param(prevState => prevState.map(user => ({
                                                    ...user,
                                                    isSelected: user.userId === item.userId,
                                                })));
                                            }}
                                        /></td>
                                        <td>{item.userId}</td>
                                        <td><input
                                            type="text"
                                            value={item.userName}
                                            onChange={(e) => {
                                                const newUserName = e.target.value;
                                                setQuestion5Param(prevState => prevState.map(user => user.userId === item.userId ? { ...user, userName: newUserName } : user));
                                            }}
                                            disabled={!item.isSelected} /></td>
                                        <td><input type="date"
                                            value={item.birthday}
                                            onChange={(e) => {
                                                const newBirthday = e.target.value;
                                                setQuestion5Param(prevState => prevState.map(user => user.userId === item.userId ? { ...user, birthday: newBirthday } : user));
                                            }}
                                            disabled={!item.isSelected} /></td>
                                        <td><input
                                            type="number"
                                            value={item.grade}
                                            onChange={(e) => {
                                                const newGrade = Number(e.target.value);
                                                setQuestion5Param(prevState => prevState.map(user => user.userId === item.userId ? { ...user, grade: newGrade } : user));
                                            }}
                                            disabled={!item.isSelected} /></td>
                                        <td>
                                            <select
                                                value={item.retirementFlag ? 'true' : 'false'}
                                                disabled={!item.isSelected}
                                                onChange={(e) => {
                                                    const newRetirementFlag = e.target.value === 'true';
                                                    setQuestion5Param(prevState => prevState.map(user => user.userId === item.userId ? { ...user, retirementFlag: newRetirementFlag } : user));
                                                }}>
                                                <option value="true">はい</option>
                                                <option value="false">いいえ</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </Question>
                <Question
                    title="問題６：ユーザーデータを削除してみよう（DELETEリクエスト：クエリパラメータ）"
                    subTitle='※この問題はまだ実装していません。自分でFastAPIを実装してみよう！'
                    requestHandler={handleDeleteData}
                    responseType='status'
                    description='ユーザーデータを削除します。'
                    processDescription='ユーザーデータを削除します。ユーザーIDをクエリパラメータで受け取り、そのデータを削除するようにFastAPIを実装します。具体的なコードを問題１を真似て、backend側の「/handler」にhandler用の.pyファイルを作成、「/usecase」にusecase用の.pyファイルを作成し実装してください。また、ルーティングの設定（main.pyにhandlerプログラムを追加する形で実装）も忘れずに行ってください。レスポンスボディは以下に記載している通りに実装してください。'
                    endpoint='/api/practice/delete?user_id={userId}'
                    buttonType='DELETE'
                    requestBody={question6RequestBody}
                    responseBody={question6ResponseBody}>
                    <div style={{ marginBottom: '16px' }}></div>
                    {users && users.length > 0 && (
                        <table style={{ width: '100%', borderCollapse: 'collapse', margin: '16px 0', border: '1px solid black' }}>
                            <thead style={{ backgroundColor: '#3f6ac1ff', color: 'white' }}>
                                <tr>
                                    <th>削除対象</th>
                                    <th>ID</th>
                                    <th>ユーザー名</th>
                                    <th>生年月日</th>
                                    <th>等級</th>
                                    <th>退職済み</th>
                                </tr>
                            </thead>
                            <tbody style={{ textAlign: 'center' }}>
                                {(users as User[]).map((item) => (
                                    <tr key={item.userId}>
                                        <td><input type="radio" name="deleteUser" onChange={(e) => {
                                            if (e.target.checked) {
                                                setQuestion6ParamUserId(item.userId);
                                            } else {
                                                setQuestion6ParamUserId("");
                                            }
                                        }} /></td>
                                        <td>{item.userId}</td>
                                        <td>{item.userName}</td>
                                        <td>{item.birthday}</td>
                                        <td>{item.grade}</td>
                                        <td>{item.retirementFlag ? 'はい' : 'いいえ'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </Question>
            </div>
        </main>
    );
}