/// <reference types="vite/client" />

interface PostItemProps {
    author: string;
    title: string;
    img: string;
    content: string;
    createdAt: string,
    updatedAt: string,
}


interface RouteInterface {
    path: string;
    pathname: string;
}



interface NavLinkInterface {
    route: string
}