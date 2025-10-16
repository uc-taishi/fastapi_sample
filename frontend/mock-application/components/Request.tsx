'use client';
import React from "react";
import Button from "./Button";
import { ResponseData } from "@/types/ResponseData";

type RequestProps = {
    isLoading: boolean;
    buttonType: string;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setError: React.Dispatch<React.SetStateAction<string | null>>;
    setData: React.Dispatch<React.SetStateAction<ResponseData | null>>;
    requestHandler: (setIsLoading: React.Dispatch<React.SetStateAction<boolean>>, setError: React.Dispatch<React.SetStateAction<string | null>>, setData: React.Dispatch<React.SetStateAction<ResponseData | null>>) => void;
}

const styles: { [key: string]: React.CSSProperties } = {
    buttonContainer: {
        display: 'flex',
        marginBottom: '24px',
    },

}

const judegeButtonLabel = (buttonType: string) => {
    switch (buttonType) {
        case 'GET':
            return 'データを取得';
        case 'POST':
            return 'データを登録';
        case 'PUT':
            return 'データを更新';
        case 'DELETE':
            return 'データを削除';
    }

}

const Request: React.FC<RequestProps> = ({ isLoading, buttonType, setIsLoading, setError, setData, requestHandler }) => {

    return (
        <>
            <div style={styles.buttonContainer}>
                <Button onClick={() => requestHandler(setIsLoading, setError, setData)} disabled={isLoading}>
                    {isLoading ? '取得中...' : judegeButtonLabel(buttonType)}
                </Button>
            </div>

        </>
    )
}

export default Request;