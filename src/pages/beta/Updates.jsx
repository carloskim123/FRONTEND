import { motion } from 'framer-motion';
import React from 'react';

const UpdatesPage = () => {
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="container mx-auto p-10"
        >
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Upcoming Updates</h2>
            <div>
                <h3 className="text-xl font-semibold mb-2">Major Bug Fixes</h3>
                <p className="text-gray-700">
                    In our commitment to providing a seamless user experience, we are addressing major bug fixes in the upcoming release.<br />
                    Your feedback has been invaluable, and we're working hard to enhance the stability and performance of our platform.<br />
                </p>
            </div>

        </motion.div>
    );
}

export default UpdatesPage;
