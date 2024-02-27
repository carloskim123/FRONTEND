import {  RotatingSquare } from "react-loader-spinner";

export default function Loader() {
    // Define styles for the loader overlay
    const loaderOverlayStyles: React.CSSProperties = {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center", // Center horizontally
        alignItems: "center", // Center vertically
        zIndex: 9999,
        backdropFilter: "blur(12px)", // Apply a blur effect
        backgroundColor: "rgba(255, 255, 255, 0.6)", // Optional: semi-transparent overlay
    };

    // Define styles for the loader
    const loaderStyles: React.CSSProperties = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    };

    return (
        <div className="loader-overlay" style={loaderOverlayStyles}>
            <div style={loaderStyles}>
                {/* Display a color ring loader */}
                <RotatingSquare
                    visible={true}
                    height="100"
                    width="100"
                    color="#000"
                    ariaLabel="rotating-square-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            </div>
        </div>
    );
}
