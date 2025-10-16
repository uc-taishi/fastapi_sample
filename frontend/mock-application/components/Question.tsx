'use client';
import React from "react";
import Request from "./Request";
import Result from "./Result";
import { ResponseData } from "@/types/ResponseData";
import { AnyDict } from "@/types/AnyDict";
import Table from "./Table";

type QuestionProps = {
    title: string;
    subTitle?: string;
    description?: string;
    endpoint?: string;
    processDescription?: string;
    requestBody?: AnyDict;
    buttonType: string;
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


const Question: React.FC<QuestionProps> = ({ title, subTitle, description, endpoint, processDescription, buttonType, requestBody, responseBody, requestHandler, children, responseType }) => {

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
                <div style={{ marginBottom: '16px' }}>
                    <p style={{ fontWeight: '600', marginBottom: '8px' }}>エンドポイント</p>
                    <code style={{ backgroundColor: '#f3f4f6', padding: '2px 4px', borderRadius: '4px', color: '#374151' }}>{endpoint}</code>
                </div>
                {description &&
                    <div style={{ marginBottom: '16px' }}>
                        <p style={{ fontWeight: '600', marginBottom: '8px' }}>処理の概要</p>
                        {description}
                    </div>
                }
                {processDescription &&
                    <div style={{ marginBottom: '16px' }}>
                        <p style={{ fontWeight: '600', marginBottom: '8px' }}>処理の詳細</p>
                        {processDescription}
                    </div>
                }
                <div style={{ marginBottom: '16px' }}>
                    <p style={{ fontWeight: '600', marginBottom: '8px' }}>リクエストボディ</p>
                    {requestEntries.length > 0 ?
                        <Table header={['キー', '値']} rows={requestEntries} headerStyle={{ background: headerBgColor, color: headerTextColor }} />
                        :
                        <p>リクエストボディはありません。</p>
                    }
                </div>
                <div style={{ marginBottom: '16px' }}>
                    <p style={{ fontWeight: '600', marginBottom: '8px' }}>レスポンスボディ</p>
                    {responseEntries.length > 0 ? (
                        <Table header={['キー', '値']} rows={responseEntries} headerStyle={{ background: '#8fd1c4ff' }} />
                    ) : <p>レスポンスボディはありません。</p>
                    }
                </div>
            </div>
            {children && <div style={{ marginBottom: '16px' }}>{children}</div>}
            <Request isLoading={isLoading} buttonType={buttonType} setIsLoading={setIsLoading} setError={setError} setData={setData} requestHandler={requestHandler} />
            <Result data={data} isLoading={isLoading} error={error} responseType={responseType} />
        </div>

    )
}

export default Question;