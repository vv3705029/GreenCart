// Multer allows you to upload files (like images, PDFs) from the client (React, HTML forms, etc.) to your Node.js/Express server.
import multer from "multer";

export const upload=multer({
    storage:multer.diskStorage({})
})