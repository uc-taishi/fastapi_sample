"use client";

import { useState } from 'react';
import Link from 'next/link';
import Question from '@/components/Question';
import { User } from '@/types/User';



type ApiResponse = {
    responseStatus: string
    responseMessage: string;
    users: User[];
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

export default function PracticePage() {
    const [question2param, setQuestion2Param] = useState<string>('');
    const [question3paramUserId, setQuestion3ParamUserId] = useState<string>('');
    const [question3paramUserName, setQuestion3ParamUserName] = useState<string>('');
    const [question4paramUserId, setQuestion4ParamUserId] = useState<string>('');
    const [question4paramUserName, setQuestion4ParamUserName] = useState<string>('');
    const [question4paramBirthday, setQuestion4ParamBirthday] = useState<string>('');
    const [question4paramGrade, setQuestion4ParamGrade] = useState<number>(1);
    const [question4paramRetirementFlag, setQuestion4ParamRetirementFlag] = useState<string>('');

    const handleFetchAllData = async (
        setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
        setError: React.Dispatch<React.SetStateAction<string | null>>,
        setData: React.Dispatch<React.SetStateAction<User[] | null>>
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
            setData(result.users);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFetchPathParamData = async (
        setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
        setError: React.Dispatch<React.SetStateAction<string | null>>,
        setData: React.Dispatch<React.SetStateAction<User[] | null>>
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
            setData(result.users);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFetchQueryParamData = async (
        setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
        setError: React.Dispatch<React.SetStateAction<string | null>>,
        setData: React.Dispatch<React.SetStateAction<User[] | null>>
    ) => {

        if (!question3paramUserId && !question3paramUserName) {
            setError('ユーザーIDあるいはユーザー名を入力してください。');
            return;
        }

        setIsLoading(true);
        setError(null);
        setData(null);

        try {
            const response = await fetch(`/api/practice/users/search?userId=${encodeURIComponent(question3paramUserId)}&userName=${encodeURIComponent(question3paramUserName)}`);
            if (!response.ok) {
                throw new Error('データの取得に失敗しました。');
            }
            const result: ApiResponse = await response.json();
            setData(result.users);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegisterData = async () => {
    }

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
                    endpoint='/api/practice'
                    requestBody={question1RequestBody}
                    responseBody={question1ResponseBody} />
                <Question
                    title="問題２：条件を絞りユーザーデータを取得してみよう（GETリクエスト：パスパラメータ）"
                    subTitle='※この問題はまだ実装していません。自分でFastAPIを実装してみよう！'
                    requestHandler={handleFetchPathParamData}
                    responseType='table' 
                    description='ユーザーIDを指定して、そのユーザーデータを取得します。'
                    endpoint='/api/practice/{userId}'
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
                    endpoint='/api/practice/users/search?userId={userId}&userName={userName}'
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
                    endpoint='/api/practice/register'
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
                    requestHandler={handleRegisterData}
                    responseType='status'
                    description='ユーザーデータを更新します。'
                    endpoint='/api/practice/update'
                    requestBody={question4RequestBody}
                    responseBody={question4ResponseBody}>
                    <div style={{ marginBottom: '16px' }}></div>
                </Question>
                <Question
                    title="問題６：ユーザーデータを削除してみよう（DELETEリクエスト）"
                    subTitle='※この問題はまだ実装していません。自分でFastAPIを実装してみよう！'
                    requestHandler={handleRegisterData}
                    responseType='status'
                    description='ユーザーデータを削除します。'
                    endpoint='/api/practice/delete'
                    requestBody={{
                        "userId": "str"
                    }}
                    responseBody={question4ResponseBody}>
                    <div style={{ marginBottom: '16px' }}></div>
                </Question>
            </div>
        </main>
    );
}