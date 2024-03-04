import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSnackbar } from 'notistack';

const PullToRefresh = () => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    


    return (
        <div>

            <button onClick={() => {
                enqueueSnackbar("Good morning");
                setTimeout(() => {
                    closeSnackbar();
                },1000)
            }}>test snackbar</button>
        </div>


    );
};

export default PullToRefresh;
