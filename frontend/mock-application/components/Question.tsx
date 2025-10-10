'use client';
import React from "react";
import Request from "./Request";
import Result from "./Result";
import { ResponseData } from "@/types/ResponseData";
import { AnyDict } from "@/types/AnyDict";

type QuestionProps = {
    title: string;
    subTitle?: string;
    description?: string;
    endpoint?: string;
    requestBody?: AnyDict;
    responseBody?: AnyDict;
    requestHandler: (setIsLoading: React.Dispatch<React.SetStateAction<boolean>>, setError: React.Dispatch<React.SetStateAction<string | null>>, setData: React.Dispatch<React.SetStateAction<ResponseData | null>>) => void;
    children?: React.ReactNode;
    responseType: string;
}

const containerStyle = {
    border: '1px solid #e5e7eb', // 枠線を淡いグレーに
    borderRadius: '8px',
    padding: '20px', // 少しパディングを増やす
    marginBottom: '32px',
    backgroundColor: '#ffffff', // コンテナの背景を白に
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)', // 影を追加
};

const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse' as const, // CSSの型を修正
        border: '1px solid #e5e7eb', // テーブル全体の外枠
        borderRadius: '4px',
        overflow: 'hidden', // 枠線と角丸を適用するため
    };

const headerBgColor = '#eef2ff'; // 淡いインディゴ (TailwindCSS: indigo-50 くらい)
const headerTextColor = '#4b5563'; // 濃い目のグレー


const Question: React.FC<QuestionProps> = ({ title, subTitle, description, endpoint, requestBody, responseBody, requestHandler, children, responseType }) => {

    const [data, setData] = React.useState<ResponseData | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const requestEntries = Object.entries(requestBody || {});
    const responseEntries = Object.entries(responseBody || {});

    return (
        <div style={containerStyle}>
            <h2 style={{ fontSize: '1.5rem', color: '#1f2937' }}>{title}</h2>
            {subTitle && <p style={{ color: '#4b5563' }}>{subTitle}</p>}
            <div style={{ marginBottom: '16px', color: '#374151' }}>
                <p style={{ fontWeight: '600', marginBottom: '8px' }}>エンドポイント：<code style={{ backgroundColor: '#f3f4f6', padding: '2px 4px', borderRadius: '4px', color: '#374151' }}>{endpoint}</code></p>
                {description && <p style={{ marginBottom: '16px' }}>処理の概要：{description}</p>}
                {requestEntries.length > 0 ?
                    <div style={{ marginBottom: '16px' }}>
                        <p style={{ fontWeight: '600', marginBottom: '8px' }}>リクエストボディ</p>
                        <table style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                            <thead style={{ background: headerBgColor, color: headerTextColor }}>
                                <tr>
                                    <th style={{ textAlign: 'left', padding: 12, borderBottom: '1px solid #9ca3af' }}>キー</th>
                                    <th style={{ textAlign: 'left', padding: 12, borderBottom: '1px solid #9ca3af' }}>値</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requestEntries.map(([k, v]) => (
                                    <tr key={k} style={{ backgroundColor: '#ffffff' }}>
                                        <td style={{ padding: 12, borderBottom: '1px solid #e5e7eb', whiteSpace: 'nowrap' }}>{k}</td>
                                        <td style={{ padding: 12, borderBottom: '1px solid #e5e7eb' }}>
                                            {typeof v === 'string' ? v : JSON.stringify(v)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    : <p style={{ marginBottom: '16px', color: '#6b7280' }}>リクエストボディはありません。</p>
                }
                {responseEntries.length > 0 ? (
                    <div style={{ marginBottom: '16px' }}>
                        <p style={{ fontWeight: '600', marginBottom: '8px' }}>レスポンスボディ</p>
                        <table style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                            <thead style={{ background: '#8fd1c4ff' }}>
                                <tr>
                                    <th style={{ textAlign: 'left', padding: 12, borderBottom: '1px solid #9ca3af' }}>キー</th>
                                    <th style={{ textAlign: 'left', padding: 12, borderBottom: '1px solid #9ca3af' }}>値</th>
                                </tr>
                            </thead>
                            <tbody>
                                {responseEntries.map(([k, v]) => (
                                    <tr key={k}>
                                        <td style={{ padding: 12, borderBottom: '1px solid #e5e7eb', whiteSpace: 'nowrap' }}>{k}</td>
                                        <td style={{ padding: 12, borderBottom: '1px solid #e5e7eb' }}>
                                            {typeof v === 'string' ? v : JSON.stringify(v)}
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : <p style={{ color: '#6b7280' }}>レスポンスボディはありません。</p>
                }
            </div>
            {children && <div style={{ marginBottom: '16px' }}>{children}</div>}
            <Request isLoading={isLoading} setIsLoading={setIsLoading} setError={setError} setData={setData} requestHandler={requestHandler} />
            <Result data={data} isLoading={isLoading} error={error} responseType={responseType} />
        </div>

    )
}

export default Question;