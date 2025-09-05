import {ErrorBoundary} from 'react-error-boundary';
import React from 'react'

function ErrorBoundaryUI({error, resetErrorBoundary}){
    return (
    <div>
        <div role='alert' className='alert alert-error'>
            <p>{error.message}</p>
            <button onClick={resetErrorBoundary} className='btn btn-primary'>
                Try again
            </button>
        </div>^
    </div>
    )
}

export default function ErrorBoundaryComponent({children}){
    return (
        <ErrorBoundary 
            FallbackComponent={ErrorBoundaryUI}
            onReset={()=>{
                window.location.reload();
            }}
        >
            {children}
        </ErrorBoundary>    
    )
}