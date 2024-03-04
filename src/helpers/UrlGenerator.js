export const UrlGenerator = (resourceType, setUrl, data) => {
    let urlGeneration;

    if (resourceType === "post") {
        urlGeneration = `${window.location.origin}/post/${data}`;
        console.log(urlGeneration)
    } else {
        urlGeneration = `${window.location.origin}/u/${data}`;
    }

    setUrl(urlGeneration);
}
