'use client';
import React from "react";
import Button from "./Button";
import { ResponseData } from "@/types/ResponseData";

type RequestProps = {
    isLoading: boolean;
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

const Request: React.FC<RequestProps> = ({ isLoading, setIsLoading, setError, setData, requestHandler }) => {

    return (
        <>
            <div style={styles.buttonContainer}>
                <Button onClick={() => requestHandler(setIsLoading, setError, setData)} disabled={isLoading}>
                    {isLoading ? '取得中...' : 'データを取得'}
                </Button>
            </div>

        </>
    )
}

export default Request;