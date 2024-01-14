import moment from "moment";

export const formatDate = (date: string) => {
    return moment(date).format('MMMM Do YYYY');
};


export const clickToCopy = (element: HTMLElement, toast) => {
    element.addEventListener('click', () => {
        const textToCopy = element.textContent;

        if (textToCopy) {
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    toast.info(`Text copied to clipboard`);
                })
                .catch((err) => {
                    console.error('Failed to copy text to clipboard:', err);
                    toast.info(`Could not copy text to clipboard`)

                });
        }
    });
};
