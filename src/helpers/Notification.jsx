import React from 'react';
import { useSnackbar } from 'notistack';

const Notification = () => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const defaultOptions = {
        preventDuplicate: true,
        autoHideDuration: 3000,
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
        },
        onClick: () => {
            closeSnackbar();
        },
    };

    const displayNotification = (message, options = {}) => {
        const mergedOptions = { ...defaultOptions, ...options };
        enqueueSnackbar(message, mergedOptions);
    };

    return {
        displayInfo: (message, options = {}) => displayNotification(message, { ...options, variant: 'info' }),
        displaySuccess: (message, options = {}) => displayNotification(message, { ...options, variant: 'success' }),
        displayWarning: (message, options = {}) => displayNotification(message, { ...options, variant: 'warning' }),
        displayError: (message, options = {}) => displayNotification(message, { ...options, variant: 'error' }),
        displayCustom: (message, options = {}) => displayNotification(message, { ...options, variant: 'default' }),

        displayCustomWithIcon: (message, icon, options = {}) => {
            const customOptions = {
                ...options,
                variant: 'default',
                action: (key) => (
                    <div onClick={() => enqueueSnackbar('You clicked the action', { variant: 'info' })}>
                        Custom Action
                    </div>
                ),
                onClick: () => {
                    closeSnackbar();
                },
            };

            const mergedOptions = { ...defaultOptions, ...customOptions };
            enqueueSnackbar(<span>{icon} {message}</span>, mergedOptions);
        },

        displayCustomNotification: (notificationElement, options = {}) => {
            const customOptions = {
                ...options,
                onClick: () => {
                    closeSnackbar();
                },
            };

            const mergedOptions = { ...defaultOptions, ...customOptions };
            enqueueSnackbar(notificationElement, mergedOptions);
        },
    };
};

export default Notification;
