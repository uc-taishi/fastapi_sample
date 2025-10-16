'use client';
import { ResponseData } from "@/types/ResponseData";
import { User } from "@/types/User";
import React from "react";


type ResultProps = {
    data: ResponseData;
    isLoading: boolean;
    error: string | null;
    responseType: string;
}

const styles: { [key: string]: React.CSSProperties } = {
    resultBox: {
        width: '100%',
        padding: '10px',
        border: '1px solid #e5e7eb', // gray-200
        borderRadius: '8px',
        backgroundColor: '#f9fafb', // gray-50
        minHeight: '150px',
    },
    h2: {
        fontSize: '1.25rem',
        fontWeight: '600',
        marginBottom: '16px',
        color: '#374151', // gray-700
    },
    errorText: {
        color: '#ef4444', // red-500
    },
    placeholderText: {
        color: '#9ca3af', // gray-400
    },

}

const Result: React.FC<ResultProps> = ({ data, isLoading, error, responseType }) => {
    return (
        <div style={styles.resultBox}>
            <h2 style={styles.h2}>取得結果</h2>
            {isLoading && <p>Loading...</p>}
            {error && <p style={styles.errorText}>エラー: {error}</p>}
            {responseType === 'table' && data && (
                data.length === 0 ? (
                    <p style={styles.errorText}>データが存在しません。</p>
                ) :
                    data.length > 0 && (
                        <table style={{ width: '100%', borderCollapse: 'collapse', margin: '16px 0', border: '1px solid black' }}>
                            <thead style={{ backgroundColor: '#3f6ac1ff', color: 'white' }}>
                                <tr>
                                    <th>ID</th>
                                    <th>ユーザー名</th>
                                    <th>生年月日</th>
                                    <th>等級</th>
                                    <th>退職済み</th>
                                </tr>
                            </thead>
                            <tbody style={{ textAlign: 'center' }}>
                                {(data as User[]).map((item) => (
                                    <tr key={item.userId}>
                                        <td>{item.userId}</td>
                                        <td>{item.userName}</td>
                                        <td>{item.birthday}</td>
                                        <td>{item.grade}</td>
                                        <td>{item.retirementFlag ? 'はい' : 'いいえ'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )
            )}
            {responseType === 'status' && data && (
                <p>{(data as string)}</p>
            )}
            {!isLoading && !error && !data && (
                <p style={styles.placeholderText}>ボタンを押してデータを取得してください。</p>
            )}
        </div>
    );
};

export default Result;
