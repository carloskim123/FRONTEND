import moment from 'moment';

export const formatDate = (date: string) => {
    return moment(date).fromNow();
};



export const clickToCopy = (element: HTMLElement, notify) => {
    element.addEventListener('click', () => {
        const textToCopy = element.textContent;

        if (textToCopy) {
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    notify.displayInfo(`Text copied to clipboard`);
                })
                .catch((err) => {
                    console.error('Failed to copy text to clipboard:', err);
                    notify.displayInfo(`Could not copy text to clipboard`)

                });
        }
    });
};
